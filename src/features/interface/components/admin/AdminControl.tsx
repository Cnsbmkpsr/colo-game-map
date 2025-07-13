import { observer } from "mobx-react";
import { Button } from "@chakra-ui/react";
import { adminStore } from "../../adminStore";

const AdminControl = () => {
  const handleStart = () => {
    adminStore.startRounds();
  };

  const handlePause = () => {
    adminStore.pauseRounds();
  };

  return (
    <div>
      <Button onClick={handleStart} colorScheme="green">
        Start Rounds
      </Button>
      <Button onClick={handlePause} colorScheme="red">
        Pause Rounds
      </Button>
    </div>
  );
};

export default observer(AdminControl);
