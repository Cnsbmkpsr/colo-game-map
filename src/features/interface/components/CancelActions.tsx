import { Button, HStack } from "@chakra-ui/react";
import { observer } from "mobx-react";
import { troopStore } from "../../game/troopStore";

const CancelActions = () => {
  const handleCancelMove = () => {
    troopStore.setIsTroopMoving(false);
    troopStore.clearGhostTroop();
  };

  const handleCancelFightTroop = () => {
    document.body.style.cursor = "default";
    troopStore.setTroopFight(undefined);
  };

  return (
    <HStack
      position="fixed"
      left="50%"
      bottom="8px"
      transform="translate(-50%, 0)"
      spacing={2}
    >
      {troopStore.getFightingTroop !== undefined && (
        <Button w="full" colorScheme="red" onClick={handleCancelFightTroop}>
          Cancel fight
        </Button>
      )}
      {troopStore.isTroopMoving && (
        <Button w="full" colorScheme="red" onClick={handleCancelMove}>
          Annuler le déplacement
        </Button>
      )}
    </HStack>
  );
};

export default observer(CancelActions);
