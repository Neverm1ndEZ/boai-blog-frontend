import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	try {
		await res.revalidate(`/blog/${req.body.slug}`);
		res.status(200).json({ revalidated: true });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Error revalidating" });
	}
}
