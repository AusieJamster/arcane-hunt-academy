import type { AmmoCapacity, AmmoOptions, Weapon } from "@prisma/client";
import Image from "next/image";

interface WeaponViewProps extends Weapon {
  ammoCapacity: AmmoCapacity[];
  ammoOptions: AmmoOptions[];
  baseWeapon?: { name: string } | null;
}

const WeaponView: React.FC<WeaponViewProps> = (props) => {
  const formatEnumToString = (str: string) => {
    const _str = str
      .split("_")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase());

    return _str.join(" ");
  };

  const arrayToString = (arr: (AmmoCapacity | AmmoOptions)[]) => {
    return arr.map((a) => formatEnumToString(a.type)).join(", ");
  };

  const formatAmmoDisplay = (ammo: AmmoCapacity) =>
    `${formatEnumToString(ammo.type)} - ${ammo.magazine}${
      ammo.magazinePlusOne ? "+1" : ""
    }/${ammo.capacity}`;

  return (
    <div>
      <pre>{JSON.stringify(props, null, 2)}</pre>
      <h1>{props.name}</h1>
      {props.imageUrl && (
        <Image src={props.imageUrl} alt={props.name} width={300} />
      )}
      <p>Description - COMING SOON!</p>
      {props.unlockLevel && <p>Req. Rank - {props.unlockLevel}</p>}
      {props.baseWeapon && <p>Base Weapon - {props.baseWeapon.name}</p>}
      <p>Store Price - ${props.price}</p>
      <p>Size - {props.size}</p>
      <ul>
        {props.ammoCapacity.map((ammo, idx) => (
          <li key={`ammo-${ammo.type}-${idx}`}>{formatAmmoDisplay(ammo)}</li>
        ))}
      </ul>
      <p>Ammo Options - {arrayToString(props.ammoOptions)}</p>

      <p>Damage - {props.damage}</p>
      {props.silenced && <p>Silenced</p>}
      <p>Capacity - COMING SOON! i.e. 1/12</p>
      {props.effectiveRange > 0 && (
        <p>Effective Range - {props.effectiveRange}m</p>
      )}
      {props.sightedRange > 0 && <p>Sighted Range - {props.sightedRange}m</p>}
      <p>Fire Rate - {props.rateOfFire}</p>
      <p>Cycle Time - {props.cycleTime}</p>
      <p>Spead - {props.spread}</p>
      <p>Sway - {props.sway}</p>
      <p>Vertical Recoil - {props.verticalRecoil}</p>
      <p>Reload Speed - {props.reloadSpeed}</p>
      <p>Muzzle Velocity - {props.muzzleVelocity}</p>
      <p>Melee Damage - {props.meleeDamage}</p>
      <p>Melee Damage Type - {props.meleeDamageType}</p>
      <p>Heavy Melee Damage - {props.heavyMeleeDamage}</p>
      <p>Heavy Melee Damage Type - {props.heavyMeleeDamageType}</p>
      <p>Stamina Consumption - {props.staminaConsumption}</p>
      <p>Heavy Stamina Consumption - {props.heavyStaminaConsumption}</p>
    </div>
  );
};

export default WeaponView;
