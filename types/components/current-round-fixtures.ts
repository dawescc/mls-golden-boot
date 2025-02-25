import { FixturesByRoundResponse } from "@/types";

export interface FixtureCardProps {
	data: FixturesByRoundResponse;
	className?: string;
}

export interface FixturesDetailsProps {
	data: FixturesByRoundResponse;
	isNested?: boolean;
}
