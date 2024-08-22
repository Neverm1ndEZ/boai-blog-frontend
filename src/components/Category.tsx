"use client";
import React from "react";

export default function Category({ cat }: { cat: any }) {
	return (
		<div
			onClick={() => {
				console.log("Clicked:", cat.attributes.name);
			}}
			className="text-sm xl:text-base font-medium text-center rounded-2xl cursor-pointer p-2.5 border-2"
		>
			{cat.attributes.name}
		</div>
	);
}
