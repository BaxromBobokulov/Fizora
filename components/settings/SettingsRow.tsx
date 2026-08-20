import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { neutralColors, primaryColors } from "@/constants/theme/colors";

type SettingsRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  value?: string;
  onPress: () => void;
  showDivider?: boolean;
};

export function SettingsRow({
  icon,
  title,
  subtitle,
  value,
  onPress,
  showDivider = true,
}: SettingsRowProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center gap-3 py-3.5"
      style={showDivider ? { borderBottomWidth: 1, borderBottomColor: neutralColors.border } : undefined}
    >
      <View
        className="h-10 w-10 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${primaryColors.purple}1A` }}
      >
        <Ionicons name={icon} size={18} color={primaryColors.purple} />
      </View>

      <View className="flex-1">
        <Text className="text-[14px] font-poppins-semibold text-text-primary">{title}</Text>
        <Text className="mt-0.5 text-[12px] font-poppins-regular text-text-secondary">
          {subtitle}
        </Text>
      </View>

      {!!value && (
        <Text className="text-[13px] font-poppins-semibold" style={{ color: primaryColors.purple }}>
          {value}
        </Text>
      )}

      <Ionicons name="chevron-forward" size={18} color={neutralColors.textSecondary} />
    </TouchableOpacity>
  );
}
