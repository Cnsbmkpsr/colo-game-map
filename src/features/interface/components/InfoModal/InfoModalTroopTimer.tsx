/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useLayoutEffect, useRef } from "react";
import { Box, Text } from "@chakra-ui/react";
import { timestampToTimer } from "../../utils/timestampToTimer";
import { mapStore } from "../../../map/mapStore";
import { observer } from "mobx-react";

type InfoModalTroopTimerProps = {
  timeToAdd: number;
};

const InfoModalTroopTimer = ({ timeToAdd }: InfoModalTroopTimerProps) => {
  const timeTextRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    let interval: NodeJS.Timeout;
    if (
      timeTextRef.current ||
      mapStore.getSelectedCell?.cell.troop !== undefined
    ) {
      interval = setInterval(() => {
        timeTextRef.current!.innerText = timestampToTimer(
          mapStore.getSelectedCell!.cell.troop!.updatedAt + timeToAdd
        );
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Box w="full" fontSize="sm" mb="2">
      <Text as="span" fontWeight="bold">
        cellTimer
      </Text>
      <Text ref={timeTextRef} as="span" pl="2" />
    </Box>
  );
};

export default observer(InfoModalTroopTimer);
