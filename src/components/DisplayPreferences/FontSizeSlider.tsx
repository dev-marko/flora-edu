import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";

const FontSizeSlider = () => {
  return (
    <Slider
      defaultValue={40}
      min={0}
      max={100}
      step={20}
      w={{ base: "100%", md: "75%" }}
      alignSelf={"center"}
    >
      <Box marginY={5}>
        <SliderMark value={20}>S</SliderMark>
        <SliderMark value={40}>M</SliderMark>
        <SliderMark value={60}>L</SliderMark>
        <SliderMark value={80}>XL</SliderMark>
      </Box>
      <SliderTrack bg={"primary.100"}>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb boxSize={6} paddingBottom={0} />
    </Slider>
  );
};

export default FontSizeSlider;
