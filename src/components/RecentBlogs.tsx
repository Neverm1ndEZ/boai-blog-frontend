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
						<div className="p-4 border-b border-gray-700">
							<article className="my-4 md:my-5 space-y-2 md:space-y-3">
								<h2 className="text-[#c0c0c0] text-base md:text-lg font-medium">
									{blog.attributes.Title}
								</h2>
								<p className="text-xs md:text-sm text-[#9e9e9e]">
									{blog.attributes.Subtitle}
								</p>
							</article>
							<article className="w-full grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 items-end text-xs md:text-sm text-[#9e9e9e] mt-2">
								<div>
									<p className="text-[#EE7300] whitespace-nowrap">
										{blog.attributes.author?.data?.attributes?.author ||
											"Unknown Author"}
									</p>
									<p className="">{blog.attributes.readTime}</p>
								</div>
								<p className="pl-5 md:pl-0 lg:pl-5 text-end">
									{new Intl.DateTimeFormat("en-GB", {
										day: "2-digit",
										month: "2-digit",
										year: "numeric",
									}).format(new Date(blog.attributes.publishedAt))}
								</p>
							</article>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}
