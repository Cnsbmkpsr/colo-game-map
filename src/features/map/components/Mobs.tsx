import { Instance, InstanceProps, Instances } from "@react-three/drei";
import { observer } from "mobx-react";
import { factionStore } from "../../game/factionStore";
import { Faction } from "../../game/types";
import { troopStore } from "../../game/troopStore";

export type MobProps = {
  x: number;
  y: number;
  faction?: Faction;
} & InstanceProps;

function Mob({ x, y, faction, ...rest }: MobProps) {
  return (
    <Instance
      {...rest}
      color={faction?.color}
      position={[x === 0 ? x : x + 0.025 * x, 0.4, y === 0 ? y : y + 0.025 * y]}
    />
  );
}

function Mobs() {
  return (
    <Instances limit={100 * 100} frustumCulled={false}>
      <capsuleGeometry args={[0.15, 0.2, 3, 8]} />
      <meshStandardMaterial />
      {troopStore.getTroops.map((troop) => {
        if (troop.type === "mob") {
          const faction = factionStore.factions.find(
            (faction) => faction.name === troop.civ
          );
          return (
            <Mob
              key={`${troop.position.x}-${troop.position.y}`}
              x={troop.position.x}
              y={troop.position.y}
              faction={faction}
            />
          );
        }
      })}
    </Instances>
  );
}

export default observer(Mobs);
