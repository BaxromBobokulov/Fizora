import { Text, View } from "react-native";

import { neutralColors, primaryColors } from "@/constants/theme/colors";

const LEGEND = [
  { symbol: "ΣF", meaning: "Net Force (N)" },
  { symbol: "v", meaning: "Velocity (m/s)" },
  { symbol: "μ", meaning: "Friction Coeff." },
  { symbol: "a", meaning: "Deceleration (m/s²)" },
];

export function FormulaCard() {
  return (
    <View
      className="mt-3 items-center rounded-[20px] p-5"
      style={{ backgroundColor: "#F1EEFF" }}
    >
      <Text className="text-[20px] font-poppins-bold text-text-primary">ΣF = 0 → v = constant</Text>
      <Text className="mt-2 text-[16px] font-poppins-semibold" style={{ color: primaryColors.purple }}>
        a = μg
      </Text>

      <View className="mt-4 w-full flex-row justify-between">
        {LEGEND.map((item) => (
          <View key={item.symbol} className="items-center" style={{ flex: 1 }}>
            <Text className="text-[13px] font-poppins-bold" style={{ color: primaryColors.purple }}>
              {item.symbol}
            </Text>
            <Text
              className="text-center text-[10px] font-poppins-regular"
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
