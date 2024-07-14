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
    return {
      ...(cell.owner && { Owner: cell.owner.faction.name }),
      ...(cell.troop && { Troop: cell.troop }),
    };
  }

  get getTitle() {
    const selectedCell = mapStore.getSelectedCell;
    if (!selectedCell) return "";

    const { position } = selectedCell;
    return `Cell: ${position.x}, ${position.y}`;
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
