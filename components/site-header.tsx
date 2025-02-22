import Link from "next/link";

export default function SiteHeader() {
	const season = process.env.NEXT_PUBLIC_SEASON || "2024";
	return (
		<header className='mb-10 grid grid-cols-1'>
			<Link
				href='/'
				className='flex gap-2 items-end p-3 mb-10'>
				<h1 className='font-display font-semibold tracking-tight text-5xl md:text-6xl'>
					MLS GOLDEN BOOT <span className='font-mono'>{season}</span>
				</h1>
			</Link>
		</header>
	);
}
