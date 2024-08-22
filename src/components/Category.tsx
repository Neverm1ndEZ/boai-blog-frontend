"use client";
import React from "react";

export default function Category({ cat }: { cat: any }) {
	return (
		<div
			onClick={() => {
				console.log("Clicked:", cat.attributes.name);
			}}
			className="w-28 h-auto p-3 text-xs md:text-xs lg:text-sm font-medium text-center rounded-2xl cursor-pointer bg-[#2e2d2c] "
		>
			{cat.attributes.name}
		</div>
	);
}
