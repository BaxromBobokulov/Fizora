import { ScrollView, Text, TouchableOpacity } from "react-native";

import { neutralColors, primaryColors } from "@/constants/theme/colors";
import { topics } from "@/data/physics";
import type { LabTopicId } from "@/types/lab";
import { CategoryIcon, type CategoryIconTopic } from "./CategoryIcon";

export type CategoryFilter = "all" | LabTopicId;

type CategoryChipsProps = {
  selected: CategoryFilter;
  onSelect: (filter: CategoryFilter) => void;
};

export function CategoryChips({ selected, onSelect }: CategoryChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="mt-5 gap-2 pr-2"
    >
      <Chip
        label="All"
        topic="all"
        color={primaryColors.purple}
        active={selected === "all"}
        onPress={() => onSelect("all")}
      />
      {topics.map((topic) => (
        <Chip
          key={topic.id}
          label={topic.title}
          topic={topic.id}
          color={topic.color}
          active={selected === topic.id}
          onPress={() => onSelect(topic.id)}
        />
      ))}
    </ScrollView>
  );
}

function Chip({
  label,
  topic,
  color,
  active,
  onPress,
}: {
  label: string;
  topic: CategoryIconTopic;
  color: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="flex-row items-center gap-1.5 rounded-full border px-4 py-2.5"
      style={{
        backgroundColor: active ? primaryColors.purple : "#FFFFFF",
        borderColor: active ? primaryColors.purple : neutralColors.border,
      }}
    >
      <CategoryIcon topic={topic} size={15} color={active ? "#FFFFFF" : color} />
      <Text
        className="text-[13px] font-poppins-bold"
        style={{ color: active ? "#FFFFFF" : neutralColors.textPrimary }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}