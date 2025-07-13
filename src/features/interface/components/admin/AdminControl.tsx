import { observer } from "mobx-react";
import { Button, GridItem } from "@chakra-ui/react";
import { adminStore } from "../../adminStore";

const AdminControl = () => {
  const handleStart = () => {
    adminStore.startRounds();
  };

  const handlePause = () => {
    adminStore.pauseRounds();
  };

  return (
    <>
      <GridItem>
        <Button onClick={handleStart} colorScheme="green">
          Start Rounds
        </Button>
      </GridItem>
      <GridItem>
        <Button onClick={handlePause} colorScheme="red">
          Pause Rounds
        </Button>
      </GridItem>
    </>
  );
};

export default observer(AdminControl);
