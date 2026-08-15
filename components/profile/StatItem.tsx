import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type StatItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  value: number;
  label: string;
};

export function StatItem({ icon, color, value, label }: StatItemProps) {
  return (
    <View className="flex-1 items-center">
      <View
        className="h-12 w-12 items-center justify-center rounded-full"
        style={{ backgroundColor: `${color}1A` }}
      >
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text className="mt-2 text-[19px] font-poppins-bold text-[#0D132B]">{value}</Text>
      <Text
        className="mt-0.5 text-center text-[11px] font-poppins-medium text-[#6B7280]"
        numberOfLines={2}
      >
        {label}
      </Text>
    </View>
  );
}