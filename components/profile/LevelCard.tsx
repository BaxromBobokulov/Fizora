import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { primaryColors } from "@/constants/theme/colors";
import { xpProgressPercent } from "@/store/useProgressStore";

type LevelCardProps = {
  level: number;
  currentLevelXp: number;
  nextLevelXpTarget: number;
};

export function LevelCard({ level, currentLevelXp, nextLevelXpTarget }: LevelCardProps) {
  const progressPercent = xpProgressPercent(currentLevelXp, nextLevelXpTarget);

  return (
    <View className="mt-5 rounded-[24px] border border-gray-100 bg-white p-5">
      <View className="flex-row items-center justify-between">
        <View
          className="flex-row items-center gap-1.5 self-start rounded-full px-4 py-2"
          style={{ backgroundColor: `${primaryColors.purple}14` }}
        >
          <Ionicons name="star" size={14} color={primaryColors.purple} />
          <Text className="text-[14px] font-poppins-bold" style={{ color: primaryColors.purple }}>
            Level {level}
          </Text>
        </View>

        <View className="flex-row items-baseline gap-1">
          <Text className="text-[15px] font-poppins-bold" style={{ color: primaryColors.purple }}>
            {currentLevelXp}
          </Text>
          <Text className="text-[13px] font-poppins-medium text-[#6B7280]">
            / {nextLevelXpTarget} XP
          </Text>
        </View>
      </View>

      <View className="mt-4 h-2 w-full overflow-hidden rounded-full bg-[#F6F7FB]">
        <View
          className="h-2 rounded-full"
          style={{ width: `${progressPercent}%`, backgroundColor: primaryColors.purple }}
        />
      </View>
    </View>
  );
}