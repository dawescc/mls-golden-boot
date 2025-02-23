export interface LiveScoresResponse {
	fixture: Fixture;
	league: League;
	teams: Teams;
	goals: Goals;
	score: Score;
	events: Event[];
}

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
	second?: number;
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
	home: Home;
	away: Away;
}

export interface Home {
	id: number;
	name: string;
	logo: string;
	winner?: boolean;
}

export interface Away {
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
	halftime: Halftime;
	fulltime: Fulltime;
	extratime: Extratime;
	penalty: Penalty;
}

export interface Halftime {
	home: number | null;
	away: number | null;
}

export interface Fulltime {
	home: number | null;
	away: number | null;
}

export interface Extratime {
	home: number | null;
	away: number | null;
}

export interface Penalty {
	home: number | null;
	away: number | null;
}

export interface Event {
	time: Time;
	team: Team;
	player: EventPlayer;
	assist: Assist;
	type: string;
	detail: string;
	comments: string | null;
}

export interface Time {
	elapsed: number;
	extra?: number;
}

export interface Team {
	id: number;
	name: string;
	logo: string;
}

export interface EventPlayer {
	id?: number;
	name?: string;
}

export interface Assist {
	id?: number;
	name?: string;
}
