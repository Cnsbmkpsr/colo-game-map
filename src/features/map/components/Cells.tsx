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
        const validationMessage = troopStore.validateMoveTroop(
          selectedTroop.id,
          newPosition
        );

        if (!validationMessage) {
          troopStore.setGhostTroop(selectedTroop.id, { x, y });

          // Save the ghost position in the database
          await realtimeService.saveGhostPosition(
            selectedTroop.id.toString(),
            { x, y },
            adminStore.activeTeam
          );

          // Optionally update mapStore or other state here
          mapStore.updateMap();
          mapStore.refreshSelectedCell();

          // Exit move mode
          troopStore.setIsTroopMoving(false);
          document.body.style.cursor = "default";
        } else {
          alert(validationMessage);
        }
      }
      return;
    }

    if (troopStore.getFightingTroop) {
      const targetTroop = mapStore.getCell(x, y)?.troop;

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
        Object.entries(
          mapStore.ghostPositions[adminStore.activeTeam] || {}
        ).map(([unitId, pos]) => (
          <mesh key={unitId} position={[pos.x * 1.025, 0.1, pos.y * 1.025]}>
            <boxGeometry args={[1, 0.2, 1]} />
            <meshPhongMaterial
              color="rgba(0, 0, 255, 0.5)"
              transparent
              opacity={0.5}
            />
          </mesh>
        ))}

      {/* Render selected cell highlight */}
      {mapStore.selectedCell && (
        <group
          key="selected-cell-highlight"
          position={[
            mapStore.selectedCell.position.x === 0
              ? mapStore.selectedCell.position.x
              : mapStore.selectedCell.position.x +
                0.025 * mapStore.selectedCell.position.x,
            0.1,
            mapStore.selectedCell.position.y === 0
              ? mapStore.selectedCell.position.y
              : mapStore.selectedCell.position.y +
                0.025 * mapStore.selectedCell.position.y,
          ]}
        >
          {/* Corner frames - 4 L-shaped corners */}

          {/* Top-left corner */}
          <group>
            {/* Horizontal line (left side) */}
            <mesh position={[-0.35, 0, -0.5]}>
              <boxGeometry args={[0.2, 0.05, 0.05]} />
              <meshPhongMaterial
                color="#ffff00"
                emissive="#ffff00"
                emissiveIntensity={0.4}
                transparent
                opacity={0.9}
              />
            </mesh>
            {/* Vertical line (top side) */}
            <mesh position={[-0.5, 0, -0.35]}>
              <boxGeometry args={[0.05, 0.05, 0.2]} />
              <meshPhongMaterial
                color="#ffff00"
                emissive="#ffff00"
                emissiveIntensity={0.4}
                transparent
                opacity={0.9}
              />
            </mesh>
          </group>

          {/* Top-right corner */}
          <group>
            {/* Horizontal line (right side) */}
            <mesh position={[0.35, 0, -0.5]}>
              <boxGeometry args={[0.2, 0.05, 0.05]} />
              <meshPhongMaterial
                color="#ffff00"
                emissive="#ffff00"
                emissiveIntensity={0.4}
                transparent
                opacity={0.9}
              />
            </mesh>
            {/* Vertical line (top side) */}
            <mesh position={[0.5, 0, -0.35]}>
              <boxGeometry args={[0.05, 0.05, 0.2]} />
              <meshPhongMaterial
                color="#ffff00"
                emissive="#ffff00"
                emissiveIntensity={0.4}
                transparent
                opacity={0.9}
              />
            </mesh>
          </group>

          {/* Bottom-right corner */}
          <group>
            {/* Horizontal line (right side) */}
            <mesh position={[0.35, 0, 0.5]}>
              <boxGeometry args={[0.2, 0.05, 0.05]} />
              <meshPhongMaterial
                color="#ffff00"
                emissive="#ffff00"
                emissiveIntensity={0.4}
                transparent
                opacity={0.9}
              />
            </mesh>
            {/* Vertical line (bottom side) */}
            <mesh position={[0.5, 0, 0.35]}>
              <boxGeometry args={[0.05, 0.05, 0.2]} />
              <meshPhongMaterial
                color="#ffff00"
                emissive="#ffff00"
                emissiveIntensity={0.4}
                transparent
                opacity={0.9}
              />
            </mesh>
          </group>

          {/* Bottom-left corner */}
          <group>
            {/* Horizontal line (left side) */}
            <mesh position={[-0.35, 0, 0.5]}>
              <boxGeometry args={[0.2, 0.05, 0.05]} />
              <meshPhongMaterial
                color="#ffff00"
                emissive="#ffff00"
                emissiveIntensity={0.4}
                transparent
                opacity={0.9}
              />
            </mesh>
            {/* Vertical line (bottom side) */}
            <mesh position={[-0.5, 0, 0.35]}>
              <boxGeometry args={[0.05, 0.05, 0.2]} />
              <meshPhongMaterial
                color="#ffff00"
                emissive="#ffff00"
                emissiveIntensity={0.4}
                transparent
                opacity={0.9}
              />
            </mesh>
          </group>
        </group>
      )}

      {/* Render available move positions for the selected troop (using Manhattan distance system) */}
      {mapStore.selectedCell?.cell.troop
          && troopStore.isTroopMoving
          && troopStore.getSelectedTroop
          && troopStore.getSelectedTroop.civ === adminStore.activeTeam
          && troopStore.getAvailableMovePositions().map((pos) => (
              <mesh
                  key={`move-${pos.x}-${pos.y}`}
                  position={[
                    pos.x === 0 ? pos.x : pos.x + 0.025 * pos.x,
                    0.05,
                    pos.y === 0 ? pos.y : pos.y + 0.025 * pos.y
                  ]}
              >
                <boxGeometry args={[1, 0.1, 1]} />
                <meshPhongMaterial
                    color="rgba(0, 255, 0, 0.3)"
                    transparent
                    opacity={0.3}
                />
              </mesh>
          ))}

      {/* Render paths for moved troops, from their current position, to their new ghost posisiton, if it's the playing team */}
        {adminStore.loggedInTeam === adminStore.activeTeam &&
            Object.entries(troopStore.getGhostTroop).map(([unitId, pos]) => {
            const troop = troopStore.getTroop(unitId);
            if (!troop) return null;

            return (
                <mesh
                key={`ghost-${unitId}`}
                position={[
                    pos.x === 0 ? pos.x : pos.x + 0.025 * pos.x,
                    0.05,
                    pos.y === 0 ? pos.y : pos.y + 0.025 * pos.y,
                ]}
                >
                <boxGeometry args={[1, 0.1, 1]} />
                <meshPhongMaterial
                    color="rgba(255, 0, 0, 0.3)"
                    transparent
                    opacity={0.3}
                />
                </mesh>
            );
            })}
    </Instances>
  );
}

export default observer(Cells);
