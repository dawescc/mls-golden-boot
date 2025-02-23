export interface serverFetchProps {
	cacheTime?: number;
	tag?: string;
	url: string;
	headers?: HeadersInit;
	params?: Record<string, string | number | boolean>;
	page?: number;
}

export interface ClientFetchProps {
	url: string;
	headers?: HeadersInit;
	params?: ParamsProps;
	page?: number;
}

export type ParamsProps = Record<string, string | number | boolean>;
