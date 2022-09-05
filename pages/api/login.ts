// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { serialize } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const credentials = req.body;

  await fetch(`${process.env.NEXT_INTERNAL_API_DOMAIN}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: credentials.username,
      password: credentials.password,
    }),
  }).then(async (apiResponse) => {
    const resJson = await apiResponse.json();
    if (resJson.token) {
      res.setHeader(
        "Set-Cookie",
        serialize("token", resJson.token, {
          path: "/",
          maxAge: 900000,
          sameSite: "strict",
          httpOnly: true,
          secure: true,
        })
      );
      res.send({
        success: true,
      });
      return;
    }
    res.send({
      success: false,
      error: resJson,
    });
    return;
  });
}
