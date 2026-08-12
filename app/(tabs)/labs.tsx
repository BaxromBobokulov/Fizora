import { useMemo, useState } from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

import { neutralColors, primaryColors } from "@/constants/theme/colors";
import { allLabs, getLabsByTopic, topics } from "@/data/physics";
import { useProgressStore } from "@/store/useProgressStore";
import type { Lab } from "@/types/lab";

import { SearchBar } from "@/components/labs/SearchBar";
import { CategoryChips, type CategoryFilter } from "@/components/labs/CategoryChips";
import { FeaturedLabCard } from "@/components/labs/FeaturedLabCard";
import { TopicCard } from "@/components/labs/TopicCard";
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

  const getStatus = (labId: string) => getLabStatus(labId, completedLabIds, lastActiveLabId);

  const trimmedQuery = searchQuery.trim().toLowerCase();
  const isSearching = trimmedQuery.length > 0;

  const searchResults = useMemo(() => {
    if (!isSearching) return [];
    return allLabs.filter(
      (lab) =>
        lab.title.toLowerCase().includes(trimmedQuery) &&
        (selectedCategory === "all" || lab.topic === selectedCategory)
    );
  }, [isSearching, trimmedQuery, selectedCategory]);

  const categoryPool = useMemo(
    () => (selectedCategory === "all" ? allLabs : getLabsByTopic(selectedCategory)),
    [selectedCategory]
  );

  const featuredLabs = useMemo(() => {
    const uncompleted = categoryPool.filter((lab) => !completedLabIds.includes(lab.id));
    const completed = categoryPool.filter((lab) => completedLabIds.includes(lab.id));
    return [...uncompleted, ...completed].slice(0, 4);
  }, [categoryPool, completedLabIds]);

  const completedTotal = allLabs.filter((lab) => completedLabIds.includes(lab.id)).length;

  const nextUncompletedLab: Lab | undefined =
    allLabs.find((lab) => !completedLabIds.includes(lab.id)) ?? allLabs[0];

  function openLab(lab: Lab) {
    router.push(`/lab/${lab.dimension}/${lab.id}` as never);
  }

  function openTopic(topicId: (typeof topics)[number]["id"]) {
    const firstLab = getLabsByTopic(topicId)[0];
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
              Explore experiments and learn physics by doing.
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

            {/* Topics */}
            <View className="mt-7 flex-row items-center justify-between">
              <Text className="text-[18px] font-poppins-bold text-[#0D132B]">Topics</Text>
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

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mt-3"
              contentContainerClassName="gap-2 pr-1"
            >
              {topics.map((topic) => {
                const topicLabs = getLabsByTopic(topic.id);
                const topicCompleted = topicLabs.filter((lab) =>
                  completedLabIds.includes(lab.id)
                ).length;

                return (
                  <TopicCard
                    key={topic.id}
                    topic={topic}
                    experimentCount={topicLabs.length}
                    completedCount={topicCompleted}
                    onPress={() => openTopic(topic.id)}
                  />
                );
              })}
            </ScrollView>

            {/* Your Progress */}
            <ProgressSummaryCard completedCount={completedTotal} totalCount={allLabs.length} />

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