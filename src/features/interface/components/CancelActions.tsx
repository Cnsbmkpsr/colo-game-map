import { Button, HStack } from "@chakra-ui/react";
import { observer } from "mobx-react";
import { troopStore } from "../../game/troopStore";

const CancelActions = () => {
  const handleCancelMove = () => {
    troopStore.setIsTroopMoving(false);
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
      {troopStore.getIsMoving && (
        <Button w="full" colorScheme="red" onClick={handleCancelMove}>
          Cancel move
        </Button>
      )}
    </HStack>
  );
};

export default observer(CancelActions);
