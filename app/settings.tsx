import { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@clerk/expo";

import { neutralColors, semanticColors } from "@/constants/theme/colors";
import { ProfileSummaryCard } from "@/components/settings/ProfileSummaryCard";
import { SettingsSectionCard } from "@/components/settings/SettingsSectionCard";
import { SettingsRow } from "@/components/settings/SettingsRow";
import { LogOutModal } from "@/components/profile/LogOutModal";

export default function Settings() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [isLogOutModalVisible, setIsLogOutModalVisible] = useState(false);

  function handleConfirmLogOut() {
    setIsLogOutModalVisible(false);
    signOut();
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView contentContainerClassName="px-5 pb-12 pt-2" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.7}
            className="h-10 w-10 items-center justify-center rounded-full border border-gray-100"
          >
            <Ionicons name="chevron-back" size={20} color={neutralColors.textPrimary} />
          </TouchableOpacity>
          <Text className="text-[19px] font-poppins-bold text-text-primary">Settings</Text>
          <View className="h-10 w-10" />
        </View>

        <ProfileSummaryCard onEditPress={() => router.push("/edit-profile")} />

        <SettingsSectionCard label="Account">
          <SettingsRow
            icon="person-outline"
            title="Personal Information"
            subtitle="Update your name, email, and profile"
            onPress={() => router.push("/edit-profile")}
          />
          <SettingsRow
            icon="lock-closed-outline"
            title="Change Password"
            subtitle="Update your password"
            onPress={() => router.push("/change-password")}
          />
          <SettingsRow
            icon="options-outline"
            title="Account Preferences"
            subtitle="Manage your account settings"
            onPress={() => router.push("/account-preferences")}
            showDivider={false}
          />
        </SettingsSectionCard>

        <SettingsSectionCard label="Learning">
          <SettingsRow
            icon="school-outline"
            title="Learning Preferences"
            subtitle="Set your learning goals and preferences"
            onPress={() => router.push("/learning-preferences")}
          />
          <SettingsRow
            icon="notifications-outline"
            title="Notifications"
            subtitle="Manage notification settings"
            onPress={() => router.push("/notifications")}
          />
          <SettingsRow
            icon="download-outline"
            title="Download Settings"
            subtitle="Manage download quality and storage"
            onPress={() => router.push("/download-settings")}
            showDivider={false}
          />
        </SettingsSectionCard>

        <SettingsSectionCard label="Appearance">
          <SettingsRow
            icon="color-palette-outline"
            title="Theme"
            subtitle="Choose your app theme"
            value="Light"
            onPress={() => router.push("/theme-settings")}
          />
          <SettingsRow
            icon="globe-outline"
            title="Language"
            subtitle="Choose your preferred language"
            value="English"
            onPress={() => router.push("/language-settings")}
          />
          <SettingsRow
            icon="text-outline"
            title="Text Size"
            subtitle="Adjust text size for better readability"
            value="Medium"
            onPress={() => router.push("/text-size-settings")}
            showDivider={false}
          />
        </SettingsSectionCard>

        <SettingsSectionCard label="Support & About">
          <SettingsRow
            icon="help-circle-outline"
            title="Help & Support"
            subtitle="Get help and support"
            onPress={() => router.push("/help-support")}
          />
          <SettingsRow
            icon="information-circle-outline"
            title="About Fizora AI"
            subtitle="Learn more about the app"
            onPress={() => router.push("/about")}
          />
          <SettingsRow
            icon="star-outline"
            title="Rate Us"
            subtitle="Share your feedback"
            onPress={() => router.push("/rate-us")}
            showDivider={false}
          />
        </SettingsSectionCard>

        <TouchableOpacity
          onPress={() => setIsLogOutModalVisible(true)}
          activeOpacity={0.7}
          className="mt-8 flex-row items-center gap-3 rounded-[20px] px-5 py-4"
          style={{ backgroundColor: `${semanticColors.error}14` }}
        >
          <Ionicons name="log-out-outline" size={20} color={semanticColors.error} />
          <Text className="flex-1 text-[15px] font-poppins-bold" style={{ color: semanticColors.error }}>
            Log Out
          </Text>
          <Ionicons name="chevron-forward" size={18} color={semanticColors.error} />
        </TouchableOpacity>
      </ScrollView>

      <LogOutModal
        visible={isLogOutModalVisible}
        onClose={() => setIsLogOutModalVisible(false)}
        onConfirm={handleConfirmLogOut}
      />
    </SafeAreaView>
  );
}
