import { siteConfig } from "@/config/siteConfig";
import { MobileNav } from "./mobile-nav";
import Button from "@/components/ui/button";
import DawesAutoLogo from "./logos/dawes-auto-logo";

export default function SiteHeader() {
	return (
		<div className='relative'>
			<header className='bg-layer-2 border-b-[6px] border-layer-5 p-2 grid grid-cols-1 place-items-center gap-5 text-center'>
				<DawesAutoLogo
					className='drop-shadow-md max-w-4xl -translate-x-8 translate-y-4'
					textColorClass='fill-background'
					strokeColorClass='fill-foreground'
				/>
				<div className='hidden md:flex gap-5 translate-y-8 z-10'>
					{siteConfig.links.map(({ name, url, text }) => (
						<HeaderButton
							url={url}
							name={name}
							text={text}
							key={name}
						/>
					))}
				</div>
				<span className='md:hidden'>
					<MobileNav right />
				</span>
			</header>
		</div>
	);
}

const HeaderButton = ({ name, url, text }: HeaderButtonProps) => {
	return (
		<Button
			key={name}
			link={url}
			text={text}
			className='border-[0.5rem] border-border select-none rounded font-black text-2xl uppercase bg-layer-1'
		/>
	);
};
