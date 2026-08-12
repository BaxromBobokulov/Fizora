import { Image, Text, TouchableOpacity, View } from "react-native";

import { neutralColors } from "@/constants/theme/colors";
import type { Topic } from "@/types/lab";

type TopicCardProps = {
  topic: Topic;
  experimentCount: number;
  completedCount: number;
  onPress: () => void;
};

export function TopicCard({ topic, experimentCount, completedCount, onPress }: TopicCardProps) {
  const progressPercent =
    experimentCount === 0 ? 0 : Math.round((completedCount / experimentCount) * 100);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className="w-[132px] rounded-[20px] p-3"
      style={{ backgroundColor: `${topic.color}14` }}
    >
      <Image source={topic.image} className="h-15 w-18" resizeMode="cover" />

      <Text className="mt-2 text-[13px] font-poppins-bold text-[#0D132B]" numberOfLines={1}>
        {topic.title}
      </Text>
      <Text
        className="mt-0.5 text-[10px] font-poppins-medium"
        style={{ color: neutralColors.textSecondary }}
        numberOfLines={1}
      >
        {experimentCount} Experiment{experimentCount === 1 ? "" : "s"}
      </Text>

      <View className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white">
        <View
          className="h-1.5 rounded-full"
          style={{ width: `${progressPercent}%`, backgroundColor: topic.color }}
        />
      </View>
    </TouchableOpacity>
  );
}