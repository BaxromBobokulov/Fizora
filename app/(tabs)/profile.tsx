import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@clerk/expo";

import { primaryColors } from "@/constants/theme/colors";
import { useProgressStore } from "@/store/useProgressStore";
import { getLabsByTopic, topics } from "@/data/physics";

import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { LevelCard } from "@/components/profile/LevelCard";
import { PremiumBanner } from "@/components/profile/PremiumBanner";
import { ProgressStatsRow } from "@/components/profile/ProgressStatsRow";
import { QuickAccessCard } from "@/components/profile/QuickAccessCard";
import { SettingsListItem } from "@/components/profile/SettingsListItem";
import { LogOutModal } from "@/components/profile/LogOutModal";

const QUICK_ACCESS = [
  {
    key: "my-labs",
    label: "My Labs",
    icon: "flask" as const,
    color: primaryColors.purple,
    route: "/my-labs" as const,
  },
  {
    key: "saved-notes",
    label: "Saved Notes",
    icon: "bookmark" as const,
    color: primaryColors.orange,
    route: "/saved-notes" as const,
  },
  {
    key: "downloads",
    label: "Downloads",
    icon: "download" as const,
    color: primaryColors.blue,
    route: "/downloads" as const,
  },
  {
    key: "history",
    label: "History",
    icon: "list" as const,
    color: primaryColors.green,
    route: "/history" as const,
  },
];

export default function Profile() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [isLogOutModalVisible, setIsLogOutModalVisible] = useState(false);

  const level = useProgressStore((state) => state.level);
  const currentLevelXp = useProgressStore((state) => state.currentLevelXp);
  const nextLevelXpTarget = useProgressStore((state) => state.nextLevelXpTarget);
  const completedLabIds = useProgressStore((state) => state.completedLabIds);
  const hoursLearned = useProgressStore((state) => state.hoursLearned);
  const achievementsCount = useProgressStore((state) => state.achievementsCount);

  const labsCompleted = completedLabIds.length;
  const topicsMastered = topics.filter((topic) => {
    const topicLabs = getLabsByTopic(topic.id);
    return topicLabs.length > 0 && topicLabs.every((lab) => completedLabIds.includes(lab.id));
  }).length;

  function handleConfirmLogOut() {
    setIsLogOutModalVisible(false);
    signOut();
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView
        contentContainerClassName="px-5 pb-17 pt-2"
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader onSettingsPress={() => router.push("/settings")} />

        <LevelCard
          level={level}
          currentLevelXp={currentLevelXp}
          nextLevelXpTarget={nextLevelXpTarget}
        />

        <PremiumBanner onPress={() => router.push("/premium")} />

        {/* My Progress */}
        <View className="mt-8 flex-row items-center justify-between">
          <Text className="text-[18px] font-poppins-bold text-[#0D132B]">My Progress</Text>
          <TouchableOpacity
            onPress={() => router.push("/progress")}
            activeOpacity={0.7}
            className="flex-row items-center gap-0.5"
          >
            <Text
              className="text-[13px] font-poppins-bold"
              style={{ color: primaryColors.purple }}
            >
              View details
            </Text>
            <Ionicons name="chevron-forward" size={14} color={primaryColors.purple} />
          </TouchableOpacity>
        </View>

        <ProgressStatsRow
          labsCompleted={labsCompleted}
          topicsMastered={topicsMastered}
          hoursLearned={hoursLearned}
          achievementsCount={achievementsCount}
        />

        {/* Quick Access */}
        <Text className="mt-8 text-[18px] font-poppins-bold text-[#0D132B]">Quick Access</Text>
        <View className="mt-4 flex-row flex-wrap justify-between gap-y-3">
          {QUICK_ACCESS.map((item) => (
            <QuickAccessCard
              key={item.key}
              icon={item.icon}
              label={item.label}
              color={item.color}
              onPress={() => router.push(item.route)}
            />
          ))}
        </View>

        {/* Settings list */}
        <View className="mt-8 rounded-[24px] border border-gray-100 bg-white px-5">
          <SettingsListItem
            icon="school-outline"
            label="Learning History"
            onPress={() => router.push("/history")}
          />
          <SettingsListItem
            icon="download-outline"
            label="Downloads"
            onPress={() => router.push("/downloads")}
          />
          <SettingsListItem
            icon="bookmark-outline"
            label="Saved Notes"
            onPress={() => router.push("/saved-notes")}
          />
          <SettingsListItem
            icon="settings-outline"
            label="Settings"
            onPress={() => router.push("/settings")}
          />
          <SettingsListItem
            icon="help-circle-outline"
            label="Help & Support"
            onPress={() => router.push("/help-support")}
          />
          <SettingsListItem
            icon="log-out-outline"
            label="Log Out"
            danger
            showDivider={false}
            onPress={() => setIsLogOutModalVisible(true)}
          />
        </View>
      </ScrollView>

      <LogOutModal
        visible={isLogOutModalVisible}
        onClose={() => setIsLogOutModalVisible(false)}
        onConfirm={handleConfirmLogOut}
      />
    </SafeAreaView>
  );
}