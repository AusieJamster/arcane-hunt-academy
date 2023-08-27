import { createTRPCRouter, publicProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const weaponsRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const weapon = await ctx.prisma.weapon.findUnique({
        where: { id: input.id },
        include: { ammoCapacity: true, ammoOptions: true },
      });

      if (!weapon)
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Weapon not found",
        });

      if (weapon.baseId) {
        const baseWeapon = await ctx.prisma.weapon.findUnique({
          where: { id: weapon.baseId },
          select: { name: true },
        });
        return { ...weapon, baseWeapon };
      }

      return { weapon };
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const weapons = await ctx.prisma.weapon.findMany({
      take: 100,
      include: { ammoCapacity: true, ammoOptions: true },
      orderBy: [{ price: "desc" }],
    });
    return weapons;
  }),
});
