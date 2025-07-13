import { Box, Heading, VStack, Button } from "@chakra-ui/react";
import { observer } from "mobx-react";
import { infoModalStore } from "../../infoModalStore";
import { objectToJSX } from "../../utils/objToJSX";
import { factionStore } from "../../../game/factionStore";
import InfoModalOwnedLandActions from "./InfoModalLandActions";
import InfoModalTroopActions from "./InfoModalTroopActions";
import InfoModalBuyLandAction from "./InfoModalBuyLandAction";
import { mapStore } from "../../../map/mapStore";
import { troopStore } from "../../../game/troopStore";
import { landStore } from "../../../game/landStore";
import { adminStore } from "../../adminStore";
import { useEffect, useState } from "react";
import { autorun } from "mobx";
import InfoModalAdminActions from "./InfoModalAdminActions";

const InfoModalContent = observer(() => {
  const [selectedCell, setSelectedCell] = useState(mapStore.getSelectedCell);
  const [selectedTroop, setSelectedTroop] = useState(selectedCell?.cell.troop);

  const handleMoveUnit = () => {
    troopStore.setIsTroopMoving(true);
  };

  useEffect(() => {
    const disposer = autorun(() => {
      setSelectedCell(mapStore.getSelectedCell);
      setSelectedTroop(mapStore.getSelectedCell?.cell.troop);
    });

    return () => disposer();
  }, []);

  const isTeamTurn = adminStore.loggedInTeam === adminStore.activeTeam;

  useEffect(() => {
    infoModalStore.onRefresh();
  }, [selectedCell, selectedTroop]);

  return (
    <VStack spacing={4} p="2" pb="1">
      <Heading size="lg" fontWeight="bold" textAlign="center">
        {infoModalStore.getTitle}
      </Heading>
      {Object.keys(infoModalStore.getDescription).length > 0 && (
        <>
          <Box w="full">{objectToJSX(infoModalStore.getDescription, 0)}</Box>

          {selectedTroop &&
            isTeamTurn &&
            selectedTroop.civ === adminStore.activeTeam && (
              <Button onClick={handleMoveUnit} colorScheme="blue">
                Déplacer l&apos;unitée
              </Button>
            )}
        </>
      )}

      {landStore.isOwnedByCurrentFaction && (
        <>
          <InfoModalOwnedLandActions />
          <InfoModalTroopActions />
        </>
      )}

      {factionStore.getSelectedFaction !== null && !landStore.isOwned && (
        <InfoModalBuyLandAction
          factionColor={factionStore.getSelectedFaction.color}
        />
      )}

      {adminStore.getAdmin && troopStore.hasTroopOnSelectedCell && (
        <InfoModalAdminActions />
      )}
    </VStack>
  );
});

export default InfoModalContent;
