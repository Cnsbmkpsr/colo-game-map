import { CellOwner, Position, Troop } from "../game/types";

export type MapData = CellData[][];

export type CellData = {
  owner?: CellOwner;
  troop?: Troop;
  ghostPosition?: { unitId: string; position: Position }; 
};

export type SelectedCell = {
  cell: CellData;
  position: Position;
};