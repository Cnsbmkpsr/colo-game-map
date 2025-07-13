import { makeAutoObservable, runInAction, toJS } from "mobx";
import { troopActions } from "./troopActions";
import { troopCreation } from "./troopCreation";
import { troopMovement } from "./troopMovement";
import { troopGhostHandling } from "./troopGhostHandling";
import { fight } from "./combatHandling";
import { adminStore } from "../interface/adminStore";
import { mapStore } from "../map/mapStore";
import { Troop, Civilisation, Position } from "./types";
import { UNITS_CONFIG } from "../../shared/constants";
import { CellData } from "../map/types";
import { factionStore } from "./factionStore";

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
        if (
          troopGhostHandling.ghostTroop &&
          troopGhostHandling.ghostPosition &&
          troopGhostHandling.ghostTroop.id === troop.id
        ) {
          troopMovement.validateMoveTroop(
            troop.id,
            troopGhostHandling.ghostPosition
          );
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

  adminRemoveTroopOnSelectedCell() {
    const position = mapStore.selectedCell?.position;
    if (!position || !adminStore.getAdmin) return;

    const troopToRemove = this.troops.find(
      (troop) =>
        troop.position.x === position.x && troop.position.y === position.y
    );

    if (troopToRemove) {
      runInAction(() => {
        this.removeTroop(troopToRemove.id);
        mapStore.updateMap();
        mapStore.refreshSelectedCell();
        mapStore.save();
      });
    }
  }

  getTroop(id: Troop["id"]) {
    return troopActions.getTroop(id);
  }

  setTroop(id: Troop["id"], troop: Troop) {
    troopActions.setTroop(id, troop);
  }

  createGroundUnit(
    id: string,
    name: string,
    civ: Civilisation,
    position: Position
  ) {
    return troopCreation.createGroundUnit(id, name, civ, position);
  }

  createHeavyUnit(
    id: string,
    name: string,
    civ: Civilisation,
    position: Position
  ) {
    return troopCreation.createHeavyUnit(id, name, civ, position);
  }

  createFlyingUnit(
    id: string,
    name: string,
    civ: Civilisation,
    position: Position
  ) {
    return troopCreation.createFlyingUnit(id, name, civ, position);
  }

  moveTroop(id: string | number, position: Position) {
    const troop = this.getTroop(id);
    if (troop) {
      troop.position = position;
      this.setTroop(id, troop);
    }
  }

  validateMoveTroop(id: string | number, position: Position): string | null {
    const troop = this.getTroop(id);
    if (!troop) return "Troupe non trouvée";

    const distance = calculateDistance(troop.position, position);
    const unitConfig = UNITS_CONFIG[troop.type];

    if (distance > unitConfig.vitDep) {
      return "Le déplacement dépasse les points de mouvement de l'unité";
    }

    const ghostPositionsJS = toJS(mapStore.ghostPositions);
    for (const units of Object.values(ghostPositionsJS)) {
      for (const pos of Object.values(units as Record<string, Position>)) {
        if (pos.x === position.x && pos.y === position.y) {
          return "Déplacement refusé : une position fantôme existe déjà sur la case cible";
        }
      }
    }

    const targetCellTroops = this.troops.filter(
      (t) => t.position.x === position.x && t.position.y === position.y
    );

    const allyTroop = targetCellTroops.find((t) => t.civ === troop.civ);
    if (allyTroop) {
      return "Déplacement refusé : une unité alliée est présente sur la case cible";
    }

    const enemyTroops = targetCellTroops.filter((t) => t.civ !== troop.civ);
    if (enemyTroops.length > 1) {
      return "Déplacement refusé : plus d'une unité ennemie présente sur la case cible";
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
      .filter((cell: CellData) => cell.troop)
      .map((cell: CellData) => cell.troop) as Troop[];

    troopActions.troops = troops;
  }

  get troops() {
    return troopActions.troops;
  }

  get hasTroopOnSelectedCell() {
    const position = mapStore.selectedCell?.position;
    if (!position) return false;

    return this.troops.some(
      (troop) =>
        troop.position.x === position.x && troop.position.y === position.y
    );
  }

  get isTroopOwnedBySelectedFaction() {
    const position = mapStore.selectedCell?.position;
    if (!position) return false;

    const troop = this.troops.find(
      (t) => t.position.x === position.x && t.position.y === position.y
    );
    if (!troop) return false;

    return troop.civ === factionStore.getSelectedFaction?.name;
  }

  get isSelectedTroopStructure() {
    const position = mapStore.selectedCell?.position;
    if (!position) return false;

    const troop = this.troops.find(
      (t) => t.position.x === position.x && t.position.y === position.y
    );
    if (!troop) return false;

    return troop.type === "structure";
  }

  get isSelectedTroopMob() {
    const position = mapStore.selectedCell?.position;
    if (!position) return false;

    const troop = this.troops.find(
      (t) => t.position.x === position.x && t.position.y === position.y
    );
    if (!troop) return false;

    return troop.type === "infanterie";
  }

  get isPVTroop() {
    return this.isSelectedTroopMob || this.isSelectedTroopStructure;
  }

  get getIsMoving() {
    return troopMovement.isMoving;
  }

  get getFightingTroop() {
    return this.fightingTroop;
  }

  get getTroops() {
    return this.troops;
  }

  get getGhostTroop() {
    return troopGhostHandling.ghostTroop;
  }
}

const troopStore = new TroopStore();
export { troopStore };

function calculateDistance(pos1: Position, pos2: Position): number {
  return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
}
