import { observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { infoModalStore } from "../../infoModalStore";
import { Box, Flex } from "@chakra-ui/react";
import InfoModalContent from "./InfoModalContent";

const InfoModal = () => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleCloseModal = () => {
    infoModalStore.onClose();
  };

  const handleDragStart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(true);
  };

  const handleDragEnd = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  };

  const handleDrag = (e: MouseEvent) => {
    if (!ref.current) return;

    ref.current.style.left = `${e.clientX}px`;
    ref.current.style.top = `${e.clientY}px`;
  };

  useEffect(() => {
    if (!isDragging) return;

    window.addEventListener("mousemove", handleDrag);
    window.addEventListener("mouseup", handleDragEnd);

    return () => {
      window.removeEventListener("mousemove", handleDrag);
      window.removeEventListener("mouseup", handleDragEnd);
    };
  }, [isDragging]);

  return (
    <Box
      ref={ref}
      position="fixed"
      top="2"
      left="2"
      display={infoModalStore.isOpen ? "block" : "none"}
      bg="white"
      border="1px"
      borderColor="gray.300"
      borderRadius="md"
      shadow="md"
      overflow="auto"
    >
      <Flex h="3" w="full">
        <Flex
          flex="1"
          h="3"
          transition="all 0.2s"
          bg="blue.300"
          _hover={{ bg: "blue.400" }}
          onMouseDown={handleDragStart}
        />
        <Flex
          flex="1"
          transition="all 0.2s"
          bg="red.300"
          _hover={{ bg: "red.400" }}
          onClick={handleCloseModal}
        />
      </Flex>

      <InfoModalContent />
    </Box>
  );
};

export default observer(InfoModal);
