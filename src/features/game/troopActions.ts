import { Troop } from "./types";
import { makeAutoObservable } from "mobx";

class TroopActions {
  troops: Troop[] = [];
  troopTechLvl = 1;

  constructor() {
    makeAutoObservable(this);
  }

  addTroop(troop: Troop) {
    this.troops.push(troop);
  }

  removeTroop(id: Troop["id"]) {
    const index = this.troops.findIndex((troop) => troop.id === id);
    this.troops.splice(index, 1);
  }

  getTroop(id: Troop["id"]) {
    return this.troops.find((troop) => troop.id === id);
  }

  setTroop(id: Troop["id"], troop: Troop) {
    const index = this.troops.findIndex((troop) => troop.id === id);
    if (index === -1) return;
    this.troops[index] = troop;
  }

  setTechLvl(lvl: number) {
    this.troopTechLvl = lvl;
  }
}

const troopActions = new TroopActions();
export { troopActions };
