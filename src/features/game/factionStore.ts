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
    this.addFaction({
      name: CIVILISATIONS.IMPERIUM,
      color: FACTION_COLORS.Imperium,
    });
    this.addFaction({
      name: CIVILISATIONS.ORKS,
      color: FACTION_COLORS.Orks,
    });
    this.addFaction({
      name: CIVILISATIONS.ELDARS,
      color: FACTION_COLORS.Eldars,
    });
    this.addFaction({
      name: CIVILISATIONS.CHAOS,
      color: FACTION_COLORS.Chaos,
    });
    this.addFaction({
      name: CIVILISATIONS.NECRONS,
      color: FACTION_COLORS.Necrons,
    });
    this.addFaction({
      name: CIVILISATIONS.TAU_EMPIRE,
      color: FACTION_COLORS["T'au Empire"],
    });
    this.addFaction({
      name: CIVILISATIONS.TYRANNIDES,
      color: FACTION_COLORS.Tyranids,
    });
    this.addFaction({
      name: CIVILISATIONS.LEAGUES_OF_VOTANN,
      color: FACTION_COLORS["Leagues of Votann"],
    });
    this.addFaction({
      name: CIVILISATIONS.DRUKHARI,
      color: FACTION_COLORS.Drukhari,
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
