import { Button } from "@chakra-ui/react";
import { adminStore } from "../../adminStore";
import { observer } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function MasterSession() {
  const beMasterSession = () => {
    adminStore.beMasterSession();
  };

  console.log(
    "Master session status:",
    adminStore.sessionId,
    adminStore.leaderSessionId
  );

  return adminStore.leaderSessionId === adminStore.sessionId ? (
    <Button
      w="full"
      colorScheme="yellow"
      _hover={{ bg: "yellow.400" }}
      variant="solid"
      title="You are the master of this session. You control the global timer."
    >
      MASTER
      <FontAwesomeIcon icon={faStar} style={{ marginLeft: "8px" }} />
    </Button>
  ) : (
    <Button
      w="full"
      colorScheme="blackAlpha"
      variant="outline"
      onClick={beMasterSession}
    >
      Become Master
    </Button>
  );
}

export default observer(MasterSession);
