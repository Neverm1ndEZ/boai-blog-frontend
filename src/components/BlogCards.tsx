import Image from "next/image";
import Link from "next/link";

export default function BlogCards({ blogs }: { blogs: any }) {
	return (
		<main className="grid grid-cols-1 md:grid-cols-2 gap-5 p-10 md:border-r-2 border-gray-600 h-full">
			{blogs?.data?.map((blog: any) => (
				<div key={blog.id} className="relative">
					<Link href={`/blog/${blog.attributes.slug}`} className="">
						{/* Image */}
						<div className="relative w-full aspect-[7/5] border-2 border-[#EE7300] rounded-2xl overflow-hidden">
							<Image
								src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${
									blog.attributes.cover?.data[0]?.attributes?.url || ""
								}`}
								alt={blog.attributes.Title}
								fill
								sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
								className="object-cover"
							/>
						</div>

						<div className="my-5 space-y-3 ">
							<h2 className="w-full text-[#c0c0c0] text-lg font-medium">
								{blog.attributes.Title}
							</h2>

							{/* Description and Author details */}
							<p className="text-left text-sm text-[#9e9e9e]">
								{blog.attributes.Subtitle}
							</p>
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
				</div>
			))}
		</main>
	);
}
