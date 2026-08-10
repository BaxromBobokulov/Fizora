import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type QuickLabCardProps = {
  title: string;
  description: string;
  image: ImageSourcePropType;
  icon: keyof typeof Ionicons.glyphMap;
  tintColor: string;
  backgroundColor: string;
  onPress: () => void;
};

export function QuickLabCard({
  title,
  description,
  image,
  icon,
  tintColor,
  backgroundColor,
  onPress,
}: QuickLabCardProps) {
  return (
    <View
      className="flex-1 rounded-[24px] p-3 justify-between"
      style={{ backgroundColor, height: 210, overflow: "hidden" }} // Qat'iy balandlik (Height fixed)
    >
      <View
        className="h-6 w-6 items-center justify-center rounded-[10px]"
        style={{ backgroundColor: `${tintColor}20` }}
      >
        <Ionicons name={icon} size={13} color={tintColor} />
      </View>

      <Image
        source={image}
        className="h-24 w-full"
        resizeMode="contain"
      />

      <View>
        <Text
          className="text-[13px] font-poppins-bold text-[#0D132B] leading-tight"
          numberOfLines={2}
        >
          {title}
        </Text>
        <Text
          className="mt-1 text-[9px] font-poppins-medium text-[#6B7280] leading-tight"
          numberOfLines={1}
        >
          {description}
        </Text>
      </View>

      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        className="h-6 w-6 items-center justify-center rounded-full self-end bg-white"
        style={{
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          elevation: 2,
        }}
      >
        <Ionicons name="chevron-forward" size={12} color={tintColor} />
      </TouchableOpacity>
    </View>
  );
}