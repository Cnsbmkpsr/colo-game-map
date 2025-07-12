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

  useEffect(() => {
    adminStore.loadState();
    const interval = setInterval(() => {
      adminStore.loadState();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      position="fixed"
      top="0"
      width={{ base: '100%', md: '50%' }} // Full width on mobile, 50% width on non-mobile
      left={{ base: '0', md: '25%' }} // Centered on non-mobile
      bg="white"
      p={4}
      borderRadius="md"
      boxShadow="md"
      transform="translateX(0)" // Ensure it's centered on mobile
    >
      <VStack spacing={2} alignItems="stretch">
        <Text fontSize="xl" fontWeight="bold">{`L'équipe qui joue est: ${adminStore.activeTeam}`}</Text>
        {isTeamTurn && <Text fontSize="lg" color="green.500">{`C'est à ton équipe de jouer !`}</Text>}
        <Progress value={(timeRemaining / CONFIG.roundDuration) * 100} size="lg" colorScheme="blue" />
        <Text alignSelf="flex-end">{`Temps restant: ${Math.ceil(timeRemaining / 1000)}s`}</Text>
      </VStack>
    </Box>
  );
};

export default observer(RoundIndicator);
