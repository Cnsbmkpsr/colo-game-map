/* eslint-disable react-hooks/exhaustive-deps */
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Vector3 } from "three";
import Scene from "./features/map/components/Scene";
import Interface from "./features/interface/components/Interface";
import { useEffect } from "react";
import { observer } from "mobx-react";
import { mapStore } from "./features/map/mapStore";
import { factionStore } from "./features/game/factionStore";
import { troopStore } from "./features/game/troopStore";
import { adminStore } from "./features/interface/adminStore";

function App() {
  useEffect(() => {
    (async function () {
      await Promise.all([
        mapStore.fetchMap(),
        // landStore.fetchLands(),
        // troopStore.fetchTroops(),
      ]);
      factionStore.fetchFactions();
    })();
  }, []);

  useEffect(() => {
    if (adminStore.getAdmin) return;

    mapStore.watchMap();
  }, [adminStore.getAdmin]);

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      if (!adminStore.getAdmin) return;
      if (event.key.toLowerCase() === "n") {
        factionStore.selectFaction("Necrons");
      }
      if (event.key.toLowerCase() === "c") {
        factionStore.selectFaction("Chaos");
      }
      if (event.key.toLowerCase() === "o") {
        factionStore.selectFaction("Orks");
      }
      if (event.key.toLowerCase() === "i") {
        factionStore.selectFaction("Imperium");
      }
      if (event.key.toLowerCase() === "s") {
        await mapStore.save();
      }
      if (event.key.toLowerCase() === "m") {
        const cell = mapStore.getSelectedCell?.cell;
        if (!cell?.troop) return;
        troopStore.setIsTroopMoving(true);
      }
      if (event.key.toLowerCase() === "f") {
        const troop = mapStore.getSelectedCell?.cell.troop;

        if (!troop) return;

        document.body.style.cursor = "crosshair";
        troopStore.setTroopFight(troop);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <Canvas
        frameloop="demand"
        camera={{
          position: [5, 30, 30],
          fov: 60,
        }}
        style={{
          height: "100vh",
          width: "100vw",
        }}
      >
        <Scene />

        {/* Three JS Elements */}
        {/* eslint-disable-next-line react/no-unknown-property */}
        <directionalLight position={[0, 10, 0]} intensity={1.2} />
        {/* eslint-disable-next-line react/no-unknown-property */}
        <ambientLight intensity={0.5} />
        <OrbitControls target={new Vector3(15, 0, 15)} />
      </Canvas>
      <Interface />
    </>
  );
}

export default observer(App);
