import {
  Box,
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';

import FontSizeSlider from '@components/DisplayPreferences/FontSizeSlider';
import ColorThemeSelect from '@components/DisplayPreferences/ColorThemeSelect';
import AppTheme from '@/styles/themes/interface/appTheme';
import { FontSizeSliderValue } from '@/interfaces/font-size-slider-value';
import InfoTooltip from '../shared/InfoTooltip';

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
  const { toggleColorMode } = useColorMode();
  const isDarkModeToggled = useColorModeValue(false, true);

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
            <HStack align={'center'} spacing={1}>
              <Text>Боја</Text>
              <InfoTooltip
                tooltipLabel="Нашите бои ги следат стандардите за семрежна пристапност."
                labelPlacement="right"
                ariaLabel="Information about color themes"
              ></InfoTooltip>
            </HStack>
            <ColorThemeSelect
              colorModeChangeCallback={onColorModeChange}
            ></ColorThemeSelect>
          </Flex>
          <Flex pt={16}>
            <HStack spacing={8}>
              <Text>Dark Mode</Text>
              <Switch
                onChange={toggleColorMode}
                isChecked={isDarkModeToggled}
                alignSelf={'center'}
              ></Switch>
            </HStack>
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
