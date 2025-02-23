import { Player, PlayerStatistics } from "@/types/api/player";

export type TopScorersResponse = {
	player: Player;
	statistics: PlayerStatistics[];
};
