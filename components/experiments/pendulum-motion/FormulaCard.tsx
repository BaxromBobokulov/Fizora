import { Text, View } from "react-native";

import { neutralColors, primaryColors } from "@/constants/theme/colors";

const LEGEND = [
  { symbol: "T", meaning: "Period (s)" },
  { symbol: "L", meaning: "Length (m)" },
  { symbol: "g", meaning: "Gravity (m/s²)" },
];

export function FormulaCard() {
  return (
    <View
      className="mt-3 items-center rounded-[20px] p-5"
      style={{ backgroundColor: "#F1EEFF" }}
    >
      <View className="flex-row items-center gap-2">
        <Text className="text-[22px] font-poppins-bold text-text-primary">T = 2π</Text>
        <Text className="text-[26px] font-poppins-regular text-text-primary">√</Text>
        <View className="items-center border-t" style={{ borderColor: neutralColors.textPrimary }}>
          <Text className="text-[16px] font-poppins-semibold text-text-primary">L</Text>
          <Text className="text-[16px] font-poppins-semibold text-text-primary">g</Text>
        </View>
      </View>

      <View className="mt-4 w-full flex-row justify-between">
        {LEGEND.map((item) => (
          <View key={item.symbol} className="items-center">
            <Text className="text-[13px] font-poppins-bold" style={{ color: primaryColors.purple }}>
              {item.symbol}
            </Text>
            <Text
              className="text-[11px] font-poppins-regular"
              style={{ color: neutralColors.textSecondary }}
            >
              {item.meaning}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
