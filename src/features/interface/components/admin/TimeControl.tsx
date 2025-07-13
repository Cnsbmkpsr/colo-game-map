import { observer } from "mobx-react";
import { Button } from "@chakra-ui/react";
import { adminStore } from "../../adminStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

const TimeControl = () => {
  const handleStart = () => {
    adminStore.startRounds();
  };

  const handlePause = () => {
    adminStore.pauseRounds();
  };

  return (
    <>
      {adminStore.isPaused ? (
        <Button onClick={handleStart} colorScheme="green" width="100%">
          <FontAwesomeIcon icon={faPlay} style={{ marginRight: "8px" }} />
          Start Rounds
        </Button>
      ) : (
        <Button onClick={handlePause} colorScheme="red" width="100%">
          <FontAwesomeIcon icon={faPause} style={{ marginRight: "8px" }} />
          Stop Rounds
        </Button>
      )}
    </>
  );
};

export default observer(TimeControl);
