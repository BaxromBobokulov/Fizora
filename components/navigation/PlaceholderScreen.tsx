import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { neutralColors, primaryColors } from "@/constants/theme/colors";

type PlaceholderScreenProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
  showBackButton?: boolean;
};

export function PlaceholderScreen({
  icon,
  title,
  subtitle,
  showBackButton = false,
}: PlaceholderScreenProps) {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: neutralColors.background }}>
      {showBackButton && (
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          className="ml-5 mt-2 h-10 w-10 items-center justify-center rounded-full border border-gray-100"
        >
          <Ionicons name="chevron-back" size={20} color={neutralColors.textPrimary} />
        </TouchableOpacity>
      )}
      <View className="flex-1 items-center justify-center gap-3 px-10">
        <View
          className="h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: `${primaryColors.purple}1A` }}
        >
          <Ionicons name={icon} size={28} color={primaryColors.purple} />
        </View>
        <Text className="text-h3 font-poppins-semibold text-text-primary">{title}</Text>
        <Text className="text-center text-body-md font-poppins-regular text-text-secondary">
          {subtitle}
        </Text>
      </View>
    </SafeAreaView>
  );
}