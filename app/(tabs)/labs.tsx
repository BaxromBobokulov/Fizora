import { useMemo, useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { neutralColors, primaryColors } from "@/constants/theme/colors";
import { EXPLORE_SUBJECT_ORDER, SUBJECT_META } from "@/constants/subjects";
import { allExperiments, getExperimentsBySubject } from "@/data/labs";
import { useProgressStore } from "@/store/useProgressStore";
import { useSavedLabsStore } from "@/store/useSavedLabsStore";
import type { Lab, LabSubject } from "@/types/lab";

import { SearchBar } from "@/components/labs/SearchBar";
import { CategoryChips, type CategoryFilter } from "@/components/labs/CategoryChips";
import { FeaturedLabCard } from "@/components/labs/FeaturedLabCard";
import { SubjectCard } from "@/components/labs/SubjectCard";
import { ProgressSummaryCard } from "@/components/labs/ProgressSummaryCard";
import { DailyChallengeCard } from "@/components/labs/DailyChallengeCard";
import { LabListItem } from "@/components/labs/LabListItem";
import { getLabStatus } from "@/components/labs/LabStatusBadge";
import { HeaderMascot } from "@/components/labs/HeaderMascot";

export default function Labs() {
  const router = useRouter();
  const tabBarHeight = useBottomTabBarHeight();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");
  const [filterSheetVisible, setFilterSheetVisible] = useState(false);

  const completedLabIds = useProgressStore((state) => state.completedLabIds);
  const lastActiveLabId = useProgressStore((state) => state.lastActiveLabId);
  const savedLabIds = useSavedLabsStore((state) => state.savedLabIds);

  const getStatus = (labId: string) => getLabStatus(labId, completedLabIds, lastActiveLabId);

  const trimmedQuery = searchQuery.trim().toLowerCase();
  const isSearching = trimmedQuery.length > 0;

  const categoryPool = useMemo(() => {
    if (selectedCategory === "all") return allExperiments;
    if (selectedCategory === "saved") {
      return allExperiments.filter((lab) => savedLabIds.includes(lab.id));
    }
    return getExperimentsBySubject(selectedCategory);
  }, [selectedCategory, savedLabIds]);

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    return categoryPool.filter((lab) => lab.title.toLowerCase().includes(trimmedQuery));
  }, [isSearching, trimmedQuery, categoryPool]);

  // One featured lab per subject: the first uncompleted lab in that subject,
  // falling back to the subject's first lab once everything is completed.
  const featuredLabs = useMemo(() => {
    return EXPLORE_SUBJECT_ORDER.map((subject) => {
      const subjectLabs = getExperimentsBySubject(subject);
      return subjectLabs.find((lab) => !completedLabIds.includes(lab.id)) ?? subjectLabs[0];
    }).filter((lab): lab is Lab => Boolean(lab));
  }, [completedLabIds]);

  const completedTotal = allExperiments.filter((lab) => completedLabIds.includes(lab.id)).length;

  const nextUncompletedLab: Lab | undefined =
    allExperiments.find((lab) => !completedLabIds.includes(lab.id)) ?? allExperiments[0];

  function openLab(lab: Lab) {
    router.push(`/lab/${lab.dimension}/${lab.id}` as never);
  }

  function openSubject(subject: LabSubject) {
    const firstLab = getExperimentsBySubject(subject)[0];
    if (firstLab) openLab(firstLab);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView
        contentContainerClassName="px-5 pt-2 pb-[60px]"
        // contentContainerStyle={{ paddingBottom: tabBarHeight + 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mt-2">
          <View className="flex-1 pr-3">
            <Text className="text-[28px] font-poppins-bold text-[#0D132B] mt-2">Labs</Text>
            <Text className="mt-1 text-[12px] font-poppins-medium text-[#6B7280] w-[200px]">
              Explore experiments and learn science by doing.
            </Text>
          </View>
          <HeaderMascot/>
        </View>

        {/* Search */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFilterPress={() => setFilterSheetVisible(true)}
        />

        {/* Category chips */}
        <CategoryChips selected={selectedCategory} onSelect={setSelectedCategory} />

        {isSearching ? (
          <View className="mt-6">
            <Text className="text-[15px] font-poppins-bold text-[#0D132B]">
              {searchResults.length} result{searchResults.length === 1 ? "" : "s"}
            </Text>
            {searchResults.length === 0 ? (
              <Text className="mt-3 text-[13px] font-poppins-medium text-[#6B7280]">
                No experiments match &quot;{searchQuery}&quot;.
              </Text>
            ) : (
              searchResults.map((lab) => (
                <LabListItem
                  key={lab.id}
                  lab={lab}
                  status={getStatus(lab.id)}
                  onPress={() => openLab(lab)}
                />
              ))
            )}
          </View>
        ) : selectedCategory === "saved" && categoryPool.length === 0 ? (
          <View className="mt-10 items-center gap-2 px-6">
            <Ionicons name="bookmark-outline" size={28} color={neutralColors.textSecondary} />
            <Text className="text-center text-[13px] font-poppins-bold text-[#0D132B]">
              No saved experiments yet
            </Text>
            <Text className="text-center text-[12px] font-poppins-medium text-[#6B7280]">
              Experiments you save will show up here.
            </Text>
          </View>
        ) : (
          <>
            {/* Featured Lab */}
            <View className="mt-7 flex-row items-center justify-between">
              <Text className="text-[18px] font-poppins-bold text-[#0D132B]">Featured Lab</Text>
              <TouchableOpacity activeOpacity={0.7} className="flex-row items-center gap-0.5">
                <Text
                  className="text-[13px] font-poppins-bold"
                  style={{ color: primaryColors.purple }}
                >
                  View all
                </Text>
                <Ionicons name="chevron-forward" size={14} color={primaryColors.purple} />
              </TouchableOpacity>
            </View>

            <View className="mt-3">
              <FeaturedLabCard labs={featuredLabs} getStatus={getStatus} onPressLab={openLab} />
            </View>

            {/* Explore by Subject */}
            <View className="mt-7 flex-row items-center justify-between">
              <Text className="text-[18px] font-poppins-bold text-[#0D132B]">
                Explore by Subject
              </Text>
              <TouchableOpacity activeOpacity={0.7} className="flex-row items-center gap-0.5">
                <Text
                  className="text-[13px] font-poppins-bold"
                  style={{ color: primaryColors.purple }}
                >
                  View all
                </Text>
                <Ionicons name="chevron-forward" size={14} color={primaryColors.purple} />
              </TouchableOpacity>
            </View>

            <View className="mt-3 flex-row gap-2">
              {EXPLORE_SUBJECT_ORDER.map((subject) => {
                const subjectLabs = getExperimentsBySubject(subject);
                const subjectCompleted = subjectLabs.filter((lab) =>
                  completedLabIds.includes(lab.id)
                ).length;

                return (
                  <SubjectCard
                    key={subject}
                    subject={SUBJECT_META[subject]}
                    experimentCount={subjectLabs.length}
                    completedCount={subjectCompleted}
                    onPress={() => openSubject(subject)}
                  />
                );
              })}
            </View>

            {/* Your Progress */}
            <ProgressSummaryCard completedCount={completedTotal} totalCount={allExperiments.length} />

            {/* Daily Challenge */}
            <DailyChallengeCard
              onPress={() => {
                if (nextUncompletedLab) openLab(nextUncompletedLab);
              }}
            />
          </>
        )}
      </ScrollView>

      {/* Filter bottom sheet placeholder */}
      <Modal
        visible={filterSheetVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setFilterSheetVisible(false)}
      >
        <TouchableOpacity
          className="flex-1 justify-end"
          style={{ backgroundColor: "rgba(13, 19, 43, 0.4)" }}
          activeOpacity={1}
          onPress={() => setFilterSheetVisible(false)}
        >
          <View className="rounded-t-[28px] bg-white p-6 pb-10">
            <View
              className="mb-4 h-1 w-10 self-center rounded-full"
              style={{ backgroundColor: neutralColors.border }}
            />
            <Text className="text-[16px] font-poppins-bold text-[#0D132B]">Filters</Text>
            <Text className="mt-2 text-[13px] font-poppins-medium text-[#6B7280]">
              {/* TODO: difficulty, dimension (2D/3D), and duration filters */}
              More filtering options are coming soon.
            </Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}