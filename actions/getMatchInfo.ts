"use server";

import { ApiResponse, MatchInfoResponse } from "@/types";
import fd from "@/utils/fd";
import { cache } from "react";

export const getMatchInfo = cache(async (matchId: number) => {
	try {
		const data = await fd<ApiResponse<MatchInfoResponse>>({
			url: `${process.env.NEXT_PUBLIC_API_URL}/fixtures`,
			headers: {
				"x-rapidapi-key": process.env.X_RAPIDAPI_KEY || "",
				"x-rapidapi-host": process.env.X_RAPIDAPI_HOST || "",
			},
			params: {
				id: `${matchId}`,
			},
			tag: `${matchId}-info`,
			cacheTime: 3600,
		});
		if (process.env.NODE_ENV === "development") {
			console.groupCollapsed(`\n\nFetched Match ${matchId} Data`);
			console.dir(data, { depth: null, colors: true });
			console.groupEnd();
		}
		return data.response;
	} catch (error) {
		throw error;
	}
});
