import { AddIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { observer } from "mobx-react";

type AddFactionProps = {
  onOpen: () => void;
};

const AddFaction = ({ onOpen }: AddFactionProps) => {
  const handleOnClick = () => {
    onOpen();
  };

  return (
    <IconButton
      bg="green.300"
      _hover={{ bg: "green.400" }}
      aria-label="Add faction button"
      icon={<AddIcon color="white" />}
      onClick={handleOnClick}
    />
  );
};

export default observer(AddFaction);
