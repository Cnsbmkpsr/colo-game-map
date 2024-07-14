import Infanteries from "./Infanteries";
import Elites from "./VaissauxElite";
import Titans from "./CharAssaut";
import Cells from "./Cells";
import MapImagePlane from "./MapImagePlane";
import Mobs from "./Mobs";
import Structures from "./Structures";
import Scouts from "./Scouts";

function Map() {
  return (
    <group position={[-10, 0, -10]}>
      <Cells />
      <Infanteries />
      <Elites />
      <Titans />
      <Mobs />
      <Structures />
      <Scouts />
      <MapImagePlane />
    </group>
  );
}

export default Map;
