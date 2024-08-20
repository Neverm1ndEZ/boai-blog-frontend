// import Link from "next/link";
// import React from "react";

// export default function RecentBlogs() {
// 	const date = new Date();

// 	const data = [
// 		{
// 			title:
// 				"Beyond Deepfakes: The Positive Potential of Al in Video Generation",
// 			author: "Sagar K.",
// 			time: "1 mins",
// 			date: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(),
// 		},
// 		{
// 			title: "The Creative Al: How Machines are Becoming Filmmakers",
// 			author: "Sagar K.",
// 			time: "1 mins",
// 			date: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(),
// 		},
// 		{
// 			title:
// 				"Al-Generated Visual Effects: Bringing Imagination to Life in Seconds",
// 			author: "Sagar K.",
// 			time: "1 mins",
// 			date: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(),
// 		},
// 		{
// 			title:
// 				"Personalized Videos at Scale: The Al Technology Behind Tailored Content",
// 			author: "Sagar K.",
// 			time: "1 mins",
// 			date: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(),
// 		},
// 		{
// 			title:
// 				"Creating Viral Content: How Al is Shaping the Next Generation of Video Marketing",
// 			author: "Sagar K.",
// 			time: "1 mins",
// 			date: date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear(),
// 		},
// 	];

// 	return (
// 		<div className="h-full border-t-2 border-gray-600 md:border-t-0 lg:border-t-0">
// 			<div className="grid place-items-start">
// 				<h1 className="font-medium text-2xl mt-10 mb-4">Recent Blogs</h1>
// 				<div className="divide-y-2">
// 					{data.map((item, index) => (
// 						<Link href={"/blog/test"} key={index}>
// 							<div className="py-5 space-y-2">
// 								<h2 className="w-full text-[#c0c0c0] text-lg font-medium">
// 									{item.title}
// 								</h2>
// 								<div className="flex flex-col gap-1 lg:flex-row lg:divide-x text-sm text-[#9e9e9e] divide-[#9e9e9e] mt-2">
// 									<p className="pr-5 text-[#EE7300]">{item.author}</p>
// 									<p className="lg:px-5">{item.time}</p>
// 									<p className="lg:pl-5">{item.date}</p>
// 								</div>
// 							</div>
// 						</Link>
// 					))}
// 				</div>
// 			</div>
// 		</div>
// 	);
// }

import axios from "axios";
import Link from "next/link";

const fetchRecentBlogs = async (limit = 5) => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs?sort=publishedAt:desc&pagination[limit]=${limit}&populate=*`,
			{
				headers: {
					Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
				},
			},
		);
		return response.data.data;
	} catch (error) {
		console.error("Error fetching recent blogs:", error);
		return [];
	}
};

export default async function RecentBlogs() {
	const recentBlogs = await fetchRecentBlogs();

	return (
		<div className="mt-10">
			<h2 className="text-2xl font-bold mb-4">Recent Blogs</h2>
			<div className="divide-y-2">
				{recentBlogs.map((blog: any) => (
					<Link href={`/blog/${blog.attributes.slug}`} key={blog.id}>
						<div className="py-5 space-y-2">
							<h2 className="w-full text-[#c0c0c0] text-lg font-medium">
								{blog.attributes.Title}
							</h2>
							<div className="grid grid-cols-3 md:grid-cols-1 lg:grid-cols-3 divide-x md:divide-x-0 lg:divide-x text-sm text-[#9e9e9e] divide-[#9e9e9e] mt-2">
								<p className="pr-5 text-[#EE7300]">
									{blog.attributes.author?.data?.attributes?.author ||
										"Unknown Author"}
								</p>
								<p className="pl-5 md:pl-0 lg:pl-5">
									{blog.attributes.readTime}
								</p>
								<p className="pl-5 md:pl-0 lg:pl-5">
									{new Intl.DateTimeFormat("en-GB", {
										day: "2-digit",
										month: "2-digit",
										year: "numeric",
									}).format(new Date(blog.attributes.publishedAt))}
								</p>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
