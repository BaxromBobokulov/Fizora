import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { neutralColors, semanticColors } from "@/constants/theme/colors";

type TitrationReadoutCardProps = {
  pH: number;
  temperatureC: number;
  endpointReached: boolean;
  accentColor: string;
};

// Mirrors ObservationInfoCard's row layout from the Microscope lab — pH,
// Temperature and Endpoint are all derived from the current simulation
// state by the caller, never hardcoded here.
export function TitrationReadoutCard({ pH, temperatureC, endpointReached, accentColor }: TitrationReadoutCardProps) {
  return (
    <View className="flex-1 rounded-[20px] border p-4" style={{ borderColor: neutralColors.border }}>
      <ReadoutRow icon="water" label="pH" value={pH.toFixed(2)} valueColor={accentColor} />
      <ReadoutRow
        icon="thermometer-outline"
        label="Temperature"
        value={`${temperatureC.toFixed(1)} °C`}
        valueColor={accentColor}
      />
      <ReadoutRow
        icon="radio-button-on-outline"
        label="Endpoint"
        value={endpointReached ? "Reached" : "Not Reached"}
        valueColor={endpointReached ? semanticColors.success : accentColor}
        last
      />
    </View>
  );
}

function ReadoutRow({
  icon,
  label,
  value,
  valueColor,
  last,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  valueColor: string;
  last?: boolean;
}) {
  return (
    <View className={`flex-row items-center gap-3 ${last ? "" : "mb-4"}`}>
      <Ionicons name={icon} size={16} color={valueColor} />
      <View>
        <Text className="text-[12px] font-poppins-medium" style={{ color: neutralColors.textSecondary }}>
          {label}
        </Text>
        <Text className="text-[14px] font-poppins-bold" style={{ color: valueColor }}>
          {value}
        </Text>
      </View>
    </View>
  );
}
