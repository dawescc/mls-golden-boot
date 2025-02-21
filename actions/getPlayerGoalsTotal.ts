"use server";

import Teams from "@/lib/draftedTeams";
import { calculateTotalGoals } from "@/lib/fn";
import fd from "@/utils/fd";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchPlayerData(playerId: number, season: string) {
	await delay(1000);
	return await fd<ApiResponse<PlayersResponse>>({
		url: `${process.env.NEXT_PUBLIC_API_URL}/players`,
		headers: {
			"x-rapidapi-key": process.env.X_RAPIDAPI_KEY || "",
			"x-rapidapi-host": process.env.X_RAPIDAPI_HOST || "",
		},
		params: {
			id: playerId.toString(),
			season: season,
			league: "253",
		},
		tag: "player-stats",
		cacheTime: 10800,
	});
}

export async function getPlayerGoalsTotal() {
	const season = process.env.NEXT_PUBLIC_SEASON || "2024";
	const scores: Record<string, TeamScore> = {};

	try {
		await Promise.all(
			Object.entries(Teams).map(async ([owner, team]) => {
				scores[owner] = { owner, totalGoals: 0, players: [] };

				const chunkSize = 3;
				for (let i = 0; i < team.players.length; i += chunkSize) {
					const chunk = team.players.slice(i, i + chunkSize);

					const chunkResults = await Promise.all(chunk.map((player) => fetchPlayerData(player.id, season)));

					chunkResults.forEach((data) => {
						if (data?.response?.[0]) {
							scores[owner].players.push(data.response[0]);
							scores[owner].totalGoals += calculateTotalGoals(data.response[0].statistics);
						}
					});

					if (i + chunkSize < team.players.length) {
						await delay(1000);
					}
				}
			})
		);

		return Object.values(scores).sort((a, b) => b.totalGoals - a.totalGoals);
	} catch (error) {
		throw error;
	}
}
