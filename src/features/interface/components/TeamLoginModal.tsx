import { useState } from "react";
import { observer } from "mobx-react";
import { 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button, 
  Input, 
  Select, 
  VStack, 
  HStack,
  Box,
  Text,
  useToast
} from "@chakra-ui/react";
import { adminStore } from "../adminStore";
import { CONFIG } from "../config";
import { Civilisation } from "../../game/types";
import { FACTION_COLORS } from "../../../shared/constants";

interface TeamLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TeamLoginModal = ({ isOpen, onClose }: TeamLoginModalProps) => {
  const [selectedTeam, setSelectedTeam] = useState<Civilisation | "">("");
  const [password, setPassword] = useState<string>("");
  const toast = useToast();

  const handleLogin = () => {
    if (!selectedTeam) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une faction !",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const teamCredentials = CONFIG.teamCredentials[selectedTeam];
    if (teamCredentials && teamCredentials.password === password) {
      adminStore.setTeamLogin(selectedTeam);
      toast({
        title: "Connexion réussie !",
        description: `Vous êtes maintenant connecté en tant que ${selectedTeam}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
      setSelectedTeam("");
      setPassword("");
    } else {
      toast({
        title: "Mot de passe incorrect",
        description: "Veuillez vérifier votre mot de passe.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={() => {}} // Empêche la fermeture du modal
      closeOnOverlayClick={false}
      closeOnEsc={false}
      isCentered
      size="md"
    >
      <ModalOverlay 
        bg="blackAlpha.700" 
        backdropFilter="blur(8px)"
      />
      <ModalContent>
        <ModalHeader textAlign="center" pb={2}>
          <Text fontSize="2xl" fontWeight="bold" color="gray.800">
            🚀 Choisissez votre faction
          </Text>
          <Text fontSize="sm" color="gray.500" fontWeight="normal" mt={1}>
            Connectez-vous pour rejoindre la bataille
          </Text>
        </ModalHeader>
        
        <ModalBody pb={6}>
          <VStack spacing={5}>
            <Box w="full">
              <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
                Faction
              </Text>
              <Select
                placeholder="Sélectionnez votre faction"
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value as Civilisation)}
                size="lg"
                bg="gray.50"
                border="2px"
                borderColor="gray.200"
                _hover={{ borderColor: "gray.300" }}
                _focus={{ 
                  borderColor: selectedTeam ? FACTION_COLORS[selectedTeam] : "blue.400",
                  bg: "white"
                }}
              >
                {CONFIG.teams.map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </Select>
            </Box>

            {selectedTeam && (
              <Box 
                w="full" 
                p={3} 
                bg="gray.50" 
                borderRadius="md" 
                border="1px" 
                borderColor="gray.200"
              >
                <HStack spacing={3} justify="center">
                  <Box 
                    w={4} 
                    h={4} 
                    borderRadius="full" 
                    bg={FACTION_COLORS[selectedTeam]}
                  />
                  <Text fontWeight="medium" color="gray.700">
                    {selectedTeam}
                  </Text>
                </HStack>
              </Box>
            )}

            <Box w="full">
              <Text fontSize="sm" fontWeight="medium" color="gray.700" mb={2}>
                Mot de passe
              </Text>
              <Input
                type="password"
                placeholder="Entrez le mot de passe de votre faction"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                size="lg"
                bg="gray.50"
                border="2px"
                borderColor="gray.200"
                _hover={{ borderColor: "gray.300" }}
                _focus={{ borderColor: "blue.400", bg: "white" }}
              />
            </Box>

            <Button 
              onClick={handleLogin}
              colorScheme="blue"
              size="lg"
              w="full"
              isDisabled={!selectedTeam || !password}
              _hover={{
                transform: "translateY(-1px)",
                boxShadow: "lg"
              }}
              transition="all 0.2s"
            >
              🎮 Se connecter
            </Button>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default observer(TeamLoginModal);