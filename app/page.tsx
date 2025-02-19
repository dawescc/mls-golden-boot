import { Collapsible } from "@/components/collapsible";

export default function Home() {
	const currentSpecials: Dictionary<SpecialDeal> = {
		oilChange: {
			title: "Oil Change",
			price: 80,
			desc: "Get ye erl changed n' tires rotated for only 80 dubloons!",
			end: new Date(2025, 2, 31),
		},
	} as const;

	return (
		<div className='min-h-dvh pb-10 text-lg bg-layer-1 divide-y-[6px] divide-layer-5'>
			<div className='grid grid-cols-1 bg-layer-2'>
				<HeroSection />
			</div>
			<div className='grid grid-cols-1 bg-layer-2'>
				<div className='px-2 pt-10'>
					{Object.entries(currentSpecials).map(([key, specialDeal]) => (
						<Collapsible
							key={key}
							title={`$${specialDeal.price} ${specialDeal.title}`}>
							<p className='text-pretty'>{specialDeal.desc}</p>
						</Collapsible>
					))}
				</div>
			</div>
		</div>
	);
}

const HeroSection = () => {
	return <div className='h-40 bg-secondary'></div>;
};
