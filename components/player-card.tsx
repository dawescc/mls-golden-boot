"use client";

import { calculateTotalGoals } from "@/lib/fn";
import { PlayerDrawerProps, PlayersResponse, PlayerCardProps } from "@/types";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { Drawer, Handle } from "vaul";

const PlayerCardDrawer = ({ data, smallCardClasses = "", isNested = false }: PlayerDrawerProps<PlayersResponse>) => {
	const DrawerComponent = isNested ? Drawer.NestedRoot : Drawer.Root;
	return (
		<DrawerComponent>
			<Drawer.Trigger>
				<PlayerCardSmall
					className={smallCardClasses}
					data={data}
				/>
			</Drawer.Trigger>
			<Drawer.Portal>
				<Drawer.Overlay className='fixed inset-0 bg-black/80 backdrop-blur-[0.05rem] z-10' />
				<Drawer.Content
					className={`bg-layer-0 border-t border-layer-5/30 flex flex-col rounded-t mt-24 ${
						isNested ? "h-[72vh]" : "h-[80vh]"
					} fixed bottom-0 left-0 right-0 outline-none z-20`}>
					<div className='p-4'>
						<Handle />
					</div>
					<div className='pb-4 px-4 overflow-y-auto'>
						<Drawer.Title className='hidden'>Player Details</Drawer.Title>
						<PlayerCard data={data} />
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		</DrawerComponent>
	);
	return;
};

const PlayerCardSmall = ({ data, className = "" }: PlayerCardProps<PlayersResponse>) => {
	return (
		<div className={cn(`layer-1-container overflow-clip`, className)}>
			<div className='flex px-3 pb-3 pt-3'>
				<div className='grid grid-cols-1 place-items-center'>
					<div className='flex relative'>
						<Image
							src={data.player.id === 2295 ? "/img/newdog.png" : data.player.photo}
							alt={`${data.player.name} Image`}
							width={150}
							height={150}
							className='size-10 aspect-square rounded mr-4 border border-layer-5/80 mt-auto'
						/>
						{data.statistics[0].team.logo && (
							<Image
								src={data.statistics[0].team.logo}
								alt={`${data.statistics[0].team.name} Logo`}
								width={24}
								height={24}
								className='absolute right-0 bottom-0 -translate-x-[0.277rem] translate-y-[0.277rem] size-6'
							/>
						)}
					</div>
				</div>
				<h2 className='font-semibold text-4xl text-start'>{data.player.name}</h2>
				<p className='font-mono font-black tabular-nums text-accent text-2xl rounded-underline ml-auto'>{calculateTotalGoals(data.statistics)}</p>
			</div>
		</div>
	);
};

const PlayerCard = ({ data }: PlayerCardProps<PlayersResponse>) => {
	return (
		<div className='p-4 rounded'>
			<div className='flex items-center gap-4 mb-4'>
				<Image
					src={data.player.photo}
					alt={data.player.name}
					width={150}
					height={150}
					className='rounded size-20'
				/>
				<div>
					<h2 className='text-xl font-semibold'>{data.player.name}</h2>
					<p className='text-accent'>
						{data.player.age} · {data.player.nationality}
					</p>
				</div>
			</div>

			{data.statistics.map((teamStats, index) => (
				<div
					key={`${teamStats.team.id}-${index}`}
					className='mt-4'>
					{/* Team Header */}
					{(teamStats.goals.total || teamStats.games.minutes) && (
						<div className='flex items-center gap-2 mb-3'>
							<Image
								src={teamStats.team.logo}
								alt={teamStats.team.name}
								width={24}
								height={24}
							/>
							<p className='text-accent'>{teamStats.team.name}</p>
						</div>
					)}

					{teamStats.goals.total && (
						<div className='grid grid-cols-2 gap-1.5'>
							<div className='layer-1-container p-3'>
								<p className='text-xs font-medium text-accent'>Goals</p>
								<p className='text-2xl font-bold'>{teamStats.goals.total}</p>
							</div>
							<div className='layer-1-container p-3'>
								<p className='text-xs font-medium text-accent'>Assists</p>
								<p className='text-2xl font-bold'>{teamStats.goals.assists}</p>
							</div>
							<div className='layer-1-container p-3'>
								<p className='text-xs font-medium text-accent'>Games</p>
								<p className='text-2xl font-bold'>{teamStats.games.appearences}</p>
							</div>
							<div className='layer-1-container p-3'>
								<p className='text-xs font-medium text-accent'>Rating</p>
								<p className='text-2xl font-bold'>{Number(teamStats.games.rating).toFixed(1)}</p>
							</div>
						</div>
					)}

					{teamStats.games.minutes && (
						<div className='mt-4 px-2 grid grid-cols-1 gap-1.5'>
							<div className='flex justify-between items-center py-0.5 border-b border-layer-5/40'>
								<span className='text-xs font-medium text-accent'>Minutes played</span>
								<span className='font-bold'>{teamStats.games.minutes}</span>
							</div>
							<div className='flex justify-between items-center py-0.5 border-b border-layer-5/40'>
								<span className='text-xs font-medium text-accent'>Shot accuracy</span>
								<span className='font-bold'>{Math.round((teamStats.shots.on / teamStats.shots.total) * 100)}%</span>
							</div>
							<div className='flex justify-between items-center py-0.5'>
								<span className='text-xs font-medium text-accent'>Pass accuracy</span>
								<span className='font-bold'>{teamStats.passes.accuracy ? `${teamStats.passes.accuracy}%` : "N/A"}</span>
							</div>
						</div>
					)}
				</div>
			))}
		</div>
	);
};

export { PlayerCardDrawer, PlayerCardSmall, PlayerCard };
