import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";

import { images } from "@/constants/images";
import { neutralColors, primaryColors } from "@/constants/theme/colors";

export default function About() {
  const router = useRouter();
  const version = Constants.expoConfig?.version ?? "1.0.0";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View className="flex-row items-center justify-between px-5 pt-2">
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          className="h-10 w-10 items-center justify-center rounded-full border border-gray-100"
        >
          <Ionicons name="chevron-back" size={20} color={neutralColors.textPrimary} />
        </TouchableOpacity>
        <Text className="text-[19px] font-poppins-bold text-text-primary">About Fizora AI</Text>
        <View className="h-10 w-10" />
      </View>

      <View className="flex-1 items-center justify-center gap-3 px-10">
        <Image source={images.mascotLogo} className="h-24 w-24" resizeMode="contain" />
        <Text className="text-h3 font-poppins-bold text-text-primary">Fizora</Text>
        <Text className="text-[13px] font-poppins-semibold" style={{ color: primaryColors.purple }}>
          Version {version}
        </Text>
        <Text className="text-center text-body-md font-poppins-regular text-text-secondary">
          Fizora is a Duolingo-inspired physics laboratory app that helps students in grades
          7–11 run hands-on experiments they can&apos;t easily do at school, guided by Tulki,
          your friendly AI lab tutor.
        </Text>
      </View>
    </SafeAreaView>
  );
}
