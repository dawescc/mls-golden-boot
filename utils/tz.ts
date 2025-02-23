export function tz(
	isoString: string,
	options?: {
		timeZone?: string;
		hour12?: boolean;
	}
): string {
	const defaultOptions = {
		timeZone: "America/New_York",
		hour12: false,
	};

	const finalOptions = { ...defaultOptions, ...options };

	try {
		const date = new Date(isoString);
		const formatter = new Intl.DateTimeFormat("en-US", {
			timeZone: finalOptions.timeZone,
			year: "numeric",
			month: "short",
			day: "numeric",
			hour: "numeric",
			minute: "2-digit",
			hour12: finalOptions.hour12,
		});

		return formatter.format(date);
	} catch (error) {
		console.error("Error formatting date:", error);
		return "Invalid date";
	}
}
