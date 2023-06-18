import React from "react";

import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Text,
} from "@chakra-ui/react";
import FontSizeSlider from "./FontSizeSlider";
import ColorThemeSelect from "./ColorThemeSelect";

type Props = {
  showModalDisclosure: boolean;
  closeModalDisclosure: () => void;
};

const DisplayPreferences: React.FC<Props> = ({
  showModalDisclosure,
  closeModalDisclosure,
}: Props) => {
  const handleSave = () => {
    alert("Clicked save button");
  };

  return (
    <Modal
      isOpen={showModalDisclosure}
      onClose={closeModalDisclosure}
      size={{ base: "sm", md: "3xl" }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Поставки</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex paddingTop={5} flexDir={"column"} gap={5}>
            <Text>Големина на фонт</Text>
            <FontSizeSlider></FontSizeSlider>
          </Flex>
          <Flex paddingTop={8} flexDir={"column"} gap={5}>
            <Text>Боја</Text>
            <ColorThemeSelect></ColorThemeSelect>
          </Flex>
          <Flex paddingTop={16}>
            <Text flex={{ base: 1, md: 2 }}>Далтонизам</Text>
            <Switch flex={{ base: 2, md: 7 }}></Switch>
          </Flex>
          <Flex paddingY={8}>
            <Text flex={{ base: 1, md: 2 }}>Затемни</Text>
            <Switch flex={{ base: 2, md: 7 }} defaultChecked={true}></Switch>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="gray" mr={3} onClick={closeModalDisclosure}>
            Откажи
          </Button>
          <Button onClick={handleSave}>Зачувај</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DisplayPreferences;
