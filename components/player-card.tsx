"use client";

import { calculateTotalGoals } from "@/lib/fn";
import Image from "next/image";
import { Drawer, Handle } from "vaul";

const PlayerCardDrawer = ({ data }: PlayerCardProps<PlayersResponse>) => {
	return (
		<Drawer.NestedRoot>
			<Drawer.Trigger className=''>
				<PlayerCardSmall data={data} />
			</Drawer.Trigger>
			<Drawer.Portal>
				<Drawer.Overlay className='fixed inset-0 bg-black/40 backdrop-blur-[0.05rem]' />
				<Drawer.Content className='bg-layer-0 flex flex-col rounded-t mt-24 h-fit fixed bottom-0 left-0 right-0 outline-none'>
					<div className='p-4 flex-1'>
						<Handle />
					</div>
					<div className='pb-4 px-2'>
						<Drawer.Title className='hidden'>Player Details</Drawer.Title>
						<PlayerCard data={data} />
					</div>
				</Drawer.Content>
			</Drawer.Portal>
		</Drawer.NestedRoot>
	);
	return;
};

const PlayerCardSmall = ({ data }: PlayerCardProps<PlayersResponse>) => {
	return (
		<div className='bg-layer-1 rounded overflow-clip relative shadow-sm border border-layer-5/50'>
			<div className='flex px-3 pb-3 pt-3'>
				<Image
					src={data.player.photo}
					alt={"MLS Logo"}
					width={100}
					height={100}
					className='size-10 aspect-square rounded mr-4 border border-layer-5/80'
				/>
				<h2 className='font-semibold text-4xl'>{data.player.name}</h2>
				<p className='font-mono font-black tabular-nums text-accent text-xl rounded-underline'>{calculateTotalGoals(data.statistics)}</p>
			</div>
		</div>
	);
};

const PlayerCard = ({ data }: PlayerCardProps<PlayersResponse>) => {
	return (
		<div className='bg-layer-1 p-4 rounded '>
			{/* Player Profile Section */}
			<div className='flex items-center gap-4 mb-4'>
				<Image
					src={data.player.photo}
					alt={data.player.name}
					width={80}
					height={80}
					className='rounded'
				/>
				<div>
					<h2 className='text-xl font-semibold'>{data.player.name}</h2>
					<p className='text-accent'>{data.player.nationality}</p>
				</div>
			</div>

			{data.statistics.map((teamStats, index) => (
				<div
					key={`${teamStats.team.id}-${index}`}
					className='mt-4'>
					{/* Team Header */}
					<div className='flex items-center gap-2 mb-3'>
						<Image
							src={teamStats.team.logo}
							alt={teamStats.team.name}
							width={24}
							height={24}
						/>
						<p className='text-accent'>{teamStats.team.name}</p>
					</div>

					{/* Team Stats */}
					<div className='grid grid-cols-2 gap-2'>
						<div className='bg-layer-2 p-3 rounded'>
							<p className='text-sm text-accent'>Goals</p>
							<p className='text-2xl font-bold'>{teamStats.goals.total}</p>
						</div>
						<div className='bg-layer-2 p-3 rounded'>
							<p className='text-sm text-accent'>Assists</p>
							<p className='text-2xl font-bold'>{teamStats.goals.assists}</p>
						</div>
						<div className='bg-layer-2 p-3 rounded'>
							<p className='text-sm text-accent'>Games</p>
							<p className='text-2xl font-bold'>{teamStats.games.appearences}</p>
						</div>
						<div className='bg-layer-2 p-3 rounded'>
							<p className='text-sm text-accent'>Rating</p>
							<p className='text-2xl font-bold'>{Number(teamStats.games.rating).toFixed(1)}</p>
						</div>
					</div>

					<div className='mt-4 text-sm text-accent'>
						<div className='flex justify-between py-2 border-b border-layer-5'>
							<span>Minutes played</span>
							<span className='font-semibold'>{teamStats.games.minutes}</span>
						</div>
						<div className='flex justify-between py-2 border-b border-layer-5'>
							<span>Shot accuracy</span>
							<span className='font-semibold'>{Math.round((teamStats.shots.on / teamStats.shots.total) * 100)}%</span>
						</div>
						<div className='flex justify-between py-2'>
							<span>Pass accuracy</span>
							<span className='font-semibold'>{teamStats.passes.accuracy ? `${teamStats.passes.accuracy}%` : "N/A"}</span>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export { PlayerCardDrawer, PlayerCardSmall, PlayerCard };
