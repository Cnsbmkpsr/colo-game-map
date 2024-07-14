import { Button, Input, VStack } from "@chakra-ui/react";
import { observer } from "mobx-react";
import useInfoModalActions from "../../hooks/useInfoModalActions";
import { useState } from "react";

const InfoModalNeutralActions = () => {
  const { handleCreateMob, handleCreateStructure } = useInfoModalActions();

  const [pv, setPv] = useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChangePv = (e: any) => {
    setPv(e.target.value);
  };

  return (
    <VStack spacing={1} w="full">
      <Input type="number" placeholder="PV" onChange={handleChangePv} />

      <Button
        w="full"
        border={`2px solid grey`}
        color={"black"}
        bg="transparent"
        onClick={() => handleCreateMob(pv)}
      >
        Add mob
      </Button>

      <Button
        w="full"
        border={`2px solid grey`}
        color={"black"}
        bg="transparent"
        onClick={() => handleCreateStructure(pv)}
      >
        Add structure
      </Button>
    </VStack>
  );
};

export default observer(InfoModalNeutralActions);
