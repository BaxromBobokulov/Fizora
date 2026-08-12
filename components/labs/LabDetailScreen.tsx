import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { neutralColors, primaryColors } from "@/constants/theme/colors";
import { getLabById, getTopicById } from "@/data/physics";
import { useProgressStore } from "@/store/useProgressStore";
import { getLabStatus, LabStatusBadge } from "./LabStatusBadge";

type LabDetailScreenProps = {
  labId?: string;
};

export function LabDetailScreen({ labId }: LabDetailScreenProps) {
  const router = useRouter();
  const lab = labId ? getLabById(labId) : undefined;

  const completedLabIds = useProgressStore((state) => state.completedLabIds);
  const lastActiveLabId = useProgressStore((state) => state.lastActiveLabId);
  const completeLab = useProgressStore((state) => state.completeLab);

  if (!lab) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <View className="flex-1 items-center justify-center gap-3 px-10">
          <Ionicons name="flask-outline" size={28} color={primaryColors.purple} />
          <Text className="text-center text-body-md font-poppins-medium text-text-secondary">
            This experiment could not be found.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const topic = getTopicById(lab.topic);
  const status = getLabStatus(lab.id, completedLabIds, lastActiveLabId);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView contentContainerClassName="px-5 pb-10 pt-2" showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          className="h-10 w-10 items-center justify-center rounded-full border border-gray-100"
        >
          <Ionicons name="chevron-back" size={20} color={neutralColors.textPrimary} />
        </TouchableOpacity>

        <Image source={lab.image} className="mt-4 h-48 w-full rounded-[24px]" resizeMode="cover" />

        <View className="mt-4 flex-row items-center gap-2">
          <Text
            className="text-[13px] font-poppins-bold"
            style={{ color: topic?.color ?? primaryColors.purple }}
          >
            {topic?.title ?? "Physics"}
          </Text>
          <LabStatusBadge status={status} />
        </View>

        <Text className="mt-1 text-[24px] font-poppins-bold text-[#0D132B]">{lab.title}</Text>
        <Text className="mt-2 text-[14px] font-poppins-regular leading-[22px] text-text-secondary">
          {lab.description}
        </Text>

        <View className="mt-4 flex-row flex-wrap gap-2">
          <InfoChip icon="time-outline" label={`${lab.durationMinutes} min`} />
          <InfoChip icon="stats-chart-outline" label={lab.difficulty} />
          <InfoChip
            icon={lab.dimension === "3d" ? "cube-outline" : "square-outline"}
            label={lab.dimension.toUpperCase()}
          />
        </View>

        <Text className="mt-6 text-[15px] font-poppins-bold text-[#0D132B]">Parameters</Text>
        {lab.parameters.map((parameter) => (
          <View
            key={parameter.key}
            className="mt-2 flex-row items-center justify-between rounded-[16px] border border-gray-100 px-4 py-3"
          >
            <Text className="text-[13px] font-poppins-medium text-text-primary">
              {parameter.label}
            </Text>
            <Text className="text-[12px] font-poppins-medium text-text-secondary">
              {parameter.defaultValue} {parameter.unit} ({parameter.min}–{parameter.max})
            </Text>
          </View>
        ))}

        {/* TODO: real matter.js (2D) / react-three-fiber + rapier (3D) simulation
            renders here per AGENTS.md — this screen is a stub so lab navigation
            and completion status are testable end-to-end. */}
        <TouchableOpacity
          onPress={() => completeLab(lab.id)}
          activeOpacity={0.85}
          className="mt-8 items-center rounded-full py-4"
          style={{ backgroundColor: primaryColors.purple }}
        >
          <Text className="text-[14px] font-poppins-bold text-white">
            {status === "completed" ? "Run Again" : "Run Experiment"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoChip({
  icon,
  label,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
}) {
  return (
    <View
      className="flex-row items-center gap-1.5 rounded-full px-3 py-2"
      style={{ backgroundColor: neutralColors.surface }}
    >
      <Ionicons name={icon} size={14} color={neutralColors.textSecondary} />
      <Text className="text-[12px] font-poppins-medium capitalize text-text-primary">{label}</Text>
    </View>
  );
}