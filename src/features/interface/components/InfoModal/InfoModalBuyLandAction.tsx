import { Button, Box } from "@chakra-ui/react";
import useInfoModalActions from "../../hooks/useInfoModalActions";
import { observer } from "mobx-react";

type InfoModalBuyLandActionProps = {
  factionColor: string;
};

const InfoModalBuyLandAction = ({
  factionColor,
}: InfoModalBuyLandActionProps) => {
  const { handleBuyLand } = useInfoModalActions();

  return (
    <Box w="full">
      <Button
        w="full"
        border={`
              2px solid ${factionColor}
            `}
        color={"black"}
        bg="transparent"
        onClick={handleBuyLand}
      >
        Buy land
      </Button>
    </Box>
  );
};

export default observer(InfoModalBuyLandAction);
