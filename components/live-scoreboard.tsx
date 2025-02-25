"use client";

import { getLiveScores } from "@/actions/getLiveScores";
import { useCallback, useEffect, useState } from "react";
import { Drawer, Handle } from "vaul";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { EventParticipant, LiveScoreCardProps, LiveScoreDetailsProps, LiveScoresResponse } from "@/types";
import { tz } from "@/utils/tz";
import { GiSoccerBall, GiWhistle } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { GrFlagFill } from "react-icons/gr";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";

const POLLING_INTERVALS = {
	MATCH_IN_PROGRESS: 60000, // 1m
	MATCH_OTHER_LIVE: 120000, // 2m
	NO_MATCHES: 300000, // 5m
} as const;

export function getEventDisplay(type: string, detail: string): React.ReactNode {
	const t = type.toLowerCase();
	const d = detail.toLowerCase();

	if (t === "goal") {
		switch (d) {
			case "own goal":
				return (
					<span className='font-bold flex items-center gap-2'>
						<GiSoccerBall className='inline size-[1.175rem]' /> OG
					</span>
				);
			case "penalty":
				return (
					<span className='font-bold flex items-center gap-2'>
						<GiSoccerBall className='inline size-[1.175rem]' />{" "}
						<span className='font-bold text-xs px-2 py-1 border border-layer-5/70 ring ring-inset ring-layer-5/20 rounded-md bg-layer-2 flex items-center gap-1'>
							PEN
						</span>
					</span>
				);
			case "missed penalty":
				return (
					<span className='font-bold flex items-center gap-2'>
						<ImCross className='inline size-[1.05rem]' /> PEN MISS
					</span>
				);
			default:
				return (
					<span className='font-bold flex items-center gap-2'>
						<GiSoccerBall className='inline size-[1.175rem]' />
					</span>
				);
		}
	}

	if (t === "card") {
		switch (d) {
			case "yellow card":
				return <div className='size-3 scale-y-125 -scale-x-95 bg-yellow-300 rounded-sm'></div>;
			case "red card":
				return <div className='size-3 scale-y-125 -scale-x-95 bg-red-400 rounded-sm'></div>;
			default:
				return "?";
		}
	}

	if (t === "var") {
		if (d.includes("goal") && d.includes("disallowed")) {
			return (
				<span className='flex items-center gap-2'>
					<GiSoccerBall className='inline size-[1.175rem]' />

					<span className='font-bold text-xs px-2 py-1 border border-layer-5/70 ring ring-inset ring-layer-5/20 rounded-md bg-layer-2 flex items-center gap-1'>
						<ImCross className='inline size-[1em] mb-[1px] text-red-400' />
						VAR
					</span>
					{d.includes("offside") ? (
						<span className='text-sm text-accent'>
							<GrFlagFill className='inline text-orange-400' />
						</span>
					) : null}
					{d.includes("foul") ? (
						<span className='text-sm text-accent'>
							<GiWhistle className='inline' />
						</span>
					) : null}
				</span>
			);
		} else return <span className='font-bold flex items-center gap-2'>{t}</span>;
	}

	if (t === "subst") {
		const substNumber = parseInt(d.match(/\d+/)?.[0] || "0");

		if (substNumber % 2 === 0) {
			return (
				<span className='font-bold flex items-center gap-2'>
					<BsCaretLeftFill className='inline size-[1.175rem] text-red-400' />
				</span>
			);
		} else {
			return (
				<span className='font-bold flex items-center gap-2'>
					<BsCaretRightFill className='inline size-[1.175rem] text-green-400' />
				</span>
			);
		}
	}

	return "?";
}

export function getFullTimeEventDisplay(type: string, detail: string, assist?: EventParticipant): React.ReactNode {
	const t = type.toLowerCase();
	const d = detail.toLowerCase();
	if (t === "subst") {
		return (
			<span className='font-bold flex items-center gap-2'>
				<BsCaretLeftFill className='inline size-[1.175rem] text-red-400' />
				<BsCaretRightFill className='inline size-[1.175rem] text-green-400' />
				<span className='font-medium'>{assist?.name}</span>
			</span>
		);
	}
	return getEventDisplay(t, d);
}

const getMatchStatus = (scores: LiveScoresResponse[]) => {
	if (scores.length === 0) return "NO_MATCHES";

	const hasActiveMatch = scores.some((match) => {
		const status = match.fixture.status.short;
		return status === "1H" || status === "2H" || status === "HT";
	});

	return hasActiveMatch ? "MATCH_IN_PROGRESS" : "MATCH_OTHER_LIVE";
};

