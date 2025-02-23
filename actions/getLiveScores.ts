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
				league: "253",
			},
			tag: "live-scores",
			cacheTime: 30,
		});

		return data.response;
	} catch (error) {
		throw error;
	}
});
