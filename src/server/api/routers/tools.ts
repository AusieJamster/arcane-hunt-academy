import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const toolsRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const tool = await ctx.prisma.tool.findUnique({
        where: { id: input.id },
        include: { damageTypes: true },
      });

      if (!tool)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Tool not found",
        });

      return tool;
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const tools = await ctx.prisma.tool.findMany({
      take: 100,
      orderBy: [{ price: "desc" }],
      include: { damageTypes: true },
    });
    return tools;
  }),
});
