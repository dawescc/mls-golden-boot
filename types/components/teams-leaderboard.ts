import { PlayersResponse } from "@/types/api/player";

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
