"use server";

import Teams from "@/lib/draftedTeams";
import { calculateTotalGoals } from "@/lib/fn";
import fd from "@/utils/fd";

export async function getPlayerGoalsTotal() {
	const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
	const season = process.env.NEXT_PUBLIC_SEASON || "2024";
	const scores: Record<string, TeamScore> = {};

	try {
		for (const [owner, team] of Object.entries(Teams)) {
			scores[owner] = { owner, totalGoals: 0, players: [] };

			for (const player of team.players) {
				await delay(1000);

				const data = await fd<ApiResponse<PlayersResponse>>({
					url: `${process.env.NEXT_PUBLIC_API_URL}/players`,
					headers: {
						"x-rapidapi-key": process.env.X_RAPIDAPI_KEY || "",
						"x-rapidapi-host": process.env.X_RAPIDAPI_HOST || "",
					},
					params: {
						id: player.id.toString(),
						season: season,
						league: "253",
					},
					tag: "player-stats",
					cacheTime: 10800,
				});

				if (data?.response?.[0]) {
					scores[owner].players.push(data.response[0]);
					scores[owner].totalGoals += calculateTotalGoals(data.response[0].statistics);
				}
			}
		}

		return Object.values(scores).sort((a, b) => b.totalGoals - a.totalGoals);
	} catch (error) {
		throw error;
	}
}
