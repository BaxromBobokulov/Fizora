import { Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { neutralColors, semanticColors } from "@/constants/theme/colors";

type SettingsListItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  danger?: boolean;
  showDivider?: boolean;
};

export function SettingsListItem({
  icon,
  label,
  onPress,
  danger = false,
  showDivider = true,
}: SettingsListItemProps) {
  const color = danger ? semanticColors.error : neutralColors.textPrimary;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center gap-3 py-4"
      style={showDivider ? { borderBottomWidth: 1, borderBottomColor: neutralColors.border } : undefined}
    >
      <Ionicons name={icon} size={20} color={color} />
      <Text className="flex-1 text-[14px] font-poppins-medium" style={{ color }}>
        {label}
      </Text>
      <Ionicons name="chevron-forward" size={18} color={neutralColors.textSecondary} />
    </TouchableOpacity>
  );
}