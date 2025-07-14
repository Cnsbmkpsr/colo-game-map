/* eslint-disable @typescript-eslint/no-explicit-any */
import { factionStore } from "../../game/factionStore";
import { landStore } from "../../game/landStore";
import { mapStore } from "../../map/mapStore";
import { troopStore } from "../../game/troopStore";
import { buildTroop } from "../../game/utils/troopBuilder";
import { selectRandomVille } from "../utils/villeNames";
import { TROOP_TYPES } from "../../../shared/constants";
import { infoModalStore } from "../infoModalStore";

const useInfoModalActions = () => {
  const handleBuyLand = async () => {
    if (factionStore.getSelectedFaction === null) return;
    if (!mapStore.selectedCell?.position) return;

    infoModalStore.setCurrentCivilisation(factionStore.getSelectedFaction.name);

    landStore.addLand({
      owner: factionStore.getSelectedFaction.name,
      position: mapStore.selectedCell?.position,
    });

    mapStore.updateMap();
    mapStore.refreshSelectedCell();

    await mapStore.save();
  };

  const handleBuyInfantry = async () => {
    if (factionStore.getSelectedFaction === null) return;
    if (!mapStore.selectedCell?.position) return;
    if (!landStore.isOwnedByCurrentFaction) return;

    troopStore.addTroop(
      buildTroop({
        civ: factionStore.getSelectedFaction.name,
        type: "infanterie",
        position: mapStore.selectedCell.position,
      })
    );

    mapStore.updateMap();
    mapStore.refreshSelectedCell();

    setTimeout(async () => {
      await mapStore.save();
    }, 1000);
  };

  const handleBuyVaisseauElite = () => {
    if (factionStore.getSelectedFaction === null) return;
    if (!mapStore.selectedCell?.position) return;
    if (!landStore.isOwnedByCurrentFaction) return;

    troopStore.addTroop(
      buildTroop({
        civ: factionStore.getSelectedFaction.name,
        type: TROOP_TYPES.ARMORED_UNIT,
        position: mapStore.selectedCell.position,
      })
    );

    mapStore.updateMap();
    mapStore.refreshSelectedCell();
  };

  const handleBuyCharAssaut = () => {
    if (factionStore.getSelectedFaction === null) return;
    if (!mapStore.selectedCell?.position) return;
    if (!landStore.isOwnedByCurrentFaction) return;

    troopStore.addTroop(
      buildTroop({
        civ: factionStore.getSelectedFaction.name,
        type: TROOP_TYPES.AIR_UNIT,
        position: mapStore.selectedCell.position,
      })
    );

    mapStore.updateMap();
    mapStore.refreshSelectedCell();
  };

  const handleBuyScout = () => {
    if (factionStore.getSelectedFaction === null) return;
    if (!mapStore.selectedCell?.position) return;
    if (!landStore.isOwnedByCurrentFaction) return;

    troopStore.addTroop(
      buildTroop({
        civ: factionStore.getSelectedFaction.name,
        type: TROOP_TYPES.AIR_UNIT,
        position: mapStore.selectedCell.position,
      })
    );

    mapStore.updateMap();
    mapStore.refreshSelectedCell();
  };

  const handleMoveTroop = () => {
    troopStore.setIsTroopMoving(true);
  };

  const handleFightTroop = () => {
    const troop = mapStore.getSelectedCell?.cell.troop;

    if (!troop) return;

    document.body.style.cursor = "crosshair";
    troopStore.setTroopFight(troop);
  };

  const handleRemoveTroop = () => {
    const troop = mapStore.getSelectedCell?.cell.troop;

    if (!troop) return;

    troopStore.removeTroop(troop.id);
    mapStore.updateMap();
    mapStore.refreshSelectedCell();
  };

  const handleRemoveLand = () => {
    const landPosition = mapStore.getSelectedCell?.position;
    const landIndex = landStore.getLands.findIndex(
      (land) =>
        land.position.x === landPosition?.x &&
        land.position.y === landPosition?.y
    );

    if (landIndex === -1) return;

    landStore.removeLand(landIndex);

    mapStore.updateMap();
    mapStore.refreshSelectedCell();
  };

  const handleBuyVille = (pv: number) => {
    if (factionStore.getSelectedFaction === null) return;

    const position = mapStore.getSelectedCell?.position;

    if (!position) return;

    const ville = buildTroop({
      civ: factionStore.getSelectedFaction.name,
      type: "structure",
      position,
      pv,
      name: selectRandomVille([]),
    });

    troopStore.addTroop(ville);

    mapStore.updateMap();
    mapStore.refreshSelectedCell();
  };

  const handleSetPvs = (pv: number) => {
    const troop = mapStore.getSelectedCell?.cell.troop;

    if (!troop) return;

    troopStore.setTroop(troop.id, { ...troop, pv });

    mapStore.updateMap();
    mapStore.refreshSelectedCell();
  };

  return {
    handleBuyLand,
    handleBuyInfantry,
    handleBuyVaisseauElite,
    handleBuyCharAssaut,
    handleMoveTroop,
    handleFightTroop,
    handleRemoveLand,
    handleRemoveTroop,
    handleBuyVille,
    handleBuyScout,
    handleSetPvs,
  };
};

export default useInfoModalActions;
