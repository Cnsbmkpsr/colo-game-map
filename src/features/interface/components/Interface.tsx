import { HStack, VStack, useDisclosure, Box } from "@chakra-ui/react";
import InfoModal from "./InfoModal/InfoModal";
import FactionMenu from "./FactionMenu";
import CancelActions from "./CancelActions";
import SaveButton from "./SaveButton";
import { adminStore } from "../adminStore";
import { useEffect } from "react";
import PasswordModal from "./PasswordModal";
import AdminControl from "./admin/AdminControl";
import RoundIndicator from "./RoundIndicator";
import TeamLogin from "../team/TeamLogin";
import { observer } from "mobx-react";

const Interface = () => {
  const passwordDisclosure = useDisclosure();

  useEffect(() => {
    if (window.location.hash === "#password" && !adminStore.getAdmin) {
      passwordDisclosure.onOpen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <InfoModal />
      <RoundIndicator />
      {!adminStore.getAdmin && !adminStore.isLoggedInTeam && (
        <Box position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
          <TeamLogin />
        </Box>
      )}
      {adminStore.getAdmin && (
        <>
          <HStack
            spacing={2}
            position="absolute"
            left="50%"
            top="2"
            transform="translateX(-50%)"
          >
            <FactionMenu />
            <CancelActions />
            <AdminControl />
          </HStack>
          <SaveButton />
        </>
      )}
      <PasswordModal
        isOpen={passwordDisclosure.isOpen}
        onClose={passwordDisclosure.onClose}
      />
    </>
  );
};

export default observer(Interface);
