import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { neutralColors } from "@/constants/theme/colors";
import type { MicroscopeMagnification, MicroscopeSpecimenConfig } from "@/types/microscope";
import { CircleImage } from "./CircleImage";
import { MicroscopeBottomNav } from "./MicroscopeBottomNav";
import { MicroscopeTipCard } from "./MicroscopeTipCard";
import { MAGNIFICATION_OPTIONS, focusClarityPercent, illuminationLabel } from "./microscopeMath";

// Static — no detection model is in scope here, this mirrors the reference's
// "all major structures observed" summary rather than computing it.
const OBSERVED_COMPONENTS = ["Cell Wall", "Cell Membrane", "Cytoplasm", "Nucleus", "Vacuole"];

type ResultsTabProps = {
  specimen: MicroscopeSpecimenConfig;
  magnification: MicroscopeMagnification;
  focus: number;
  lightIntensity: number;
  accentColor: string;
  accentTint: string;
  onPressPrevious?: () => void;
  onPressNext?: () => void;
  onRepeatExperiment: () => void;
};

export function ResultsTab({
  specimen,
  magnification,
  focus,
  lightIntensity,
  accentColor,
  accentTint,
  onPressPrevious,
  onPressNext,
  onRepeatExperiment,
}: ResultsTabProps) {
  const clarity = focusClarityPercent(focus, specimen.idealFocus);
  const clarityLabel = clarity >= 85 ? "High" : clarity >= 60 ? "Medium" : "Low";

  const stats = [
    { label: "Magnification", value: `${magnification}x` },
    { label: "Specimen", value: specimen.specimenLabel },
    { label: "Stained", value: "Yes (Iodine)" },
    { label: "Focus Level", value: `${clarity}%` },
    { label: "Light Intensity", value: illuminationLabel(lightIntensity) },
    { label: "Clarity", value: clarityLabel },
  ];

  return (
    <View>
      <Text className="mt-3 text-[14px] font-poppins-bold text-text-primary">Summary</Text>
      <Text className="mt-1 text-[12px] font-poppins-regular" style={{ color: neutralColors.textSecondary }}>
        Here are the results of your onion cell observation.
      </Text>

      <View className="mt-3 flex-row flex-wrap gap-2">
        {stats.map((stat) => (
          <View key={stat.label} className="rounded-[16px] p-3" style={{ backgroundColor: accentTint, width: "31.5%" }}>
            <Text className="text-[11px] font-poppins-medium" style={{ color: neutralColors.textSecondary }}>
              {stat.label}
            </Text>
            <Text className="mt-0.5 text-[14px] font-poppins-bold" style={{ color: accentColor }} numberOfLines={1}>
              {stat.value}
            </Text>
          </View>
        ))}
      </View>

      <View className="mt-5 flex-row gap-3">
        <View className="flex-1">
          <Text className="text-[14px] font-poppins-bold text-text-primary">Observed Cell Components</Text>
          <Text className="mt-1 text-[11px] font-poppins-regular" style={{ color: neutralColors.textSecondary }}>
            Detection of key structures in the onion cell.
          </Text>

          <View className="mt-3 gap-3">
            {OBSERVED_COMPONENTS.map((component) => (
              <View key={component}>
                <View className="flex-row items-center justify-between">
                  <Text className="text-[12px] font-poppins-semibold text-text-primary">{component}</Text>
                  <Text className="text-[11px] font-poppins-semibold" style={{ color: accentColor }}>
                    Detected
                  </Text>
                </View>
                <View className="mt-1 h-1.5 overflow-hidden rounded-full" style={{ backgroundColor: neutralColors.border }}>
                  <View className="h-1.5 rounded-full" style={{ width: "100%", backgroundColor: accentColor }} />
                </View>
              </View>
            ))}
          </View>
        </View>

        <CircleImage source={specimen.images[magnification]} size={120} />
      </View>

      <View className="mt-3 flex-row items-center gap-3 rounded-[16px] p-4" style={{ backgroundColor: accentTint }}>
        <Ionicons name="checkmark-circle" size={22} color={accentColor} />
        <View className="flex-1">
          <Text className="text-[13px] font-poppins-bold text-text-primary">Overall Observation</Text>
          <Text className="text-[11px] font-poppins-regular" style={{ color: neutralColors.textSecondary }}>
            All major structures were successfully observed.
          </Text>
        </View>
      </View>

      <Text className="mt-5 text-[14px] font-poppins-bold text-text-primary">Observation Notes</Text>
      <View className="mt-2 rounded-[16px] border p-4" style={{ borderColor: neutralColors.border }}>
        <Text className="text-[13px] font-poppins-regular leading-[20px]" style={{ color: neutralColors.textSecondary }}>
          Cells appear brick-like in shape with distinct cell walls. Nuclei are visible after staining
          with iodine. Large vacuoles occupy most of the cell space.
        </Text>
      </View>

      <Text className="mt-5 text-[14px] font-poppins-bold text-text-primary">Data Log</Text>
      <View className="mt-2 overflow-hidden rounded-[16px] border" style={{ borderColor: neutralColors.border }}>
        <View className="flex-row px-3 py-2" style={{ backgroundColor: neutralColors.surface }}>
          <Text className="flex-1 text-[11px] font-poppins-bold text-text-primary">Magnification</Text>
          <Text className="flex-1 text-[11px] font-poppins-bold text-text-primary">Focus (%)</Text>
          <Text className="flex-1 text-[11px] font-poppins-bold text-text-primary">Light</Text>
        </View>
        {MAGNIFICATION_OPTIONS.map((option, index) => (
          <View
            key={option}
            className="flex-row px-3 py-2"
            style={{ backgroundColor: option === magnification ? accentTint : "#FFFFFF" }}
          >
            <Text className="flex-1 text-[12px] font-poppins-medium text-text-primary">{option}x</Text>
            <Text className="flex-1 text-[12px] font-poppins-medium text-text-primary">
              {option === magnification ? clarity : "—"}
            </Text>
            <Text className="flex-1 text-[12px] font-poppins-medium text-text-primary">
              {option === magnification ? illuminationLabel(lightIntensity) : "—"}
            </Text>
          </View>
        ))}
      </View>

      <View className="mt-5 rounded-[20px] border p-4" style={{ borderColor: neutralColors.border }}>
        <Text className="text-[14px] font-poppins-bold text-text-primary">Conclusion</Text>
        <Text className="mt-1.5 text-[13px] font-poppins-regular leading-[20px]" style={{ color: neutralColors.textSecondary }}>
          The onion epidermis cells show clear cell walls, membranes, cytoplasm, nucleus, and large
          vacuoles. Staining with iodine improved visibility of the nucleus and other structures.
        </Text>
      </View>

      <MicroscopeTipCard
        tip="Adjust the focus and light intensity to improve clarity. Try higher magnification to observe smaller details."
        accentTint={accentTint}
      />

      <MicroscopeBottomNav
        ctaLabel="Repeat Experiment"
        ctaIcon="refresh"
        accentColor={accentColor}
        onPressCta={onRepeatExperiment}
        onPressPrevious={onPressPrevious}
        onPressNext={onPressNext}
      />
    </View>
  );
}
