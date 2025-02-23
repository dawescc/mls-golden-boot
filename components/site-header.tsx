import Link from "next/link";
import { Hero } from "@/components/hero/hero";
import { cn } from "@/utils/cn";
import { GBLogo } from "@/components/app-logo";

export default function SiteHeader() {
	return (
		<header className='mb-20 grid grid-cols-1 place-items-center relative overflow-clip max-w-5xl mx-auto'>
			<div className='py-6 z-[3]'>
				<Link
					href='/'
					className='w-fit'>
					<MlsLogo />
				</Link>
			</div>
			<div>
				<div className='absolute top-0 left-0 w-full h-full bg-[radial-gradient(90%_86%_at_top,transparent_0%,var(--layer-0)_90%)] z-[2]'></div>
				<div className='absolute top-0 left-0 w-full h-full bg-[radial-gradient(90%_86%_at_top,transparent_0%,var(--layer-0)_68.4%)] z-[2] opacity-[0.226]'></div>
				<div className='absolute top-0 left-0 w-full h-full bg-[radial-gradient(90%_86%_at_top,transparent_0%,var(--layer-0)_38.4%)] z-[1] opacity-[0.826]'></div>
				<div className='absolute left-0 top-0 w-full translate-y-5 scale-y-[1.01] text-accent z-[0]'>
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
