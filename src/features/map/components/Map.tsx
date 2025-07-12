import Infanteries from "./Infanteries";
import Elites from "./VaissauxElite";
import Titans from "./CharAssaut";
import Cells from "./Cells";
import MapImagePlane from "./MapImagePlane";

import Structures from "./Structures";


function Map() {
  return (
    <group>
      <Cells />
      <Infanteries />
      <Elites />
      <Titans />

      <Structures />

      <MapImagePlane />
    </group>
  );
}

export default Map;
