// src/shared/constants.ts

export const TROOP_TYPES = {
  INFANTRY: "infanterie",
  ARMORED_UNIT: "Unité blindée",
  AIR_UNIT: "Unité aérienne",
  STRUCTURE: "structure",
} as const;

export const CIVILISATIONS = {
  IMPERIUM_MECHANICUS: "Imperium & Mechanicus",
  ORKS: "Orks",
  ELDARS: "Eldars",
  CHAOS: "Chaos",
  NECRONS: "Necrons",
} as const;

export const FACTION_COLORS = {
  IMPERIUM_MECHANICUS: "red",
  ORKS: "green",
  ELDARS: "pink",
  CHAOS: "purple",
  NECRONS: "yellow",
} as const;

export const UNITS_CONFIG = {
  "infanterie": {
      vitDep: 2,
      pv: 100,
      attack: 100,
      defense: 5,
  },
  "Unité blindée": {
      vitDep: 1,
      pv: 200,
      attack: 200,
      defense: 15,
  },
  "Unité aérienne": {
      vitDep: 4,
      pv: 150,
      attack: 150,
      defense: 10,
  },
  "structure": {
      vitDep: 0,
      pv: 300,
      attack: 0,
      defense: 50,
  },
} as const;
