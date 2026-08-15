import { Text, TouchableOpacity, View } from "react-native";

import { neutralColors, primaryColors } from "@/constants/theme/colors";
import { GRAVITY_PRESETS } from "@/data/physics/mechanics/pendulum-motion";

type GravityPresetRowProps = {
  gravity: number;
  onSelect: (value: number) => void;
};

export function GravityPresetRow({ gravity, onSelect }: GravityPresetRowProps) {
  const activePreset = GRAVITY_PRESETS.find((preset) => Math.abs(preset.value - gravity) < 0.01);

  return (
    <View className="mb-4 flex-row gap-2">
      {GRAVITY_PRESETS.map((preset) => {
        const active = preset.id === activePreset?.id;
        return (
          <TouchableOpacity
            key={preset.id}
            onPress={() => onSelect(preset.value)}
            activeOpacity={0.75}
            className="rounded-full px-3 py-1.5"
            style={{ backgroundColor: active ? primaryColors.purple : neutralColors.surface }}
          >
            <Text
              className="text-[11px] font-poppins-semibold"
              style={{ color: active ? "#FFFFFF" : neutralColors.textSecondary }}
            >
              {preset.label}
            </Text>
          </TouchableOpacity>
        );
      })}
      <View
        className="rounded-full px-3 py-1.5"
        style={{ backgroundColor: activePreset ? neutralColors.surface : primaryColors.purple }}
      >
        <Text
          className="text-[11px] font-poppins-semibold"
          style={{ color: activePreset ? neutralColors.textSecondary : "#FFFFFF" }}
        >
          Custom
        </Text>
      </View>
    </View>
  );
}
