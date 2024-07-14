import { MapData } from "../../map/types";

export function buildTroopsFromMapData(mapData: MapData) {
  return mapData
    .flat()
    .filter((cell) => cell.troop)
    .map((cell) => cell.troop);
}
