import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type QuickAccessCardProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  color: string;
  onPress: () => void;
  // "grid": Profile's tinted 2-column layout (default). "row": Home's compact
  // bordered layout for a single row of items.
  variant?: "grid" | "row";
};

export function QuickAccessCard({ icon, label, color, onPress, variant = "grid" }: QuickAccessCardProps) {
  if (variant === "row") {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        className="flex-1 items-center gap-2 rounded-[18px] border border-gray-100 bg-white py-4 px-1"
      >
        <Ionicons name={icon} size={22} color={color} />
        <Text
          className="text-center text-[10px] font-poppins-bold text-[#0D132B]"
          numberOfLines={2}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  }

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