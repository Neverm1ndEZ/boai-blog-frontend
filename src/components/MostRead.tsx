import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function MostRead() {
	const data = [
		{
			title:
				"Beyond Deepfakes: The Positive Potential of Al in Video Generation",
			author: "Sagar K.",
			time: "1 mins",
		},
		{
			title: "The Creative Al: How Machines are Becoming Filmmakers",
			author: "Sagar K.",
			time: "1 mins",
		},
		{
			title:
				"Al-Generated Visual Effects: Bringing Imagination to Life in Seconds",
			author: "Sagar K.",
			time: "1 mins",
		},
		{
			title:
				"Personalized Videos at Scale: The Al Technology Behind Tailored Content",
			author: "Sagar K.",
			time: "1 mins",
		},
		{
			title:
				"Creating Viral Content: How Al is Shaping the Next Generation of Video Marketing",
			author: "Sagar K.",
			time: "1 mins",
		},
	];

	return (
		<div className="border-t-2 border-gray-600 pb-20">
			<h1 className="font-medium text-2xl mt-6 mb-4">Most Read...</h1>
			<div className="grid md:grid-cols-2 lg:grid-cols-5 lg:flex-row items-center lg:items-start justify-center gap-4">
				{data.map((item, index) => (
					<Link href={"/blog/test"} key={index} className="">
						<div className="grid place-items-center lg:place-items-start gap-3">
							<Image
								src="/logoOne.png"
								alt="BOAI"
								width={180}
								height={180}
								className="border-2 border-[#EE7300] rounded-2xl"
							/>
							<h2 className="text-[#989898] text-sm">{item.title}</h2>
							<div className="flex divide-x text-sm text-[#5E5E5E] divide-[#5E5E5E]">
								<p className="pr-5">- {item.author}</p>
								<p className="pl-5">{item.time}</p>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
