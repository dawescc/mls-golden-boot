import { Goals, League, Periods, Score, Status, Teams, Venue } from "@/types";

export interface PastScoresResponse {
	fixture: PastFixture;
	league: League;
	teams: Teams;
	goals: Goals;
	score: Score;
}

export interface PastFixture {
	id: number;
	referee: string;
	timezone: string;
	date: string;
	timestamp: number;
	periods: Periods;
	venue: Venue;
	status: Status;
}
