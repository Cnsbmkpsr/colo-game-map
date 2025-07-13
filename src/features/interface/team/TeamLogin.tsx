import { useState } from "react";
import { observer } from "mobx-react";
import { Box, Button, Input, Select, VStack } from "@chakra-ui/react";
import { adminStore } from "../adminStore";
import { CONFIG } from "../config";
import { Civilisation } from "../../game/types";

const TeamLogin = () => {
  const [selectedTeam, setSelectedTeam] = useState<Civilisation | "">("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = () => {
    if (selectedTeam) {
      const teamCredentials = CONFIG.teamCredentials[selectedTeam];
      if (teamCredentials && teamCredentials.password === password) {
        adminStore.setTeamLogin(selectedTeam);
      } else {
        alert("Incorrect password!");
      }
    } else {
      alert("Please select a team!");
    }
  };

  return (
    <Box p={4} bg="white" borderRadius="md" boxShadow="md">
      <VStack spacing={4}>
        <Select
          placeholder="Select Team"
          onChange={(e) => setSelectedTeam(e.target.value as Civilisation)}
        >
          {CONFIG.teams.map((team) => (
            <option key={team} value={team}>
              {team}
            </option>
          ))}
        </Select>
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin} colorScheme="blue">
          Log In
        </Button>
      </VStack>
    </Box>
  );
};

export default observer(TeamLogin);
