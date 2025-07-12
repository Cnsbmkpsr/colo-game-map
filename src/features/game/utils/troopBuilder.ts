import { generateRandomId } from "../../../shared/utils/generateRandomId";
import { Civilisation, Position, Troop, TroopTypes } from "../types";

export const FactionTroopsNames: Record<
  Civilisation,
  Record<TroopTypes, string>
> = {
  "Imperium": {
    infanterie: "Imperial Guards",
    "Unité blindée": "Imperial Knights",
    "Unité aérienne": "Space Marines",
    structure: "Fortress",
  },
  Orks: {
    infanterie: "Boyz",
    "Unité blindée": "Gargants",
    "Unité aérienne": "Fightas",
    structure: "Ork Fort",
  },
  Eldars: {
    infanterie: "Guardians",
    "Unité blindée": "Wraithknights",
    "Unité aérienne": "Vypers",
    structure: "Webway Gate",
  },
  Chaos: {
    infanterie: "Cultists",
    "Unité blindée": "Daemon Engines",
    "Unité aérienne": "Heldrakes",
    structure: "Dark Fortress",
  },
  Necrons: {
    infanterie: "Necron Warriors",
    "Unité blindée": "Monoliths",
    "Unité aérienne": "Doom Scythes",
    structure: "Tomb",
  },
};

export const FactionTroopsStats: Record<
  Civilisation,
  Record<TroopTypes, Omit<Troop, "id" | "position" | "name" | "updatedAt" | "pv">>
> = {
  "Imperium": {
    infanterie: {
      civ: "Imperium",
      vitDep: 1,
      type: "infanterie",
      attack: 10,
    },
    "Unité blindée": {
      civ: "Imperium",
      vitDep: 1,
      type: "Unité blindée",
      attack: 20,
    },
    "Unité aérienne": {
      civ: "Imperium",
      vitDep: 1,
      type: "Unité aérienne",
      attack: 15,
    },
    structure: {
      civ: "Imperium",
      vitDep: 0,
      type: "structure",
      attack: 0,
    },
  },
  Orks: {
    infanterie: {
      civ: "Orks",
      vitDep: 1,
      type: "infanterie",
      attack: 10,
    },
    "Unité blindée": {
      civ: "Orks",
      vitDep: 1,
      type: "Unité blindée",
      attack: 20,
    },
    "Unité aérienne": {
      civ: "Orks",
      vitDep: 1,
      type: "Unité aérienne",
      attack: 15,
    },
    structure: {
      civ: "Orks",
      vitDep: 0,
      type: "structure",
      attack: 0,
    },
  },
  Eldars: {
    infanterie: {
      civ: "Eldars",
      vitDep: 1,
      type: "infanterie",
      attack: 10,
    },
    "Unité blindée": {
      civ: "Eldars",
      vitDep: 1,
      type: "Unité blindée",
      attack: 20,
    },
    "Unité aérienne": {
      civ: "Eldars",
      vitDep: 1,
      type: "Unité aérienne",
      attack: 15,
    },
    structure: {
      civ: "Eldars",
      vitDep: 0,
      type: "structure",
      attack: 0,
    },
  },
  Chaos: {
    infanterie: {
      civ: "Chaos",
      vitDep: 1,
      type: "infanterie",
      attack: 10,
    },
    "Unité blindée": {
      civ: "Chaos",
      vitDep: 1,
      type: "Unité blindée",
      attack: 20,
    },
    "Unité aérienne": {
      civ: "Chaos",
      vitDep: 1,
      type: "Unité aérienne",
      attack: 15,
    },
    structure: {
      civ: "Chaos",
      vitDep: 0,
      type: "structure",
      attack: 0,
    },
  },
  Necrons: {
    infanterie: {
      civ: "Necrons",
      vitDep: 1,
      type: "infanterie",
      attack: 10,
    },
    "Unité blindée": {
      civ: "Necrons",
      vitDep: 1,
      type: "Unité blindée",
      attack: 20,
    },
    "Unité aérienne": {
      civ: "Necrons",
      vitDep: 1,
      type: "Unité aérienne",
      attack: 15,
    },
    structure: {
      civ: "Necrons",
      vitDep: 0,
      type: "structure",
      attack: 0,
    },
  },
};

export type BuildTroopParams = {
  civ: Civilisation;
  type: TroopTypes;
  position: Position;
  pv?: number;
  name?: string;
};

export const buildTroop = ({
  civ,
  type,
  position,
  pv,
  name,
}: BuildTroopParams): Troop => {
  const troop = FactionTroopsStats[civ][type];
  return {
    ...troop,
    name: name ?? FactionTroopsNames[civ][type],
    id: generateRandomId(),
    pv,
    updatedAt: Date.now(),
    position,
  };
};