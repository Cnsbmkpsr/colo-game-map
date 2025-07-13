export const TROOP_TYPES = {
  INFANTRY: "infanterie",
  ARMORED_UNIT: "Unité blindée",
  AIR_UNIT: "Unité aérienne",
  STRUCTURE: "structure",
} as const;

export const CIVILISATIONS = {
  ELDARS: "Eldars",
  IMPERIUM: "Imperium",
  ORKS: "Orks",
  NECRONS: "Necrons",
  LEAGUES_OF_VOTANN: "Leagues of Votann",
  MECHANICUS: "Mechanicus",
  TAU_EMPIRE: "T'au Empire",
  CHAOS: "Chaos",
  TYRANIDS: "Tyranids",
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
  [CIVILISATIONS.MECHANICUS]: "grey",
} as const;

export const FACTION_DESATURATED_COLORS = {
  [CIVILISATIONS.IMPERIUM]: "#990000",
  [CIVILISATIONS.ORKS]: "#006600",
  [CIVILISATIONS.ELDARS]: "#006666",
  [CIVILISATIONS.CHAOS]: "#4B006E",
  [CIVILISATIONS.NECRONS]: "#999900",
  [CIVILISATIONS.TAU_EMPIRE]: "#994D00",
  [CIVILISATIONS.TYRANIDS]: "#99004D",
  [CIVILISATIONS.LEAGUES_OF_VOTANN]: "#003366",
  [CIVILISATIONS.MECHANICUS]: "#808080",
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
