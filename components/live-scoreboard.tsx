"use client";

import { getLiveScores } from "@/actions/getLiveScores";
import { useCallback, useEffect, useState } from "react";
import { Drawer, Handle } from "vaul";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { LiveScoresResponse } from "@/types/api/live-scores";
import { LiveScoreCardProps, LiveScoreDetailsProps } from "@/types/components/live-scoreboard";
import { tz } from "@/utils/tz";

const POLLING_INTERVALS = {
	MATCH_IN_PROGRESS: 60000, // 1m
	MATCH_OTHER_LIVE: 120000, // 2m
	NO_MATCHES: 300000, // 5m
} as const;

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
				<div className='layer-1-container p-4 flex flex-col gap-2'>
					<div className='flex justify-between items-center text-accent'>
						<Image
							src={"https://media.api-sports.io/football/leagues/253.png"}
							alt={":)"}
							width={"200"}
							height={"200"}
							className='aspect-square size-8'
						/>
						<span>{data.league.name}</span>
					</div>
				</div>

				{/* Venu Info */}
				<div className='layer-1-container p-4 flex flex-col gap-2'>
					<div className='flex justify-between text-accent'>
						<span className='font-medium'>Stadium</span>
						<span>{data.fixture.venue.name}</span>
					</div>
					<div className='flex justify-between text-accent'>
						<span className='font-medium'>Location</span>
						<span>{data.fixture.venue.city}</span>
					</div>
					<div className='flex justify-between text-accent'>
						<span className='font-medium'>Kick Off</span>
						<span>{tz(data.fixture.date)}</span>
					</div>
					<div className='flex justify-between items-center text-accent'>
						<span className='font-medium'>Official</span>
						<span>{data.fixture.referee}</span>
					</div>
				</div>

				{/* Events */}
				<div className='flex flex-col gap-2'>
					<h3 className='font-medium text-lg'>Match Events</h3>
					{data.events.map((event, index) => (
						<div
							key={index}
							className='layer-1-container p-3 flex items-center gap-3'>
							<span className='font-mono text-accent'>{event.time.elapsed}&apos;</span>
							<Image
								src={event.team.logo}
								alt={":)"}
								width={"200"}
								height={"200"}
								className='aspect-square size-6'
							/>
							<span className='font-medium'>{event.player.name}</span>
							<span className='text-accent'>{event.type}</span>
						</div>
					))}
				</div>
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
