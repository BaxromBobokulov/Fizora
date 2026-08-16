import { Image, Text, TouchableOpacity, View } from "react-native";

import { neutralColors } from "@/constants/theme/colors";
import type { SubjectMeta } from "@/constants/subjects";

type SubjectCardProps = {
  subject: SubjectMeta;
  experimentCount: number;
  completedCount: number;
  onPress: () => void;
};

export function SubjectCard({ subject, experimentCount, completedCount, onPress }: SubjectCardProps) {
  const progressPercent =
    experimentCount === 0 ? 0 : Math.round((completedCount / experimentCount) * 100);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className="flex-1 rounded-[20px] p-3"
      style={{ backgroundColor: subject.tileBackground }}
    >
      <Image source={subject.icon} className="h-14 w-14" resizeMode="contain" />

      <Text className="mt-2 text-[14px] font-poppins-bold text-[#0D132B]" numberOfLines={1}>
        {subject.label}
      </Text>
      <Text
        className="mt-0.5 text-[10px] font-poppins-medium"
        style={{ color: neutralColors.textSecondary }}
        numberOfLines={1}
      >
        {experimentCount} Experiment{experimentCount === 1 ? "" : "s"}
      </Text>
      <Text
        className="mt-1 text-[10px] font-poppins-medium leading-[13px]"
        style={{ color: neutralColors.textSecondary }}
        numberOfLines={2}
      >
        {subject.description}
      </Text>

      <View className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white">
        <View
          className="h-1.5 rounded-full"
          style={{ width: `${progressPercent}%`, backgroundColor: subject.color }}
        />
      </View>
    </TouchableOpacity>
  );
}