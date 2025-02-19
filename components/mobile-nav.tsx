"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import Button from "./ui/button";
import { siteConfig } from "@/config/siteConfig";
import { cn } from "@/lib/utils";
import useScrollLock from "@/hooks/scrollLock";
import { HiPlus } from "react-icons/hi2";

const openSpring = {
	type: "spring",
	stiffness: 480,
	damping: 33,
	mass: 0.88,
};

const openWidthSpring = {
	type: "spring",
	stiffness: 480,
	damping: 33,
	mass: 0.88,
};

const closeSpring = {
	type: "spring",
	stiffness: 480,
	damping: 32,
	mass: 0.88,
};

const plusVariants = {
	closed: {
		rotate: 0,
	},
	rotating: {
		rotate: -135,
		transition: openSpring,
	},
	opened: {
		rotate: 135,
	},
};

export const MobileNav = ({ right }: MobileNavProps) => {
	const [isOpen, setIsOpen] = useState(false);
	useScrollLock(isOpen);

	const menuItemsN = siteConfig.links.length;
	const menuHeight = `min(calc( (6rem * ${menuItemsN}) + 1.75rem + 11.5px), calc(100dvh - 5.25rem))`;
	const menuWidth = `calc(100dvw - 2.25rem)`;

	return (
		<div className={cn("fixed top-0 z-10 p-3", right ? "right-0" : "left-0")}>
			<motion.div className={cn("w-fit rounded bg-layer-3 border-4 border-layer-5", right && "ml-auto")}>
				<div
					className={cn("w-fit px-4 py-4 flex items-center cursor-pointer", right ? "ml-auto" : "mr-auto")}
					onClick={() => setIsOpen(!isOpen)}>
					<motion.div
						variants={plusVariants}
						animate={[isOpen ? "rotating" : "closed", isOpen ? "opened" : "closed"]}
						className='text-2xl origin-center grid grid-cols-1 place-items-center select-none'>
						<HiPlus className='inline stroke-[3px]' />
					</motion.div>
				</div>

				<motion.div
					initial={false}
					animate={{
						height: isOpen ? menuHeight : 0,
						width: isOpen ? menuWidth : 0,
					}}
					transition={{
						height: isOpen ? openSpring : closeSpring,
						width: isOpen ? openWidthSpring : closeSpring,
					}}
					className='overflow-hidden overflow-y-auto overscroll-none bg-layer-0'>
					<div className='flex flex-col min-h-full divide-y-4 divide-layer-5 border-t-4 border-layer-5'>
						{siteConfig.links.map(({ name, url, text }) => (
							<MobileNavButton
								name={name}
								url={url}
								text={text}
								key={name}
							/>
						))}
					</div>
				</motion.div>
			</motion.div>
		</div>
	);
};

const MobileNavButton = ({ name, url, text }: HeaderButtonProps) => {
	return (
		<Button
			key={name}
			link={url}
			text={text}
			variant='clean'
			className='justify-center select-none flex-grow rounded font-black text-2xl uppercase inline-flex items-center active:bg-layer-2'
		/>
	);
};
