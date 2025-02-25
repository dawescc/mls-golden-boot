import { JSX } from "react";
import styles from "./spinner.module.css";
import { cn } from "@/utils/cn";

type SpinnerProps = React.SVGProps<SVGSVGElement> & {
	className?: string;
};

export const Spinner = ({ className = "", ...props }: SpinnerProps): JSX.Element => {
	const spokes = Array.from({ length: 12 });
	const duration = 0.9;
	const spokeDelay = duration / 12;
	const stroke = 1.22;
	return (
		<svg
			width={20}
			height={20}
			viewBox='10 10 20 20'
			xmlns='http://www.w3.org/2000/svg'
			className={cn("inline size-[1em]", className)}
			{...props}>
			{spokes.map((_, index) => (
				<rect
					key={index}
					x='19.33'
					y='9.22'
					width={stroke}
					height='6.37'
					rx={stroke / 2}
					fill='currentColor'
					transform={`rotate(${index * 30} 20 20)`}
					style={{
						animation: `${styles["spinner-spoke"]} ${duration}s linear infinite ${-index * spokeDelay}s`,
					}}
				/>
			))}
		</svg>
	);
};
