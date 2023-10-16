import { forwardRef, useState } from "react";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Tooltip,
} from "@chakra-ui/react";

interface ISliderComp {
  placeholder?: string;
  value?: number;
  onChange?: () => void;
}

export const SliderThumbWithTooltip = forwardRef<any, ISliderComp>(
  (props: ISliderComp, ref) => {
    const [showTooltip, setShowTooltip] = useState(false);
    const { placeholder, value, onChange } = props;

    return (
      <Slider
        id="slider"
        defaultValue={0}
        min={0}
        max={100}
        colorScheme="teal"
        onChange={onChange}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <SliderMark value={25} mt="2" ml="-2.5" fontSize="sm">
          25%
        </SliderMark>
        <SliderMark value={50} mt="2" ml="-2.5" fontSize="sm">
          50%
        </SliderMark>
        <SliderMark value={75} mt="2" ml="-2.5" fontSize="sm">
          75%
        </SliderMark>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <Tooltip
          hasArrow
          bg="teal.500"
          color="white"
          placement="top"
          isOpen={showTooltip}
          label={value ? `${value}%` : "0%"}
        >
          <SliderThumb />
        </Tooltip>
      </Slider>
    );
  }
);
