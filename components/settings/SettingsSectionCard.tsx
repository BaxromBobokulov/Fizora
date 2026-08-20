import { ReactNode } from "react";
import { Text, View } from "react-native";

type SettingsSectionCardProps = {
  label: string;
  children: ReactNode;
};

export function SettingsSectionCard({ label, children }: SettingsSectionCardProps) {
  return (
    <View className="mt-8">
      <Text className="text-[18px] font-poppins-bold text-[#0D132B]">{label}</Text>
      <View className="mt-3 rounded-[24px] border border-gray-100 bg-white px-5">{children}</View>
    </View>
  );
}
