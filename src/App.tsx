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
import { CIVILISATIONS } from "./shared/constants";

function App() {
  useEffect(() => {
    (async function () {
      await Promise.all([mapStore.fetchMap()]);
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
      switch (event.key.toLowerCase()) {
        case "n":
          factionStore.selectFaction(CIVILISATIONS.NECRONS);
          break;
        case "c":
          factionStore.selectFaction(CIVILISATIONS.CHAOS);
          break;
        case "o":
          factionStore.selectFaction(CIVILISATIONS.ORKS);
          break;
        case "i":
          factionStore.selectFaction(CIVILISATIONS.IMPERIUM);
          break;
        case "e":
          factionStore.selectFaction(CIVILISATIONS.ELDARS);
          break;
        case "t":
          factionStore.selectFaction(CIVILISATIONS.TAU_EMPIRE);
          break;
        case "y":
          factionStore.selectFaction(CIVILISATIONS.TYRANNIDES);
          break;
        case "l":
          factionStore.selectFaction(CIVILISATIONS.LEAGUES_OF_VOTANN);
          break;
        case "s":
          await mapStore.save();
          break;
        case "m": {
          const cell = mapStore.getSelectedCell?.cell;
          if (!cell?.troop) return;
          troopStore.setIsTroopMoving(true);
          break;
        }
        case "f": {
          const troop = mapStore.getSelectedCell?.cell.troop;
          if (!troop) return;
          document.body.style.cursor = "crosshair";
          troopStore.setTroopFight(troop);
          break;
        }
        default:
          break;
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
        <directionalLight position={[0, 10, 0]} intensity={1.2} />
        <ambientLight intensity={0.5} />
        <OrbitControls target={new Vector3(15, 0, 15)} />
      </Canvas>
      <Interface />
    </>
  );
}

export default observer(App);
