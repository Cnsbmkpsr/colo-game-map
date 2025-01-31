import { VStack, Button, ButtonGroup, Input, Select } from "@chakra-ui/react";
import { observer } from "mobx-react";
import { useState } from "react";
import { troopStore } from "../../../game/troopStore";
import { Position } from "../../../game/types";
import { infoModalStore } from "../../infoModalStore";
import { mapStore } from "../../../map/mapStore";

type InfoModalBuyTroopsActionsProps = {
  factionColor: string;
};

const InfoModalBuyTroopsActions = ({
  factionColor,
}: InfoModalBuyTroopsActionsProps) => {
  const [selectedUnitType, setSelectedUnitType] = useState("ground");
  const [pv, setPv] = useState(0);

  const handleChangePv = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPv(Number(e.target.value));
  };

  const handleUnitTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUnitType(e.target.value);
  };

  const handleBuyUnit = async () => {
    const id = `${selectedUnitType}-${Date.now()}`;
    const name = `${selectedUnitType.charAt(0).toUpperCase() + selectedUnitType.slice(1)} Unit`;
    const position: Position = mapStore.selectedCell?.position || { x: 0, y: 0 }; // Use selected cell position or default
    const selectedCiv = infoModalStore.currentCivilisation || "Orks"; // Use current civilization or default

    if (selectedUnitType === "ground") {
      troopStore.addTroop(troopStore.createGroundUnit(id, name, selectedCiv, position));
    } else if (selectedUnitType === "heavy") {
      troopStore.addTroop(troopStore.createHeavyUnit(id, name, selectedCiv, position));
    } else if (selectedUnitType === "flying") {
      troopStore.addTroop(troopStore.createFlyingUnit(id, name, selectedCiv, position));
    }

    mapStore.updateMap();
    mapStore.refreshSelectedCell();

    await mapStore.save();


  };

  return (
    <VStack spacing={1} w="full">


      <Select placeholder="Select Unit Type" onChange={handleUnitTypeChange}>
        <option value="ground">Ground Unit</option>
        <option value="heavy">Heavy Unit</option>
        <option value="flying">Flying Unit</option>
      </Select>

      <Button
        w="full"
        border={`2px solid ${factionColor}`}
        color={"black"}
        bg="transparent"
        onClick={handleBuyUnit}
      >
        Buy {selectedUnitType.charAt(0).toUpperCase() + selectedUnitType.slice(1)} Unit
      </Button>

      <Input type="number" placeholder="PV" onChange={handleChangePv} />

    </VStack>
  );
};

export default observer(InfoModalBuyTroopsActions);
