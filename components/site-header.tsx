import Link from "next/link";
import { Hero } from "@/components/hero/hero";

export default function SiteHeader() {
	const season = process.env.NEXT_PUBLIC_SEASON || "2024";
	return (
		<header className='mb-14 grid grid-cols-1 md:grid-cols-2 bg-layer-1'>
			<Link
				href='/'
				className='flex gap-2 items-end p-3'>
				<h1 className='font-display font-semibold tracking-tight text-5xl md:text-6xl'>
					MLS GOLDEN
					<br className='' /> BOOT <span className='font-mono'>{season}</span>
				</h1>
			</Link>
			<div className='max-h-[10rem]'>
				<Hero imageId={"mls"} />
			</div>
		</header>
	);
}
