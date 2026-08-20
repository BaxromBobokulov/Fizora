import { Image, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useUser } from "@clerk/expo";

import { images } from "@/constants/images";
import { primaryColors } from "@/constants/theme/colors";

type ProfileSummaryCardProps = {
  onEditPress: () => void;
};

export function ProfileSummaryCard({ onEditPress }: ProfileSummaryCardProps) {
  const { user } = useUser();

  const name = user?.fullName ?? user?.firstName ?? "Student";
  const email = user?.primaryEmailAddress?.emailAddress ?? "";

  return (
    <View className="mt-5 flex-row items-center justify-between rounded-[24px] border border-gray-100 bg-white p-4">
      <View className="flex-1 flex-row items-center gap-3 pr-3">
        <Image
          source={user?.imageUrl ? { uri: user.imageUrl } : images.mascotAuth}
          className="h-16 w-16 rounded-full"
        />
        <View className="flex-1">
          <Text numberOfLines={1} className="text-[17px] font-poppins-bold text-[#0D132B]">
            {name}
          </Text>
          {!!email && (
            <Text numberOfLines={1} className="mt-0.5 text-[13px] font-poppins-medium text-[#6B7280]">
              {email}
            </Text>
          )}
        </View>
      </View>

      <TouchableOpacity
        onPress={onEditPress}
        activeOpacity={0.7}
        className="flex-row items-center gap-1.5 rounded-full border px-3.5 py-2"
        style={{ borderColor: `${primaryColors.purple}33` }}
      >
        <Text className="text-[13px] font-poppins-bold" style={{ color: primaryColors.purple }}>
          Edit Profile
        </Text>
        <Ionicons name="pencil" size={13} color={primaryColors.purple} />
      </TouchableOpacity>
    </View>
  );
}
