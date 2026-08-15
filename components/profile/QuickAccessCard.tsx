import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type QuickAccessCardProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  color: string;
  onPress: () => void;
};

export function QuickAccessCard({ icon, label, color, onPress }: QuickAccessCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className="w-[48%] items-center gap-2 rounded-[20px] p-4"
      style={{ backgroundColor: `${color}14` }}
    >
      <View
        className="h-11 w-11 items-center justify-center rounded-full"
        style={{ backgroundColor: `${color}20` }}
      >
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text className="text-[13px] font-poppins-bold text-[#0D132B]">{label}</Text>
    </TouchableOpacity>
  );
}