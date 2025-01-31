import { makeAutoObservable, toJS } from "mobx";
import { troopActions } from "./troopActions";
import { troopCreation } from "./troopCreation";
import { troopMovement } from "./troopMovement";
import { troopGhostHandling } from "./troopGhostHandling";
import { troopSelectors } from "./troopSelectors";
import { fight } from "./combatHandling";
import { adminStore } from "../interface/adminStore";
import { mapStore } from "../map/mapStore";
import { Troop, Civilisation, Position } from "./types";
import { UNITS_CONFIG } from "../../shared/constants";

class TroopStore {
  fightingTroop: Troop | undefined = undefined;
  isTroopMoving = false;

  constructor() {
    makeAutoObservable(this);
  }

  fight(hunter: Troop, target: Troop) {
    fight(hunter, target);
  }

  moveUnitsForActiveTeam() {
    const activeTeam = adminStore.activeTeam;

    this.troops.forEach((troop) => {
      if (troop.civ === activeTeam) {
        if (troopGhostHandling.ghostTroop && troopGhostHandling.ghostPosition && troopGhostHandling.ghostTroop.id === troop.id) {
          troopMovement.validateMoveTroop(troop.id, troopGhostHandling.ghostPosition);
        }
      }
    });

    troopGhostHandling.clearGhostTroop();
  }

  addTroop(troop: Troop) {
    troopActions.addTroop(troop);
  }

  removeTroop(id: Troop["id"]) {
    troopActions.removeTroop(id);
  }

  getTroop(id: Troop["id"]) {
    return troopActions.getTroop(id);
  }

  setTroop(id: Troop["id"], troop: Troop) {
    troopActions.setTroop(id, troop);
  }

  createGroundUnit(id: string, name: string, civ: Civilisation, position: Position) {
    return troopCreation.createGroundUnit(id, name, civ, position);
  }

  createHeavyUnit(id: string, name: string, civ: Civilisation, position: Position) {
    return troopCreation.createHeavyUnit(id, name, civ, position);
  }

  createFlyingUnit(id: string, name: string, civ: Civilisation, position: Position) {
    return troopCreation.createFlyingUnit(id, name, civ, position);
  }

  moveTroop(id: string | number, position: Position) {
    const troop = this.getTroop(id);
    if (troop) {
      console.log(`Moving troop ${id} to position (${position.x}, ${position.y})`);
      troop.position = position; // Ensure this updates the troop's position
      this.setTroop(id, troop); // Save the updated troop back to the store
      console.log(`Troop after move:`, toJS(troop));
    } else {
      console.log(`Troop ${id} not found`);
    }
  }

  validateMoveTroop(id: string | number, position: Position): string | null {
    const troop = this.getTroop(id);
    if (!troop) return "Troop not found";
  
    const distance = calculateDistance(troop.position, position);
    const unitConfig = UNITS_CONFIG[troop.type];
  
    if (distance > unitConfig.vitDep) {
      return "Move exceeds unit's movement points";
    }
  
    // Check for existing ghost positions
    const ghostPositionsJS = toJS(mapStore.ghostPositions);
    for (const [team, units] of Object.entries(ghostPositionsJS)) {
      for (const [unitId, pos] of Object.entries(units as Record<string, Position>)) {
        if (pos.x === position.x && pos.y === position.y) {
          return "Move refused: a ghost position already exists on the target cell";
        }
      }
    }
  
    const targetCellTroops = this.troops.filter(
      (t) => t.position.x === position.x && t.position.y === position.y
    );
  
    const allyTroop = targetCellTroops.find((t) => t.civ === troop.civ);
    if (allyTroop) {
      return "Move refused: ally unit present on the target cell";
    }
  
    const enemyTroops = targetCellTroops.filter((t) => t.civ !== troop.civ);
    if (enemyTroops.length > 1) {
      return "Move refused: more than one enemy unit present on the target cell";
    }
  
    return null;
  }
  
  

  setIsTroopMoving(isMoving: boolean) {
    this.isTroopMoving = isMoving;
  }

  setGhostTroop(id: Troop["id"], position: Position) {
    troopGhostHandling.setGhostTroop(id, position);
  }

  setTroopFight(troop: Troop | undefined) {
    this.fightingTroop = troop;
  }

  clearGhostTroop() {
    troopGhostHandling.clearGhostTroop();
  }

  makeStoreFromMapData() {
    const mapData = mapStore.getMapData;
    const troops = mapData
      .flat()
      .filter((cell) => cell.troop)
      .map((cell) => cell.troop) as Troop[];

    troopActions.troops = troops;
  }

  get troops() {
    return troopActions.troops;
  }

  get hasTroopOnSelectedCell() {
    return troopSelectors.hasTroopOnSelectedCell();
  }

  get isTroopOwnedBySelectedFaction() {
    return troopSelectors.isTroopOwnedBySelectedFaction();
  }

  get isSelectedTroopStructure() {
    return troopSelectors.isSelectedTroopStructure();
  }

  get isSelectedTroopMob() {
    return troopSelectors.isSelectedTroopMob();
  }

  get isPVTroop() {
    return troopSelectors.isPVTroop();
  }

  get getIsMoving() {
    return troopSelectors.getIsMoving();
  }

  get getFightingTroop() {
    return troopSelectors.getFightingTroop();
  }

  get getTroops() {
    return troopSelectors.getTroops();
  }

  get getGhostTroop() {
    return troopSelectors.getGhostTroop();
  }
}

const troopStore = new TroopStore();
export { troopStore };

// Helper function to calculate distance
function calculateDistance(pos1: Position, pos2: Position): number {
  return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
}
