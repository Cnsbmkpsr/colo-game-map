import { Civilisation } from "../game/types";
import { CIVILISATIONS } from "../../shared/constants";

export const CONFIG = {
  roundDuration: 60000,
  teams: [
    CIVILISATIONS.IMPERIUM,
    CIVILISATIONS.ORKS,
    CIVILISATIONS.ELDARS,
    CIVILISATIONS.CHAOS,
    CIVILISATIONS.NECRONS,
    CIVILISATIONS.TAU_EMPIRE,
    CIVILISATIONS.TYRANIDS,
    CIVILISATIONS.LEAGUES_OF_VOTANN,
    CIVILISATIONS.DRUKHARI,
  ] as Civilisation[],
  teamCredentials: {
    [CIVILISATIONS.IMPERIUM]: { id: "team1", password: "fromjapan" },
    [CIVILISATIONS.ORKS]: { id: "team2", password: "0rks" },
    [CIVILISATIONS.ELDARS]: { id: "team3", password: "Aabc54321z" },
    [CIVILISATIONS.CHAOS]: { id: "team4", password: "pommedeterre" },
    [CIVILISATIONS.NECRONS]: { id: "team5", password: "niké" },
    [CIVILISATIONS.TAU_EMPIRE]: { id: "team6", password: "forthegreatergood" },
    [CIVILISATIONS.TYRANIDS]: { id: "team7", password: "nomnomnom" },
    [CIVILISATIONS.LEAGUES_OF_VOTANN]: {
      id: "team8",
      password: "rockandstone",
    },
    [CIVILISATIONS.DRUKHARI]: { id: "team9", password: "darkness" },
  },
};
