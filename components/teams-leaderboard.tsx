"use client";

import { HiPlus } from "react-icons/hi";
import { Drawer, Handle } from "vaul";
import { PlayerCardDrawer } from "@/components/player-card";
import { getPlayerGoalsTotal } from "@/actions/getPlayerGoalsTotal";
import { useState, useEffect } from "react";

const useTeamScores = () => {
	const [teamScores, setTeamScores] = useState<TeamScore[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const fetchScores = async () => {
			try {
				setIsLoading(true);
				const scores = await getPlayerGoalsTotal();
				setTeamScores(scores);
			} catch (err) {
				setError(err instanceof Error ? err : new Error("Failed to fetch players"));
			} finally {
				setIsLoading(false);
			}
		};

		fetchScores();
	}, []);

	return { teamScores, isLoading, error };
};

const LeaderboardDetailsDrawer = () => {
	const { teamScores, isLoading, error } = useTeamScores();

	return (
		<Drawer.Root>
			<Drawer.Trigger className='w-full'>
				<Leaderboard
					teamScores={teamScores}
					isLoading={isLoading}
					error={error}
				/>
			</Drawer.Trigger>
			<Drawer.Portal>
				<Drawer.Overlay className='fixed inset-0 bg-black/80 backdrop-blur-[0.05rem]' />
				<Drawer.Content className='bg-layer-0 border-t border-layer-5/30 flex flex-col rounded-t mt-24 h-[80vh] fixed bottom-0 left-0 right-0 outline-none'>
					<div className='p-4'>
						<Handle />
					</div>
					<div className='pb-4 px-2 overflow-y-auto'>
						<Drawer.Title className='hidden'>Leaderboard Details</Drawer.Title>
						<LeaderboardDetails
							teamScores={teamScores}
							isLoading={isLoading}
							error={error}
						/>
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.Root>
	);
};

const teamLoadingPlaceholder: TeamScore[] = [
	{
		owner: "Team1OwnerName",
		totalGoals: 0,
		players: [],
	},
	{
		owner: "Team2OwnerName",
		totalGoals: 0,
		players: [],
	},
	{
		owner: "Team3OwnerName",
		totalGoals: 0,
		players: [],
	},
	{
		owner: "Team4OwnerName",
		totalGoals: 0,
		players: [],
	},
];

const LeaderboardLoading = () => {
	return (
		<div className='flex w-full flex-col overflow-hidden shadow-sm border border-layer-5/70 bg-layer-1 rounded'>
			<div className='flex flex-grow flex-row items-center justify-between p-3 bg-layer-2'>
				<p className='text-xl font-medium'>Leaderboard</p>
				<div className='p-1 border border-layer-5/80 rounded-full bg-layer-3'>
					<HiPlus className='size-6' />
				</div>
			</div>
			<div className='flex flex-col gap-2 p-2 [text-align:left]'>
				{teamLoadingPlaceholder.map((team) => (
					<div
						key={team.owner}
						className='flex justify-between items-center p-2'>
						<span className='animate-pulse rounded aria-hidden text-transparent bg-layer-5'>{team.owner}</span>
						<span className='font-mono text-accent animate-pulse rounded aria-hidden text-transparent bg-layer-5'>000</span>
					</div>
				))}
			</div>
		</div>
	);
};

const LeaderboardDetailsLoading = () => {
	return (
		<div className='flex flex-col gap-6'>
			{teamLoadingPlaceholder.map((team) => (
				<div
					key={team.owner}
					className='bg-layer-1 rounded p-4'>
					<div className='flex justify-between items-center mb-4'>
						<h2 className='text-xl font-bold animate-pulse rounded aria-hidden text-transparent bg-layer-5 w-32'>{team.owner}</h2>
						<span className='text-2xl font-mono text-accent animate-pulse rounded aria-hidden text-transparent bg-layer-5 w-12'>000</span>
					</div>
					<div className='grid gap-3'>
						{[1, 2, 3, 4, 5, 6, 7].map((index) => (
							<div
								key={index}
								className='bg-layer-1 rounded overflow-clip relative shadow-sm border border-layer-5/50'>
								<div className='flex px-3 pb-3 pt-3'>
									<div className='size-10 aspect-square rounded mr-4 border border-layer-5/80 animate-pulse bg-layer-5' />
									<div className='flex gap-2 flex-1'>
										<div className='h-10 w-36 animate-pulse rounded bg-layer-5' />
										<div className='h-6 w-10 mb-2 animate-pulse rounded bg-layer-5' />
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

const Leaderboard = ({ teamScores, isLoading, error }: LeaderboardProps) => {
	if (isLoading) {
		return <LeaderboardLoading />;
	}

	if (error) {
		return <div>Error loading scores: {error.message}</div>;
	}

	return (
		<div className='flex w-full flex-col overflow-hidden shadow-sm border border-layer-5/70 bg-layer-1 rounded'>
			<div className='flex flex-grow flex-row items-center justify-between p-3 bg-layer-2'>
				<p className='text-xl font-medium'>Leaderboard</p>
				<div className='p-1 border border-layer-5/80 rounded-full bg-layer-3'>
					<HiPlus className='size-6' />
				</div>
			</div>
			<div className='flex flex-col gap-2 p-2 [text-align:left]'>
				{teamScores.map((team) => (
					<div
						key={team.owner}
						className='flex justify-between items-center p-2'>
						<span>{team.owner}</span>
						<span className='font-mono text-accent'>{team.totalGoals}</span>
					</div>
				))}
			</div>
		</div>
	);
};

const LeaderboardDetails = ({ teamScores, isLoading, error }: LeaderboardProps) => {
	if (isLoading) {
		return <LeaderboardDetailsLoading />;
	}

	if (error) {
		return <div>Error loading scores: {error.message}</div>;
	}

	return (
		<div className='flex flex-col gap-6'>
			{teamScores.map((team) => (
				<div
					key={team.owner}
					className='bg-layer-1 rounded p-4 border-layer-5/50'>
					<div className='flex justify-between items-center mb-4'>
						<h2 className='text-xl font-bold'>{team.owner}</h2>
						<span className='text-2xl font-mono text-accent'>{team.totalGoals}</span>
					</div>
					<div className='grid gap-3'>
						{team.players.map((player) => (
							<PlayerCardDrawer
								key={player.player.id}
								data={player}
								smallCardClasses='bg-layer-1'
								isNested
							/>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export { Leaderboard, LeaderboardDetails, LeaderboardDetailsDrawer };
