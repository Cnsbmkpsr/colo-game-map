import { Troop } from "./types";
import { troopStore } from "./troopStore";
import { mapStore } from "../map/mapStore";
import { runInAction } from "mobx";

const typeStrength = {
  infanterie: "Unité aérienne",
  "Unité aérienne": "Unité blindée",
  "Unité blindée": "infanterie",
  structure: undefined,
};

export async function fight(hunter: Troop, target: Troop) {
  if (!hunter || !target) return;

  console.log(`Combat starts between ${hunter.id} (${hunter.type}) and ${target.id} (${target.type})`);

  // Apply the attack damage of each unit to the other unit's HP
  target.pv = target.pv ? target.pv - hunter.attack : 0;

  console.log(`After attack, ${target.id} has ${target.pv} PV`);

  // Apply retaliation damage
  hunter.pv = hunter.pv ? hunter.pv - target.attack : 0;
  console.log(`After retaliation, ${hunter.id} has ${hunter.pv} PV`);

  // Determine if target unit is dead
  const isTargetDead = target.pv <= 0;
  if (isTargetDead) {
    console.log(`${target.id} is dead.`);
    runInAction(() => {
      troopStore.removeTroop(target.id);
    });
  } else {
    runInAction(() => {
      troopStore.setTroop(target.id, target);
    });
  }

  // Determine if hunter unit is dead
  const isHunterDead = hunter.pv <= 0;
  if (isHunterDead) {
    console.log(`${hunter.id} is dead.`);
    runInAction(() => {
      troopStore.removeTroop(hunter.id);
    });
  } else {
    runInAction(() => {
      troopStore.setTroop(hunter.id, hunter);
    });
  }

  // Handle movement to target position if the target is dead and hunter is alive
  if (isTargetDead && !isHunterDead) {
    console.log(`${hunter.id} moves to position (${target.position.x}, ${target.position.y})`);
    await mapStore.moveHunterToTargetPosition(hunter.id.toString(), target.position);
  }
}
