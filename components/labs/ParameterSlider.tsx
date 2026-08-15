import { useRef, useState } from "react";
import { PanResponder, Text, TouchableOpacity, View } from "react-native";

import { neutralColors, primaryColors } from "@/constants/theme/colors";

type ParameterSliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
};

function clampToStep(raw: number, min: number, max: number, step: number): number {
  const clamped = Math.min(max, Math.max(min, raw));
  const stepped = Math.round((clamped - min) / step) * step + min;
  // Guards against binary step accumulation (e.g. 0.30000000000000004).
  return Math.round(stepped * 1000) / 1000;
}

export function ParameterSlider({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
  formatValue,
}: ParameterSliderProps) {
  const [trackWidth, setTrackWidth] = useState(0);
  const trackWidthRef = useRef(0);

  const applyFromLocationX = (locationX: number) => {
    if (trackWidthRef.current <= 0) return;
    const ratio = Math.min(1, Math.max(0, locationX / trackWidthRef.current));
    onChange(clampToStep(min + ratio * (max - min), min, max, step));
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => applyFromLocationX(evt.nativeEvent.locationX),
      onPanResponderMove: (evt) => applyFromLocationX(evt.nativeEvent.locationX),
    })
  ).current;

  const ratio = max === min ? 0 : (value - min) / (max - min);
  const displayValue = formatValue ? formatValue(value) : `${value}`;

  return (
    <View className="mb-5">
      <View className="flex-row items-center justify-between">
        <Text className="text-[13px] font-poppins-semibold text-text-primary">{label}</Text>
        <Text
          className="text-[13px] font-poppins-semibold"
          style={{ color: primaryColors.purple }}
        >
          {displayValue} {unit}
        </Text>
      </View>

      <View className="mt-2 flex-row items-center gap-2">
        <TouchableOpacity
          onPress={() => onChange(clampToStep(value - step, min, max, step))}
          activeOpacity={0.7}
          className="h-7 w-7 items-center justify-center rounded-full"
          style={{ backgroundColor: neutralColors.surface }}
        >
          <Text className="text-[15px] font-poppins-bold text-text-secondary">−</Text>
        </TouchableOpacity>

        <View
          className="flex-1 justify-center py-2.5"
          onLayout={(e) => {
            trackWidthRef.current = e.nativeEvent.layout.width;
            setTrackWidth(e.nativeEvent.layout.width);
          }}
          {...panResponder.panHandlers}
        >
          <View
            className="h-1.5 rounded-full"
            style={{ backgroundColor: neutralColors.border }}
          >
            <View
              className="h-1.5 rounded-full"
              style={{ width: `${ratio * 100}%`, backgroundColor: primaryColors.purple }}
            />
          </View>
          {trackWidth > 0 && (
            <View
              className="absolute h-4 w-4 rounded-full border-2 border-white"
              style={{
                left: ratio * trackWidth - 8,
                top: "50%",
                marginTop: -8,
                backgroundColor: primaryColors.purple,
                shadowColor: "#000",
                shadowOpacity: 0.15,
                shadowRadius: 2,
                shadowOffset: { width: 0, height: 1 },
              }}
            />
          )}
        </View>

        <TouchableOpacity
          onPress={() => onChange(clampToStep(value + step, min, max, step))}
          activeOpacity={0.7}
          className="h-7 w-7 items-center justify-center rounded-full"
          style={{ backgroundColor: neutralColors.surface }}
        >
          <Text className="text-[15px] font-poppins-bold text-text-secondary">+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
