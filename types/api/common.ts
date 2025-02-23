export interface ApiResponse<T> {
	get: string;
	parameters: Parameters;
	errors: Error[];
	results: number;
	paging: Paging;
	response: T[];
}

export interface Parameters {
	[key: string]: string;
}

export interface Error {
	[key: string]: string;
}

export interface Paging {
	current: number;
	total: number;
}
