import React, { PropsWithChildren } from "react";

const BlogLayout = ({ children }: PropsWithChildren): JSX.Element => {
	return (
		<section className="">
			<div className="">{children}</div>
		</section>
	);
};

export default BlogLayout;
