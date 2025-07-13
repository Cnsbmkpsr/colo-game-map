/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Text, HStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import {
  Crown,
  LorcBowieKnife,
  Hearts,
  SonicShoes,
  Person,
  DirectionSigns,
  Shield
} from "react-game-icons-auto";
import { FACTION_DESATURATED_COLORS } from "../../../shared/constants";

const ENTRY_ICONS = {
  Propriétaire: Crown,
  Type: Shield,
  Vitesse: SonicShoes,
  PV: Hearts,
  Attaque: LorcBowieKnife,
  Civilisation: Person,
  Position: DirectionSigns,
};

interface EntryProps {
  entryKey: string;
  value: any;
}

function Entry({ entryKey, value }: EntryProps) {
  const IconComponent = ENTRY_ICONS[entryKey as keyof typeof ENTRY_ICONS];
  const iconSize = 16;

  const getValueColor = () => {
    if (entryKey === "Propriétaire" || entryKey === "Civilisation") {
      return FACTION_DESATURATED_COLORS[value as keyof typeof FACTION_DESATURATED_COLORS] || "#000";
    }
    return "#000";
  };

  return (
    <Box
      fontSize="sm"
      mb="2"
      transition="margin-left 0.2s ease"
    >
      <HStack spacing={2} align="center">
        {IconComponent && (
            <div style={{ width: iconSize }}>
              <IconComponent color={getValueColor()}/>
            </div>
        )}
        <Text as="span" fontWeight="bold"
              color={getValueColor()}>
          {entryKey}:
        </Text>
        <Text
          as="span"
          color={getValueColor()}
          fontWeight={entryKey === "Propriétaire" || entryKey === "Civilisation" ? "bold" : "normal"}
        >
          {value as ReactNode}
        </Text>
      </HStack>
    </Box>
  );
}

export function objectToJSXWithIcons(
  obj: any,
  isSelectedTile: boolean = false
): JSX.Element {
  const entries = Object.entries(obj);

  const elements = entries.map(([key, value]) => {
    if (typeof value === "object" && value !== null) {
      if (key === "Troupe") {
        return (
          <Box key={key} mb="3">
            <Text 
              fontSize="md" 
              fontWeight="bold" 
              textAlign="center" 
              mb="2"
              color="#333"
            >
              {key}
            </Text>
            <Box ml={2}>
              {objectToJSXWithIcons(value, isSelectedTile)}
            </Box>
          </Box>
        );
      }
      
      // Autres cas d'objets
      return (
        <Box key={key} mb="3">
          <Entry
            entryKey={key}
            value=""
          />
          <Box ml={2}>
            {objectToJSXWithIcons(value, isSelectedTile)}
          </Box>
        </Box>
      );
    }

    return (
      <Entry
        key={key}
        entryKey={key}
        value={value}
      />
    );
  });

  return <>{elements}</>;
}