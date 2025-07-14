import { Button, useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from "@chakra-ui/react";
import { observer } from "mobx-react";
import { mapStore } from "../../map/mapStore";
import { troopActions } from "../../game/troopActions";
import { landStore } from "../../game/landStore";
import { useRef } from "react";
import { RealtimeService } from "../../../shared/services/realTimeDBService";

const ghostPositionService = new RealtimeService("ghostPositions");

const PurgeButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const handlePurgeMap = async () => {
    try {
      // Sauvegarder les équipes avant de vider mapStore.ghostPositions
      const teams = Object.keys(mapStore.ghostPositions);
      
      // Vider les troupes
      troopActions.troops = [];
      
      // Vider les terres
      landStore.lands = [];
      
      // Vider les positions fantômes
      mapStore.ghostPositions = {};
      
      // Nettoyer les positions fantômes dans la base de données pour toutes les équipes connues
      for (const team of teams) {
        await ghostPositionService.clearGhostPositions(team);
      }
      
      // Mettre à jour la map
      mapStore.updateMap();
      
      // Réinitialiser la cellule sélectionnée
      mapStore.setSelectedCell(undefined);
      
      // Sauvegarder la map purgée
      await mapStore.save();
      
      console.log("Map purged successfully");
    } catch (error) {
      console.error("Error purging map:", error);
    } finally {
      onClose();
    }
  };

  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="red"
        width="100%"
      >
        Purge map
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Purger la carte
            </AlertDialogHeader>

            <AlertDialogBody>
              Êtes-vous sûr de vouloir purger la carte ? Cette action supprimera :
              <br />• Toutes les troupes
              <br />• Tous les territoires
              <br />• Toutes les positions fantômes
              <br /><br />
              Cette action est irréversible.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Annuler
              </Button>
              <Button colorScheme="red" onClick={handlePurgeMap} ml={3}>
                Purger
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default observer(PurgeButton);
