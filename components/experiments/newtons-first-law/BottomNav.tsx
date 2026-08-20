import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { neutralColors, primaryColors } from "@/constants/theme/colors";

type BottomNavProps = {
  ctaLabel: string;
  onPressCta: () => void;
  onPressPrevious?: () => void;
  onPressNext?: () => void;
};

export function BottomNav({ ctaLabel, onPressCta, onPressPrevious, onPressNext }: BottomNavProps) {
  return (
    <View className="mt-4 flex-row items-center gap-2">
      <NavButton icon="chevron-back" label="Previous" onPress={onPressPrevious} align="left" />

      <TouchableOpacity
        onPress={onPressCta}
        activeOpacity={0.85}
        className="flex-1 flex-row items-center justify-center gap-2 rounded-full py-4"
        style={{ backgroundColor: primaryColors.purple }}
      >
        <Text className="text-[14px] font-poppins-bold text-white">{ctaLabel}</Text>
        <Ionicons name="play" size={14} color="#FFFFFF" />
      </TouchableOpacity>

      <NavButton icon="chevron-forward" label="Next" onPress={onPressNext} align="right" />
    </View>
  );
}

function NavButton({
  icon,
  label,
  onPress,
  align,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress?: () => void;
  align: "left" | "right";
}) {
  const disabled = !onPress;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.75}
      className="flex-row items-center gap-1 rounded-full px-3 py-4"
      style={{ backgroundColor: neutralColors.surface, opacity: disabled ? 0.4 : 1 }}
    >
      {align === "left" && <Ionicons name={icon} size={14} color={neutralColors.textPrimary} />}
      <Text className="text-[13px] font-poppins-semibold text-text-primary">{label}</Text>
      {align === "right" && <Ionicons name={icon} size={14} color={neutralColors.textPrimary} />}
    </TouchableOpacity>
  );
}
