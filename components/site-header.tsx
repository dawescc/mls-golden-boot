import Link from "next/link";

export default function SiteHeader() {
	const season = process.env.NEXT_PUBLIC_SEASON || "2024";
	return (
		<header className='mb-10 grid grid-cols-1'>
			<Link
				href='/'
				className='flex gap-2 items-end px-2 pt-3 pb-2'>
				<h1 className='font-display font-semibold tracking-tight text-4xl md:text-3xl'>
					MLS GOLDEN BOOT <span className='font-mono'>{season}</span>
				</h1>
			</Link>
		</header>
	);
}
