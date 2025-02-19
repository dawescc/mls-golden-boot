import { siteConfig } from "@/config/siteConfig";
import Link from "next/link";
import AffLogo from "@/components/logos/affiliate-logo";

const SiteFooter = () => {
	return (
		<footer className='grid grid-cols-1 font-mono bg-layer-0 border-t-[6px] border-layer-5'>
			<div className='flex gap-2 pt-4 pb-6 px-3 max-h-40 max-w-sm mx-auto'>
				<AffLogo
					name='napa_acc'
					className='flex-grow flex-shrink min-w-0'
				/>
				<AffLogo
					name='ase'
					className='flex-grow flex-shrink min-w-0'
				/>
				<AffLogo
					name='jasper'
					className='flex-grow flex-shrink min-w-0'
				/>
			</div>
			<div className='min-h-40 py-10 px-5 relative text-accent font-light tracking-tight text-sm'>
				<div className='grid place-content-center gap-4'>
					<div className='flex flex-row justify-center flex-wrap gap-[1rem] mt-8 mb-10'>
						{siteConfig.footerLinks
							.filter((link) => link.name !== "home")
							.sort((a, b) => a.name.localeCompare(b.name))
							.map((link) => (
								<Link
									key={link.name}
									href={link.url}
									className='w-fit'>
									{link.text}
								</Link>
							))}
					</div>
					<div className='text-center'>© 2025 Dawes Automotive</div>
					<div className='text-xs text-center'>Proudly Veteran Owned and Operated</div>
				</div>
			</div>
		</footer>
	);
};

export default SiteFooter;
