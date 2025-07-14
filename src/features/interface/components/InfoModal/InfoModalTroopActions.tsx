import { VStack } from "@chakra-ui/react";
import { factionStore } from "../../../game/factionStore";
import { troopStore } from "../../../game/troopStore";
import InfoModalBuyTroopsActions from "./InfoModalBuyTroopsActions";
import InfoModalOwnedTroopAction from "./InfoModalOwnedTroopAction";
import { observer } from "mobx-react";
import { Faction } from "../../../game/types";

const InfoModalTroopActions = () => {
  const selectedFaction = factionStore.getSelectedFaction as Faction;

  return (
    <VStack spacing={1} w="full">
      {!troopStore.hasTroopOnSelectedCell && selectedFaction && (
        <InfoModalBuyTroopsActions factionColor={selectedFaction.color} />
      )}
      {selectedFaction && troopStore.hasTroopOnSelectedCell &&
        troopStore.isTroopOwnedBySelectedFaction && (
          <InfoModalOwnedTroopAction factionColor={selectedFaction.color} />
        )}
    </VStack>
  );
};

export default observer(InfoModalTroopActions);
