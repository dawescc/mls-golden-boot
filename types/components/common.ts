import { ImageProps } from "next/image";
import { ReactElement } from "react";
import { IconType } from "react-icons/lib";

export interface ButtonProps {
	className?: string;
	children?: ReactElement<IconType>;
	text?: string;
	link?: string;
	variant?: "default" | "clean";
}

export type ThemedImageProps = Omit<ImageProps, "src"> & {
	darkSrc: string;
	lightSrc: string;
};
