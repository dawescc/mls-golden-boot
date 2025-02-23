export interface AllDraftedTeams {
	[owner: string]: DraftedTeam;
}

export interface DraftedTeam {
	players: DraftedPlayer[];
}

export interface DraftedPlayer {
	id: number;
}
