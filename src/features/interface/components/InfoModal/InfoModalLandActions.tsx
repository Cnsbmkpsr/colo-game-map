import { Button, VStack } from "@chakra-ui/react";
import useInfoModalActions from "../../hooks/useInfoModalActions";
import { observer } from "mobx-react";
import {mapStore} from "../../../map/mapStore.ts";

const InfoModalOwnedLandActions = () => {
  const { handleRemoveLand } = useInfoModalActions();
  return (
    <VStack spacing={1} w="full">
      <Button
          w="full"
          border={`2px solid ${mapStore.selectedCell?.cell.owner?.faction?.color || "black"}`}
          color={"black"}
          bg="transparent"
          onClick={handleRemoveLand}
      >
        Remove Land
      </Button>
    </VStack>
  );
};

export default observer(InfoModalOwnedLandActions);
