import { siteConfig } from "@/config/siteConfig";
import Link from "next/link";
import { HiHeart } from "react-icons/hi";

const SiteFooter = () => {
	return (
		<footer className='grid grid-cols-1 bg-layer-1 mt-20'>
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
					<div className='text-center'>© 2025 dawes.cc</div>
					<div className='text-xs text-center font-display'>
						designed & developed with love <HiHeart className='inline mb-1 stroke-[2]' />
					</div>
				</div>
			</div>
		</footer>
	);
};

export default SiteFooter;
