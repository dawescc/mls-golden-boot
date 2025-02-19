import { Noto_Sans, Noto_Serif, JetBrains_Mono, Rammetto_One } from "next/font/google";

const fontSans = Noto_Sans({ subsets: ["latin"], variable: "--font-sans" });
const fontSerif = Noto_Serif({ subsets: ["latin"], variable: "--font-serif" });
const fontMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });
const fontDisplay = Rammetto_One({ subsets: ["latin"], weight: "400", variable: "--font-display" });

const font = {
	sans: fontSans,
	serif: fontSerif,
	mono: fontMono,
	display: fontDisplay,
};

export default font;
