import { Button, VStack } from "@chakra-ui/react";
import useInfoModalActions from "../../hooks/useInfoModalActions";
import { factionStore } from "../../../game/factionStore";
import { observer } from "mobx-react";

const InfoModalOwnedLandActions = () => {
  const { handleRemoveLand } = useInfoModalActions();
  return (
    <VStack spacing={1} w="full">
      {factionStore.getSelectedFaction !== null && (
        <Button
          w="full"
          border={`2px solid ${factionStore.getSelectedFaction.color}`}
          color={"black"}
          bg="transparent"
          onClick={handleRemoveLand}
        >
          Remove Land
        </Button>
      )}
    </VStack>
  );
};

export default observer(InfoModalOwnedLandActions);
