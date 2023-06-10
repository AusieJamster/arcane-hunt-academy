import { type Weapon } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { type NextApiRequest, type NextApiResponse } from "next";
import { weaponsCaller } from "~/server/api/routers/weapons";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Weapon | { error: { message: string } }>
) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: { message: "Method is not Allowed" } });
  }
  if (!req.query.weaponId) {
    res.status(400).json({
      error: { message: "weaponId is missing from request parameters" },
    });
    return;
  }

  const id = Array.isArray(req.query.weaponId)
    ? req.query.weaponId.join("")
    : req.query.weaponId;

  try {
    const weapon = await weaponsCaller.getById({ id });
    res.status(200).json(weapon);
  } catch (error) {
    if (error instanceof TRPCError) {
      const httpStatusCode = getHTTPStatusCodeFromError(error);
      res.status(httpStatusCode).json({ error: { message: error.message } });
      return;
    }

    res.status(500).json({
      error: { message: `Error while accessing post with ID ${id}` },
    });
  }
};

export default handler;
