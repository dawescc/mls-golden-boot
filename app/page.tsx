import { PlayerCardDrawer } from "@/components/player-card";
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
			<div className='px-2'>
				<h1 className='font-bold text-accent'>Top {data.results} Scorers</h1>

				{data.errors.length > 0 ? (
					<div className='text-red-500 mb-4'>
						{data.errors.map((error, index) => (
							<p key={index}>{error.message}</p>
						))}
					</div>
				) : (
					<div className='mt-4 grid grid-cols-1 gap-6'>
						{data.response.map((item) => (
							<PlayerCardDrawer
								key={item.player.id}
								data={item}
							/>
						))}
					</div>
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
