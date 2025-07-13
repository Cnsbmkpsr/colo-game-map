import { makeAutoObservable, observable, runInAction } from "mobx";
import { mapStore } from "../map/mapStore";
import { Civilisation } from "../game/types";

class InfoModalStore {
  title = "";
  description: Record<string, string | object> = {};
  isOpen = false;
  currentCivilisation: Civilisation | null = null;

  constructor() {
    makeAutoObservable(this, {
      title: observable,
      description: observable,
      currentCivilisation: observable,
      isOpen: observable,
    });
  }

  setTitle(title: string) {
    this.title = title;
  }

  setDescription(description: Record<string, string | object>) {
    this.description = description;
  }

  setCurrentCivilisation(civ: Civilisation | null) {
    this.currentCivilisation = civ;
  }

  get getDescription() {
    const selectedCell = mapStore.getSelectedCell;
    if (!selectedCell) return {};

    const { cell } = selectedCell;

    // Construct the description based on the cell data
    let troupeDescription = null;
    if (cell.troop) {
      const { vitDep, pv, attack, type, civ } = cell.troop;
      troupeDescription = {
        Type: type,
        Vitesse: vitDep,
        PV: pv,
        Attaque: attack,
        Civilisation: civ,
      };
    }

    return {
      ...(cell.owner && { Propriétaire: cell.owner.faction.name }),
      ...(troupeDescription && { Troupe: troupeDescription }),
    };
  }

  get getTitle() {
    const selectedCell = mapStore.getSelectedCell;
    if (!selectedCell) return "";

    const { position } = selectedCell;
    return `Tuile: ${position.x}, ${position.y}`;
  }

  onOpen() {
    this.isOpen = true;
  }

  onClose() {
    this.isOpen = false;
  }

  onRefresh() {
    runInAction(() => {
      this.setTitle(this.getTitle);
      this.setDescription(this.getDescription);
    });
  }
}

const infoModalStore = new InfoModalStore();
export { infoModalStore };
