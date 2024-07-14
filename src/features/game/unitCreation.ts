
import { UNITS_CONFIG } from "../../shared/constants";
import { Civilisation, Position, Troop } from "./types";

export function createGroundUnit(id: string, name: string, civ: Civilisation, position: Position): Troop {
  return {
    id,
    name,
    civ,
    vitDep: UNITS_CONFIG.infanterie.vitDep,
    pv: UNITS_CONFIG.infanterie.pv,
    attack: UNITS_CONFIG.infanterie.attack,
    position,
    type: "infanterie",
    updatedAt: Date.now(),
  };
}

export function createHeavyUnit(id: string, name: string, civ: Civilisation, position: Position): Troop {
  return {
    id,
    name,
    civ,
    vitDep: UNITS_CONFIG["Unité blindée"].vitDep,
    pv: UNITS_CONFIG["Unité blindée"].pv,
    attack: UNITS_CONFIG["Unité blindée"].attack,
    position,
    type: "Unité blindée",
    updatedAt: Date.now(),
  };
}

export function createFlyingUnit(id: string, name: string, civ: Civilisation, position: Position): Troop {
  return {
    id,
    name,
    civ,
    vitDep: UNITS_CONFIG["Unité aérienne"].vitDep,
    pv: UNITS_CONFIG["Unité aérienne"].pv,
    attack: UNITS_CONFIG["Unité aérienne"].attack,
    position,
    type: "Unité aérienne",
    updatedAt: Date.now(),
  };
}
