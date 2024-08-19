import BlogCards from "@/components/BlogCards";
import Categories from "@/components/Categories";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RecentBlogs from "@/components/RecentBlogs";
import axios from "axios";

const fetchCategories = async () => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories`,
			{
				headers: {
					Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
				},
			},
		);
		console.log("Category API response:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error fetching categories:", error);
		return null;
	}
};

const fetchBlogs = async () => {
	try {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs?populate=*`,
			{
				headers: {
					Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
				},
			},
		);
		console.log("Blog API response:", response.data);
		return response.data;
	} catch (error) {
		console.error("Error fetching blogs:", error);
		return null;
	}
};

const Home = async () => {
	const categories = await fetchCategories();
	const blogs = await fetchBlogs();
	return (
		<div className="max-w-screen-xl mx-auto p-4 flex flex-col min-h-screen">
			<Header />

			<div className="flex flex-col md:flex-row gap-4 flex-grow">
				<div className="flex-1">
					{blogs ? <BlogCards blogs={blogs} /> : <p>Failed to load blogs.</p>}
				</div>

				<div className="md:w-1/3 w-full">
					{categories ? (
						<Categories categories={categories} />
					) : (
						<p>Failed to load categories.</p>
					)}
					<RecentBlogs />
				</div>
			</div>

			<Footer />
		</div>
	);
};

export default Home;
