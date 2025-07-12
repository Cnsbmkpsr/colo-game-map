// src/shared/constants.ts

export const TROOP_TYPES = {
  INFANTRY: "infanterie",
  ARMORED_UNIT: "Unité blindée",
  AIR_UNIT: "Unité aérienne",
  STRUCTURE: "structure",
} as const;

export const CIVILISATIONS = {
  IMPERIUM: "Imperium",
  ORKS: "Orks",
  ELDARS: "Eldars",
  CHAOS: "Chaos",
  NECRONS: "Necrons",
} as const;

export const FACTION_COLORS = {
  IMPERIUM: "red",
  ORKS: "green",
  ELDARS: "teal",
  CHAOS: "purple",
  NECRONS: "yellow",
} as const;

export const UNITS_CONFIG = {
  "infanterie": {
      vitDep: 2,
      pv: 100,
      attack: 100,
  },
  "Unité blindée": {
      vitDep: 1,
      pv: 600,
      attack: 200,
  },
  "Unité aérienne": {
      vitDep: 4,
      pv: 150,
      attack: 150,
  },
  "structure": {
      vitDep: 0,
      pv: 300,
      attack: 0,
  },
} as const;
