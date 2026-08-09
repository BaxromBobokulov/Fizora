import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { Redirect } from "expo-router";
import { useAuth } from "@clerk/expo";

import { neutralColors, primaryColors } from "@/constants/theme/colors";

export default function Index() {
  const { isLoaded, isSignedIn, signOut } = useAuth();

  if (!isLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator color={primaryColors.purple} />
      </View>
    );
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <View className="flex-1 items-center justify-center gap-2 bg-background px-6">
      <Text className="text-h1 font-poppins-bold text-text-primary">
        Fiz<Text style={{ color: primaryColors.orange }}>ora</Text>
      </Text>
      {/* Testing-only: lets you sign out without reinstalling the app */}
      <TouchableOpacity
        onPress={() => signOut()}
        style={{
          paddingHorizontal: 14,
          paddingVertical: 8,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: "#e0e0e0",
        }}
        activeOpacity={0.7}
      >
        <Text style={{ fontSize: 13, fontWeight: "600", color: neutralColors.textPrimary }}>
          Sign Out
        </Text>
      </TouchableOpacity>
      {/* <Text
        className="text-body-sm font-poppins-semibold uppercase tracking-widest"
        style={{ color: primaryColors.purple }}
      >
        Virtual Physics Lab
      </Text>
      <Text className="text-body-md font-poppins-regular text-text-secondary">
        Fizikani ko&apos;r. Sinab ko&apos;r. Tushun.
      </Text> */}
    </View>
  );
}
