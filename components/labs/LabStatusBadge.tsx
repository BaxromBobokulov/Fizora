import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { neutralColors, primaryColors, semanticColors } from "@/constants/theme/colors";

export type LabStatus = "completed" | "in-progress" | "not-started";

const STATUS_CONFIG: Record<
  LabStatus,
  { label: string; color: string; icon: keyof typeof Ionicons.glyphMap }
> = {
  completed: { label: "Completed", color: semanticColors.success, icon: "checkmark-circle" },
  "in-progress": { label: "In Progress", color: primaryColors.orange, icon: "time" },
  "not-started": { label: "Not Started", color: neutralColors.textSecondary, icon: "ellipse-outline" },
};

export function getLabStatus(
  labId: string,
  completedLabIds: string[],
  lastActiveLabId: string | null
): LabStatus {
  if (completedLabIds.includes(labId)) return "completed";
  if (lastActiveLabId === labId) return "in-progress";
  return "not-started";
}

export function LabStatusBadge({ status }: { status: LabStatus }) {
  if (status === "not-started") return null;

  const config = STATUS_CONFIG[status];

  return (
    <View
      className="flex-row items-center gap-1 self-start rounded-full px-2.5 py-1"
      style={{ backgroundColor: "#FFFFFF" }}
    >
      <Ionicons name={config.icon} size={12} color={config.color} />
      <Text className="text-[11px] font-poppins-bold" style={{ color: config.color }}>
        {config.label}
      </Text>
    </View>
  );
}