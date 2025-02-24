import { PlayerStatistics } from "@/types";

export function calculateTotalGoals(stats: PlayerStatistics[]): number {
	return stats.reduce((total, stat) => total + (stat.goals.total || 0), 0);
}

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
