export const siteConfig = {
	name: "Dawes Automotive",
	title: "Tri-Cities Auto Repair — Dawes Automotive",
	url: "https://autorepair.dawes.cc",
	ogImage: "/og.png",
	description: "Dawes Automotive is your go-to for any auto repair needs.",
	author: {
		name: "Dawes Automotive",
		website: "https://autorepair.dawes.cc",
	},
	links: [
		{
			name: "contact",
			text: "Contact Us",
			url: "tel:423-288-4436",
		},
		{
			name: "map",
			text: "Get Directions",
			url: "https://maps.apple.com/?address=3225%20E%20Stone%20Dr%20N,%20Kingsport,%20TN%20%2037660,%20United%20States&auid=1162332855656084095&q=Dawes%20Automotive%20NAPA%20Auto%20Care%20Center",
		},
		{
			name: "quote",
			text: "Get A Quote",
			url: "/quote",
		},
	],
	footerLinks: [
		{
			name: "contact",
			text: "Contact Us",
			url: "tel:423-288-4436",
		},
		{
			name: "map",
			text: "Get Directions",
			url: "https://maps.apple.com/?address=3225%20E%20Stone%20Dr%20N,%20Kingsport,%20TN%20%2037660,%20United%20States&auid=1162332855656084095&q=Dawes%20Automotive%20NAPA%20Auto%20Care%20Center",
		},
		{
			name: "quote",
			text: "Get A Quote",
			url: "/quote",
		},
	],
};

export type SiteConfig = typeof siteConfig;
