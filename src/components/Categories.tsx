import Category from "./Category";

export default function Categories({ categories }: { categories: any }) {
	return (
		<div className="grid place-content-center lg:place-content-start border-t-2 border-gray-600 md: border-none lg:border-none">
			<h1 className="font-medium text-2xl mt-10 mb-4">Categories</h1>
			<div className="mt-4 grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start justify-center my-6">
				{categories?.data?.map((category: any) => {
					return (
						<div key={category.id}>
							<Category cat={category} />
						</div>
					);
				})}
			</div>
		</div>
	);
}
