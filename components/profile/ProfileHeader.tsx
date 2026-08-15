import { Image, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/expo";

import { images } from "@/constants/images";
import { neutralColors } from "@/constants/theme/colors";

type ProfileHeaderProps = {
  onSettingsPress: () => void;
};

export function ProfileHeader({ onSettingsPress }: ProfileHeaderProps) {
  const { user } = useUser();

  const name = user?.fullName ?? user?.firstName ?? "Student";
  const email = user?.primaryEmailAddress?.emailAddress ?? "";

  return (
    <View className="flex-row items-start justify-between">
      <View className="flex-1 flex-row items-center gap-3 pr-3">
        <Image
          source={user?.imageUrl ? { uri: user.imageUrl } : images.mascotAuth}
          className="h-16 w-16 rounded-full"
        />
        <View className="flex-1">
          <Text
            numberOfLines={1}
            className="text-[19px] font-poppins-bold text-[#0D132B]"
          >
            {name}
          </Text>
          {!!email && (
            <Text
              numberOfLines={1}
              className="mt-0.5 text-[13px] font-poppins-medium text-[#6B7280]"
            >
              {email}
            </Text>
          )}
        </View>
      </View>

      <View className="flex-row items-center gap-2">
        <TouchableOpacity
          onPress={onSettingsPress}
          activeOpacity={0.7}
          className="h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white"
        >
          <Ionicons name="settings-outline" size={18} color={neutralColors.textPrimary} />
        </TouchableOpacity>

        <View className="h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-white relative">
          <Ionicons name="notifications-outline" size={18} color={neutralColors.textPrimary} />
          <View
            className="absolute right-[10px] top-[10px] h-2 w-2 rounded-full"
            style={{ backgroundColor: "#D946EF" }}
          />
        </View>
      </View>
    </View>
  );
}