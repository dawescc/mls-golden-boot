export const siteConfig = {
	name: "MLS-GB25",
	title: "MLS Golden Boot 2025  — Mind Goblin",
	url: process.env.NEXT_PUBLIC_SITE_URL,
	ogImage: "/og.png",
	description: "2025 MLS Golden Boot by Mind Goblin.",
	author: {
		name: "@dawes.cc",
		website: "https://dawes.cc",
	},
	links: [],
	footerLinks: [
		{
			name: "github",
			text: "github",
			url: "https://github.com/dawescc",
		},
	],
};

export type SiteConfig = typeof siteConfig;
