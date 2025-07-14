import { Civilisation } from "../game/types";
import { CIVILISATIONS } from "../../shared/constants";

export const CONFIG = {
  roundDuration: 20000,
  teams: [
    CIVILISATIONS.ELDARS,
    CIVILISATIONS.IMPERIUM,
    CIVILISATIONS.ORKS,
    CIVILISATIONS.NECRONS,
    CIVILISATIONS.LEAGUES_OF_VOTANN,
    CIVILISATIONS.MECHANICUS,
    CIVILISATIONS.TAU_EMPIRE,
    CIVILISATIONS.TYRANIDS,
    CIVILISATIONS.CHAOS,
  ] as Civilisation[],
  teamCredentials: {
    [CIVILISATIONS.IMPERIUM]: { id: "team1", password: "team" },
    [CIVILISATIONS.ORKS]: { id: "team2", password: "team" },
    [CIVILISATIONS.ELDARS]: { id: "team3", password: "team" },
    [CIVILISATIONS.MECHANICUS]: { id: "team4", password: "team" },
    [CIVILISATIONS.NECRONS]: { id: "team5", password: "team" },
    [CIVILISATIONS.TAU_EMPIRE]: { id: "team6", password: "team" },
    [CIVILISATIONS.TYRANIDS]: { id: "team7", password: "team" },
    [CIVILISATIONS.LEAGUES_OF_VOTANN]: {
      id: "team8",
      password: "team",
    },
    [CIVILISATIONS.CHAOS]: { id: "team9", password: "team" },
  },
};
