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
  TAU_EMPIRE: "T'au Empire",
  TYRANIDS: "Tyranids",
  LEAGUES_OF_VOTANN: "Leagues of Votann",
  DRUKHARI: "Drukhari",
} as const;

export const FACTION_COLORS = {
  [CIVILISATIONS.IMPERIUM]: "red",
  [CIVILISATIONS.ORKS]: "green",
  [CIVILISATIONS.ELDARS]: "teal",
  [CIVILISATIONS.CHAOS]: "purple",
  [CIVILISATIONS.NECRONS]: "yellow",
  [CIVILISATIONS.TAU_EMPIRE]: "orange",
  [CIVILISATIONS.TYRANIDS]: "pink",
  [CIVILISATIONS.LEAGUES_OF_VOTANN]: "blue",
  [CIVILISATIONS.DRUKHARI]: "#6A0DAD",
} as const;

export const UNITS_CONFIG = {
  infanterie: {
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
  structure: {
    vitDep: 0,
    pv: 300,
    attack: 0,
  },
} as const;
