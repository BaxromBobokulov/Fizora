import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/expo";

import { images } from "@/constants/images";
import { neutralColors, primaryColors } from "@/constants/theme/colors";
import { QuickLabCard } from "@/components/home/QuickLabCard";

const XP_BALANCE = 120;
const LEVEL = 8;
const CURRENT_XP = 320;
const NEXT_LEVEL_XP = 500;
const PROGRESS_PERCENT = Math.round((CURRENT_XP / NEXT_LEVEL_XP) * 100);

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

  const firstName = user?.firstName ?? "Alex";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView
        contentContainerClassName="px-5 pb-10 pt-2"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between">
          <View className="flex-1 flex-row items-center gap-3">
            <Image
              source={user?.imageUrl ? { uri: user.imageUrl } : images.mascotAuth}
              className="h-12 w-12 rounded-full"
            />
            <View>
              <Text className="text-[18px] font-poppins-bold text-[#0D132B]">
                Hello, {firstName}! 👋
              </Text>
              <Text className="text-[13px] font-poppins-medium text-[#6B7280]">
                Ready to explore today?
              </Text>
            </View>
          </View>

          <View className="flex-row items-center gap-2">
            <View className="flex-row items-center gap-1.5 rounded-full border border-gray-100 bg-white px-3 py-2">
              <Ionicons name="flask" size={16} color={primaryColors.purple} />
              <Text className="text-[14px] font-poppins-bold text-text-primary">
                {XP_BALANCE}
              </Text>
            </View>

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
              Level {LEVEL}
            </Text>
            <View className="mt-1 flex-row items-baseline gap-1">
              <Text className="text-[15px] font-poppins-bold" style={{ color: primaryColors.purple }}>
                {CURRENT_XP}
              </Text>
              <Text className="text-[13px] font-poppins-medium text-[#6B7280]">
                / {NEXT_LEVEL_XP} XP
              </Text>
            </View>
            <View className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#F6F7FB]">
              <View
                className="h-2 rounded-full"
                style={{ width: `${PROGRESS_PERCENT}%`, backgroundColor: primaryColors.purple }}
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
              Continue Experiment
            </Text>
            <Text className="mt-1 text-[22px] font-poppins-bold text-white leading-tight">
              Pendulum Motion
            </Text>
            <Text className="mt-2 text-[12px] font-poppins-regular text-white/80 leading-tight">
              Study the motion of a pendulum and understand its principles.
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
                Continue
              </Text>
              <Ionicons name="chevron-forward" size={16} color={primaryColors.purple} />
            </TouchableOpacity>
          </View>

          {/* Absolute pozitsiya qutini cho'zib yubormaydi */}
          <Image
            source={images.homePendulumToy}
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