import { Image, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { images } from "@/constants/images";
import { neutralColors, primaryColors } from "@/constants/theme/colors";

type MicroscopeTipCardProps = {
  tip: string;
  accentTint: string;
};

export function MicroscopeTipCard({ tip, accentTint }: MicroscopeTipCardProps) {
  return (
    <View
      className="mt-4 flex-row items-center justify-between overflow-hidden rounded-[20px] p-4"
      style={{ backgroundColor: accentTint }}
    >
      <View className="flex-1 pr-3">
        <View className="flex-row items-center gap-2">
          <Ionicons name="bulb-outline" size={16} color={primaryColors.blue} />
          <Text className="text-[14px] font-poppins-bold text-text-primary">Tip</Text>
        </View>
        <Text
          className="mt-1 text-[13px] font-poppins-regular leading-[20px]"
          style={{ color: neutralColors.textSecondary }}
        >
          {tip}
        </Text>
      </View>

      <Image source={images.mascotAuth} className="h-16 w-16" resizeMode="contain" />
    </View>
  );
}
