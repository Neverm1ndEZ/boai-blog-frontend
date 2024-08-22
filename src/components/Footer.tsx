import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Footer() {
	const date = new Date().getFullYear();
	return (
		<footer className="flex flex-col lg:flex-row justify-between items-center w-full px-12 py-5 border-t-2 border-gray-600">
			<div className="my-2">
				<Image
					src="/logoOne.png"
					alt="logo"
					width={150}
					height={150}
					// className="w-[100px] lg:w-[150px] h-auto"
				/>
			</div>
			<div className="flex flex-col lg:flex-row justify-between items-center gap-3 lg:w-3/5">
				<div className="flex flex-col lg:flex-row items-center gap-5 justify-center lg:w-1/2">
					<Link href={"/privacy-policy"}>
						<p>Privacy Policy</p>
					</Link>
					<Link href={"/terms-of-service"}>
						<p>Terms of Service</p>
					</Link>
				</div>
				<div className="text-center">
					&copy; {date} BlinkofAI. All rights reserved
				</div>
			</div>
		</footer>
	);
}
