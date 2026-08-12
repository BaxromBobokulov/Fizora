import { Image, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { images } from "@/constants/images";
import { neutralColors, primaryColors } from "@/constants/theme/colors";
import { ProgressRing } from "./ProgressRing";

function getEncouragingMessage(percent: number): string {
  if (percent === 0) return "Your first experiment awaits!";
  if (percent < 25) return "You're just getting started.";
  if (percent < 75) return "You're doing great!";
  if (percent < 100) return "Almost there — keep going!";
  return "All experiments completed!";
}

type ProgressSummaryCardProps = {
  completedCount: number;
  totalCount: number;
};

export function ProgressSummaryCard({ completedCount, totalCount }: ProgressSummaryCardProps) {
  const percent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <View className="mt-6 flex-row items-center justify-between rounded-[24px] border border-gray-100 bg-white p-5">
      <View className="flex-1">
        <View className="flex-row items-center gap-1.5">
          <Ionicons name="trending-up" size={16} color={primaryColors.purple} />
          <Text className="text-[13px] font-poppins-bold text-[#0D132B]">Your Progress</Text>
        </View>

        <View className="mt-2 flex-row items-baseline gap-1">
          <Text className="text-[22px] font-poppins-bold text-[#0D132B]">{completedCount}</Text>
          <Text className="text-[13px] font-poppins-medium" style={{ color: neutralColors.textSecondary }}>
            / {totalCount}
          </Text>
        </View>
        <Text className="text-[11px] font-poppins-medium" style={{ color: neutralColors.textSecondary }}>
          Experiments Completed
        </Text>
      </View>

      <ProgressRing percent={percent} size={76} strokeWidth={9} />

      <View className="ml-2 w-20 items-center">
        <Text className="text-center text-[11px] font-poppins-bold text-[#0D132B]">
          {getEncouragingMessage(percent)}
        </Text>
        {/* <Image source={images.homeLearningProgress} className="mt-1 h-10 w-10" resizeMode="contain" /> */}
      </View>
    </View>
  );
}