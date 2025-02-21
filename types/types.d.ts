interface serverFetchProps {
	cacheTime?: number;
	tag?: string;
	url: string;
	headers?: HeadersInit;
	params?: Record<string, string | number | boolean>;
	page?: number;
}

interface ClientFetchProps {
	url: string;
	headers?: HeadersInit;
	params?: ParamsProps;
	page?: number;
}

type ParamsProps = Record<string, string | number | boolean>;

interface ApiResponse<T> {
	get: string;
	parameters: Parameters;
	errors: Error[];
	results: number;
	paging: Paging;
	response: T[];
}

interface Parameters {
	[key: string]: string;
}

interface Error {
	[key: string]: string;
}

interface Paging {
	current: number;
	total: number;
}

type SeasonsResponse = number;

interface DraftedPlayer {
	id: number;
}

interface DraftedTeam {
	players: DraftedPlayer[];
}

interface AllDraftedTeams {
	[owner: string]: DraftedTeam;
}

type TopScorersResponse = {
	player: Player;
	statistics: PlayerStatistics[];
};

type PlayersResponse = {
	player: Player;
	statistics: PlayerStatistics[];
};

interface Player {
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

interface PlayerBirth {
	date: string;
	place: string;
	country: string;
}

interface PlayerStatistics {
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

interface PlayerTeam {
	id: number;
	name: string;
	logo: string;
}

interface PlayerLeague {
	id: number;
	name: string;
	country: string;
	logo: string;
	flag: string;
	season: number;
}

interface PlayerGames {
	appearences: number;
	lineups: number;
	minutes: number;
	number: number;
	position: string;
	rating: string;
	captain: boolean;
}

interface PlayerSubstitutes {
	in: number;
	out: number;
	bench: number;
}

interface PlayerShots {
	total: number;
	on: number;
}

interface PlayerGoals {
	total: number;
	conceded: number;
	assists: number;
	saves: number;
}

interface PlayerPasses {
	total: number;
	key: number;
	accuracy: number | null;
}

interface PlayerTackles {
	total: number;
	blocks: number;
	interceptions: number;
}

interface PlayerDuels {
	total: number;
	won: number;
}

interface PlayerDribbles {
	attempts: number;
	success: number;
	past: number | null;
}

interface PlayerFouls {
	drawn: number;
	committed: number;
}

interface PlayerCards {
	yellow: number;
	yellowred: number;
	red: number;
}

interface PlayerPenalty {
	won: number | null;
	commited: number | null;
	scored: number;
	missed: number;
	saved: number | null;
}

interface PlayerCardProps<T> {
	data: T;
}

interface TeamScore {
	owner: string;
	totalGoals: number;
	players: PlayersResponse[];
}

interface LeaderboardProps {
	teamScores: TeamScore[];
	isLoading: boolean;
	error: Error | null;
}

interface ButtonProps {
	className?: string;
	children?: ReactElement<IconType>;
	text?: string;
	link?: string;
	variant?: "default" | "clean";
}
