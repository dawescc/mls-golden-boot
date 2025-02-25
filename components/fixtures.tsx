"use client";

import { getFixturesForCurrentRound } from "@/actions/getCurrentRoundFixtures";
import { useCallback, useEffect, useState } from "react";
import { Drawer, Handle } from "vaul";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { FixtureCardProps, FixturesDetailsProps, FixturesByRoundResponse, MatchInfoResponse } from "@/types";
import { tz } from "@/utils/tz";
import { getMatchInfo } from "@/actions/getMatchInfo";
import { getFullTimeEventDisplay } from "@/components/live-scoreboard";
import { Spinner } from "@/components/ui/(spinner)/spinner";
import { AiOutlineDoubleLeft } from "react-icons/ai";

const useGetCurrentRoundFixtures = () => {
	const [scores, setScores] = useState<FixturesByRoundResponse[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);
	const [retryCount, setRetryCount] = useState(0);

	const fetchWithRetry = useCallback(async (attempt = 0): Promise<FixturesByRoundResponse[]> => {
		try {
			const data = await getFixturesForCurrentRound();
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

		const fetchScores = async () => {
			let attempt = 0;
			while (attempt < 3) {
				try {
					const data = await fetchWithRetry(attempt);

					if (!mounted) return;

					setScores(data);
					setIsLoading(false);

					break;
				} catch (err) {
					attempt++;
					if (attempt >= 3) {
						if (!mounted) return;
						console.error("Error fetching scores:", err);
						setError(err instanceof Error ? err : new Error("Failed to fetch past scores"));
						setIsLoading(false);
					}
				}
			}
		};

		fetchScores();

		return () => {
			mounted = false;
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

const ScoreCard = ({ data, className }: FixtureCardProps) => {
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
					{data.goals.home != null && data.goals.away != null ? (
						<span>
							{data.goals.home} <span className='text-sm'>¤</span> {data.goals.away}
						</span>
					) : null}

					<div className='font-sans text-sm'>
						{data.fixture.status.short === "NS" ? <span>{tz(data.fixture.date)}</span> : <span>{data.fixture.status.short}</span>}
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

const FixtureDetails = ({ data }: FixturesDetailsProps) => {
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

				{data.fixture.status.short === "FT" ? <FullTimeDetails matchId={data.fixture.id} /> : null}
			</div>
		</div>
	);
};

const FullTimeDetails = ({ matchId }: { matchId: number }) => {
	const [matchInfo, setMatchInfo] = useState<MatchInfoResponse | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchMatchInfo = async () => {
			try {
				const info = await getMatchInfo(matchId);
				setMatchInfo(info[0]);
			} catch (error) {
				console.error("Error fetching match info:", error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchMatchInfo();
	}, [matchId]);

	if (isLoading) {
		return (
			<div className='layer-1-container p-4'>
				<span className='inline-flex items-center gap-[1ch]'>
					<Spinner /> Loading details
				</span>
			</div>
		);
	}

	if (!matchInfo) return null;

	return (
		<div className='flex flex-col gap-4'>
			{/* Score Breakdown */}
			<h3 className='font-medium text-lg -mb-2'>Score Details</h3>
			<div className='layer-1-container p-4 flex flex-col gap-2'>
				{matchInfo.score.halftime.home !== null && (
					<div className='flex justify-between text-accent'>
						<span className='font-medium'>Half Time</span>
						<span>
							{matchInfo.score.halftime.home} - {matchInfo.score.halftime.away}
						</span>
					</div>
				)}
				{matchInfo.score.extratime.home !== null && (
					<div className='flex justify-between text-accent'>
						<span className='font-medium'>Extra Time</span>
						<span>
							{matchInfo.score.extratime.home} - {matchInfo.score.extratime.away}
						</span>
					</div>
				)}
				{matchInfo.score.penalty.home !== null && (
					<div className='flex justify-between text-accent'>
						<span className='font-medium'>Penalties</span>
						<span>
							{matchInfo.score.penalty.home} - {matchInfo.score.penalty.away}
						</span>
					</div>
				)}
			</div>

			{/* Match Events */}
			{matchInfo.events && matchInfo.events.length > 0 && (
				<div className='flex flex-col gap-2'>
					<h3 className='font-medium text-lg'>Match Events</h3>
					<div className='layer-1-container p-4 flex flex-col'>
						{matchInfo.events.map((event, index) => (
							<div
								key={index}
								className='border-b border-layer-5/40 p-3 flex items-center gap-3'>
								<span className='font-mono text-accent'>
									{event.time.elapsed}&apos;
									{event.time.extra && `+${event.time.extra}`}
								</span>
								<Image
									src={event.team.logo}
									alt={event.team.name}
									width={"200"}
									height={"200"}
									className='aspect-square size-6'
								/>
								<span className={`font-medium ${event.type.toLowerCase() === "subst" ? "text-accent" : null}`}>
									{event.player.name?.replace(/[0-9]/g, "")}
								</span>
								<span className='font-medium'>{getFullTimeEventDisplay(event.type, event.detail, event.assist)}</span>
								{event.assist.name && event.type.toLowerCase() === "goal" && (
									<>
										<AiOutlineDoubleLeft className='inline size-[1.175rem] text-accent' />
										<span className='text-accent font-medium'>{event.assist.name}</span>
									</>
								)}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

const ScoreBoard = () => {
	const { scores, isLoading, error, retryCount } = useGetCurrentRoundFixtures();

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
									<FixtureDetails data={score} />
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
