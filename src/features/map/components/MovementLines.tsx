import {observer} from "mobx-react";
import {troopStore} from "../../game/troopStore";
import {adminStore} from "../../interface/adminStore";
import {mapStore} from "../mapStore";
import {Line} from "@react-three/drei";
import * as THREE from "three";

function MovementLines() {
    return (
        <group>
            {/* Render movement lines for persistent ghost positions (from mapStore) */}
            {adminStore.loggedInTeam === adminStore.activeTeam &&
                Object.entries(mapStore.ghostPositions[adminStore.activeTeam] || {}).map(([unitId, ghostPosition]) => {
                    const originalTroop = troopStore.getTroop(unitId);
                    if (!originalTroop) return null;

                    // Calculate start and end positions
                    const startX = originalTroop.position.x === 0
                        ? originalTroop.position.x
                        : originalTroop.position.x + 0.025 * originalTroop.position.x;
                    const startZ = originalTroop.position.y === 0
                        ? originalTroop.position.y
                        : originalTroop.position.y + 0.025 * originalTroop.position.y;

                    const endX = ghostPosition.x === 0
                        ? ghostPosition.x
                        : ghostPosition.x + 0.025 * ghostPosition.x;
                    const endZ = ghostPosition.y === 0
                        ? ghostPosition.y
                        : ghostPosition.y + 0.025 * ghostPosition.y;

                    // Don't render line if positions are the same
                    if (startX === endX && startZ === endZ) return null;

                    const points = [
                        new THREE.Vector3(startX, 0.2, startZ),
                        new THREE.Vector3(endX, 0.2, endZ)
                    ];

                    return (
                        <Line
                            key={`movement-line-${unitId}`}
                            points={points}
                            color="#00ffff"
                            lineWidth={3}
                            dashed={true}
                            dashSize={0.1}
                            gapSize={0.05}
                        />
                    );
                })}

            {/* Render movement lines for temporary ghost positions (during move mode) */}
            {Object.entries(troopStore.getGhostTroop).map(([key, ghostTroop]) => {
                const originalTroop = troopStore.getTroop(ghostTroop.id);
                if (!originalTroop) return null;

                // Calculate start and end positions
                const startX = originalTroop.position.x === 0
                    ? originalTroop.position.x
                    : originalTroop.position.x + 0.025 * originalTroop.position.x;
                const startZ = originalTroop.position.y === 0
                    ? originalTroop.position.y
                    : originalTroop.position.y + 0.025 * originalTroop.position.y;

                const endX = ghostTroop.position.x === 0
                    ? ghostTroop.position.x
                    : ghostTroop.position.x + 0.025 * ghostTroop.position.x;
                const endZ = ghostTroop.position.y === 0
                    ? ghostTroop.position.y
                    : ghostTroop.position.y + 0.025 * ghostTroop.position.y;

                // Don't render line if positions are the same
                if (startX === endX && startZ === endZ) return null;

                const points = [
                    new THREE.Vector3(startX, 0.2, startZ),
                    new THREE.Vector3(endX, 0.2, endZ)
                ];

                return (
                    <Line
                        key={`temp-movement-line-${key}`}
                        points={points}
                        color="#ffff00"
                        lineWidth={2}
                        dashed={true}
                        dashSize={0.08}
                        gapSize={0.04}
                    />
                );
            })}
        </group>
    );
}

export default observer(MovementLines);
