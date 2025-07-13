import { GridItem, useDisclosure, Box, Grid } from "@chakra-ui/react";
import InfoModal from "./InfoModal/InfoModal";
import FactionMenu from "./FactionMenu";
import CancelActions from "./CancelActions";
import SaveButton from "./SaveButton";
import { adminStore } from "../adminStore";
import { useEffect } from "react";
import PasswordModal from "./PasswordModal";
import TimeControl from "./admin/TimeControl";
import RoundIndicator from "./RoundIndicator";
import TeamLogin from "../team/TeamLogin";
import { observer } from "mobx-react";
import { Separator } from "../../../shared/components/separator";

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
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          <TeamLogin />
        </Box>
      )}
      {adminStore.getAdmin && (
        <>
          <Box
            position="absolute"
            right="2"
            top="2"
            p="2"
            bg="white"
            border="1px"
            borderColor="gray.300"
            borderRadius="md"
            shadow="md"
          >
            <Grid gap={2} templateColumns="1fr 1fr">
              <GridItem colSpan={2}>
                <FactionMenu />
              </GridItem>

              <GridItem colSpan={2}>
                <Separator />
              </GridItem>

              <TimeControl />

              <GridItem colSpan={2}>
                <Separator />
              </GridItem>

              <GridItem colSpan={2}>
                <SaveButton />
              </GridItem>
              <GridItem colSpan={2}>
                <CancelActions />
              </GridItem>
            </Grid>
          </Box>
          {/* <Box
            position="absolute"
            bottom="2"
            left="50%"
            // transform="translateX(-50%)"
          >
          </Box> */}
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
