import { Button } from "@chakra-ui/react";
import { observer } from "mobx-react";
import { mapStore } from "../../map/mapStore";

const SaveButton = () => {
  const handleSaveAll = async () => {
    await mapStore.save();
  };

  return (
    <Button
      position="absolute"
      right="0"
      transform="translate(-5%, -110%)"
      onClick={handleSaveAll}
      bg={"green.400"}
      color={"white"}
    >
      Save all
    </Button>
  );
};

export default observer(SaveButton);
