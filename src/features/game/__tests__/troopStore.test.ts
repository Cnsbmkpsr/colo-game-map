
import { troopStore } from "../troopStore";
import { Troop } from "../types";

describe('TroopStore', () => {
  const testTroop: Troop = {
    id: '1',
    name: 'Test Troop',
    civ: 'Orks',
    vitDep: 1,
    pv: 100,
    attack: 10,
    position: { x: 0, y: 0 },
    type: 'infanterie',
    updatedAt: Date.now(),
  };

  afterEach(() => {
    // Clear all troops after each test
    troopStore.troops.splice(0, troopStore.troops.length);
  });

  it('should add a troop', () => {
    troopStore.addTroop(testTroop);
    const addedTroop = troopStore.troops.find(troop => troop.id === testTroop.id);
    expect(addedTroop).toMatchObject(testTroop);
  });

  it('should remove a troop', () => {
    troopStore.addTroop(testTroop);
    troopStore.removeTroop(testTroop.id);
    expect(troopStore.getTroop(testTroop.id)).toBeUndefined();
  });

  it('should retrieve a troop by id', () => {
    troopStore.addTroop(testTroop);
    const retrievedTroop = troopStore.getTroop(testTroop.id);
    expect(retrievedTroop).toEqual(testTroop);
  });

  it('should set a troop', () => {
    troopStore.addTroop(testTroop);
    const updatedTroop: Troop = { ...testTroop, name: 'Updated Troop' };
    troopStore.setTroop(testTroop.id, updatedTroop);
    expect(troopStore.getTroop(testTroop.id)?.name).toBe('Updated Troop');
  });

  it('should create ground unit', () => {
    const groundUnit = troopStore.createGroundUnit('2', 'Ground Unit', 'Orks', { x: 1, y: 1 });
    expect(groundUnit.type).toBe('infanterie');
  });

  it('should create heavy unit', () => {
    const heavyUnit = troopStore.createHeavyUnit('3', 'Heavy Unit', 'Orks', { x: 1, y: 1 });
    expect(heavyUnit.type).toBe('Unité blindée');
  });

  it('should create flying unit', () => {
    const flyingUnit = troopStore.createFlyingUnit('4', 'Flying Unit', 'Orks', { x: 1, y: 1 });
    expect(flyingUnit.type).toBe('Unité aérienne');
  });



});