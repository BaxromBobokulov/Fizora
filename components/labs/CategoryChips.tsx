import { ScrollView, Text, TouchableOpacity } from "react-native";

import { neutralColors, primaryColors } from "@/constants/theme/colors";
import { SUBJECT_META, SUBJECT_ORDER } from "@/constants/subjects";
import type { LabSubject } from "@/types/lab";
import { CategoryIcon, type CategoryIconTopic } from "./CategoryIcon";

export type CategoryFilter = "all" | LabSubject | "saved";

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
        icon="all"
        color={primaryColors.purple}
        active={selected === "all"}
        onPress={() => onSelect("all")}
      />
      {SUBJECT_ORDER.map((subject) => (
        <Chip
          key={subject}
          label={SUBJECT_META[subject].label}
          icon={subject}
          color={SUBJECT_META[subject].color}
          active={selected === subject}
          onPress={() => onSelect(subject)}
        />
      ))}
      <Chip
        label="Saved"
        icon="saved"
        color={primaryColors.orange}
        active={selected === "saved"}
        onPress={() => onSelect("saved")}
      />
    </ScrollView>
  );
}

function Chip({
  label,
  icon,
  color,
  active,
  onPress,
}: {
  label: string;
  icon: CategoryIconTopic;
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
      <CategoryIcon topic={icon} size={15} color={active ? "#FFFFFF" : color} />
      <Text
        className="text-[13px] font-poppins-bold"
        style={{ color: active ? "#FFFFFF" : neutralColors.textPrimary }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}