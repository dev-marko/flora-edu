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
} from '@chakra-ui/react';

import FontSizeSlider from '@components/DisplayPreferences/FontSizeSlider';
import ColorThemeSelect from '@components/DisplayPreferences/ColorThemeSelect';

type Props = {
  openModalDisclosure: boolean;
  closeModalDisclosure: () => void;
};

const DisplayPreferences = ({
  openModalDisclosure,
  closeModalDisclosure,
}: Props) => {
  const handleSave = () => {
    location.reload();
  };

  return (
    <Modal
      isOpen={openModalDisclosure}
      onClose={closeModalDisclosure}
      closeOnEsc={false}
      closeOnOverlayClick={false}
      size={{ base: 'sm', md: '3xl' }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Поставки</ModalHeader>
        <ModalBody>
          <Flex paddingTop={5} flexDir={'column'} gap={5}>
            <Text>Големина на фонт</Text>
            <FontSizeSlider></FontSizeSlider>
          </Flex>
          <Flex paddingTop={8} flexDir={'column'} gap={5}>
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
          <Button autoFocus onClick={handleSave}>
            ОК
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DisplayPreferences;
