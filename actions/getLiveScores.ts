"use server";

import { ApiResponse, LiveScoresResponse } from "@/types";
import fd from "@/utils/fd";
import { cache } from "react";

export const getLiveScores = cache(async () => {
	try {
		const data = await fd<ApiResponse<LiveScoresResponse>>({
			url: `${process.env.NEXT_PUBLIC_API_URL}/fixtures`,
			headers: {
				"x-rapidapi-key": process.env.X_RAPIDAPI_KEY || "",
				"x-rapidapi-host": process.env.X_RAPIDAPI_HOST || "",
			},
			params: {
				live: "all",
				league: `${process.env.NEXT_PUBLIC_LEAGUE}`,
			},
			tag: "live-scores",
			cacheTime: 30,
		});
		if (process.env.NODE_ENV === "development") {
			console.groupCollapsed("\n\nFetched Live Scores Data");
			console.dir(data, { depth: null, colors: true });
			console.groupEnd();
		}
		return data.response;
	} catch (error) {
		throw error;
	}
});
