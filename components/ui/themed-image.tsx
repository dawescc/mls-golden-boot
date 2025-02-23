import Image from "next/image";
import { useTheme } from "next-themes";
import { ThemedImageProps } from "@/types";

const TRANSPARENT_GIF = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

function ThemedImage({ darkSrc, lightSrc, ...imageProps }: ThemedImageProps) {
	const { resolvedTheme } = useTheme();

	const src = resolvedTheme === "light" ? lightSrc : resolvedTheme === "dark" ? darkSrc : TRANSPARENT_GIF;

	return (
		// eslint-disable-next-line jsx-a11y/alt-text
		<Image
			src={src}
			{...imageProps}
		/>
	);
}

export default ThemedImage;
