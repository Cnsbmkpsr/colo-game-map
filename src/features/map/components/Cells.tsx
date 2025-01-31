import { Instance, InstanceProps, Instances } from "@react-three/drei";
import React from "react";
import { observer } from "mobx-react";
import { CellData } from "../types";
import { mapStore } from "../mapStore";
import { infoModalStore } from "../../interface/infoModalStore";
import { troopStore } from "../../game/troopStore";
import { Troop } from "../../game/types";
import { RealtimeService } from "../../../shared/services/realTimeDBService";
import { adminStore } from "../../interface/adminStore";

const realtimeService = new RealtimeService("map");

export type CellArgs = { x: number; y: number; data: CellData } & InstanceProps;

function Cell({ x, y, data, ...rest }: CellArgs) {
  const ref = React.useRef<any>(null);

  const handleClick = async () => {
    if (troopStore.isTroopMoving) {
      const selectedTroop = mapStore.selectedCell?.cell.troop as Troop;
      if (selectedTroop) {
        const newPosition = { x, y };
        const validationMessage = troopStore.validateMoveTroop(selectedTroop.id, newPosition);
  
        if (!validationMessage) {
          troopStore.setGhostTroop(selectedTroop.id, { x, y });
  
          // Save the ghost position in the database
          await realtimeService.saveGhostPosition(selectedTroop.id.toString(), { x, y }, adminStore.activeTeam);
  
          // Optionally update mapStore or other state here
          mapStore.updateMap();
          mapStore.refreshSelectedCell();
  
          // Exit move mode
          troopStore.setIsTroopMoving(false);
        } else {
          alert(validationMessage);
        }
      }
      return;
    }
  
    if (troopStore.getFightingTroop) {
      const targetTroop = mapStore.getCell(x, y).troop;
  
      if (!targetTroop) return;
      if (targetTroop.civ === troopStore.getFightingTroop.civ) return;
  
      troopStore.fight(troopStore.getFightingTroop, targetTroop);
      document.body.style.cursor = "default";
      troopStore.setTroopFight(undefined);
  
      mapStore.updateMap();
      mapStore.refreshSelectedCell();
      return;
    }
  
    // Set the current civilization in the infoModalStore
    const cellCiv = data.owner?.faction ? data.owner.faction.name : null;
    infoModalStore.setCurrentCivilisation(cellCiv);
  
    infoModalStore.onRefresh();
  
    // * Set SELECTED_CELL
    mapStore.setSelectedCell({
      cell: data,
      position: { x, y },
    });
  
    if (!infoModalStore.isOpen) infoModalStore.onOpen(); // Open the modal if not already open
  };
  


  const handleMouseOver = () => {
    if (troopStore.isTroopMoving) {
      const selectedTroop = mapStore.selectedCell?.cell.troop as Troop;
      if (selectedTroop) {
        // Set ghost troop for preview
        troopStore.setGhostTroop(selectedTroop.id, { x, y });
        mapStore.updateMap();
      }
    }
  };

  const handleMouseOut = () => {
    troopStore.clearGhostTroop();
  };

  return (
    <Instance
      {...rest}
      position={[x === 0 ? x : x + 0.025 * x, 0, y === 0 ? y : y + 0.025 * y]}
      color={data?.owner?.faction ? data.owner.faction.color : "#777"}
      onClick={handleClick}
      onPointerOver={handleMouseOver}
      onPointerOut={handleMouseOut}
      ref={ref}
    />
  );
}



function Cells() {
  const size = mapStore.mapData.length;

  return (
    <Instances limit={100 * 100} frustumCulled={false}>
      <boxGeometry args={[1, 0.065, 1, 1]} />
      <meshPhongMaterial opacity={0.33} transparent />
      {Array.from({ length: size }, (_1, i) =>
        Array.from({ length: size }, (_2, j) => (
          <Cell key={`${i}-${j}`} x={j} y={i} data={mapStore.mapData[i][j]} />
        ))
      )}

      {/* Render ghost positions */}
      {adminStore.loggedInTeam === adminStore.activeTeam &&
        Object.entries(mapStore.ghostPositions[adminStore.activeTeam] || {}).map(([unitId, pos]) => (
          <mesh key={unitId} position={[pos.x * 1.025, 0.1, pos.y * 1.025]}>
            <boxGeometry args={[1, 0.2, 1]} />
            <meshPhongMaterial color="rgba(0, 0, 255, 0.5)" transparent opacity={0.5} />
          </mesh>
        ))}
    </Instances>
  );
}

export default observer(Cells);
