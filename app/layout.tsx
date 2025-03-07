import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/config/siteConfig";
import font from "@/config/fonts";
import SiteFooter from "@/components/site-footer";
import { Analytics } from "@vercel/analytics/react";
import { Theme } from "@/components/ui/theme-provider";
import SiteHeader from "@/components/site-header";

export const metadata: Metadata = {
	title: {
		default: siteConfig.title,
		template: `%s - ${siteConfig.name}`,
	},
	metadataBase: new URL(siteConfig.url || "/"),
	description: siteConfig.description,
	authors: [
		{
			name: siteConfig.author.name,
			url: siteConfig.author.website,
		},
	],
	creator: siteConfig.author.name,
	openGraph: {
		type: "website",
		locale: "en_US",
		url: siteConfig.url,
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.name,
		images: [
			{
				url: siteConfig.ogImage,
				width: 1200,
				height: 630,
				alt: siteConfig.name,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: siteConfig.name,
		description: siteConfig.description,
		images: [siteConfig.ogImage],
		creator: siteConfig.author.name,
	},
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='en'
			suppressHydrationWarning
			className={`${font.sans.variable} ${font.serif.variable} ${font.mono.variable} ${font.display.variable}`}>
			<body className={`font-sans antialiased bg-layer-5`}>
				<Theme>
					<div
						className='bg-layer-0'
						data-vaul-drawer-wrapper=''>
						<SiteHeader />
						<main className='max-w-6xl mx-auto'>{children}</main>
						<SiteFooter />
						<Analytics />
					</div>
				</Theme>
			</body>
		</html>
	);
}
