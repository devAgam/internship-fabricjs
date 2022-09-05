// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token: string = req.cookies.token as string;
  res.setHeader("Cache-Control", "no-store");
  console.log("xyyyy");
  if (req.method === "GET") {
    await fetch(`${process.env.NEXT_INTERNAL_API_DOMAIN}/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: token,
      },
    }).then(async (response) => {
      console.log("🚀 ~ file: index.ts ~ line 20 ~ response", response);
      const data = await response.json();
      return res.status(data.status).send(data);
    });
  }
  if (req.method === "POST") {
    await fetch(`${process.env.NEXT_INTERNAL_API_DOMAIN}/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(req.body),
    }).then(async (response) => {
      console.log("🚀 ~ file: index.ts ~ line 35 ~ response", response);
      const data = await response.json();
      return res.status(data.status).send(data);
    });
  }
}
