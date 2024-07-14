// src/features/game/types.ts
import { CIVILISATIONS, TROOP_TYPES } from "../../shared/constants";

export type Land = {
  owner: Civilisation;
  position: Position;
};

export type Timestamp = number;

export type Position = {
  x: number;
  y: number;
};

export type TroopTypes = typeof TROOP_TYPES[keyof typeof TROOP_TYPES];

export type Civilisation = typeof CIVILISATIONS[keyof typeof CIVILISATIONS];

export type Troop = {
  id: string | number;
  name: string;
  civ: Civilisation;
  vitDep: number;
  attack: number;
  pv?: number;
  position: Position;
  type: TroopTypes;
  updatedAt: Timestamp;
};

export type Faction = {
  name: Civilisation;
  color: string;
};

export type CellOwner = {
  faction: Faction;
  position: Position;
};
