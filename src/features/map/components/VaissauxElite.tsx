import { Instance, InstanceProps, Instances } from "@react-three/drei";
import { observer } from "mobx-react";
import { factionStore } from "../../game/factionStore";
import { Faction } from "../../game/types";
import { troopStore } from "../../game/troopStore";

export type VaisseauEliteProps = {
  x: number;
  y: number;
  faction?: Faction;
} & InstanceProps;

function VaisseauElite({ x, y, faction, ...rest }: VaisseauEliteProps) {
  return (
    <Instance
      {...rest}
      color={faction?.color}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[x === 0 ? x : x + 0.025 * x, 0.4, y === 0 ? y : y + 0.025 * y]}
    />
  );
}

function VaisseauxElites() {
  return (
    <Instances limit={100 * 100} frustumCulled={false}>
      <coneGeometry args={[0.2, 0.5, 9, 4]} />
      <meshStandardMaterial />
      {troopStore.getTroops.map((troop) => {
        if (troop.type === "Unité aérienne") {
          const faction = factionStore.factions.find(
            (faction) => faction.name === troop.civ
          );
          return (
            <VaisseauElite
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

export default observer(VaisseauxElites);
