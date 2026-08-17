import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { neutralColors } from "@/constants/theme/colors";

const STEPS = [
  "Place a thin layer of onion epidermis on the slide.",
  "Add a drop of water and cover with a coverslip.",
  "Adjust the focus and light intensity.",
  "Observe the cells and identify their parts.",
];

export function MicroscopeProcedureCard({ accentColor }: { accentColor: string }) {
  return (
    <View
      className="mt-4 flex-row items-start justify-between rounded-[20px] border p-4"
      style={{ borderColor: neutralColors.border }}
    >
      <View className="flex-1 pr-3">
        <View className="flex-row items-center gap-2">
          <Ionicons name="list-outline" size={16} color={accentColor} />
          <Text className="text-[14px] font-poppins-bold text-text-primary">Procedure</Text>
        </View>

        <View className="mt-2 gap-1.5">
          {STEPS.map((step, index) => (
            <Text
              key={step}
              className="text-[13px] font-poppins-regular leading-[20px]"
              style={{ color: neutralColors.textSecondary }}
            >
              {index + 1}. {step}
            </Text>
          ))}
        </View>
      </View>

      <View className="h-16 w-16 items-center justify-center rounded-[16px]" style={{ backgroundColor: neutralColors.surface }}>
        <Ionicons name="clipboard-outline" size={28} color={accentColor} />
      </View>
    </View>
  );
}
