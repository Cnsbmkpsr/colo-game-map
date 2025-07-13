import { observer } from "mobx-react";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { adminStore } from "../adminStore";
import { FACTION_COLORS } from "../../../shared/constants";

const CurrentFactionCard = () => {
  if (!adminStore.isLoggedInTeam) return null;

  return (
    <Box
      position="fixed"
      bottom="4"
      right="4"
      p={4}
      bg="white"
      border="2px"
      borderColor={FACTION_COLORS[adminStore.loggedInTeam!]}
      borderRadius="xl"
      boxShadow="lg"
      minW="200px"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "xl"
      }}
    >
      <VStack spacing={3} align="stretch">
        <Text 
          fontSize="xs" 
          textTransform="uppercase" 
          letterSpacing="wide" 
          color="gray.500"
          fontWeight="medium"
          textAlign="center"
        >
          Votre faction
        </Text>
        
        <HStack spacing={3} justify="center" align="center">
          <Box 
            w={4} 
            h={4} 
            borderRadius="full" 
            bg={FACTION_COLORS[adminStore.loggedInTeam!]}
            ring={2}
            ringColor={`${FACTION_COLORS[adminStore.loggedInTeam!]}40`}
          />
          <Text 
            fontSize="lg" 
            fontWeight="bold" 
            color="gray.800"
            textAlign="center"
          >
            {adminStore.loggedInTeam}
          </Text>
        </HStack>

        {adminStore.loggedInTeam === adminStore.activeTeam && (
          <Box
            bg="green.50"
            border="1px"
            borderColor="green.200"
            borderRadius="md"
            p={2}
            textAlign="center"
          >
            <Text 
              fontSize="sm" 
              color="green.600"
              fontWeight="medium"
            >
              🎯 C'est votre tour !
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default observer(CurrentFactionCard);