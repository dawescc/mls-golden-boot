import { LiveScoresResponse } from "@/types/api/live-scores";

export interface LiveScoreCardProps {
	data: LiveScoresResponse;
	className?: string;
}

export interface LiveScoreDetailsProps {
	data: LiveScoresResponse;
	isNested?: boolean;
}
