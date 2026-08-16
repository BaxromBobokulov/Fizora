import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { neutralColors } from "@/constants/theme/colors";
import type { SubjectMeta } from "@/constants/subjects";
import { CategoryIcon } from "@/components/labs/CategoryIcon";

type SubjectExploreCardProps = {
  subject: SubjectMeta;
  illustration: ImageSourcePropType;
  experimentCount: number;
  width: number;
  onPress: () => void;
};

export function SubjectExploreCard({
  subject,
  illustration,
  experimentCount,
  width,
  onPress,
}: SubjectExploreCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className="overflow-hidden rounded-[24px] p-4"
      style={{ backgroundColor: subject.tileBackground, width, minHeight: 190 }}
    >
      <Image
        source={illustration}
        className="absolute -right-3 -top-3 h-28 w-28 opacity-90"
        resizeMode="contain"
      />

      <View
        className="h-10 w-10 items-center justify-center rounded-[14px]"
        style={{ backgroundColor: subject.color }}
      >
        <CategoryIcon topic={subject.id} size={18} color="#FFFFFF" />
      </View>

      <Text className="mt-3 text-[16px] font-poppins-bold text-[#0D132B]">{subject.label}</Text>
      <Text
        className="mt-1 text-[11px] font-poppins-medium leading-[15px]"
        style={{ color: neutralColors.textSecondary }}
        numberOfLines={2}
      >
        {subject.description}
      </Text>
      <Text className="mt-2 text-[11px] font-poppins-bold" style={{ color: subject.color }}>
        {experimentCount} Experiment{experimentCount === 1 ? "" : "s"}
      </Text>

      <View
        className="absolute bottom-3 right-3 h-8 w-8 items-center justify-center rounded-full bg-white"
        style={{
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          elevation: 2,
        }}
      >
        <Ionicons name="chevron-forward" size={14} color={subject.color} />
      </View>
    </TouchableOpacity>
  );
}
