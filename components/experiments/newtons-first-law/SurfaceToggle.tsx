import { Text, TouchableOpacity, View } from "react-native";

import { neutralColors, primaryColors } from "@/constants/theme/colors";

type SurfaceToggleProps = {
  frictionless: boolean;
  onChange: (frictionless: boolean) => void;
};

export function SurfaceToggle({ frictionless, onChange }: SurfaceToggleProps) {
  return (
    <View className="mb-4 flex-row gap-2">
      <TouchableOpacity
        onPress={() => onChange(true)}
        activeOpacity={0.75}
        className="flex-1 items-center rounded-full py-2"
        style={{ backgroundColor: frictionless ? primaryColors.blue : neutralColors.surface }}
      >
        <Text
          className="text-[12px] font-poppins-semibold"
          style={{ color: frictionless ? "#FFFFFF" : neutralColors.textSecondary }}
        >
          Frictionless
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onChange(false)}
        activeOpacity={0.75}
        className="flex-1 items-center rounded-full py-2"
        style={{ backgroundColor: !frictionless ? primaryColors.orange : neutralColors.surface }}
      >
        <Text
          className="text-[12px] font-poppins-semibold"
          style={{ color: !frictionless ? "#FFFFFF" : neutralColors.textSecondary }}
        >
          With Friction
        </Text>
      </TouchableOpacity>
    </View>
  );
}
