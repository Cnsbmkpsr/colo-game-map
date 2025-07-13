import { Button, VStack, Box, Text } from "@chakra-ui/react";
import { observer } from "mobx-react";
import { troopStore } from "../../../game/troopStore";
import { adminStore } from "../../adminStore";
import { Separator } from "../../../../shared/components/separator";

const InfoModalAdminActions = () => {
  if (!adminStore.getAdmin) {
    return null;
  }

  const handleRemoveUnit = () => {
    troopStore.adminRemoveTroopOnSelectedCell();
  };

  return (
    <VStack w="full" spacing={2}>
      <Separator />
      <Box textAlign="center" w="full">
        <Text fontWeight="bold" fontSize="md" color="red.500">
          Admin Panel
        </Text>
      </Box>
      <Button colorScheme="red" w="full" onClick={handleRemoveUnit}>
        Admin: Remove Unit
      </Button>
    </VStack>
  );
};

export default observer(InfoModalAdminActions);
