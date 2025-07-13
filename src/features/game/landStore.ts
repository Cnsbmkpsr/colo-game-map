import { makeAutoObservable, toJS } from "mobx";
import { Land } from "./types";
import { mapStore } from "../map/mapStore";
import { factionStore } from "./factionStore";
import { CellData } from "../map/types";

class LandStore {
  lands: Land[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  makeLandsFromMapData() {
    const mapData = mapStore.getMapData;
    const lands = mapData
      .flat()
      .filter((cell: CellData) => cell.owner)
      .map((cell: CellData) => {
        return {
          owner: cell.owner?.faction.name,
          position: toJS(cell.owner?.position),
        };
      }) as Land[];

    this.lands = lands;
  }

  addLand(land: Land) {
    this.lands.push(land);
  }

  get getLands() {
    return this.lands;
  }

  removeLand(index: number) {
    this.lands.splice(index, 1);
  }

  setLand(index: number, land: Land) {
    this.lands[index] = land;
  }

  get isOwned() {
    const position = mapStore.selectedCell?.position;
    if (!position) return false;

    const land = this.lands.find(
      (land) => land.position.x === position.x && land.position.y === position.y
    );
    if (!land) return false;
    if (!land.owner) return false;

    return true;
  }

  get isOwnedByCurrentFaction() {
    const position = mapStore.selectedCell?.position;
    if (!position) return false;

    const selectedFactionName = factionStore.getSelectedFaction?.name;
    if (!selectedFactionName) return false;

    const land = this.lands.find(
      (land) => land.position.x === position.x && land.position.y === position.y
    );
    if (!land) return false;
    if (!land.owner) return false;

    return land.owner === selectedFactionName;
  }
}

const landStore = new LandStore();
export { landStore };
