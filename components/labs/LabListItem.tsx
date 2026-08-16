import { Image, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { neutralColors } from "@/constants/theme/colors";
import { SUBJECT_META } from "@/constants/subjects";
import type { Lab } from "@/types/lab";
import { LabStatusBadge, type LabStatus } from "./LabStatusBadge";

type LabListItemProps = {
  lab: Lab;
  status: LabStatus;
  onPress: () => void;
};

export function LabListItem({ lab, status, onPress }: LabListItemProps) {
  const subject = SUBJECT_META[lab.subject];

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      className="mt-3 flex-row items-center gap-3 rounded-[20px] border border-gray-100 bg-white p-3"
    >
      <Image source={lab.image} className="h-14 w-14 rounded-[14px]" resizeMode="cover" />

      <View className="flex-1">
        <Text className="text-[14px] font-poppins-bold text-[#0D132B]" numberOfLines={1}>
          {lab.title}
        </Text>
        <Text
          className="mt-0.5 text-[11px] font-poppins-medium"
          style={{ color: neutralColors.textSecondary }}
        >
          {subject.label} · {lab.durationMinutes} min
        </Text>
        {status !== "not-started" && (
          <View className="mt-1.5">
            <LabStatusBadge status={status} />
          </View>
        )}
      </View>

      <Ionicons name="chevron-forward" size={18} color={neutralColors.textSecondary} />
    </TouchableOpacity>
  );
}