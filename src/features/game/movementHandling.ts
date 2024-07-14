import { mapStore } from "../map/mapStore";
import { Position } from "./types";
import { troopActions } from "./troopActions";
import { troopMovement } from "./troopMovement";
import { troopGhostHandling } from "./troopGhostHandling";


export function moveTroop(id: string | number, position: Position) {
  const troop = troopActions.getTroop(id);
  if (!troop) return;

  const cell = mapStore.getCell(position.x, position.y);
  if (cell.troop) return;

  troopActions.setTroop(id, { ...troop, updatedAt: Date.now(), position });
  troopMovement.setIsTroopMoving(false);
}

export function validateMoveTroop(id: string | number, position: Position) {
  const troop = troopActions.getTroop(id);
  if (!troop) return;

  const distance = Math.abs(troop.position.x - position.x) + Math.abs(troop.position.y - position.y);
  if (distance <= troop.vitDep) {
    moveTroop(id, position);
    troopGhostHandling.clearGhostTroop();
  }
}
