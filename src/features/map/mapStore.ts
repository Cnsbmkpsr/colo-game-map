import { makeAutoObservable, observable, runInAction, toJS } from "mobx";
import { CellData, MapData, SelectedCell } from "./types";
import { factionStore } from "../game/factionStore";
import { landStore } from "../game/landStore";
import { troopStore } from "../game/troopStore";
import { RealtimeService } from "../../shared/services/realTimeDBService";
import { adminStore } from "../interface/adminStore";
import { Position } from "../game/types";
import { fight } from "../game/combatHandling";

const mapCollection = new RealtimeService("map");
const ghostPositionService = new RealtimeService("ghostPositions");

class MapStore {
  mapData: MapData = [];
  selectedCell?: SelectedCell = undefined;
  height = 30;
  width = 30;
  ghostPositions: Record<string, Record<string, Position>> = {};

  constructor() {
    makeAutoObservable(this, {
      selectedCell: observable,
      ghostPositions: observable,
    });
    this.initializeStore();
  }

  async initializeStore() {
    await this.fetchMap();
    await this.fetchGhostPositions();
    this.watchGhostPositions();
  }

  async fetchMap() {
    const mapDocRef = await mapCollection.read();
    const mapData = mapDocRef?.data;

    if (mapData) {
      runInAction(() => {
        this.mapData = JSON.parse(mapData);
        troopStore.makeStoreFromMapData();
        landStore.makeLandsFromMapData();
      });
      return;
    }

    this.makeMap();
  }

  watchMap() {
    mapCollection.watch((mapData) => {
      if (mapData?.data) {
        runInAction(() => {
          this.mapData = JSON.parse(mapData.data);
          troopStore.makeStoreFromMapData();
          landStore.makeLandsFromMapData();
        });
      }
    });
  }

  async fetchGhostPositions() {
    const team = adminStore.activeTeam;
    if (!team) return;

    const ghostPositions = await ghostPositionService.fetchGhostPositions(team);
    if (ghostPositions) {
      runInAction(() => {
        this.ghostPositions = ghostPositions;
      });
    }
  }

  async applyGhostPositions() {
    const team = adminStore.activeTeam;
    if (!team) return;
  
    const ghostPositions = this.ghostPositions[team];
    if (!ghostPositions) return;
  
    runInAction(async () => {
      for (const [unitId, pos] of Object.entries(ghostPositions)) {
        const troop = troopStore.getTroop(unitId);
        if (troop) {
          const targetCellTroops = troopStore.troops.filter(
            (t) => t.position.x === pos.x && t.position.y === pos.y
          );
  
          const enemyTroop = targetCellTroops.find((t) => t.civ !== troop.civ);
  
          if (enemyTroop) {
            await fight(troop, enemyTroop);
            console.log(unitId, pos);
          } else {
            console.log(unitId, pos);
            runInAction(() => {
              troopStore.moveTroop(unitId, pos);
            });
          }
        }
      }
  
      setTimeout(async () => {
        runInAction(() => {
          this.ghostPositions[team] = {};
          this.updateMap();
          this.refreshSelectedCell();
        });
        await this.save();
        await ghostPositionService.clearGhostPositions(team);
      }, 1000);
    });
  }
  

  watchGhostPositions() {
    ghostPositionService.watch((ghostPositionData) => {
      if (ghostPositionData?.data) {
        runInAction(() => {
          this.ghostPositions = ghostPositionData.data;
        });
      }
    });
  }

  async save() {
    await mapCollection.set(JSON.stringify(this.mapData));
  }

  makeMap() {
    runInAction(() => {
      this.mapData = Array.from({ length: this.height }, () =>
        Array.from({ length: this.width }, () => ({} as CellData))
      );
      this.updateMap();
    });
  }

  updateMap() {
    const ghostPositionsJS = toJS(this.ghostPositions);

    const newMap = this.mapData.map((row, y) =>
      row.map((_, x) => {
        const owner = (() => {
          const land = landStore.lands.find(
            (land) => land.position.x === x && land.position.y === y
          );
          if (!land) return undefined;

          const faction = factionStore.factions.find(
            (faction) => faction.name === land.owner
          );
          if (!faction) return undefined;

          return {
            faction: faction,
            position: land.position,
          };
        })();

        const troop = (() => {
          const troop = troopStore.troops.find(
            (troop) => troop.position.x === x && troop.position.y === y
          );
          if (!troop) return undefined;

          return troop;
        })();

        const ghostPosition = (() => {
          for (const [team, units] of Object.entries(ghostPositionsJS)) {
            for (const [unitId, pos] of Object.entries(units as Record<string, Position>)) {
              if (pos.x === x && pos.y === y) {
                return { unitId, position: pos };
              }
            }
          }
          return undefined;
        })();

        return {
          owner: owner,
          troop: troop,
          ghostPosition: ghostPosition,
        } as CellData;
      })
    );

    runInAction(() => {
      this.mapData = newMap;
    });
  }

  setMap(mapData: MapData) {
    runInAction(() => {
      this.mapData = mapData;
    });
  }

  setCell(x: number, y: number, cellData: CellData) {
    runInAction(() => {
      this.mapData[x][y] = cellData;
    });
  }

  async moveHunterToTargetPosition(hunterId: string, targetPosition: Position) {
    console.log(`Starting moveHunterToTargetPosition for hunterId: ${hunterId} to position (${targetPosition.x}, ${targetPosition.y})`);
  
    runInAction(() => {
      console.log('Before moving troop:', toJS(troopStore.getTroop(hunterId)));
      troopStore.moveTroop(hunterId, targetPosition);
      console.log('After moving troop:', toJS(troopStore.getTroop(hunterId)));
    });
  
    runInAction(() => {
      console.log('Before updating map:');
      console.log('Map Data:', toJS(this.mapData));
      this.updateMap();
      console.log('After updating map:');
      console.log('Map Data:', toJS(this.mapData));
      this.refreshSelectedCell();
    });
  
    setTimeout(async () => {
      console.log('Saving map...');
      await this.save();
    }, 1000);
  }
  

  getCell(x: number, y: number) {
    return this.mapData[y][x];
  }

  get getMapData() {
    return this.mapData;
  }

  get getHeigth() {
    return this.height;
  }

  get getWidth() {
    return this.width;
  }

  setSelectedCell(selectedCell: SelectedCell | undefined) {
    this.selectedCell = selectedCell;
  }

  refreshSelectedCell() {
    if (!this.selectedCell) return;

    const { position } = this.selectedCell;
    const cell = this.getCell(position.x, position.y);

    runInAction(() => {
      this.setSelectedCell({
        position,
        cell,
      });
    });
  }

  get getSelectedCell() {
    return this.selectedCell;
  }
}

const mapStore = new MapStore();
export { mapStore };
