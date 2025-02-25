"use server";

import { ApiResponse, FixturesByRoundResponse, RoundResponse } from "@/types";
import fd from "@/utils/fd";
import { delay } from "@/lib/fn";
import { cache } from "react";

export const getCurrentRound = cache(async () => {
	try {
		const data = await fd<ApiResponse<RoundResponse>>({
			url: `${process.env.NEXT_PUBLIC_API_URL}/fixtures/rounds`,
			headers: {
				"x-rapidapi-key": process.env.X_RAPIDAPI_KEY || "",
				"x-rapidapi-host": process.env.X_RAPIDAPI_HOST || "",
			},
			params: {
				league: `${process.env.NEXT_PUBLIC_LEAGUE}`,
				season: `${process.env.NEXT_PUBLIC_SEASON}`,
				current: `true`,
			},
			tag: "current-round",
			cacheTime: 86400,
		});
		if (process.env.NODE_ENV === "development") {
			console.groupCollapsed("\n\nFetched Current Round");
			console.dir(data, { depth: null, colors: true });
			console.groupEnd();
		}
		return data.response;
	} catch (error) {
		throw error;
	}
});

export const getFixturesForCurrentRound = cache(async () => {
	await delay(5000);
	const round = await getCurrentRound();
	try {
		const data = await fd<ApiResponse<FixturesByRoundResponse>>({
			url: `${process.env.NEXT_PUBLIC_API_URL}/fixtures`,
			headers: {
				"x-rapidapi-key": process.env.X_RAPIDAPI_KEY || "",
				"x-rapidapi-host": process.env.X_RAPIDAPI_HOST || "",
			},
			params: {
				round: `${round[0]}`,
				league: `${process.env.NEXT_PUBLIC_LEAGUE}`,
				season: `${process.env.NEXT_PUBLIC_SEASON}`,
			},
			tag: "round-scores",
			cacheTime: 3600,
		});
		if (process.env.NODE_ENV === "development") {
			console.groupCollapsed("\n\nFetched Past Score Data");
			console.dir(data, { depth: null, colors: true });
			console.groupEnd();
		}
		return data.response;
	} catch (error) {
		throw error;
	}
});
