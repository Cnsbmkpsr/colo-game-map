import { mapStore } from "../map/mapStore";
import { factionStore } from "./factionStore";
import { troopActions } from "./troopActions";
import { troopMovement } from "./troopMovement";
import { troopGhostHandling } from "./troopGhostHandling";
import { troopStore } from "./troopStore";

class TroopSelectors {
  hasTroopOnSelectedCell() {
    const position = mapStore.selectedCell?.position;
    if (!position) return false;

    const troop = troopActions.troops.find(
      (troop) =>
        troop.position.x === position.x && troop.position.y === position.y
    );
    if (!troop) return false;

    return true;
  }

  isTroopOwnedBySelectedFaction() {
    const position = mapStore.selectedCell?.position;
    if (!position) return false;

    const troop = troopActions.troops.find(
      (troop) =>
        troop.position.x === position.x && troop.position.y === position.y
    );
    if (!troop) return false;

    return troop.civ === factionStore.getSelectedFaction?.name;
  }

  isSelectedTroopStructure() {
    const position = mapStore.selectedCell?.position;
    if (!position) return false;

    const troop = troopActions.troops.find(
      (troop) =>
        troop.position.x === position.x && troop.position.y === position.y
    );
    if (!troop) return false;

    return troop.type === "structure";
  }

  isSelectedTroopMob() {
    const position = mapStore.selectedCell?.position;
    if (!position) return false;

    const troop = troopActions.troops.find(
      (troop) =>
        troop.position.x === position.x && troop.position.y === position.y
    );
    if (!troop) return false;

    return troop.type === "infanterie";
  }

  isPVTroop() {
    return this.isSelectedTroopMob() || this.isSelectedTroopStructure();
  }

  getIsMoving() {
    return troopMovement.isMoving;
  }

  getFightingTroop() {
    return troopStore.fightingTroop;
  }

  getTroops() {
    return troopActions.troops;
  }

  getGhostTroop() {
    return troopGhostHandling.ghostTroop;
  }
}

const troopSelectors = new TroopSelectors();
export { troopSelectors };