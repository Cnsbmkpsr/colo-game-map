import { makeAutoObservable } from "mobx";
import { Civilisation, Faction } from "./types";
import { CIVILISATIONS, FACTION_COLORS } from "../../shared/constants";

class FactionStore {
  factions: Faction[] = [];
  selectedFactionIndex: number | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchFactions() {
    for (const faction of Object.values(CIVILISATIONS)) {
      this.addFaction({
        name: faction,
        color: FACTION_COLORS[faction],
      });
    }
  }

  selectFaction(name: Civilisation) {
    this.selectedFactionIndex = this.factions.findIndex(
      (faction) => faction.name === name
    );
  }

  addFaction(faction: Faction) {
    this.factions.push(faction);
  }

  removeFaction(index: number) {
    this.factions.splice(index, 1);
  }

  get getSelectedFaction() {
    if (this.selectedFactionIndex === null) return null;
    return this.factions[this.selectedFactionIndex];
  }
}

const factionStore = new FactionStore();

export { factionStore };
