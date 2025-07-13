import { Button } from "@chakra-ui/react";
import { observer } from "mobx-react";
import { mapStore } from "../../map/mapStore";

const SaveButton = () => {
  const handleSaveAll = async () => {
    await mapStore.save();
  };

  return (
    <Button
      onClick={handleSaveAll}
      colorScheme="green"
      width="100%"
    >
      Save map
    </Button>
  );
};

export default observer(SaveButton);
