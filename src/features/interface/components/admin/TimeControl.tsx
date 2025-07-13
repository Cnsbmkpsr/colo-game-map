import { observer } from "mobx-react";
import { Button, GridItem } from "@chakra-ui/react";
import { adminStore } from "../../adminStore";

const TimeControl = () => {
  const handleStart = () => {
    adminStore.startRounds();
  };

  const handlePause = () => {
    adminStore.pauseRounds();
  };

  return (
    <>
      <GridItem>
        <Button onClick={handleStart} colorScheme="green" width="100%">
          Start Rounds
        </Button>
      </GridItem>
      <GridItem>
        <Button onClick={handlePause} colorScheme="red" width="100%">
          Pause Rounds
        </Button>
      </GridItem>
    </>
  );
};

export default observer(TimeControl);
