import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
} from '@chakra-ui/react';

import { FONT_SIZE_KEY } from '@/constants/theme-constants';
import useLocalStorage from '@/hooks/useLocalStorage';

const FontSizeSlider = () => {
  const [fontSize, setFontSize] = useLocalStorage(FONT_SIZE_KEY, {
    numericValue: 40,
    stringValue: 'md',
  });

  const handleChange = (value: number) => {
    switch (value) {
      case 20:
        setFontSize({
          numericValue: 20,
          stringValue: 'sm',
        });
        break;
      case 40:
        setFontSize({
          numericValue: 40,
          stringValue: 'md',
        });
        break;
      case 60:
        setFontSize({
          numericValue: 60,
          stringValue: 'lg',
        });
        break;
      case 80:
        setFontSize({
          numericValue: 80,
          stringValue: 'xl',
        });
        break;
      default:
        setFontSize({
          numericValue: 40,
          stringValue: 'md',
        });
        break;
    }
  };

  return (
    <Slider
      defaultValue={fontSize.numericValue}
      min={0}
      max={100}
      step={20}
      w={{ base: '100%', md: '75%' }}
      alignSelf={'center'}
      onChange={handleChange}
    >
      <Box marginY={5}>
        <SliderMark value={20}>S</SliderMark>
        <SliderMark value={40}>M</SliderMark>
        <SliderMark value={60}>L</SliderMark>
        <SliderMark value={80}>XL</SliderMark>
      </Box>
      <SliderTrack bg={'primary.100'}>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb boxSize={6} paddingBottom={0} />
    </Slider>
  );
};

export default FontSizeSlider;
