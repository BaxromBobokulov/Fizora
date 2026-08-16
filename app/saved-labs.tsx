import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { neutralColors } from "@/constants/theme/colors";
import { allExperiments } from "@/data/labs";
import { useProgressStore } from "@/store/useProgressStore";
import { useSavedLabsStore } from "@/store/useSavedLabsStore";
import { LabListItem } from "@/components/labs/LabListItem";
import { getLabStatus } from "@/components/labs/LabStatusBadge";
import type { Lab } from "@/types/lab";

export default function SavedLabs() {
  const router = useRouter();

  const savedLabIds = useSavedLabsStore((state) => state.savedLabIds);
  const completedLabIds = useProgressStore((state) => state.completedLabIds);
  const lastActiveLabId = useProgressStore((state) => state.lastActiveLabId);

  const savedLabs = allExperiments.filter((lab) => savedLabIds.includes(lab.id));

  function openLab(lab: Lab) {
    router.push(`/lab/${lab.dimension}/${lab.id}` as never);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View className="flex-row items-center gap-3 px-5 pt-2">
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          className="h-10 w-10 items-center justify-center rounded-full border border-gray-100"
        >
          <Ionicons name="chevron-back" size={20} color={neutralColors.textPrimary} />
        </TouchableOpacity>
        <Text className="text-[20px] font-poppins-bold text-[#0D132B]">Saved Labs</Text>
      </View>

      <ScrollView contentContainerClassName="px-5 pb-14 pt-3" showsVerticalScrollIndicator={false}>
        {savedLabs.length === 0 ? (
          <View className="mt-16 items-center gap-2 px-6">
            <Ionicons name="bookmark-outline" size={28} color={neutralColors.textSecondary} />
            <Text className="text-center text-[13px] font-poppins-bold text-[#0D132B]">
              No saved experiments yet
            </Text>
            <Text className="text-center text-[12px] font-poppins-medium text-[#6B7280]">
              Experiments you save will show up here.
            </Text>
          </View>
        ) : (
          savedLabs.map((lab) => (
            <LabListItem
              key={lab.id}
              lab={lab}
              status={getLabStatus(lab.id, completedLabIds, lastActiveLabId)}
              onPress={() => openLab(lab)}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
