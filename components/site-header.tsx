import Link from "next/link";
import { Hero } from "@/components/hero/hero";

export default function SiteHeader() {
	const season = process.env.NEXT_PUBLIC_SEASON || "2024";
	return (
		<header className='mb-20 grid grid-cols-1'>
			<Link
				href='/'
				className='flex gap-2 items-end p-3'>
				<div className='aspect-square h-full my-auto size-16 md:size-20 overflow-clip'>
					<Hero imageId={"mls"} />
				</div>
				<h1 className='font-display font-semibold tracking-tight text-3xl md:text-4xl'>
					GOLDEN
					<br className='' /> BOOT <span className='font-mono'>{season}</span>
				</h1>
			</Link>
		</header>
	);
}
