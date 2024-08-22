import Image from "next/image";
import Link from "next/link";

export default function BlogCards({ blogs }: { blogs: any }) {
	return (
		<main className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-10 p-5 lg:p-10 md:border-r-2 border-gray-600 h-full">
			{blogs?.data?.map((blog: any) => (
				<div key={blog.id} className="relative">
					<Link href={`/blog/${blog.attributes.slug}`} className="">
						<div className="md:min-h-[32rem] lg:min-h-[31rem] bg-[#242424] p-4 rounded-xl shadow-[0_0_8px_orange] hover:scale-105 transform ease-in-out duration-300 flex flex-col justify-between">
							<div>
								<div className="relative w-full aspect-[7/5] rounded-2xl overflow-hidden">
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
								<div className="my-4 md:my-5 space-y-2 md:space-y-3">
									<h2 className="text-[#c0c0c0] text-base md:text-lg font-medium">
										{blog.attributes.Title}
									</h2>
									<p className="text-xs md:text-sm text-[#9e9e9e]">
										{blog.attributes.Subtitle}
									</p>
								</div>
							</div>

							<div className="w-full grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 items-end text-xs md:text-sm text-[#9e9e9e] mt-2">
								<div>
									<p className="text-[#EE7300] whitespace-nowrap">
										{blog.attributes.author?.data?.attributes?.author ||
											"Unknown Author"}
									</p>
									<p className="">{blog.attributes.readTime}</p>
								</div>
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
