import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Header() {
	return (
		<div className="h-24 flex w-full items-center border-b-2 border-gray-600">
			{/* Logo */}
			<div className="absolute top-5 left-3 md:left-20 w-20 h-auto">
				<Link href={"/"}>
					<Image
						src="/logoOne.png"
						alt="BOAI"
						width={150}
						height={150}
						className=""
					/>
				</Link>
			</div>
			{/* Title and Search Bar Container */}
			<div className="flex justify-center items-center w-full relative">
				<input
					type="text"
					placeholder="SEARCH"
					className="w-1/2 p-2 lg:px-4 lg:py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 bg-[#444444] placeholder:text-[#777777] placeholder:font-semibold"
				/>
			</div>
		</div>
	);
}
