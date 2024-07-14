import { makeAutoObservable } from "mobx";
import { Civilisation, Faction } from "./types";

class FactionStore {
  factions: Faction[] = [];
  selectedFactionIndex: number | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchFactions() {
    this.addFaction({
      name: "Imperium & Mechanicus",
      color: "red",
    });
    this.addFaction({
      name: "Orks",
      color: "green",
    });
    this.addFaction({
      name: "Eldars",
      color: "pink",
    });
    this.addFaction({
      name: "Chaos",
      color: "purple",
    });
    this.addFaction({
      name: "Necrons",
      color: "yellow",
    });
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