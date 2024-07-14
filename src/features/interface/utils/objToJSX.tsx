/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

export function objectToJSX(obj: any, margin: number): JSX.Element {
  const entries = Object.entries(obj);

  const elements = entries.map(([key, value]) => {
    if (typeof value === "object") {
      return (
        <Box key={key} fontSize="sm" mb="2" ml={margin}>
          <Text as="span" fontWeight="bold">
            {key}
          </Text>
          {objectToJSX(value, margin + 3)}
        </Box>
      );
    }

    return (
      <Box key={key} fontSize="sm" mb="2" ml={margin}>
        <Text as="span" fontWeight="bold">
          {key}
        </Text>
        <Text as="span" pl="2">
          {value as ReactNode}
        </Text>
      </Box>
    );
  });

  return <>{elements}</>;
}
