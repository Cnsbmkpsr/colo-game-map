import { Troop } from "./types";
import { troopStore } from "./troopStore";
import { mapStore } from "../map/mapStore";
import { runInAction } from "mobx";

export async function fight(hunter: Troop, target: Troop) {
  if (!hunter || !target) return;

  console.log(
    `Combat starts between ${hunter.id} (${hunter.type}) and ${target.id} (${target.type})`
  );

  target.pv = target.pv ? target.pv - hunter.attack : 0;

  console.log(`After attack, ${target.id} has ${target.pv} PV`);

  hunter.pv = hunter.pv ? hunter.pv - target.attack : 0;
  console.log(`After retaliation, ${hunter.id} has ${hunter.pv} PV`);

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

  if (isTargetDead && !isHunterDead) {
    console.log(
      `${hunter.id} moves to position (${target.position.x}, ${target.position.y})`
    );
    await mapStore.moveHunterToTargetPosition(
      hunter.id.toString(),
      target.position
    );
  }
}
