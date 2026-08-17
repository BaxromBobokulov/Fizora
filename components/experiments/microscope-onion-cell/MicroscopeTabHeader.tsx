import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { neutralColors } from "@/constants/theme/colors";

export type MicroscopeTab = "experiment" | "theory" | "results";

const TABS: { key: MicroscopeTab; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: "experiment", label: "Experiment", icon: "flask-outline" },
  { key: "theory", label: "Theory", icon: "book-outline" },
  { key: "results", label: "Results", icon: "analytics-outline" },
];

type MicroscopeTabHeaderProps = {
  subjectLabel: string;
  activeTab: MicroscopeTab;
  bookmarked: boolean;
  accentColor: string;
  accentTint: string;
  onBack: () => void;
  onChangeTab: (tab: MicroscopeTab) => void;
  onToggleBookmark: () => void;
  onShare: () => void;
};

export function MicroscopeTabHeader({
  subjectLabel,
  activeTab,
  bookmarked,
  accentColor,
  accentTint,
  onBack,
  onChangeTab,
  onToggleBookmark,
  onShare,
}: MicroscopeTabHeaderProps) {
  return (
    <View>
      <View className="flex-row items-center justify-between">
        <TouchableOpacity
          onPress={onBack}
          activeOpacity={0.7}
          className="h-10 w-10 items-center justify-center rounded-full border border-gray-100"
        >
          <Ionicons name="chevron-back" size={20} color={neutralColors.textPrimary} />
        </TouchableOpacity>

        <View className="items-center">
          <Text className="text-[19px] font-poppins-bold text-text-primary">Microscope: Onion Cell</Text>
          <View className="mt-1 rounded-full px-2.5 py-0.5" style={{ backgroundColor: accentTint }}>
            <Text className="text-[11px] font-poppins-semibold" style={{ color: accentColor }}>
              {subjectLabel}
            </Text>
          </View>
        </View>

        <View className="flex-row gap-2">
          <TouchableOpacity
            onPress={onToggleBookmark}
            activeOpacity={0.7}
            className="h-10 w-10 items-center justify-center rounded-full border border-gray-100"
          >
            <Ionicons
              name={bookmarked ? "bookmark" : "bookmark-outline"}
              size={18}
              color={bookmarked ? accentColor : neutralColors.textPrimary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onShare}
            activeOpacity={0.7}
            className="h-10 w-10 items-center justify-center rounded-full border border-gray-100"
          >
            <Ionicons name="share-social-outline" size={18} color={neutralColors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <View className="mt-4 flex-row rounded-[16px] p-1" style={{ backgroundColor: neutralColors.surface }}>
        {TABS.map((tab) => {
          const active = tab.key === activeTab;
          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => onChangeTab(tab.key)}
              activeOpacity={0.8}
              className="flex-1 flex-row items-center justify-center gap-1.5 rounded-[12px] py-2.5"
              style={{ backgroundColor: active ? "#FFFFFF" : "transparent" }}
            >
              <Ionicons name={tab.icon} size={14} color={active ? accentColor : neutralColors.textSecondary} />
              <Text
                className="text-[12px] font-poppins-semibold"
                style={{ color: active ? accentColor : neutralColors.textSecondary }}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
