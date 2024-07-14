import { MapData } from "../../map/types";

export function buildLandsFromMapData(mapData: MapData) {
  return mapData
    .flat()
    .filter((cell) => cell.owner)
    .map((cell) => cell.owner);
}
