import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/expo";

import { images } from "@/constants/images";
import { neutralColors, primaryColors } from "@/constants/theme/colors";
import { QuickLabCard } from "@/components/home/QuickLabCard";
import { useProgressStore, useXpProgressPercent } from "@/store/useProgressStore";

// The only lab wired up with real content so far — swap for a data/physics
// lookup by lastActiveLabId once more labs exist.
const STARTER_LAB = {
  id: "pendulum-motion",
  title: "Pendulum Motion",
  description: "Study the motion of a pendulum and understand its principles.",
  image: images.homePendulumToy,
};

const QUICK_LABS = [
  {
    id: "gravity-explorer",
    title: "Gravity Explorer",
    description: "Learn about gravity and forces.",
    image: images.homeGravity,
    icon: "flask" as const,
    tintColor: primaryColors.purple,
    backgroundColor: "#F4F0FF",
  },
  {
    id: "electricity-basics",
    title: "Electricity Basics",
    description: "Explore circuits and voltage.",
    image: images.homeElectricity,
    icon: "flash" as const,
    tintColor: primaryColors.orange,
    backgroundColor: "#FFF4ED",
  },
  {
    id: "magnetism-lab",
    title: "Magnetism Lab",
    description: "Discover magnetic fields and forces.",
    image: images.homeMagnetism,
    icon: "magnet" as const,
    tintColor: primaryColors.blue,
    backgroundColor: "#EFF5FF",
  },
];

export default function Home() {
  const router = useRouter();
  const { user } = useUser();

  const xp = useProgressStore((state) => state.xp);
  const level = useProgressStore((state) => state.level);
  const currentLevelXp = useProgressStore((state) => state.currentLevelXp);
  const nextLevelXpTarget = useProgressStore((state) => state.nextLevelXpTarget);
  const streakCount = useProgressStore((state) => state.streakCount);
  const hasEverCompletedLab = useProgressStore((state) => state.hasEverCompletedLab);

  const firstName = user?.firstName ?? "Alex";
  const progressPercent = useXpProgressPercent();
  const isFirstTimeUser = !hasEverCompletedLab();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: neutralColors.surface }}>
      <ScrollView
        contentContainerClassName="px-5 pb-14 pt-2"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <View className="flex-1 flex-row items-center gap-3 mt-2">
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
            className="ml-3 h-24 w-24"
            resizeMode="contain"
          />
        </View>

        {/* Continue Experiment */}
        <View
          className="mt-5 overflow-hidden rounded-[28px] p-6 relative"
          style={{ backgroundColor: primaryColors.purple, minHeight: 190 }}
        >
          <View className="w-[65%] z-10">
            <Text className="text-[12px] font-poppins-medium text-white/80">
              {isFirstTimeUser ? "Start Your First Experiment" : "Continue Experiment"}
            </Text>
            <Text className="mt-1 text-[22px] font-poppins-bold text-white leading-tight">
              {STARTER_LAB.title}
            </Text>
            <Text className="mt-2 text-[12px] font-poppins-regular text-white/80 leading-tight">
              {STARTER_LAB.description}
            </Text>

            <TouchableOpacity
              onPress={() => router.push("/(tabs)/labs")}
              activeOpacity={0.85}
              className="mt-5 flex-row items-center gap-1 self-start rounded-full bg-white px-5 py-2.5"
            >
              <Text
                className="text-[14px] font-poppins-bold"
                style={{ color: primaryColors.purple }}
              >
                {isFirstTimeUser ? "Start" : "Continue"}
              </Text>
              <Ionicons name="chevron-forward" size={16} color={primaryColors.purple} />
            </TouchableOpacity>
          </View>

          {/* Absolute pozitsiya qutini cho'zib yubormaydi */}
          <Image
            source={STARTER_LAB.image}
            className="absolute bottom-2 -right-0 h-36 w-36 z-0"
            resizeMode="contain"
          />
        </View>

        {/* Quick Labs Header */}
        <View className="mt-8 flex-row items-center justify-between px-1">
          <Text className="text-[18px] font-poppins-bold text-[#0D132B]">Quick Labs</Text>
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

        {/* Quick Labs Cards */}
        <View className="mt-4 flex-row gap-3">
          {QUICK_LABS.map((lab) => (
            <QuickLabCard
              key={lab.id}
              title={lab.title}
              description={lab.description}
              image={lab.image}
              icon={lab.icon}
              tintColor={lab.tintColor}
              backgroundColor={lab.backgroundColor}
              onPress={() => router.push("/(tabs)/labs")}
            />
          ))}
        </View>

        {/* AI Teacher (100% rasmga mos, absolute orqali box-sizing muammosi yo'q) */}
        <View
          className="mt-8 w-full rounded-[28px] relative mb-4"
          style={{ backgroundColor: "#F4F0FF", minHeight: 180 }}
        >
          <View className="px-6 py-6 w-[60%] z-10">
            <Text
              className="text-[13px] font-poppins-bold"
              style={{ color: primaryColors.purple }}
            >
              AI Teacher
            </Text>
            <Text className="mt-1 text-[22px] font-poppins-bold text-[#0D132B]">
              Need help?
            </Text>
            <Text className="mt-2 text-[12px] font-poppins-medium text-[#6B7280] leading-tight">
              Ask our AI teacher anything about physics or experiments.
            </Text>

            <TouchableOpacity
              onPress={() => router.push("/(tabs)/chat")}
              activeOpacity={0.85}
              className="mt-5 flex-row items-center gap-2 self-start rounded-[16px] px-5 py-3"
              style={{ backgroundColor: primaryColors.purple }}
            >
              <Ionicons name="chatbubble-ellipses-outline" size={16} color="#FFFFFF" />
              <Text className="text-[14px] font-poppins-bold text-white">
                Chat Now
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tulki rasmi - pastga o'ngga yopishtirilgan */}
          <Image
            source={images.homeAiTeacher}
            className="absolute bottom-0 -right-2 w-48 h-48 z-0"
            resizeMode="contain"
          />

          {/* Dumli Chat bulutchasi */}
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
      </ScrollView>
    </SafeAreaView>
  );
}