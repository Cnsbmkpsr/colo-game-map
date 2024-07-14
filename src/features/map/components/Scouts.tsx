import { Instance, InstanceProps, Instances } from "@react-three/drei";
import { observer } from "mobx-react";
import { factionStore } from "../../game/factionStore";
import { Faction } from "../../game/types";
import { troopStore } from "../../game/troopStore";

export type ScoutProps = {
  x: number;
  y: number;
  faction?: Faction;
} & InstanceProps;

function Scout({ x, y, faction, ...rest }: ScoutProps) {
  return (
    <>
      <Instance
        {...rest}
        color={faction?.color}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[
          x === 0 ? x - 0.1 : x + 0.025 * x - 0.1,
          0.3,
          y === 0 ? y : y + 0.025 * y,
        ]}
      />
      <Instance
        {...rest}
        color={faction?.color}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[
          x === 0 ? x + 0.1 : x + 0.025 * x + 0.1,
          0.3,
          y === 0 ? y : y + 0.025 * y,
        ]}
      />
    </>
  );
}

function Scouts() {
  return (
    <Instances limit={100 * 100} frustumCulled={false}>
      <cylinderGeometry args={[0.125, 0.125, 0.5, 10, 4]} />
      <meshStandardMaterial />
      {troopStore.getTroops.map((troop) => {
        if (troop.type === "scout") {
          const faction = factionStore.factions.find(
            (faction) => faction.name === troop.civ
          );
          return (
            <Scout
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

export default observer(Scouts);
