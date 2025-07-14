import Infanteries from "./Infanteries";
import Elites from "./VaissauxElite";
import Titans from "./CharAssaut";
import Cells from "./Cells";
import MapImagePlane from "./MapImagePlane";
import MovementLines from "./MovementLines";

import Structures from "./Structures";


function Map() {
  return (
    <group>
      <Cells />
      <Infanteries />
      <Elites />
      <Titans />

      <Structures />
      <MovementLines />

      <MapImagePlane />
    </group>
  );
}

export default Map;
