import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

export const getStaticProps = async ({
	params,
}: {
	params: { slug: string };
}) => {
	const blog = await fetchBlog(params.slug);

	if (!blog) {
		return {
			notFound: true,
		};
	}

	return {
		props: {
			blog,
		},
		revalidate: 60,
	};
};

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
		return response.data.data[0];
	} catch (error) {
		console.error("Error fetching blog:", error);
		return null;
	}
};

const RichTextRenderer = ({ block }: { block: any }) => {
	switch (block.type) {
		case "paragraph":
			return <p className="mb-6">{block.children[0].text}</p>;
		case "heading":
			const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements;
			const fontSize = ["text-4xl", "text-3xl", "text-2xl", "text-xl"][
				block.level - 1
			];
			const fontWeight = block.children[0].bold ? "font-bold" : "font-semibold";
			return (
				<HeadingTag className={`${fontSize} ${fontWeight} text-white mb-4`}>
					{block.children[0].text}
				</HeadingTag>
			);
		case "list":
			const ListTag = block.format === "ordered" ? "ol" : "ul";
			return (
				<ListTag
					className={`mb-6 ${
						block.format === "ordered" ? "list-decimal" : "list-disc"
					} pl-6`}
				>
					{block.children.map((item: any, index: number) => (
						<li key={index} className="mb-2">
							{item.children[0].text}
						</li>
					))}
				</ListTag>
			);
		case "image":
			return (
				<div className="relative w-full aspect-video mb-6">
					<Image
						src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${block.image.url}`}
						alt={block.image.alternativeText || "Blog image"}
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						className="object-cover rounded-lg"
					/>
				</div>
			);
		case "quote":
			return (
				<blockquote className="border-l-4 border-[#EE7300] pl-4 italic mb-6">
					{block.children[0].text}
				</blockquote>
			);
		case "code":
			return (
				<SyntaxHighlighter
					language={block.language || "javascript"}
					style={tomorrow}
					className="mb-6"
				>
					{block.children[0].text}
				</SyntaxHighlighter>
			);
		default:
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
		<div className="max-w-5xl mx-auto p-6 mt-10">
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
			<div className="relative w-full aspect-[7/5] border-2 border-[#EE7300] rounded-2xl overflow-hidden my-4">
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
			<div className="text-lg leading-relaxed text-[#BABABA]">
				{attributes.textBody.map((block: any, index: number) => (
					<RichTextRenderer key={index} block={block} />
				))}
			</div>
		</div>
	);
}
