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
      position="absolute"
      left="50%"
      top="100vh"
      transform="translate(-50%, -150%)"
      spacing={2}
    >
      {troopStore.getFightingTroop !== undefined && (
        <Button
          w="full"
          color={"black"}
          bg="red.400"
          onClick={handleCancelFightTroop}
        >
          Cancel fight
        </Button>
      )}
      {troopStore.getIsMoving && (
        <Button
          w="full"
          color={"black"}
          bg="red.400"
          onClick={handleCancelMove}
        >
          Cancel move
        </Button>
      )}
    </HStack>
  );
};

export default observer(CancelActions);
