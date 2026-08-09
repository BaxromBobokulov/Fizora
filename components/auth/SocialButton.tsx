import { Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export type SocialProvider = "google" | "facebook" | "apple";

const PROVIDER_ICON: Record<SocialProvider, { name: keyof typeof FontAwesome.glyphMap; color: string }> = {
  google: { name: "google", color: "#4285F4" },
  facebook: { name: "facebook", color: "#1877F2" },
  apple: { name: "apple", color: "#0D132B" },
};

type SocialButtonProps = {
  provider: SocialProvider;
  label: string;
  onPress?: () => void;
  disabled?: boolean;
};

export function SocialButton({ provider, label, onPress, disabled }: SocialButtonProps) {
  const icon = PROVIDER_ICON[provider];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      className="h-14 flex-row items-center rounded-2xl border border-border bg-white px-5"
      style={{ opacity: disabled ? 0.6 : 1 }}
    >
      <View className="w-6 items-center">
        <FontAwesome name={icon.name} size={20} color={icon.color} />
      </View>
      <Text className="ml-4 text-h4 font-poppins-medium text-text-primary">{label}</Text>
    </TouchableOpacity>
  );
}
