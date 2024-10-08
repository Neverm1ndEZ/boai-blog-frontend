import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Blog - BOAI",
	description: "Generated by create next app",
	icons: {
		icon: "/boai.svg", // path to your favicon in the public folder
	},
};

export default function PrivacyLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<section>
			<div className={`${inter.className}`}>{children}</div>
		</section>
	);
}
