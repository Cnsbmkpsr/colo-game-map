/* eslint-disable @typescript-eslint/no-explicit-any */
import { Instance, InstanceProps, Instances } from "@react-three/drei";
import { observer } from "mobx-react";
import { factionStore } from "../../game/factionStore";
import { Faction } from "../../game/types";
import { troopStore } from "../../game/troopStore";

export type StructureProps = {
  x: number;
  y: number;
  faction?: Faction;
} & InstanceProps;

function Structure({ x, y, faction }: StructureProps) {
  const positions: Array<[x: number, y: number, z: number]> = [
    [-0.25, 0.3, -0.25],
    [-0.25, 0.3, 0.25],
    [0.25, 0.3, -0.25],
    [0.25, 0.3, 0.25],
  ];
  return (
    <group
      position={[
        x === 0 ? x : x + 0.025 * x,
        0.25,
        y === 0 ? y : y + 0.025 * y,
      ]}
    >
      {positions.map((pos, index) => (
        <Instance
          key={index}
          position={pos}
          color={faction?.color}
          args={[0.2, 0.2, 0.2] as any}
        />
      ))}
    </group>
  );
}

function Structures() {
  return (
    <Instances limit={100 * 100} frustumCulled={false}>
      <boxGeometry args={[0.3, 0.8, 0.3, 3, 3, 3]} />
      <meshStandardMaterial />
      {troopStore.getTroops.map((troop) => {
        if (troop.type === "structure") {
          const faction = factionStore.factions.find(
            (faction) => faction.name === troop.civ
          );
          return (
            <Structure
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

export default observer(Structures);
