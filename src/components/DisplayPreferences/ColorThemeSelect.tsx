import { useLocalStorage } from 'usehooks-ts';

import {
  Circle,
  HStack,
  RadioProps,
  useRadio,
  useRadioGroup,
} from '@chakra-ui/react';

import {
  COLOR_THEME_KEY,
  colorThemeSelectOptions,
  customColorThemes,
} from '@constants/theme-constants';

import feGreen from '@themes/feGreen';
import AppTheme from '@themes/interface/appTheme';

const ColorThemeButton = (props: RadioProps) => {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Circle bg={props.value} as="label" size={'60px'} marginLeft={{ base: 0 }}>
      <input {...input} />
      <Circle
        {...checkbox}
        cursor="pointer"
        boxShadow="md"
        _checked={{
          borderWidth: '4px',
          borderColor: 'black',
        }}
        _hover={{
          boxShadow: 'xl',
        }}
        size={'60px'}
      ></Circle>
    </Circle>
  );
};

type Props = {
  colorModeChangeCallback: (value: any) => void;
};

const ColorThemeSelect = ({
  colorModeChangeCallback: onColorModeChange,
}: Props) => {
  const options = colorThemeSelectOptions;

  const [colorTheme, setColorTheme] = useLocalStorage(COLOR_THEME_KEY, feGreen);

  const handleClick = (value: string) => {
    const colorThemeValue = value.split('.')[0];
    const customTheme: AppTheme | undefined = customColorThemes.find(
      (c) => c.id == colorThemeValue
    );
    if (customTheme) {
      setColorTheme(customTheme);
      onColorModeChange(customTheme);
    }
  };

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'colorTheme',
    defaultValue: `${colorTheme}.500`,
    onChange: (value) => handleClick(value),
  });

  const group = getRootProps();

  return (
    <HStack {...group} alignSelf={'center'} gap={5} flexWrap={{ base: 'wrap' }}>
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return (
          <ColorThemeButton key={value} {...radio}>
            {value}
          </ColorThemeButton>
        );
      })}
    </HStack>
  );
};

export default ColorThemeSelect;
