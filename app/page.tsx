import Image from "next/image";
import { PlayerCardDrawer } from "@/components/player-card";
import { LeaderboardDetailsDrawer } from "@/components/teams-leaderboard";
import fd from "@/utils/fd";

export default async function Page() {
	const season = process.env.NEXT_PUBLIC_SEASON || "2024";
	try {
		const data = await fd<ApiResponse<TopScorersResponse>>({
			url: `${process.env.NEXT_PUBLIC_API_URL}/players/topscorers`,
			headers: {
				"x-rapidapi-key": process.env.X_RAPIDAPI_KEY || "",
				"x-rapidapi-host": process.env.X_RAPIDAPI_HOST || "",
			},
			params: {
				league: "253",
				season: season,
			},
			tag: "top-scorers",
			cacheTime: 3600,
		});

		return (
			<div className='px-2 h-full min-h-full'>
				<div className='mb-10 w-full'>
					<LeaderboardDetailsDrawer />
				</div>

				<h1 className='font-bold text-accent'>Top Scorers ({data.results || 0})</h1>

				{data.errors.length > 0 ? (
					<ErrorState errors={data.errors} />
				) : data.response.length > 0 ? (
					<TopScorersList response={data.response} />
				) : (
					<NoTopScorersState />
				)}
			</div>
		);
	} catch (error) {
		return (
			<div className='p-4'>
				<h1 className='text-2xl font-bold mb-4'>Top Scorers</h1>
				<div className='text-red-500'>Error loading top scorers: {error instanceof Error ? error.message : "Unknown error"}</div>
			</div>
		);
	}
}

const ErrorState = ({ errors }: { errors: Error[] }) => {
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

const NoTopScorersState = () => {
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
							className='size-64 mx-auto'
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
