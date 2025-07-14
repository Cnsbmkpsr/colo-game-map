import { Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useDisclosure } from "@chakra-ui/react";
import { adminStore } from "../../adminStore";
import { observer } from "mobx-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

function MasterSession() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const handleBeMasterRequest = () => {
    onOpen();
  };

  const confirmBeMaster = async () => {
    try {
      await adminStore.beMasterSession();
      onClose();
    } catch (error) {
      console.error("Erreur lors de la demande d'être master:", error);
      // Le dialogue reste ouvert en cas d'erreur pour que l'utilisateur puisse réessayer
    }
  };

  return (
      <>
        {adminStore.isMasterSession ? (
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
                onClick={handleBeMasterRequest}
            >
              Become Master
            </Button>
        )}

        <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isCentered
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Devenir Master de la session
              </AlertDialogHeader>

              <AlertDialogBody>
                Êtes-vous sûr de vouloir devenir le master de cette session ?
                <br />
                <br />
                <strong>⚠️ Attention :</strong> Si un autre master est actuellement connecté,
                cela peut créer des désynchronisations dans le jeu.
                <br />
                <br />
                Assurez-vous qu'aucun autre master n'est actuellement actif avant de continuer.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  Annuler
                </Button>
                <Button colorScheme="red" onClick={confirmBeMaster} ml={3}>
                  Confirmer et devenir Master
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </>
  );
}

export default observer(MasterSession);