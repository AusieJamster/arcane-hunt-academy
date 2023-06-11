import { createTRPCRouter } from "~/server/api/trpc";
import { weaponsRouter } from "./routers/weapons";
import { prisma } from "../db";
import { toolsRouter } from "./routers/tools";

export const appRouter = createTRPCRouter({
  weapons: weaponsRouter,
  tools: toolsRouter,
});

export type AppRouter = typeof appRouter;

export const appCaller = appRouter.createCaller({
  prisma,
  user: null,
});
