import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { prisma } from "~/server/db";

export const weaponsRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const weapon = await ctx.prisma.weapon.findUnique({
        where: { id: input.id },
        include: { ammos: true },
      });

      if (!weapon)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Weapon not found",
        });

      return weapon;
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const weapons = await ctx.prisma.weapon.findMany({
      take: 100,
      orderBy: [{ price: "desc" }],
    });
    return weapons;
  }),
});

export const weaponsCaller = weaponsRouter.createCaller({
  prisma,
  user: null,
});
