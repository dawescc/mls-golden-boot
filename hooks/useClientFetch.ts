import { ParamsProps, ClientFetchProps } from "@/types";
import useSWR from "swr";

const fetcher = async ([url, headers, params, page]: [string, HeadersInit | undefined, ParamsProps | undefined, number | undefined]) => {
	const urlObj = new URL(url);
	if (params) {
		Object.entries(params).forEach(([key, value]) => {
			urlObj.searchParams.append(key, String(value));
		});
	}
	if (page) {
		urlObj.searchParams.append("page", String(page));
	}

	const response = await fetch(urlObj.toString(), { headers });
	return response.json();
};

const useClientFetch = <T>({ url, headers, params, page }: ClientFetchProps) => {
	const { data, error, isLoading } = useSWR<T, Error, [string, HeadersInit | undefined, ParamsProps | undefined, number | undefined]>(
		[url, headers, params, page],
		fetcher
	);
	return { data, error, isLoading };
};

export default useClientFetch;
