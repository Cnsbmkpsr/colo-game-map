import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

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
      icon={<FontAwesomeIcon icon={faPlus} color="white" />}
      onClick={handleOnClick}
    />
  );
};

export default observer(AddFaction);
