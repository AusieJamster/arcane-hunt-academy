import { type Weapon } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { type NextApiRequest, type NextApiResponse } from "next";
import { appCaller } from "~/server/api/root";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Weapon[] | { error: { message: string } }>
) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: { message: "Method is not Allowed" } });
  }

  try {
    const weapons = await appCaller.weapons.getAll();
    res.status(200).json(weapons);
  } catch (error) {
    if (error instanceof TRPCError) {
      const httpStatusCode = getHTTPStatusCodeFromError(error);
      res.status(httpStatusCode).json({ error: { message: error.message } });
      return;
    }

    res.status(500).json({
      error: { message: `Error while accessing tools` },
    });
  }
};

export default handler;
