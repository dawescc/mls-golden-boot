import Link from "next/link";
import { Hero } from "@/components/hero/hero";
import { cn } from "@/utils/cn";
import { GBLogo } from "@/components/app-logo";

export default function SiteHeader() {
	return (
		<header className='mb-16 grid grid-cols-1 place-items-center relative overflow-clip max-w-5xl mx-auto'>
			<div className='py-6 z-[3] translate-y-2'>
				<Link
					href='/'
					className='w-fit'>
					<MlsLogo className='size-32' />
				</Link>
			</div>
			<div>
				<div className='absolute top-0 left-0 w-full h-full z-[2] [animation:spotlight-wobble-1_6s_ease-in-out_infinite]'></div>
				<div className='absolute top-0 left-0 w-full h-full backdrop-blur-[1px] z-[2] [animation:gradient-pulse_4s_ease-in-out_infinite,spotlight-wobble-2_6.5s_ease-in-out_infinite]'></div>
				<div className='absolute top-0 left-0 w-full h-full z-[1] opacity-[0.826] [animation:spotlight-wobble-3_7s_ease-in-out_infinite]'></div>

				<div className='absolute left-0 top-0 w-full translate-y-5 scale-y-[1.01] scale-x-[0.99] text-accent z-[0]'>
					<GBLogo fill='currentColor' />
				</div>
				<div className='absolute left-0 top-0 w-full translate-y-5 text-layer-2 z-[1]'>
					<GBLogo fill='currentColor' />
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
