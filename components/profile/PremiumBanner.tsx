import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { primaryColors } from "@/constants/theme/colors";

type PremiumBannerProps = {
  onPress: () => void;
};

export function PremiumBanner({ onPress }: PremiumBannerProps) {
  return (
    <LinearGradient
      style={{borderRadius: 25}}
      colors={["#22D3C5", "#0EA5A0"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="mt-5 flex-row items-center gap-3 rounded-[28px] p-5"
    >
      <View className="h-11 w-11 items-center justify-center rounded-full bg-white">
        <Ionicons name="ribbon" size={20} color={primaryColors.orange} />
      </View>

      <View className="flex-1">
        <Text className="text-[15px] font-poppins-bold text-white">Fizora Premium</Text>
        <Text className="mt-0.5 text-[11px] font-poppins-medium leading-tight text-white/90">
          Unlock all labs, AI teacher and advanced features.
        </Text>
      </View>

      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        className="flex-row items-center gap-1 rounded-full bg-white px-4 py-2.5"
      >
        <Text className="text-[13px] font-poppins-bold text-[#0EA5A0]">Upgrade</Text>
        <Ionicons name="chevron-forward" size={14} color="#0EA5A0" />
      </TouchableOpacity>
    </LinearGradient>
  );
}