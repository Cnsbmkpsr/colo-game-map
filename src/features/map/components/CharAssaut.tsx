import { Instance, InstanceProps, Instances } from "@react-three/drei";
import { observer } from "mobx-react";
import { factionStore } from "../../game/factionStore";
import { Faction } from "../../game/types";
import { troopStore } from "../../game/troopStore";

export type CharAssautProps = {
  x: number;
  y: number;
  faction?: Faction;
} & InstanceProps;

function CharAssaut({ x, y, faction, ...rest }: CharAssautProps) {
  return (
    <Instance
      {...rest}
      position={[x === 0 ? x : x + 0.025 * x, 0.3, y === 0 ? y : y + 0.025 * y]}
      color={faction?.color}
    />
  );

}

function CharsAssaut() {
  return (
    <Instances limit={100 * 100} frustumCulled={false}>
      <boxGeometry args={[0.45, 0.25, 0.66, 2, 2, 2]} />
      <meshStandardMaterial />
      {troopStore.getTroops.map((troop) => {
        if (troop.type === "Unité blindée") {
          const faction = factionStore.factions.find(
            (faction) => faction.name === troop.civ
          );
          return (
            <CharAssaut
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

export default observer(CharsAssaut);
