import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { observer } from "mobx-react";
import { adminStore } from "../adminStore";

type PasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type FormData = {
  password: string;
};

const PasswordModal = ({ isOpen, onClose }: PasswordModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    // create a new faction with the data
    adminStore.checkPassword(data.password);

    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add a new faction</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id="form" onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">Name</FormLabel>
              <Input
                id="password"
                placeholder="Enter the admin password"
                {...register("password", { required: true })}
              />
              <FormErrorMessage>
                {errors.password && "Name is required"}
              </FormErrorMessage>
            </FormControl>
          </form>
        </ModalBody>

        <ModalFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button variant="solid" colorScheme="blue" type="submit" form="form">
            Log in
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default observer(PasswordModal);
