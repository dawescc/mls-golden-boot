"use server";

import Teams from "@/lib/draftedTeams";
import { calculateTotalGoals, delay } from "@/lib/fn";
import { TeamScore } from "@/types";
import { cache } from "react";
import { fetchPlayerData } from "@/actions/getPlayerData";

export const getSortedAllTeamsGoalsTotals = cache(async () => {
	const season = process.env.NEXT_PUBLIC_SEASON || "2024";
	const league = process.env.NEXT_PUBLIC_LEAGUE || "253";
	const scores: Record<string, TeamScore> = {};

	try {
		await Promise.all(
			Object.entries(Teams).map(async ([owner, team], teamIndex) => {
				await delay(teamIndex * 1000);

				scores[owner] = { owner, totalGoals: 0, players: [] };

				for (const player of team.players) {
					const data = await fetchPlayerData(player.id, season, league);

					if (data?.response?.[0]) {
						scores[owner].players.push(data.response[0]);
						scores[owner].totalGoals += calculateTotalGoals(data.response[0].statistics);
					}

					await delay(0);
				}
			})
		);

		return Object.values(scores).sort((a, b) => b.totalGoals - a.totalGoals);
	} catch (error) {
		throw error;
	}
});