const useLiveScores = () => {
	const [scores, setScores] = useState<LiveScoresResponse[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const [retryCount, setRetryCount] = useState(0);

	const fetchWithRetry = useCallback(async (attempt = 0): Promise<LiveScoresResponse[]> => {
		try {
			const data = await getLiveScores();
			setRetryCount(0);
			return data;
		} catch (err) {
			if (attempt >= 2) {
				throw err;
			}
			const backoffDelay = Math.pow(2, attempt) * 1000;
			await new Promise((resolve) => setTimeout(resolve, backoffDelay));
			setRetryCount(attempt + 1);
			throw err;
		}
	}, []);

	useEffect(() => {
		let mounted = true;
		let intervalId: NodeJS.Timeout;

		const fetchScores = async () => {
			let attempt = 0;
			while (attempt < 3) {
				try {
					const data = await fetchWithRetry(attempt);

					if (!mounted) return;

					setScores(data);
					setIsLoading(false);

					const status = getMatchStatus(data);
					const nextInterval = POLLING_INTERVALS[status];

					clearInterval(intervalId);
					intervalId = setInterval(fetchScores, nextInterval);

					if (process.env.NODE_ENV === "development") {
						console.groupCollapsed("\n\nSet Live Score Interval");
						console.dir({
							Interval: `${nextInterval / 1000}s · ${nextInterval / 1000 / 60}m · ${nextInterval}ms`,
							Date: new Date().toLocaleString("en-US", {
								timeZone: "America/New_York",
								dateStyle: "medium",
								timeStyle: "medium",
							}),
						});
						console.groupEnd();
					}

					break;
				} catch (err) {
					attempt++;
					if (attempt >= 3) {
						if (!mounted) return;
						console.error("Error fetching scores:", err);
						setError(err instanceof Error ? err : new Error("Failed to fetch live scores"));
						setIsLoading(false);
					}
				}
			}
		};

		fetchScores();

		return () => {
			mounted = false;
			clearInterval(intervalId);
		};
	}, [fetchWithRetry]);

	return { scores, isLoading, error, retryCount };
};

const ScoreCardLoading = () => {
	return [1, 2, 3, 4].map((score) => (
		<div
			key={score}
			className={cn("bg-layer-0 rounded p-4 border border-layer-5/70", "")}>
			<div className='flex justify-between items-center'>
				<div className='flex items-center gap-3'>
					<div className='size-20 rounded bg-layer-5 animate-pulse' />
					<span className='hidden md:inline font-medium text-2xl w-[12ch] text-left text-transparent bg-layer-5 animate-pulse rounded'>
						0000000000
					</span>
				</div>
				<div className='font-mono font-bold text-2xl flex flex-col justify-center items-center'>
					<span className='text-transparent bg-layer-5 animate-pulse rounded'>
						00 <span className='text-sm'>¤</span> 00
					</span>
					<div className='font-sans mt-2 text-sm text-accent'>
						<span className='text-transparent bg-layer-5 animate-pulse rounded'>00&apos;</span>
					</div>
				</div>
				<div className='flex items-center gap-3'>
					<span className='hidden md:inline font-medium text-2xl w-[12ch] text-right text-transparent bg-layer-5 animate-pulse rounded'>
						0000000000
					</span>
					<div className='size-20 rounded bg-layer-5 animate-pulse' />
				</div>
			</div>
		</div>
	));
};

const ScoreBoardEmpty = () => {
	return (
		<div className='min-h-64 mt-4'>
			<div className='grid grid-cols-1 gap-5 w-full'>
				<div className='rounded bg-layer-0 border border-layer-5/60 pt-4 pb-6'>
					<div className='text-center text-sm text-accent'>
						<Image
							src={"/img/empty-net.svg"}
							alt={"GK"}
							width={340}
							height={280}
							className='size-56 mx-auto my-12 grayscale relative'
						/>
						<span className='mt-3'>
							<p>No live matches.</p>
							<p>Data will update in real-time.</p>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

const ScoreCard = ({ data, className }: LiveScoreCardProps) => {
	return (
		<div className={cn("layer-1-container p-4", className)}>
			<div className='flex justify-between items-center'>
				<div className='flex items-center gap-3'>
					<Image
						src={data.teams.home.logo}
						alt={data.teams.home.name}
						width={200}
						height={200}
						className='size-20'
					/>
					<span className='hidden md:inline font-medium text-2xl w-[12ch] text-left'>{data.teams.home.name}</span>
				</div>
				<div className='font-mono font-bold text-2xl flex flex-col justify-center items-center'>
					<span>
						{data.goals.home} <span className='text-sm'>¤</span> {data.goals.away}
					</span>
					<div className='font-sans mt-2 text-sm text-accent'>
						<span>
							{data.fixture.status.elapsed}&apos; {data.fixture.status.extra && <span>+ {data.fixture.status.extra}</span>}
						</span>
					</div>
				</div>
				<div className='flex items-center gap-3'>
					<span className='hidden md:inline font-medium text-2xl w-[12ch] text-right'>{data.teams.away.name}</span>
					<Image
						src={data.teams.away.logo}
						alt={data.teams.away.name}
						width={200}
						height={200}
						className='size-20'
					/>
				</div>
			</div>
		</div>
	);
};

const LiveScoreDetails = ({ data }: LiveScoreDetailsProps) => {
	return (
		<div className='p-4'>
			<div className=' flex flex-col gap-4'>
				{/* Match Header */}
				<ScoreCard data={data} />

				{/* Match Info */}
				<h3 className='font-medium text-lg -mb-2'>Match Details</h3>
				<div className='layer-1-container p-4 flex flex-col gap-2'>
					<div className='flex justify-between items-center text-accent'>
						<div className='flex gap-2'>
							<Image
								src={data.league.logo}
								alt={`${data.league.name} Logo`}
								width={"200"}
								height={"200"}
								className='aspect-square size-8'
							/>
							<Image
								src={data.league.flag}
								alt={`${data.league.country} Flag`}
								width={"200"}
								height={"200"}
								className='aspect-square size-8'
							/>
						</div>
						<span>
							{data.league.name}, {data.league.country}
						</span>
					</div>
				</div>

				{/* Venu Info */}
				<div className='layer-1-container p-4 flex flex-col gap-2 [text-algn:left]'>
					<div className='flex justify-between text-accent'>
						<span className='font-medium'>Stadium</span>
						<span className='text-right'>{data.fixture.venue.name}</span>
					</div>
					<div className='flex justify-between text-accent'>
						<span className='font-medium'>Location</span>
						<span className='text-right'>{data.fixture.venue.city}</span>
					</div>
					<div className='flex justify-between text-accent'>
						<span className='font-medium'>Kick Off</span>
						<span className='text-right'>{tz(data.fixture.date)}</span>
					</div>
					<div className='flex justify-between items-center text-accent'>
						<span className='font-medium'>Official</span>
						<span className='text-right'>{data.fixture.referee ? data.fixture.referee : "N/A"}</span>
					</div>
				</div>

				{/* Events */}
				{!data.events ? null : (
					<div className='flex flex-col gap-2'>
						<h3 className='font-medium text-lg'>Match Events</h3>
						{data.events.length < 1 ? (
							<div className='layer-1-container p-4 flex flex-col gap-2'>
								<p className='text-sm text-accent'>No events recorded.</p>
							</div>
						) : (
							<div className='layer-1-container p-4 flex flex-col gap-2'>
								{data.events.map((event, index) => (
									<div
										key={index}
										className='border-b border-layer-5/40 p-3 flex items-center gap-3'>
										<span className='font-mono text-accent'>{event.time.elapsed}&apos;</span>
										<Image
											src={event.team.logo}
											alt={":)"}
											width={"200"}
											height={"200"}
											className='aspect-square size-6'
										/>
										<span className='font-medium'>{event.player.name}</span>
										{/* <span className='text-accent'>{event.type}</span>
									<span className='text-accent'>{event.detail}</span> */}
										<span className='font-medium'>{getEventDisplay(event.type, event.detail)}</span>
									</div>
								))}
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

const ScoreBoard = () => {
	const { scores, isLoading, error, retryCount } = useLiveScores();

	if (error) {
		return (
			<div className='bg-layer-1 rounded p-4 border border-layer-5/50 text-red-500'>
				Error loading scores: {error.message}
				{retryCount > 0 && <span className='block text-sm mt-2'>Retry attempt {retryCount}/3...</span>}
			</div>
		);
	}
	return (
		<div className='flex flex-col gap-3'>
			{isLoading ? (
				<ScoreCardLoading />
			) : scores.length > 0 ? (
				scores.map((score) => (
					<Drawer.Root key={score.fixture.id}>
						<Drawer.Trigger className='w-full'>
							<ScoreCard data={score} />
						</Drawer.Trigger>
						<Drawer.Portal>
							<Drawer.Overlay className='fixed inset-0 bg-black/80 backdrop-blur-[0.05rem] z-10' />
							<Drawer.Content className='bg-layer-0 border-t border-layer-5/30 flex flex-col rounded-t mt-24 h-[80vh] fixed bottom-0 left-0 right-0 outline-none z-20'>
								<div className='p-4'>
									<Handle />
								</div>
								<div className='pb-4 px-4 overflow-y-auto'>
									<Drawer.Title className='hidden'>Match Details</Drawer.Title>
									<LiveScoreDetails data={score} />
								</div>
							</Drawer.Content>
						</Drawer.Portal>
					</Drawer.Root>
				))
			) : (
				<ScoreBoardEmpty />
			)}
		</div>
	);
};

export { ScoreBoard };
