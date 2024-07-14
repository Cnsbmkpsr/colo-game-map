import { createGroundUnit, createHeavyUnit, createFlyingUnit } from "./unitCreation";
import { Troop, Civilisation, Position } from "./types";

class TroopCreation {
  createGroundUnit(id: string, name: string, civ: Civilisation, position: Position): Troop {
    return createGroundUnit(id, name, civ, position);
  }

  createHeavyUnit(id: string, name: string, civ: Civilisation, position: Position): Troop {
    return createHeavyUnit(id, name, civ, position);
  }

  createFlyingUnit(id: string, name: string, civ: Civilisation, position: Position): Troop {
    return createFlyingUnit(id, name, civ, position);
  }
}

const troopCreation = new TroopCreation();
export { troopCreation };
