import { PlayerStatistics } from "@/types";

export interface MatchInfoResponse {
	fixture: Fixture;
	league: League;
	teams: Teams;
	goals: Goals;
	score: Score;
	events: Event[];
	lineups: Lineup[];
	statistics: TeamStatistic[];
	players: TeamPlayerStats[];
}

export interface FixturesByRoundResponse {
	fixture: Fixture;
	league: League;
	teams: Teams;
	goals: Goals;
	score: Score;
}

export type LiveScoresResponse = Pick<MatchInfoResponse, "fixture" | "league" | "teams" | "goals" | "score" | "events">;

export interface Fixture {
	id: number;
	referee: string;
	timezone: string;
	date: string;
	timestamp: number;
	periods: Periods;
	venue: Venue;
	status: Status;
}

export interface Periods {
	first: number;
	second: number;
}

export interface Venue {
	id: number;
	name: string;
	city: string;
}

export interface Status {
	long: string;
	short: string;
	elapsed: number;
	extra: number | null;
}

export interface League {
	id: number;
	name: string;
	country: string;
	logo: string;
	flag: string;
	season: number;
	round: string;
	standings: boolean;
}

export interface Teams {
	home: TeamInfo;
	away: TeamInfo;
}

export interface TeamInfo {
	id: number;
	name: string;
	logo: string;
	winner?: boolean;
}

export interface Goals {
	home: number;
	away: number;
}

export interface Score {
	halftime: ScorePeriod;
	fulltime: ScorePeriod;
	extratime: ScorePeriod;
	penalty: ScorePeriod;
}

export interface ScorePeriod {
	home: number | null;
	away: number | null;
}

export interface Event {
	time: Time;
	team: TeamInfo;
	player: EventParticipant;
	assist: EventParticipant;
	type: string;
	detail: string;
	comments: string | null;
}

export interface Time {
	elapsed: number;
	extra?: number;
}

export interface EventParticipant {
	id?: number;
	name?: string;
}

export interface Lineup {
	team: LineupTeam;
	coach: Coach;
	formation: string;
	startXI: StartingPlayer[];
	substitutes: SubstitutePlayer[];
}

export interface LineupTeam {
	id: number;
	name: string;
	logo: string;
	colors: string[];
}

export interface Coach {
	id: number;
	name: string;
	photo: string;
}

export interface StartingPlayer {
	player: LineupPlayer;
}

export interface LineupPlayer {
	id: number;
	name: string;
	number: number;
	pos: string;
	grid: string | null;
}

export interface SubstitutePlayer {
	player: LineupPlayer;
}

export interface TeamStatistic {
	team: TeamInfo;
	statistics: StatisticItem[];
}

export interface StatisticItem {
	type: string;
	value: number | string | boolean | object;
}

export interface TeamPlayerStats {
	team: TeamWithUpdate;
	players: PlayerWithStats[];
}

export interface TeamWithUpdate {
	id: number;
	name: string;
	logo: string;
	update: string;
}

export interface PlayerWithStats {
	player: PlayerInfo;
	statistics: PlayerStatistics[];
}

export interface PlayerInfo {
	id: number;
	name: string;
	photo: string;
}

export interface Games {
	minutes: number;
	number: number;
	position: string;
	rating: string;
	captain: boolean;
	substitute: boolean;
}

export interface Shots {
	total: number;
	on: number;
}

export interface Passes {
	total: number;
	key: number;
	accuracy: string;
}

export interface Tackles {
	total?: number;
	blocks: number;
	interceptions: number;
}

export interface Duels {
	total: number;
	won: number;
}

export interface Dribbles {
	attempts: number;
	success: number;
	past?: number;
}

export interface Fouls {
	drawn: number;
	committed: number;
}

export interface Cards {
	yellow: number;
	red: number;
}

export interface PenaltyStats {
	won?: number;
	commited: number | null;
	scored: number;
	missed: number;
	saved?: number;
}
