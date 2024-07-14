import { Position, Troop } from "./types";
import { troopActions } from "./troopActions";

class TroopGhostHandling {
  ghostTroop: Troop | undefined = undefined;
  ghostPosition: Position | undefined = undefined;

  setGhostTroop(id: Troop["id"], position: Position) {
    const troop = troopActions.getTroop(id);
    if (!troop) return;

    const distance = Math.abs(troop.position.x - position.x) + Math.abs(troop.position.y - position.y);
    if (distance <= troop.vitDep) {
      this.ghostTroop = { ...troop, position };
      this.ghostPosition = position;
    } else {
      this.ghostTroop = undefined;
      this.ghostPosition = undefined;
    }
  }

  clearGhostTroop() {
    this.ghostTroop = undefined;
    this.ghostPosition = undefined;
  }
}

const troopGhostHandling = new TroopGhostHandling();
export { troopGhostHandling };
