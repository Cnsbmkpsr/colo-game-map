import { Box, Heading, VStack, Button } from "@chakra-ui/react";
import { observer } from "mobx-react";
import { infoModalStore } from "../../infoModalStore";
import { objectToJSX } from "../../utils/objToJSX";
import { factionStore } from "../../../game/factionStore";
import InfoModalOwnedLandActions from "./InfoModalLandActions";
import InfoModalTroopActions from "./InfoModalTroopActions";
import InfoModalBuyLandAction from "./InfoModalBuyLandAction";
import { mapStore } from "../../../map/mapStore";
import InfoModalTroopTimer from "./InfoModalTroopTimer";
import { troopStore } from "../../../game/troopStore";
import { landStore } from "../../../game/landStore";
import { adminStore } from "../../adminStore";
import { useEffect, useState } from "react";
import { autorun } from "mobx";

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

  // Identify the selected faction based on the troop's civilization
  // const selectedFaction = selectedTroop ? factionStore.factions.find(faction => faction.name === selectedTroop.civ) : null;
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

          {/* {selectedTroop && selectedTroop.type !== "structure" && (
            <>
              <InfoModalTroopTimer timeToAdd={1000 * 60 * 5} />
              <InfoModalTroopTimer timeToAdd={1000 * 30} />
            </>
          )} */}
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
    </VStack>
  );
});

export default InfoModalContent;
