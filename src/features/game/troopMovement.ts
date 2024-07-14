import { moveTroop, validateMoveTroop } from "./movementHandling";
import { Position } from "./types";
import { troopGhostHandling } from "./troopGhostHandling";

class TroopMovement {
  isMoving = false;

  moveTroop(id: string | number, position: Position) {
    moveTroop(id, position);
  }

  validateMoveTroop(id: string | number, position: Position) {
    validateMoveTroop(id, position);
    troopGhostHandling.clearGhostTroop();
  }

  setIsTroopMoving(isMoving: boolean) {
    this.isMoving = isMoving;

  }
}

const troopMovement = new TroopMovement();
export { troopMovement };
