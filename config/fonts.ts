import { Merriweather_Sans, EB_Garamond, JetBrains_Mono, Caprasimo } from "next/font/google";

const fontSans = Merriweather_Sans({ subsets: ["latin"], variable: "--font-sans" });
const fontSerif = EB_Garamond({ subsets: ["latin"], variable: "--font-serif" });
const fontMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const fontDisplay = Caprasimo({ subsets: ["latin"], weight: "400", variable: "--font-display" });

const font = {
	sans: fontSans,
	serif: fontSerif,
	mono: fontMono,
	display: fontDisplay,
};

export default font;
