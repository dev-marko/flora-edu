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
import { FontSizeSliderValue } from '@/interfaces/font-size-slider-value';

type Props = {
  onFontSizeChange: (value: FontSizeSliderValue) => void;
};

const FontSizeSlider = ({ onFontSizeChange }: Props) => {
  const [fontSize, setFontSize] = useLocalStorage(FONT_SIZE_KEY, {
    numericValue: 25,
    stringValue: 'md',
  });

  const handleChange = (value: number) => {
    let fontSizeObj: FontSizeSliderValue;
    switch (value) {
      case 0:
        fontSizeObj = {
          numericValue: 0,
          stringValue: 'sm',
        };
        setFontSize(fontSizeObj);
        onFontSizeChange(fontSizeObj);
        break;
      case 25:
        fontSizeObj = {
          numericValue: 25,
          stringValue: 'md',
        };
        setFontSize(fontSizeObj);
        onFontSizeChange(fontSizeObj);
        break;
      case 50:
        fontSizeObj = {
          numericValue: 50,
          stringValue: 'lg',
        };
        setFontSize(fontSizeObj);
        onFontSizeChange(fontSizeObj);
        break;
      case 75:
        fontSizeObj = {
          numericValue: 75,
          stringValue: 'xl',
        };
        setFontSize(fontSizeObj);
        onFontSizeChange(fontSizeObj);
        break;
      case 100:
        fontSizeObj = {
          numericValue: 100,
          stringValue: '2xl',
        };
        setFontSize(fontSizeObj);
        onFontSizeChange(fontSizeObj);
        break;
    }
  };

  return (
    <Slider
      defaultValue={fontSize.numericValue}
      min={0}
      max={100}
      step={25}
      w={'75%'}
      alignSelf={'center'}
      onChange={handleChange}
    >
      <Box marginY={5}>
        <SliderMark value={0}>S</SliderMark>
        <SliderMark value={25}>M</SliderMark>
        <SliderMark value={50}>L</SliderMark>
        <SliderMark value={75}>XL</SliderMark>
        <SliderMark value={100}>2XL</SliderMark>
      </Box>
      <SliderTrack bg={'primary.100'}>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb boxSize={6} paddingBottom={0} />
    </Slider>
  );
};

export default FontSizeSlider;
