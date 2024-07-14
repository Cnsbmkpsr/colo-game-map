import { Instance, InstanceProps, Instances } from "@react-three/drei";
import { observer } from "mobx-react";
import { Faction } from "../../game/types";
import { troopStore } from "../../game/troopStore";
import { factionStore } from "../../game/factionStore";

export type InfanterieProps = {
  x: number;
  y: number;
  faction?: Faction;
} & InstanceProps;

function Infanterie({ x, y, faction }: InfanterieProps) {
  const positions: Array<[x: number, y: number, z: number]> = [
    [-0.15, 0.3, -0.15],
    [-0.15, 0.3, 0.15],
    [0.15, 0.3, -0.15],
    [0.15, 0.3, 0.15],
  ];
  return (
    <group
      position={[x === 0 ? x : x + 0.025 * x, 0, y === 0 ? y : y + 0.025 * y]}
    >
      {positions.map((pos, index) => (
        <Instance key={index} position={pos} color={faction?.color} />
      ))}
    </group>
  );
}

function Infanteries() {
  return (
    <Instances limit={100 * 100} frustumCulled={false}>
      <sphereGeometry args={[0.125, 10, 5]} />
      <meshStandardMaterial />
      {troopStore.getTroops.map((troop) => {
        if (troop.type === "infanterie") {
          const faction = factionStore.factions.find(
            (faction) => faction.name === troop.civ
          );
          return (
            <Infanterie
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

export default observer(Infanteries);
