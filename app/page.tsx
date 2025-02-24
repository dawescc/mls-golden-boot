import { LeaderboardDetailsDrawer } from "@/components/teams-leaderboard";
import fd from "@/utils/fd";
import { TopScorersResponse, ApiResponse } from "@/types";
import { ScoreBoard } from "@/components/live-scoreboard";
import { ScoreBoard as PastScoreBoard } from "@/components/past-scoreboard";
import { TopScorersListError, TopScorersList, TopScorersListEmpty } from "@/components/top-scorers";

export default async function Page() {
	const season = process.env.NEXT_PUBLIC_SEASON || "2024";
	const league = process.env.NEXT_PUBLIC_LEAGUE || "253";
	try {
		const data = await fd<ApiResponse<TopScorersResponse>>({
			url: `${process.env.NEXT_PUBLIC_API_URL}/players/topscorers`,
			headers: {
				"x-rapidapi-key": process.env.X_RAPIDAPI_KEY || "",
				"x-rapidapi-host": process.env.X_RAPIDAPI_HOST || "",
			},
			params: {
				league: league,
				season: season,
			},
			tag: "top-scorers",
			cacheTime: 1800,
		});

		return (
			<div className='px-4 lg:px-0 h-full min-h-full'>
				<h1 className='text-xl font-medium text-accent'>Leaderboard</h1>
				<div className='mb-10 w-full mt-4'>
					<LeaderboardDetailsDrawer />
				</div>

				<h1 className='text-xl font-medium text-accent'>Live Matches</h1>
				<div className='mb-10 w-full mt-4'>
					<ScoreBoard />
				</div>

				<h1 className='text-xl font-medium text-accent'>Results</h1>
				<div className='mb-10 w-full mt-4'>
					<PastScoreBoard />
				</div>

				<h1 className='text-xl font-medium text-accent'>Top Scorers ({data.results || 0})</h1>

				{data.errors.length > 0 ? (
					<TopScorersListError errors={data.errors} />
				) : data.response.length > 0 ? (
					<TopScorersList response={data.response} />
				) : (
					<TopScorersListEmpty />
				)}
			</div>
		);
	} catch (error) {
		throw error;
	}
}
