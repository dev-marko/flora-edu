import {
  Circle,
  HStack,
  RadioProps,
  useRadio,
  useRadioGroup,
} from "@chakra-ui/react";

const ColorThemeButton = (props: RadioProps) => {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Circle bg={props.value} as="label" size={"60px"} marginLeft={{ base: 0 }}>
      <input {...input} />
      <Circle
        {...checkbox}
        cursor="pointer"
        boxShadow="md"
        _checked={{
          borderWidth: "4px",
          borderColor: "fePrimary",
        }}
        _hover={{
          boxShadow: "xl",
        }}
        size={"60px"}
      ></Circle>
    </Circle>
  );
};

const ColorThemeSelect = () => {
  const options = [
    "red.500",
    "feOrange.500",
    "blue.500",
    "feGreen.500",
    "fePurple.500",
    "pink.500",
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "colorTheme",
    defaultValue: "blue.500",
    onChange: console.log,
  });

  const group = getRootProps();

  return (
    <HStack {...group} alignSelf={"center"} gap={5} flexWrap={{ base: "wrap" }}>
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
