import { ApiResponse, PlayersResponse } from "@/types";
import fd from "@/utils/fd";

export async function fetchPlayerData(playerId: number, season: string, league: string) {
	const data = await fd<ApiResponse<PlayersResponse>>({
		url: `${process.env.NEXT_PUBLIC_API_URL}/players`,
		headers: {
			"x-rapidapi-key": process.env.X_RAPIDAPI_KEY || "",
			"x-rapidapi-host": process.env.X_RAPIDAPI_HOST || "",
		},
		params: {
			id: playerId.toString(),
			season: season,
			league: league,
		},
		tag: `${playerId}-${season}-${league}-stats`,
		cacheTime: 86400,
	});
	if (process.env.NODE_ENV === "development") {
		console.groupCollapsed(`\n\nFetched Player Data for ${playerId}`);
		console.dir(data, { depth: null, colors: true });
		console.groupEnd();
	}
	return data;
}
