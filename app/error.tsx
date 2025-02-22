"use client";

import Link from "next/link";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";

export default function NotFound() {
	return (
		<div className='grid grid-cols-1 gap-10'>
			<div className='mt-20 max-w-lg mx-auto grid grid-cols-1 gap-8 sm:gap-10 text-pretty'>
				<p className='text-3xl sm:text-4xl'>idk what happened</p>
				<p className='text-2xl sm:text-3xl'>things have broken</p>
				<Link
					className='text-2xl sm:text-3xl'
					href='/'>
					<HiOutlineArrowCircleLeft className='inline mb-0.5 mr-1' /> Go back home
				</Link>
			</div>
		</div>
	);
}
