import { Button, HStack, Input, VStack } from "@chakra-ui/react";
import useInfoModalActions from "../../hooks/useInfoModalActions";
import { troopStore } from "../../../game/troopStore";
import { mapStore } from "../../../map/mapStore";
import { useState } from "react";

type InfoModalBuyTroopsActionsProps = {
  factionColor: string;
};

const InfoModalOwnedTroopAction = ({
  factionColor,
}: InfoModalBuyTroopsActionsProps) => {
  const { handleMoveTroop, handleFightTroop, handleRemoveTroop, handleSetPvs } =
    useInfoModalActions();

  const [pv, setPv] = useState(mapStore.getSelectedCell?.cell.troop?.pv ?? 0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnChange = (e: any) => {
    setPv(e.target.value);
  };

  return (
    <VStack spacing={1} w="full">
      {troopStore.isPVTroop && (
        <HStack w="full">
          <Input
            placeholder="PVs"
            type="number"
            value={pv}
            onChange={handleOnChange}
          />
          <Button
            w="auto"
            border={`2px solid ${factionColor}`}
            color={"black"}
            bg="transparent"
            onClick={() => handleSetPvs(pv)}
          >
            Set
          </Button>
        </HStack>
      )}
      <Button
        w="full"
        border={`2px solid ${factionColor}`}
        color={"black"}
        bg="transparent"
        onClick={handleMoveTroop}
      >
        Move
      </Button>

      <Button
        w="full"
        border={`2px solid ${factionColor}`}
        color={"black"}
        bg="transparent"
        onClick={handleFightTroop}
      >
        Fight
      </Button>

      {/* <Button
        w="full"
        border={`2px solid ${factionColor}`}
        color={"black"}
        bg="transparent"
        onClick={handleRemoveTroop}
      >
        Remove Troop
      </Button> */}
    </VStack>
  );
};

export default InfoModalOwnedTroopAction;
