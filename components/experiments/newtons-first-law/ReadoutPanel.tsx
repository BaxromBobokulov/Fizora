import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { neutralColors, primaryColors } from "@/constants/theme/colors";

type Readout = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
};

type ReadoutPanelProps = {
  velocity: number;
  distanceTraveled: number;
  motionState: string;
};

export function ReadoutPanel({ velocity, distanceTraveled, motionState }: ReadoutPanelProps) {
  const readouts: Readout[] = [
    { icon: "speedometer-outline", label: "Velocity (v)", value: `${velocity.toFixed(2)} m/s` },
    { icon: "resize-outline", label: "Distance (d)", value: `${distanceTraveled.toFixed(2)} m` },
    { icon: "pulse-outline", label: "Motion State", value: motionState },
  ];

  return (
    <View className="flex-1 gap-4 rounded-[20px] p-4" style={{ backgroundColor: "#F1EEFF" }}>
      {readouts.map((readout) => (
        <View key={readout.label} className="flex-row items-center gap-3">
          <View
            className="h-9 w-9 items-center justify-center rounded-full"
            style={{ backgroundColor: "#FFFFFF" }}
          >
            <Ionicons name={readout.icon} size={16} color={primaryColors.purple} />
          </View>
          <View>
            <Text
              className="text-[12px] font-poppins-medium"
              style={{ color: neutralColors.textSecondary }}
            >
              {readout.label}
            </Text>
            <Text
              className="text-[17px] font-poppins-bold"
              style={{ color: primaryColors.purple }}
            >
              {readout.value}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}
