import { LiveScoresResponse } from "@/types";

export interface LiveScoreCardProps {
	data: LiveScoresResponse;
	className?: string;
}

export interface LiveScoreDetailsProps {
	data: LiveScoresResponse;
	isNested?: boolean;
}
