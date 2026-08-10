import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { neutralColors, primaryColors } from "@/constants/theme/colors";

type PlaceholderScreenProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
};

export function PlaceholderScreen({ icon, title, subtitle }: PlaceholderScreenProps) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: neutralColors.background }}>
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
