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
import TeamLoginModal from "./TeamLoginModal";
import CurrentFactionCard from "./CurrentFactionCard";
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
      <CurrentFactionCard />
      
      {/* Modal de connexion équipe - bloque l'accès tant qu'on n'est pas connecté */}
      <TeamLoginModal 
        isOpen={!adminStore.getAdmin && !adminStore.isLoggedInTeam}
        onClose={() => {}} // Ne peut pas être fermé
      />
      
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
            <Grid gap={2} templateColumns="1fr">
              <GridItem>
                <FactionMenu />
              </GridItem>

              <GridItem>
                <Separator />
              </GridItem>

              <GridItem>
                <TimeControl />
              </GridItem>

              <GridItem>
                <Separator />
              </GridItem>

              <GridItem>
                <SaveButton />
              </GridItem>
              <GridItem>
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
