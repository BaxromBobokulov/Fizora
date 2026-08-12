import { Image, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { images } from "@/constants/images";
import { primaryColors } from "@/constants/theme/colors";
import { DAILY_CHALLENGE_XP_REWARD } from "@/constants/gamification";

type DailyChallengeCardProps = {
  onPress: () => void;
};

export function DailyChallengeCard({ onPress }: DailyChallengeCardProps) {
  return (
    <View
      className="mt-4 flex-row items-center gap-3 rounded-[24px] p-4"
      style={{ backgroundColor: "#EFEBFF" }}
    >
      <View
        className="h-14 w-14 items-center justify-center rounded-full"
        // style={{ backgroundColor: "#FFFFFF" }}
      >
        <Image source={images.dailyChallengeTrophy} className="h-14 w-14" resizeMode="contain" />
      </View>

      <View className="flex-1">
        <Text className="text-[13px] font-poppins-bold" style={{ color: primaryColors.purple }}>
          Daily Challenge
        </Text>
        <Text className="mt-0.5 text-[8.1px] font-poppins-medium text-[#0D132B]">
          Complete any experiment and earn {DAILY_CHALLENGE_XP_REWARD} XP
        </Text>
      </View>

      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.85}
        className="flex-row items-center gap-1 rounded-full px-4 py-2.5"
        style={{ backgroundColor: primaryColors.purple }}
      >
        <Text className="text-[13px] font-poppins-bold text-white">Take Challenge</Text>
        <Ionicons name="chevron-forward" size={10} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}