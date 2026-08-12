import { TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { neutralColors, primaryColors } from "@/constants/theme/colors";

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress: () => void;
};

export function SearchBar({ value, onChangeText, onFilterPress }: SearchBarProps) {
  return (
    <View className="mt-5 flex-row items-center gap-2 rounded-[20px] border border-gray-100 bg-white px-4 py-3.5">
      <Ionicons name="search" size={18} color={neutralColors.textSecondary} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search experiments, topics..."
        placeholderTextColor={neutralColors.textSecondary}
        className="flex-1 text-[14px] font-poppins-medium text-text-primary"
        style={{ paddingVertical: 0 }}
      />
      <TouchableOpacity onPress={onFilterPress} activeOpacity={0.7}>
        <Ionicons name="filter-outline" size={20} color={primaryColors.purple} />
      </TouchableOpacity>
    </View>
  );
}