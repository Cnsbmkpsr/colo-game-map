import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Collapse,
  Button,
  useDisclosure,
  Progress,
  Badge,
} from "@chakra-ui/react";
import { adminStore } from "../adminStore";
import { CONFIG } from "../config";
import { FACTION_COLORS } from "../../../shared/constants.ts";

// Composants d'icônes simples
const ChevronDownIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="6,9 12,15 18,9"></polyline>
  </svg>
);

const ChevronUpIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="18,15 12,9 6,15"></polyline>
  </svg>
);

const RoundIndicator = () => {
  const [timeRemaining, setTimeRemaining] = useState(adminStore.remainingTime);
  const { isOpen, onToggle } = useDisclosure();

  useEffect(() => {
    const interval = setInterval(() => {
      if (adminStore.isMasterSession) {
        if (!adminStore.isPaused) {
          const elapsedTime = Date.now() - adminStore.roundStartTime;
          const remaining = adminStore.remainingTime - elapsedTime;
          adminStore.setRemainingTime(Math.max(remaining, 0));
          setTimeRemaining(Math.max(remaining, 0));
        } else {
          setTimeRemaining(adminStore.remainingTime);
        }
      } else {
        setTimeRemaining(adminStore.remainingTime);
      }
      console.log(
        "Time remaining:",
        timeRemaining,
        " - ",
        adminStore.remainingTime
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (adminStore.isMasterSession) {
      adminStore.syncState();
    } else {
      adminStore.loadState();
    }

    const interval = setInterval(() => {
      if (adminStore.isMasterSession) {
        adminStore.syncState();
      } else {
        adminStore.loadState();
      }
      console.info("Master: ", adminStore.leaderSessionId, " - Current: ", adminStore.sessionId);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const isTeamTurn = adminStore.loggedInTeam === adminStore.activeTeam;
  const nextTeams = adminStore.nextTeams;
  const allTeams = [adminStore.activeTeam, ...nextTeams];

  // Les 3 premières équipes à afficher (actuelle + 2 suivantes)
  const displayedTeams = allTeams.slice(0, 3);
  // Les équipes restantes pour le collapse
  const remainingTeams = allTeams.slice(3);

  return (
    <Box
      position="fixed"
      top="2"
      width={{ base: "100%", md: "50%" }}
      left={{ base: "0", md: "25%" }}
      p={6}
      bg="white"
      border="1px"
      borderColor={isTeamTurn ? "green.400" : "gray.100"}
      borderRadius="2xl"
      boxShadow={
        isTeamTurn
          ? "0 0 20px rgba(34, 197, 94, 0.3), 0 4px 12px rgba(0, 0, 0, 0.1)"
          : "lg"
      }
      transition="all 0.3s ease"
      _before={
        isTeamTurn
          ? {
              content: '""',
              position: "absolute",
              top: "-2px",
              left: "-2px",
              right: "-2px",
              bottom: "-2px",
              borderRadius: "2xl",
              background:
                "linear-gradient(45deg, rgba(34, 197, 94, 0.5), rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.5))",
              zIndex: -1,
              animation: "pulse 2s ease-in-out infinite",
            }
          : {}
      }
    >
      <VStack spacing={6} alignItems="stretch">
        {/* Ligne principale: Équipe active à gauche, Top 3 à droite */}
        <HStack align="start" spacing={6}>
          {/* Équipe active (gauche) */}
          <VStack flex={1} align="start" spacing={3}>
            <Text
              fontSize="xs"
              textTransform="uppercase"
              letterSpacing="wide"
              color="gray.500"
              fontWeight="medium"
            >
              Faction en jeu
            </Text>
            <HStack spacing={3} align="center">
              <Box
                w={4}
                h={4}
                borderRadius="full"
                bg={FACTION_COLORS[adminStore.activeTeam]}
              />
              <Text fontSize="xl" fontWeight="medium" color="gray.800">
                {adminStore.activeTeam}
              </Text>
              <Box
                bg="gray.100"
                px={3}
                py={1}
                borderRadius="full"
                fontSize="sm"
                color="gray.500"
              >
                {Math.ceil(timeRemaining / 1000)}s
              </Box>
            </HStack>
            {isTeamTurn && (
              <Text fontSize="sm" color="green.500" fontWeight="medium">
                C'est à ta faction de jouer !
              </Text>
            )}

            {/* Progress bar */}
            <Box w="full">
              <Progress
                value={Math.max(
                  0,
                  Math.min(100, (timeRemaining / CONFIG.roundDuration) * 100)
                )}
                size="md"
                colorScheme="blue"
                borderRadius="full"
                bg="gray.100"
                hasStripe
                isAnimated
              />
            </Box>
          </VStack>

          {/* Top 3 équipes (droite) */}
          <VStack flex={1} align="start" spacing={3}>
            <Text
              fontSize="xs"
              textTransform="uppercase"
              letterSpacing="wide"
              color="gray.500"
              fontWeight="medium"
            >
              Ordre de passage
            </Text>
            <VStack spacing={2} align="stretch" w="full">
              {displayedTeams.map((team, index) => (
                <HStack
                  key={`${team}-${index}`}
                  spacing={3}
                  align="center"
                  transition="all 0.2s"
                  opacity={index === 0 ? 1 : 0.8}
                  _hover={index !== 0 ? { opacity: 1 } : {}}
                >
                  <Text
                    fontSize="sm"
                    fontWeight="medium"
                    w={5}
                    textAlign="center"
                    color={index === 0 ? "gray.800" : "gray.400"}
                  >
                    {index + 1}
                  </Text>
                  <Box
                    w={3}
                    h={3}
                    borderRadius="full"
                    bg={FACTION_COLORS[team]}
                    ring={index === 0 ? 2 : 0}
                    ringColor={
                      index === 0 ? `${FACTION_COLORS[team]}40` : "transparent"
                    }
                    transition="all 0.2s"
                  />
                  <Text
                    flex={1}
                    fontSize="sm"
                    fontWeight={index === 0 ? "medium" : "normal"}
                    color={index === 0 ? "gray.800" : "gray.600"}
                  >
                    {team}
                  </Text>
                  {/* Badge pour l'équipe connectée */}
                  {adminStore.loggedInTeam === team && (
                    <Badge
                      colorScheme="green"
                      size="sm"
                      variant="subtle"
                      fontSize="xs"
                      px={2}
                    >
                      Vous
                    </Badge>
                  )}
                  {index === 0 && (
                    <Box
                      w={2}
                      h={2}
                      bg="green.400"
                      borderRadius="full"
                      animation="pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
                    />
                  )}
                </HStack>
              ))}
            </VStack>
          </VStack>
        </HStack>

        {/* Bouton pour afficher le reste */}
        {remainingTeams.length > 0 && (
          <Box>
            <Button
              onClick={onToggle}
              variant="ghost"
              size="sm"
              color="blue.600"
              fontWeight="medium"
              fontSize="sm"
              _hover={{ color: "blue.800", bg: "blue.50" }}
              rightIcon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
              p={2}
              h="auto"
            >
              {isOpen
                ? "Masquer"
                : `Voir les ${remainingTeams.length} autres factions`}
            </Button>

            <Collapse in={isOpen} animateOpacity>
              <VStack
                spacing={3}
                align="stretch"
                mt={4}
                pt={4}
                borderTop="1px"
                borderColor="gray.100"
              >
                {remainingTeams.map((team, index) => (
                  <HStack
                    key={`${team}-${index + 3}`}
                    spacing={4}
                    align="center"
                    opacity={0.8}
                    transition="all 0.2s"
                    _hover={{ opacity: 1 }}
                  >
                    <Text
                      fontSize="sm"
                      fontWeight="medium"
                      w={6}
                      textAlign="center"
                      color="gray.400"
                    >
                      {index + 4}
                    </Text>
                    <Box
                      w={3}
                      h={3}
                      borderRadius="full"
                      bg={FACTION_COLORS[team]}
                      opacity={0.7}
                    />
                    <Text flex={1} color="gray.600" fontSize="sm">
                      {team}
                    </Text>
                    {/* Badge pour l'équipe connectée dans la liste étendue */}
                    {adminStore.loggedInTeam === team && (
                      <Badge
                        colorScheme="green"
                        size="sm"
                        variant="subtle"
                        fontSize="xs"
                        px={2}
                      >
                        Vous
                      </Badge>
                    )}
                  </HStack>
                ))}
              </VStack>
            </Collapse>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default observer(RoundIndicator);
