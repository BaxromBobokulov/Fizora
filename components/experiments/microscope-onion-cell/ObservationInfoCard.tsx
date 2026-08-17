import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { neutralColors } from "@/constants/theme/colors";
import type { MicroscopeMagnification } from "@/types/microscope";
import { illuminationLabel } from "./microscopeMath";

type ObservationInfoCardProps = {
  magnification: MicroscopeMagnification;
  lightIntensity: number;
  specimenLabel: string;
  accentColor: string;
};

export function ObservationInfoCard({
  magnification,
  lightIntensity,
  specimenLabel,
  accentColor,
}: ObservationInfoCardProps) {
  const rows: { icon: keyof typeof Ionicons.glyphMap; label: string; value: string }[] = [
    { icon: "flask-outline", label: "Magnification", value: `${magnification}x` },
    { icon: "sunny-outline", label: "Illumination", value: illuminationLabel(lightIntensity) },
    { icon: "leaf-outline", label: "Specimen", value: specimenLabel },
  ];

  return (
    <View className="flex-1 rounded-[20px] border p-4" style={{ borderColor: neutralColors.border }}>
      <Text className="text-[14px] font-poppins-bold text-text-primary">Observation Info</Text>

      <View className="mt-3 gap-4">
        {rows.map((row) => (
          <View key={row.label} className="flex-row items-center gap-3">
            <Ionicons name={row.icon} size={16} color={accentColor} />
            <View>
              <Text className="text-[12px] font-poppins-medium" style={{ color: neutralColors.textSecondary }}>
                {row.label}
              </Text>
              <Text className="text-[14px] font-poppins-bold" style={{ color: accentColor }}>
                {row.value}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
