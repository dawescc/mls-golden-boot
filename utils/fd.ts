const fd = async <T>({ cacheTime = 3600, tag = "", url, headers, params, page }: serverFetchProps): Promise<T> => {
	"use server";
	try {
		const urlObj = new URL(url);
		if (params) {
			Object.entries(params).forEach(([key, value]) => {
				urlObj.searchParams.append(key, String(value));
			});
		}
		if (page) {
			urlObj.searchParams.append("page", String(page));
		}
		const response = await fetch(urlObj.toString(), {
			headers,
			next: {
				revalidate: cacheTime,
				tags: tag ? [`${tag}`] : undefined,
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Fetch error:", error);
		throw error;
	}
};

export default fd;
