import Footer from "@/components/Footer";
import React, { PropsWithChildren } from "react";

const BlogLayout = ({ children }: PropsWithChildren): JSX.Element => {
	return (
		<section className="">
			<div className="">
				{children} <Footer />
			</div>
		</section>
	);
};

export default BlogLayout;
