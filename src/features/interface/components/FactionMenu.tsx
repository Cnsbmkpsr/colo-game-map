import { observer } from "mobx-react";
import { factionStore } from "../../game/factionStore";
import {
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { useCallback } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Civilisation } from "../../game/types";

const FactionMenu = () => {
  const handleSelect = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const civ = event.currentTarget.dataset.civ;

      if (civ === undefined) return null;

      factionStore.selectFaction(civ as Civilisation);
    },
    []
  );

  const selectedFaction =
    factionStore.selectedFactionIndex !== null
      ? factionStore.factions[factionStore.selectedFactionIndex]
      : null;

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {selectedFaction ? (
          <Flex alignItems="center">
            <Box
              boxSize="1rem"
              borderRadius="sm"
              bg={selectedFaction.color}
              mr="2"
            />
            <span>{selectedFaction.name}</span>
          </Flex>
        ) : (
          "Select Faction"
        )}
      </MenuButton>
      <MenuList>
        {factionStore.factions.map((faction, index) => (
          <MenuItem
            key={index}
            data-civ={faction.name}
            onClick={handleSelect}
            minH="48px"
          >
            <Box boxSize="2rem" borderRadius="md" bg={faction.color} mr="2" />
            <span>{faction.name}</span>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default observer(FactionMenu);
