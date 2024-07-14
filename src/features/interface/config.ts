import { Civilisation } from "../game/types";

export const CONFIG = {
  roundDuration: 6000, // 60 seconds in milliseconds
  teams: [
    "Imperium & Mechanicus",
    "Orks",
    "Eldars",
    "Chaos",
    "Necrons",
  ] as Civilisation[],
  teamCredentials: {
    "Imperium & Mechanicus": { id: "team1", password: "pass1" },
    "Orks": { id: "team2", password: "pass2" },
    "Eldars": { id: "team3", password: "pass3" },
    "Chaos": { id: "team4", password: "pass4" },
    "Necrons": { id: "team5", password: "pass5" },
  },
};
