import { Player, PlayerStatistics } from "@/types";

export type TopScorersResponse = {
	player: Player;
	statistics: PlayerStatistics[];
};
