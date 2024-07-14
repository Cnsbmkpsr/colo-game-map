import { CIVILISATIONS, TROOP_TYPES } from "../../../shared/constants";
import { troopStore } from "../../game/troopStore";
import { adminStore } from "../adminStore";

import { CONFIG } from "../config";


jest.useFakeTimers();

describe("AdminStore Round System", () => {
  beforeEach(() => {
    adminStore.isPaused = true;
    adminStore.currentTeamIndex = 0;
    adminStore.activeTeamIndex = 0;
    adminStore.roundTimer = null;
    adminStore.roundStartTime = Date.now();
    adminStore.remainingTime = CONFIG.roundDuration;
    adminStore.loggedInTeam = null;
    jest.clearAllTimers();
    troopStore.troops.length = 0;
  });

  it("should start rounds and switch teams correctly", () => {
    adminStore.startRounds();

    expect(adminStore.isPaused).toBe(false);
    expect(adminStore.roundTimer).not.toBeNull();
    
    // Fast forward until the round timer triggers
    jest.advanceTimersByTime(CONFIG.roundDuration);

    expect(adminStore.activeTeamIndex).toBe(1);
  });

  it("should pause rounds and retain remaining time", () => {
    adminStore.startRounds();
    
    // Fast forward halfway through the round
    jest.advanceTimersByTime(CONFIG.roundDuration / 2);

    adminStore.pauseRounds();

    expect(adminStore.isPaused).toBe(true);
    expect(adminStore.roundTimer).toBeNull();
    expect(adminStore.remainingTime).toBeLessThan(CONFIG.roundDuration);
  });

  it("should allow active team to move units", () => {
    adminStore.startRounds();
    adminStore.setTeamLogin(CIVILISATIONS.ORKS);

    // Ensure the active team can move units
    const testTroop = {
      id: '1',
      name: 'Test Troop',
      civ: CIVILISATIONS.ORKS,
      vitDep: 1,
      pv: 100,
      attack: 10,
      position: { x: 0, y: 0 },
      type: TROOP_TYPES.INFANTRY,
      updatedAt: Date.now(),
    };

    troopStore.addTroop(testTroop);
    troopStore.moveUnitsForActiveTeam();

    expect(troopStore.getTroop('1')?.position).toEqual({ x: 0, y: 0 });
  });

  it("should not allow non-active team to move units", () => {
    adminStore.startRounds();
    adminStore.setTeamLogin(CIVILISATIONS.ELDARS);

    // Ensure the non-active team cannot move units
    const testTroop = {
      id: '1',
      name: 'Test Troop',
      civ: CIVILISATIONS.ORKS,
      vitDep: 1,
      pv: 100,
      attack: 10,
      position: { x: 0, y: 0 },
      type: TROOP_TYPES.INFANTRY,
      updatedAt: Date.now(),
    };

    troopStore.addTroop(testTroop);
    troopStore.moveUnitsForActiveTeam();

    expect(troopStore.getTroop('1')?.position).toEqual({ x: 0, y: 0 });
  });
});