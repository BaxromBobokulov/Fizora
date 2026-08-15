import { View } from "react-native";

import { primaryColors } from "@/constants/theme/colors";
import { StatItem } from "./StatItem";

type ProgressStatsRowProps = {
  labsCompleted: number;
  topicsMastered: number;
  hoursLearned: number;
  achievementsCount: number;
};

export function ProgressStatsRow({
  labsCompleted,
  topicsMastered,
  hoursLearned,
  achievementsCount,
}: ProgressStatsRowProps) {
  return (
    <View className="mt-4 flex-row rounded-[24px] border border-gray-100 bg-white p-5">
      <StatItem icon="flask" color={primaryColors.purple} value={labsCompleted} label="Labs Completed" />
      <StatItem icon="star" color={primaryColors.orange} value={topicsMastered} label="Topics Mastered" />
      <StatItem icon="time" color={primaryColors.green} value={hoursLearned} label="Hours Learned" />
      <StatItem icon="trophy" color={primaryColors.blue} value={achievementsCount} label="Achievements" />
    </View>
  );
}