import Link from "next/link";
import { Hero } from "@/components/hero/hero";
import { cn } from "@/utils/cn";
import { GBLogo } from "@/components/app-logo";

export default function SiteHeader() {
	return (
		<header className='mb-16 h-48 md:h-56 lg:h-64 grid grid-cols-1 place-items-center relative overflow-clip max-w-5xl mx-auto'>
			<div className='py-6 z-[3] translate-y-2'>
				<Link
					href='/'
					className='w-fit'>
					<MlsLogo className='size-36' />
				</Link>
			</div>
			<div>
				<div className='z-[2] absolute top-0 left-0 w-full h-full'>
					<div className='w-full spotlight-wobble-slow [animation-duration:9.33s] z-[2]'></div>
					<div className='translate-y-6 text-layer-1 opacity-[0.98] z-[1]'>
						<GBLogo fill='currentColor' />
					</div>
				</div>

				<div className='z-[1] absolute top-0 left-0 w-full h-full'>
					<div className='w-full spotlight-wobble [animation-duration:4.65s] z-[2]'></div>
					<div className='translate-y-6 scale-y-[0.989] scale-x-[0.997] text-accent z-[1]'>
						<GBLogo fill='currentColor' />
					</div>
				</div>
			</div>
		</header>
	);
}

const MlsLogo = ({ className = "" }: { className?: string }) => {
	return (
		<div className={cn("aspect-square h-full my-auto size-28 overflow-clip", className)}>
			<Hero imageId={"mls"} />
		</div>
	);
};
