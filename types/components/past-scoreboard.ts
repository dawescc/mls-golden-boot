import { PastScoresResponse } from "@/types";

export interface PastScoreCardProps {
	data: PastScoresResponse;
	className?: string;
}

export interface PastScoreDetailsProps {
	data: PastScoresResponse;
	isNested?: boolean;
}
