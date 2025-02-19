import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			borderColor: {
				DEFAULT: "rgb(from var(--border) r g b / <alpha-value>)",
			},
			borderRadius: {
				DEFAULT: "var(--border-radius)",
			},
			colors: {
				background: "rgb(from var(--background) r g b / <alpha-value>)",
				foreground: "rgb(from var(--foreground) r g b / <alpha-value>)",
				primary: "rgb(from var(--primary) r g b / <alpha-value>)",
				secondary: "rgb(from var(--secondary) r g b / <alpha-value>)",
				accent: "rgb(from var(--accent) r g b / <alpha-value>)",
				border: "rgb(from var(--border) r g b / <alpha-value>)",
				layer: {
					0: "rgb(from var(--layer-0) r g b / <alpha-value>)",
					1: "rgb(from var(--layer-1) r g b / <alpha-value>)",
					2: "rgb(from var(--layer-2) r g b / <alpha-value>)",
					3: "rgb(from var(--layer-3) r g b / <alpha-value>)",
					4: "rgb(from var(--layer-4) r g b / <alpha-value>)",
					5: "rgb(from var(--layer-5) r g b / <alpha-value>)",
				},
			},
			fontFamily: {
				sans: ["var(--font-sans)"],
				serif: ["var(--font-serif)"],
				mono: ["var(--font-mono)"],
				display: ["var(--font-display)"],
			},
		},
	},
};
export default config;
