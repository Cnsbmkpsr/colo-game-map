import { Civilisation } from "../game/types";

export const CONFIG = {
  roundDuration: 60000, // 60 seconds in milliseconds
  teams: [
    "Imperium",
    "Orks",
    "Eldars",
    "Chaos",
    "Necrons",
  ] as Civilisation[],
  teamCredentials: {
    "Imperium": { id: "team1", password: "fromjapan" },
    "Orks": { id: "team2", password: "0rks" },
    "Eldars": { id: "team3", password: "Aabc54321z" },
    "Chaos": { id: "team4", password: "pommedeterre" },
    "Necrons": { id: "team5", password: "niké" },
  },
};
