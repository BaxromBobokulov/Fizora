import { Image, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { images } from "@/constants/images";
import { neutralColors, semanticColors } from "@/constants/theme/colors";
import { TitrationBottomNav } from "./TitrationBottomNav";
import { TitrationCurveChart } from "./TitrationCurveChart";
import { TitrationTipCard } from "./TitrationTipCard";
import {
  INDICATOR_OPTIONS,
  TITRANT_CONCENTRATION_M,
  analyteConcentrationM,
  calculatePH,
  type IndicatorId,
} from "./titrationMath";

type ResultsTabProps = {
  acidConcentration: number;
  acidVolume: number;
  buretteVolumeML: number;
  pH: number;
  temperatureC: number;
  endpointReached: boolean;
  indicator: IndicatorId;
  accentColor: string;
  accentTint: string;
  onPressPrevious?: () => void;
  onPressNext?: () => void;
  onRepeatExperiment: () => void;
};

export function ResultsTab({
  acidConcentration,
  acidVolume,
  buretteVolumeML,
  pH,
  temperatureC,
  endpointReached,
  indicator,
  accentColor,
  accentTint,
  onPressPrevious,
  onPressNext,
  onRepeatExperiment,
}: ResultsTabProps) {
  const indicatorLabel = INDICATOR_OPTIONS.find((option) => option.id === indicator)?.label ?? "Phenolphthalein";
  const indicatorColorLabel = endpointReached ? "Faint Pink" : "Colorless";
  const initialPH = calculatePH(acidConcentration, acidVolume, 0, TITRANT_CONCENTRATION_M);
  const analyteConcentration = analyteConcentrationM(TITRANT_CONCENTRATION_M, buretteVolumeML, acidVolume);

  const stats = [
    { label: "Endpoint Reached", value: `${buretteVolumeML.toFixed(2)} mL`, sub: "Burette Reading" },
    { label: "pH at Endpoint", value: pH.toFixed(2), sub: pH < 7 ? "Acidic" : pH > 7 ? "Basic" : "Neutral" },
    { label: "Indicator Color", value: indicatorColorLabel, sub: indicatorLabel },
  ];

  const summaryRows = [
    { label: "Initial Burette Reading", value: "0.00 mL" },
    { label: "Final Burette Reading", value: `${buretteVolumeML.toFixed(2)} mL` },
    { label: "Volume of Titrant Used", value: `${buretteVolumeML.toFixed(2)} mL` },
    { label: "Initial pH", value: initialPH.toFixed(2) },
    { label: "Current pH", value: pH.toFixed(2) },
    { label: "Indicator", value: indicatorLabel },
    { label: "Indicator Color", value: indicatorColorLabel },
  ];

  return (
    <View>
      <View className="mt-3 flex-row items-center gap-3 rounded-[20px] p-4" style={{ backgroundColor: accentTint }}>
        <View
          className="h-9 w-9 items-center justify-center rounded-full"
          style={{ backgroundColor: endpointReached ? "#DCFCE7" : "#FEF3C7" }}
        >
          <Ionicons
            name={endpointReached ? "checkmark" : "time-outline"}
            size={18}
            color={endpointReached ? semanticColors.success : semanticColors.warning}
          />
        </View>
        <View className="flex-1">
          <Text className="text-[14px] font-poppins-bold text-text-primary">
            {endpointReached ? "Titration Completed!" : "Titration In Progress"}
          </Text>
          <Text className="text-[12px] font-poppins-regular" style={{ color: neutralColors.textSecondary }}>
            {endpointReached
              ? "The endpoint has been successfully reached."
              : "Keep adding titrant until the indicator turns faint pink."}
          </Text>
        </View>
        <Image source={images.mascotAuth} className="h-14 w-14" resizeMode="contain" />
      </View>

      <View className="mt-3 flex-row flex-wrap gap-2">
        {stats.map((stat) => (
          <View key={stat.label} className="rounded-[16px] p-3" style={{ backgroundColor: accentTint, width: "31.5%" }}>
            <Text className="text-[10px] font-poppins-medium" style={{ color: neutralColors.textSecondary }}>
              {stat.label}
            </Text>
            <Text className="mt-0.5 text-[14px] font-poppins-bold" style={{ color: accentColor }} numberOfLines={1}>
              {stat.value}
            </Text>
            <Text className="text-[10px] font-poppins-regular" style={{ color: neutralColors.textSecondary }}>
              {stat.sub}
            </Text>
          </View>
        ))}
      </View>

      <TitrationCurveChart acidConcentration={acidConcentration} acidVolume={acidVolume} buretteVolumeML={buretteVolumeML} />

      <Text className="mt-5 text-[14px] font-poppins-bold text-text-primary">Summary</Text>
      <View className="mt-2 gap-2 rounded-[16px] border p-4" style={{ borderColor: neutralColors.border }}>
        {summaryRows.map((row) => (
          <View key={row.label} className="flex-row items-center justify-between">
            <Text className="text-[12px] font-poppins-regular" style={{ color: neutralColors.textSecondary }}>
              {row.label}
            </Text>
            <Text className="text-[12px] font-poppins-semibold text-text-primary">{row.value}</Text>
          </View>
        ))}
      </View>

      <Text className="mt-5 text-[14px] font-poppins-bold text-text-primary">Calculations</Text>
      <View className="mt-2 rounded-[20px] border p-4" style={{ borderColor: neutralColors.border }}>
        <Text className="text-[12px] font-poppins-regular" style={{ color: neutralColors.textSecondary }}>
          Using the formula: <Text className="font-poppins-semibold text-text-primary">C₁V₁ = C₂V₂</Text>
        </Text>
        <View className="mt-3 gap-1.5">
          <CalcRow label="Concentration of Titrant (C₁)" value={`${TITRANT_CONCENTRATION_M.toFixed(3)} M`} />
          <CalcRow label="Volume of Titrant (V₁)" value={`${buretteVolumeML.toFixed(2)} mL`} />
          <CalcRow label="Volume of Analyte (V₂)" value={`${acidVolume.toFixed(2)} mL`} />
        </View>
        <View className="mt-3 items-center rounded-[14px] py-3" style={{ backgroundColor: neutralColors.surface }}>
          <Text className="text-[13px] font-poppins-bold text-text-primary">
            C₂ = ({TITRANT_CONCENTRATION_M.toFixed(3)} × {buretteVolumeML.toFixed(2)}) / {acidVolume.toFixed(2)}
          </Text>
          <Text className="mt-1 text-[15px] font-poppins-bold" style={{ color: accentColor }}>
            C₂ = {analyteConcentration.toFixed(4)} M
          </Text>
          <Text className="text-[10px] font-poppins-medium" style={{ color: neutralColors.textSecondary }}>
            Concentration of Analyte
          </Text>
        </View>
      </View>

      <Text className="mt-5 text-[14px] font-poppins-bold text-text-primary">Interpretation</Text>
      <View className="mt-2 rounded-[16px] border p-4" style={{ borderColor: neutralColors.border }}>
        <Text className="text-[13px] font-poppins-regular leading-[20px]" style={{ color: neutralColors.textSecondary }}>
          {endpointReached
            ? `The titration was successful. The endpoint was reached at ${buretteVolumeML.toFixed(2)} mL of titrant with a pH of ${pH.toFixed(2)}. The faint pink color of phenolphthalein confirmed the neutralization point.`
            : `So far ${buretteVolumeML.toFixed(2)} mL of titrant has been added and the pH is ${pH.toFixed(2)}. Keep titrating — the indicator will turn faint pink once the endpoint is reached.`}
        </Text>
      </View>

      <TitrationTipCard
        tip="A sharp color change and a steep rise in the titration curve indicate accurate results."
        accentTint={accentTint}
      />

      <TitrationBottomNav
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

function CalcRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-center justify-between">
      <Text className="text-[12px] font-poppins-regular" style={{ color: neutralColors.textSecondary }}>
        {label}
      </Text>
      <Text className="text-[12px] font-poppins-semibold text-text-primary">{value}</Text>
    </View>
  );
}
