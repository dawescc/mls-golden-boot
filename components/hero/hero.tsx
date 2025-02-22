"use client";

import { useEffect, useState } from "react";
import { defaultParams, type ShaderParams } from "@/components/hero/params";
import { Canvas } from "@/components/hero/canvas";

interface HeroProps {
	imageId: string;
}

type State = ShaderParams;

export function Hero({ imageId }: HeroProps) {
	const [state] = useState<State>(defaultParams);
	const [imageData, setImageData] = useState<ImageData | null>(null);
	const [processing, setProcessing] = useState<boolean>(true);

	useEffect(() => {
		setProcessing(true);

		async function updateImageData() {
			try {
				const res = await fetch(`img/${imageId}.png`);
				const blob = await res.blob();
				const bitmap = await createImageBitmap(blob);

				const canvas = document.createElement("canvas");
				canvas.width = bitmap.width;
				canvas.height = bitmap.height;
				const ctx = canvas.getContext("2d")!;
				ctx.drawImage(bitmap, 0, 0);
				const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
				setImageData(imageData);
			} catch (error) {
				console.error(error);
			}

			setProcessing(false);
		}

		updateImageData();
	}, [imageId]);

	return (
		<div className='relative w-full h-full'>
			{imageData && (
				<Canvas
					imageData={imageData}
					params={state}
					processing={processing}
				/>
			)}
		</div>
	);
}
