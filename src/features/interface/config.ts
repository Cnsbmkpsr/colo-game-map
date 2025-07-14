import { Civilisation } from "../game/types";
import { CIVILISATIONS } from "../../shared/constants";

export const CONFIG = {
  roundDuration: 25000,
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
    [CIVILISATIONS.IMPERIUM]: {id: "team1", password: "K7X9M"},
    [CIVILISATIONS.ORKS]: {id: "team2", password: "Z3K8W"},
    [CIVILISATIONS.ELDARS]: {id: "team3", password: "M4Q6F"},
    [CIVILISATIONS.MECHANICUS]: {id: "team4", password: "N2V5O"},
    [CIVILISATIONS.NECRONS]: {id: "team5", password: "X6Y4T"},
    [CIVILISATIONS.TAU_EMPIRE]: {id: "team6", password: "I9B3S"},
    [CIVILISATIONS.TYRANIDS]: {id: "team7", password: "E8J7H"},
    [CIVILISATIONS.LEAGUES_OF_VOTANN]: {
      id: "team8",
      password: "K5P2V",
    },
    [CIVILISATIONS.CHAOS]: {id: "team9", password: "R1D4Q"},
  }
};
