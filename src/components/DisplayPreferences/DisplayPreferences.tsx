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
import AppTheme from '@/styles/themes/interface/appTheme';
import { FontSizeSliderValue } from '@/interfaces/font-size-slider-value';

type Props = {
  openModalDisclosure: boolean;
  closeModalDisclosure: () => void;
  onColorModeChange: (value: AppTheme) => void;
  onFontSizeChange: (value: FontSizeSliderValue) => void;
};

const DisplayPreferences = ({
  openModalDisclosure,
  closeModalDisclosure,
  onColorModeChange,
  onFontSizeChange,
}: Props) => {
  return (
    <Modal
      isOpen={openModalDisclosure}
      onClose={closeModalDisclosure}
      size={{ base: 'xs', md: '3xl' }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Поставки</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex paddingTop={5} flexDir={'column'} gap={5}>
            <Text>Големина на фонт</Text>
            <FontSizeSlider
              onFontSizeChange={onFontSizeChange}
            ></FontSizeSlider>
          </Flex>
          <Flex paddingTop={8} flexDir={'column'} gap={5}>
            <Text>Боја</Text>
            <ColorThemeSelect
              colorModeChangeCallback={onColorModeChange}
            ></ColorThemeSelect>
          </Flex>
          <Flex paddingTop={16}>
            <Text flex={2}>Далтонизам</Text>
            <Switch flex={{ base: 2, md: 7 }} alignSelf={'center'}></Switch>
          </Flex>
          <Flex paddingY={8}>
            <Text flex={2}>Затемни</Text>
            <Switch
              flex={{ base: 2, md: 7 }}
              defaultChecked={true}
              alignSelf={'center'}
            ></Switch>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button autoFocus onClick={closeModalDisclosure}>
            Затвори
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DisplayPreferences;
