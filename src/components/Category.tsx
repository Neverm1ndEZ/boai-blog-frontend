"use client";
import React from "react";

export default function Category({ cat }: { cat: any }) {
	return (
		<div
			onClick={() => {
				console.log("Clicked:", cat.attributes.name);
			}}
			className="text-base font-medium text-center rounded-2xl bg-[#e1822a] hover:text-black cursor-pointer p-2"
		>
			{cat.attributes.name}
		</div>
	);
}
