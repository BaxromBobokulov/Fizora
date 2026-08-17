import { useMemo } from "react";
import {
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/expo";

import { images } from "@/constants/images";
import { neutralColors, primaryColors, semanticColors } from "@/constants/theme/colors";
import { aiTeacherStrings } from "@/constants/strings";
import { EXPLORE_SUBJECT_ORDER, SUBJECT_META } from "@/constants/subjects";
import { getExperimentsBySubject } from "@/data/labs";
import { useProgressStore, useXpProgressPercent } from "@/store/useProgressStore";
import type { Lab, LabSubject } from "@/types/lab";

import { ContinueLearningCard } from "@/components/home/ContinueLearningCard";
import { SubjectExploreCard } from "@/components/home/SubjectExploreCard";
import { QuickAccessCard } from "@/components/profile/QuickAccessCard";

// Explore-by-Subject illustration per subject. Physics falls back to its
// existing SUBJECT_META icon (no dedicated home-ui illustration yet, but the
// asset already exists, so this isn't a "missing asset" case).
const EXPLORE_ILLUSTRATIONS: Record<LabSubject, ImageSourcePropType> = {
  chemistry: images.homeExploreChemistry,
  biology: images.homeExploreBiology,
  physics: images.physicsIcon,
};

const QUICK_ACCESS_ITEMS = [
  {
    key: "my-experiments",
    label: "My Experiments",
    icon: "flask-outline" as const,
    color: primaryColors.purple,
    route: "/my-labs" as const,
  },
  {
    key: "saved-labs",
    label: "Saved Labs",
    icon: "bookmark-outline" as const,
    color: primaryColors.green,
    route: "/saved-labs" as const,
  },
  {
    key: "challenges",
    label: "Challenges",
    icon: "trophy-outline" as const,
    color: semanticColors.warning,
    route: "/challenges" as const,
  },
  {
    key: "recent-activity",
    label: "Recent Activity",
    icon: "time-outline" as const,
    color: primaryColors.blue,
    route: "/recent-activity" as const,
  },
];

const SUBJECT_CARD_GAP = 12;
const SCREEN_PADDING = 40; // px-5 (20px) on each side

export default function Home() {
  const router = useRouter();
  const { user } = useUser();
  const { width: screenWidth } = useWindowDimensions();

  const xp = useProgressStore((state) => state.xp);
  const level = useProgressStore((state) => state.level);
  const currentLevelXp = useProgressStore((state) => state.currentLevelXp);
  const nextLevelXpTarget = useProgressStore((state) => state.nextLevelXpTarget);
  const streakCount = useProgressStore((state) => state.streakCount);
  const completedLabIds = useProgressStore((state) => state.completedLabIds);
  const lastActiveLabId = useProgressStore((state) => state.lastActiveLabId);
  const hasEverCompletedLab = useProgressStore((state) => state.hasEverCompletedLab);

  const firstName = user?.firstName ?? "Alex";
  const progressPercent = useXpProgressPercent();
  const isFirstTimeUser = !hasEverCompletedLab();

  // One "next up" lab per subject for the Continue Learning carousel: the
  // student's actual in-progress lab if it belongs to that subject,
  // otherwise the first uncompleted lab, otherwise the subject's first lab.
  const continueLearningLabs = useMemo(() => {
    return EXPLORE_SUBJECT_ORDER.map((subject) => {
      const subjectLabs = getExperimentsBySubject(subject);
      if (subjectLabs.length === 0) return undefined;

      const activeLab = subjectLabs.find((lab) => lab.id === lastActiveLabId);
      return activeLab ?? subjectLabs.find((lab) => !completedLabIds.includes(lab.id)) ?? subjectLabs[0];
    }).filter((lab): lab is Lab => Boolean(lab));
  }, [completedLabIds, lastActiveLabId]);

  const subjectCardWidth = (screenWidth - SCREEN_PADDING - SUBJECT_CARD_GAP) / 2;

  function openLab(lab: Lab) {
    router.push(`/lab/${lab.dimension}/${lab.id}` as never);
  }

  function openSubject(subject: LabSubject) {
    const firstLab = getExperimentsBySubject(subject)[0];
    if (firstLab) openLab(firstLab);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: neutralColors.surface }}>
      <ScrollView
        contentContainerClassName="px-5 pb-17 pt-2"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <View className="flex-1 flex-row items-center gap-3 mt-2">
            {/* TODO: swap in the new mascot pose once a dedicated header-avatar
                asset is added to assets/images — no distinct pose exists yet,
                so this keeps the current avatar. */}
            <Image
              source={user?.imageUrl ? { uri: user.imageUrl } : images.mascotAuth}
              className="h-12 w-12 rounded-full"
            />
            <View className="flex-1 min-w-0">
              <Text
                className="text-[18px] font-poppins-bold text-[#0D132B]"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Hello, {firstName}! 👋
              </Text>
              <Text
                className="text-[13px] font-poppins-medium text-[#6B7280]"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Ready to explore today
              </Text>
            </View>
          </View>

          <View className="flex-row items-center gap-2 shrink-0">
            <View className="flex-row items-center gap-1.5 rounded-full border border-gray-100 bg-white px-3 py-2">
              <Ionicons name="flask" size={16} color={primaryColors.purple} />
              <Text className="text-[14px] font-poppins-bold text-text-primary">
                {xp}
              </Text>
            </View>

            {streakCount > 0 && (
              <View className="flex-row items-center gap-1.5 rounded-full border border-gray-100 bg-white px-3 py-2">
                <Ionicons name="flame" size={16} color={primaryColors.orange} />
                <Text className="text-[14px] font-poppins-bold text-text-primary">
                  {streakCount}
                </Text>
              </View>
            )}

            <View className="h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white relative">
              <Ionicons name="notifications-outline" size={20} color="#0D132B" />
              <View
                className="absolute right-[10px] top-[10px] h-2 w-2 rounded-full"
                style={{ backgroundColor: "#D946EF" }} // Pink dot
              />
            </View>
          </View>
        </View>

        {/* Learning Progress */}
        <View className="mt-6 flex-row items-center justify-between rounded-[28px] border border-gray-100 bg-white p-5">
          <View className="flex-1">
            <Text className="text-[13px] font-poppins-medium text-[#6B7280]">
              Learning Progress
            </Text>
            <Text className="mt-1 text-[24px] font-poppins-bold text-[#0D132B]">
              Level {level}
            </Text>
            <View className="mt-1 flex-row items-baseline gap-1">
              <Text className="text-[15px] font-poppins-bold" style={{ color: primaryColors.purple }}>
                {currentLevelXp}
              </Text>
              <Text className="text-[13px] font-poppins-medium text-[#6B7280]">
                / {nextLevelXpTarget} XP
              </Text>
            </View>
            <View className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#F6F7FB]">
              <View
                className="h-2 rounded-full"
                style={{ width: `${progressPercent}%`, backgroundColor: primaryColors.purple }}
              />
            </View>
          </View>

          <Image
            source={images.homeLearningProgress}
            className="ml-3 h-28 w-28"
            resizeMode="contain"
          />
        </View>

        {/* Continue Learning */}
        <ContinueLearningCard
          labs={continueLearningLabs}
          isFirstTimeUser={isFirstTimeUser}
          onPressLab={openLab}
        />

        {/* Explore by Subject */}
        <View className="mt-8 flex-row items-center justify-between px-1">
          <Text className="text-[18px] font-poppins-bold text-[#0D132B]">Explore by Subject</Text>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/labs")}
            activeOpacity={0.7}
            className="flex-row items-center gap-0.5"
          >
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
          contentContainerClassName="mt-4 gap-3 pr-2"
        >
          {EXPLORE_SUBJECT_ORDER.map((subject) => {
            const subjectLabs = getExperimentsBySubject(subject);

            return (
              <SubjectExploreCard
                key={subject}
                subject={SUBJECT_META[subject]}
                illustration={EXPLORE_ILLUSTRATIONS[subject]}
                experimentCount={subjectLabs.length}
                width={subjectCardWidth}
                onPress={() => openSubject(subject)}
              />
            );
          })}
        </ScrollView>

        {/* AI Teacher */}
        <View
          className="mt-8 w-full rounded-[28px] relative"
          style={{ backgroundColor: "#F4F0FF", minHeight: 180 }}
        >
          <View className="px-6 py-6 w-[60%] z-10">
            <Text
              className="text-[13px] font-poppins-bold"
              style={{ color: primaryColors.purple }}
            >
              {aiTeacherStrings.eyebrow}
            </Text>
            <Text className="mt-1 text-[22px] font-poppins-bold text-[#0D132B]">
              {aiTeacherStrings.heading}
            </Text>
            <Text className="mt-2 text-[12px] font-poppins-medium text-[#6B7280] leading-tight">
              {aiTeacherStrings.prompt}
            </Text>

            <TouchableOpacity
              onPress={() => router.push("/(tabs)/chat")}
              activeOpacity={0.85}
              className="mt-5 flex-row items-center gap-2 self-start rounded-[16px] px-5 py-3"
              style={{ backgroundColor: primaryColors.purple }}
            >
              <Ionicons name="chatbubble-ellipses-outline" size={16} color="#FFFFFF" />
              <Text className="text-[14px] font-poppins-bold text-white">
                {aiTeacherStrings.cta}
              </Text>
            </TouchableOpacity>
          </View>

          <Image
            source={images.homeAiTeacher}
            className="absolute bottom-0 -right-2 w-48 h-48 z-0"
            resizeMode="contain"
          />

          <View
            className="absolute top-6 right-3 flex-row items-center justify-center bg-white z-20"
            style={{
              width: 48,
              height: 36,
              borderRadius: 16,
              borderBottomLeftRadius: 4,
              shadowColor: "#000",
              shadowOpacity: 0.08,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 3 },
              elevation: 2,
            }}
          >
            <Ionicons name="ellipsis-horizontal" size={20} color="#94A3B8" />
          </View>
        </View>

        {/* Quick Access */}
        <View className="mt-8 flex-row items-center justify-between px-1">
          <Text className="text-[18px] font-poppins-bold text-[#0D132B]">Quick Access</Text>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/profile")}
            activeOpacity={0.7}
            className="flex-row items-center gap-0.5"
          >
            <Text
              className="text-[13px] font-poppins-bold"
              style={{ color: primaryColors.purple }}
            >
              View all
            </Text>
            <Ionicons name="chevron-forward" size={14} color={primaryColors.purple} />
          </TouchableOpacity>
        </View>

        <View className="mt-4 flex-row gap-2.5">
          {QUICK_ACCESS_ITEMS.map((item) => (
            <QuickAccessCard
              key={item.key}
              variant="row"
              icon={item.icon}
              label={item.label}
              color={item.color}
              onPress={() => router.push(item.route)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
