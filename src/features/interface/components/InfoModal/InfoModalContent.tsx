import { Box, Heading, VStack, Button } from "@chakra-ui/react";
import { observer } from "mobx-react";
import { infoModalStore } from "../../infoModalStore";
import { objectToJSXWithIcons } from "../../utils/objToJSXWithIcons";
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
import { FlyingFlag } from "react-game-icons-auto";

const InfoModalContent = observer(() => {
  const [selectedCell, setSelectedCell] = useState(mapStore.getSelectedCell);
  const [selectedTroop, setSelectedTroop] = useState(selectedCell?.cell.troop);

  const handleMoveUnit = () => {
    troopStore.setIsTroopMoving(true, selectedTroop?.id || null);
    document.body.style.cursor = "crosshair";
  };

  const handleCancelMoveUnit = () => {
    troopStore.setIsTroopMoving(false);
    document.body.style.cursor = "default";
  }

  useEffect(() => {
    const disposer = autorun(() => {
      setSelectedCell(mapStore.getSelectedCell);
      setSelectedTroop(mapStore.getSelectedCell?.cell.troop);
    });

    return () => disposer();
  }, []);

  const isTeamTurn = adminStore.loggedInTeam === adminStore.activeTeam;

  // Détermine si on affiche une unité avec décalage (tuile sélectionnée + troupe présente)
  const showUnitWithOffset = !!selectedCell?.cell.troop;

  useEffect(() => {
    infoModalStore.onRefresh();
  }, [selectedCell, selectedTroop]);

  return (
    <VStack spacing={4} p="2" pb="1">
      <Heading size="lg" fontWeight="bold" textAlign="center">
        <div
          style={{
            width: 36,
            height: 36,
            position: "relative",
            display: "inline-block",
          }}
        >
          <FlyingFlag color="black" />
        </div>
        {infoModalStore.getTitle}
      </Heading>
      {Object.keys(infoModalStore.getDescription).length > 0 && (
        <>
          <Box w="full">
            {objectToJSXWithIcons(
              infoModalStore.getDescription,
              showUnitWithOffset
            )}
          </Box>

            {selectedTroop &&
                isTeamTurn &&
                selectedTroop.civ === adminStore.activeTeam &&
                !troopStore.isTroopMoving && (
                    <Button onClick={handleMoveUnit} colorScheme="blue">
                        Déplacer l&apos;unitée
                    </Button>
                )}

            {selectedTroop &&
                isTeamTurn &&
                selectedTroop.civ === adminStore.activeTeam &&
                troopStore.isTroopMoving && (
                    <Button onClick={handleCancelMoveUnit} colorScheme="red">
                        Annuler le déplacement
                    </Button>
                )}
        </>
      )}

      {landStore.isOwned && adminStore.getAdmin && (
          <InfoModalOwnedLandActions />
      )}

      <InfoModalTroopActions />

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
