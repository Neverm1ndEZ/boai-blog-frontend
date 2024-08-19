import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const fetchBlog = async (slug: string) => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs?filters[slug][$eq]=${slug}&populate=*`,
			{
				headers: {
					Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
				},
			},
		);
		console.log("Blog API response:", response.data);
		return response.data.data[0]; // Return the first (and should be only) matching blog post
	} catch (error) {
		console.error("Error fetching blog:", error);
		return null;
	}
};

export default async function BlogContent({
	params,
}: {
	params: { slug: string };
}) {
	const blog = await fetchBlog(params.slug);
	console.log("Blog content:", blog);

	if (!blog) {
		return <div>Blog post not found</div>;
	}

	const { attributes } = blog;

	return (
		<div className="max-w-5xl mx-auto p-6 mt-20">
			<Link href={"/"}>{"< Back"}</Link>
			<h1 className="text-4xl text-[#c0c0c0] font-bold leading-tight mb-6">
				{attributes.Title}
			</h1>

			<div className="flex items-center space-x-4 text-sm text-white mb-8">
				<p className="text-[#EE7300]">
					- {attributes.author?.data?.attributes?.author || "Unknown Author"}
				</p>
				<span className="block w-px h-4 bg-white"></span>
				<p>{attributes.readTime}</p>
			</div>
			<div className="mb-8">
				<Image
					src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${
						attributes.cover?.data[0]?.attributes?.formats?.large?.url || ""
					}`}
					alt={attributes.Title}
					width={1000}
					height={480}
					className="border-2 border-[#EE7300] rounded-lg"
				/>
			</div>
			<div className="text-lg leading-relaxed text-[#BABABA]">
				{attributes.textBody.map((block: any, index: number) => {
					switch (block.type) {
						case "paragraph":
							return (
								<p key={index} className="mb-6">
									{block.children[0].text}
								</p>
							);
						case "heading":
							const HeadingTag =
								`h${block.level}` as keyof JSX.IntrinsicElements;
							const fontSize = ["text-4xl", "text-3xl", "text-2xl", "text-xl"][
								block.level - 1
							];
							const fontWeight = block.children[0].bold
								? "font-bold"
								: "font-semibold";
							return (
								<HeadingTag
									key={index}
									className={`${fontSize} ${fontWeight} text-white mb-4`}
								>
									{block.children[0].text}
								</HeadingTag>
							);
						default:
							return null;
					}
				})}
			</div>
		</div>
	);
}
