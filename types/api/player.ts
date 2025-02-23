export type PlayersResponse = {
	player: Player;
	statistics: PlayerStatistics[];
};

export interface Player {
	id: number;
	name: string;
	firstname: string;
	lastname: string;
	age: number;
	birth: PlayerBirth;
	nationality: string;
	height: string;
	weight: string;
	injured: boolean;
	photo: string;
}

export interface PlayerBirth {
	date: string;
	place: string;
	country: string;
}

export interface PlayerStatistics {
	team: PlayerTeam;
	league: PlayerLeague;
	games: PlayerGames;
	substitutes: PlayerSubstitutes;
	shots: PlayerShots;
	goals: PlayerGoals;
	passes: PlayerPasses;
	tackles: PlayerTackles;
	duels: PlayerDuels;
	dribbles: PlayerDribbles;
	fouls: PlayerFouls;
	cards: PlayerCards;
	penalty: PlayerPenalty;
}

export interface PlayerTeam {
	id: number;
	name: string;
	logo: string;
}

export interface PlayerLeague {
	id: number;
	name: string;
	country: string;
	logo: string;
	flag: string;
	season: number;
}

export interface PlayerGames {
	appearences: number;
	lineups: number;
	minutes: number;
	number: number;
	position: string;
	rating: string;
	captain: boolean;
}

export interface PlayerSubstitutes {
	in: number;
	out: number;
	bench: number;
}

export interface PlayerShots {
	total: number;
	on: number;
}

export interface PlayerGoals {
	total: number;
	conceded: number;
	assists: number;
	saves: number;
}

export interface PlayerPasses {
	total: number;
	key: number;
	accuracy: number | null;
}

export interface PlayerTackles {
	total: number;
	blocks: number;
	interceptions: number;
}

export interface PlayerDuels {
	total: number;
	won: number;
}

export interface PlayerDribbles {
	attempts: number;
	success: number;
	past: number | null;
}

export interface PlayerFouls {
	drawn: number;
	committed: number;
}

export interface PlayerCards {
	yellow: number;
	yellowred: number;
	red: number;
}

export interface PlayerPenalty {
	won: number | null;
	commited: number | null;
	scored: number;
	missed: number;
	saved: number | null;
}
