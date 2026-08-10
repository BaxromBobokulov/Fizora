import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@clerk/expo";

import { neutralColors, primaryColors } from "@/constants/theme/colors";

export default function Profile() {
  const { signOut } = useAuth();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: neutralColors.background }}>
      <View className="flex-1 items-center justify-center gap-3 px-10">
        <View
          className="h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: `${primaryColors.purple}1A` }}
        >
          <Ionicons name="person-outline" size={28} color={primaryColors.purple} />
        </View>
        <Text className="text-h3 font-poppins-semibold text-text-primary">Profile</Text>
        <Text className="text-center text-body-md font-poppins-regular text-text-secondary">
          Your account, XP, streaks, and settings will live here.
        </Text>

        {/* Testing-only: lets you sign out without reinstalling the app */}
        <TouchableOpacity
          onPress={() => signOut()}
          activeOpacity={0.7}
          className="mt-4 rounded-full border border-border px-4 py-2"
        >
          <Text className="text-body-sm font-poppins-semibold text-text-primary">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
