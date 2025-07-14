import { Position, Troop } from "./types";
import { troopActions } from "./troopActions";

function positionToKey(position: Position): string {
  return `${position.x},${position.y}`;
}

class TroopGhostHandling {
  ghostTroops: Map<string, Troop> = new Map();

  setGhostTroop(id: Troop["id"], position: Position) {
    const troop = troopActions.getTroop(id);
    if (!troop) return;

    const distance = Math.abs(troop.position.x - position.x) + Math.abs(troop.position.y - position.y);
    const key = positionToKey(position);
    if (distance <= troop.vitDep) {
      this.ghostTroops.set(key, { ...troop, position });
    } else {
      this.ghostTroops.delete(key);
    }
  }

  clearGhostTroop(position?: Position) {
    if (position) {
      const key = positionToKey(position);
      this.ghostTroops.delete(key);
    } else {
      this.ghostTroops.clear();
    }
  }

  getGhostTroop(position: Position): Troop | undefined {
    const key = positionToKey(position);
    return this.ghostTroops.get(key);
  }
}

const troopGhostHandling = new TroopGhostHandling();
export { troopGhostHandling };
