import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Progress, Text, Box, VStack } from '@chakra-ui/react';
import { adminStore } from '../adminStore';
import { CONFIG } from '../config';

const RoundIndicator = () => {
  const [timeRemaining, setTimeRemaining] = useState(adminStore.remainingTime);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!adminStore.isPaused) {
        const elapsedTime = Date.now() - adminStore.roundStartTime;
        const remaining = adminStore.remainingTime - elapsedTime;
        setTimeRemaining(Math.max(remaining, 0));
      } else {
        setTimeRemaining(adminStore.remainingTime);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const isTeamTurn = adminStore.loggedInTeam === adminStore.activeTeam;

  console.log(adminStore.loggedInTeam)
  console.log(adminStore.activeTeam)

  useEffect(() => {
    // Load state from backend on component mount
    adminStore.loadState();
    const interval = setInterval(() => {
      adminStore.loadState(); // Periodically sync state
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box position="absolute" top="0" left="50%" transform="translateX(-50%)" width="40%" p={4} bg="white" borderRadius="md" boxShadow="md">
      <VStack spacing={2} alignItems="stretch">
        <Text fontSize="xl" fontWeight="bold">{`Current Team: ${adminStore.activeTeam}`}</Text>
        {isTeamTurn && <Text fontSize="lg" color="green.500">{`C'est à ton équipe de jouer !`}</Text>}
        <Progress value={(timeRemaining / CONFIG.roundDuration) * 100} size="lg" colorScheme="blue" />
        <Text alignSelf="flex-end">{`Time Remaining: ${Math.ceil(timeRemaining / 1000)}s`}</Text>
      </VStack>
    </Box>
  );
};

export default observer(RoundIndicator);
