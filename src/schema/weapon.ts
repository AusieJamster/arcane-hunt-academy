import { type } from "os";
import { z } from "zod";

enum AmmoTypeEnum {
  COMPACT,
  MEDIUM,
  LONG,
}

enum SizeEnum {
  SMALL,
  MEDIUM,
  LARGE,
}
enum DamageTypeEnum {
  BLUNT = "Blunt",
  PIERCING = "Piercing",
  LIGHT_RENDING = "Rending (Light)",
  RENDING = "Rending",
  INTENSE_RENDING = "Rending (Intense)",
  EXPLOSION = "Explosion",
}

export const weaponSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  price: z.number().int().positive(),
  base: z.string().uuid(), // uuid of the base weapon
  size: z.nativeEnum(SizeEnum),
  ammo: z.nativeEnum(AmmoTypeEnum).array(),
  damage: z.number().positive(),
  damageType: z.nativeEnum(DamageTypeEnum).nullable(),
  silenced: z.boolean(),
  effectiveRange: z.number().positive(), // in meters
  sightedRange: z.number().positive(), // in meters
  rateOfFire: z.number().positive(), // in rounds per minute
  cycleTime: z.number().positive(), // in seconds
  spread: z.number().positive(), // in degrees
  sway: z.number().positive(), // in degrees
  verticalRecoil: z.number().positive(), // in degrees
  reloadSpeed: z.number().positive(), // in seconds
  muzzleVelocity: z.number().positive(), // in meters per second
  meleeDamage: z.number().positive(),
  meleeDamageType: z.nativeEnum(DamageTypeEnum),
  heavyMeleeDamage: z.number().positive(),
  heavyMeleeDamageType: z.nativeEnum(DamageTypeEnum),
  staminaConsumption: z.number().positive(), // in stamina per activation
  heavyStaminaConsumption: z.number().positive(), // in stamina per activation
});

export type Weapon = z.infer<typeof weaponSchema>;
