interface ButtonProps {
	className?: string;
	children?: ReactElement<IconType>;
	text?: string;
	link?: string;
	variant?: "default" | "clean";
}

type FormState = {
	error?: string;
	success?: boolean;
} | null;

interface NewQuoteEmailTemplate {
	name: string;
	phone: string;
	desc: string;
}

interface Dictionary<T> {
	[key: string]: T;
}

interface SpecialDeal {
	code?: string;
	title: string;
	price: number;
	desc: string;
	end: Date;
}

interface LogoProps {
	className?: string;
	strokeColorClass?: string;
	textColorClass?: string;
}

interface HeaderButtonProps {
	name: string;
	url: string;
	text: string;
}

interface MobileNavProps {
	right?: boolean;
}

interface CollapsibleProps {
	title: string;
	children: ReactNode;
}
