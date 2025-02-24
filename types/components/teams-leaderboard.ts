import { PlayersResponse } from "@/types";

export interface TeamScore {
	owner: string;
	totalGoals: number;
	players: PlayersResponse[];
}

export interface LeaderboardProps {
	teamScores: TeamScore[];
	isLoading: boolean;
	error: Error | null;
}
