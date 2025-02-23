import { TopScorersResponse, Error } from "@/types";
import Image from "next/image";
import { PlayerCardDrawer } from "@/components/player-card";

const TopScorersListError = ({ errors }: { errors: Error[] }) => {
	return (
		<div className='min-h-64 mt-4'>
			<div className='grid grid-cols-1 gap-5 w-full'>
				<div className='rounded bg-layer-0 border border-layer-5/60 pt-4 pb-6'>
					<div className='text-center text-sm text-primary'>
						<Image
							src={"/img/error.svg"}
							alt={"GK"}
							width={340}
							height={280}
							className='size-64 mx-auto'
						/>
						<span className='mt-3'>
							{errors.map((error, index) => (
								<p key={index}>{error.message}</p>
							))}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

const TopScorersListEmpty = () => {
	return (
		<div className='min-h-64 mt-4'>
			<div className='grid grid-cols-1 gap-5 w-full'>
				<div className='rounded bg-layer-0 border border-layer-5/60 pt-4 pb-6'>
					<div className='text-center text-sm text-accent'>
						<Image
							src={"/img/gk.svg"}
							alt={"GK"}
							width={340}
							height={280}
							className='size-56 mx-auto my-12 grayscale relative'
						/>
						<span className='mt-3'>
							<p>No player goals have been recorded yet.</p>
							<p>Data may lag behind real-time statistics.</p>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

const TopScorersList = ({ response }: { response: TopScorersResponse[] }) => {
	return (
		<div className='mt-4 grid grid-cols-1 gap-3'>
			{response.map((player) => (
				<PlayerCardDrawer
					key={player.player.id}
					data={player}
				/>
			))}
		</div>
	);
};

export { TopScorersList, TopScorersListEmpty, TopScorersListError };
