import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { neutralColors, primaryColors } from "@/constants/theme/colors";
import { TitrationBottomNav } from "./TitrationBottomNav";
import { TitrationMiniIllustration } from "./TitrationMiniIllustration";
import { TitrationTipCard } from "./TitrationTipCard";

const KEY_CONCEPTS = [
  { icon: "flask-outline" as const, title: "Titrant", description: "The solution of known concentration (present in the burette)." },
  { icon: "flask-outline" as const, title: "Analyte", description: "The solution of unknown concentration (present in the conical flask)." },
  {
    icon: "radio-button-on-outline" as const,
    title: "Endpoint",
    description: "The point where the indicator changes color, signaling completion of the reaction.",
  },
];

// Simplified from the reference's three labeled dropper-bottle illustrations
// to color swatches — same colorless/orange/pink comparison without a
// bespoke bottle-icon asset, matching Microscope TheoryTab's simplification
// of its labeled diagram to a list (a scope trade-off, not an oversight).
const INDICATOR_SWATCHES = [
  { label: "Acidic", color: "#F97316" },
  { label: "Neutral", color: "#E5E7EB" },
  { label: "Endpoint", color: "#F472B6" },
];

type TheoryTabProps = {
  accentColor: string;
  accentTint: string;
  onPressPrevious?: () => void;
  onPressNext?: () => void;
  onStartExperiment: () => void;
};

export function TheoryTab({ accentColor, accentTint, onPressPrevious, onPressNext, onStartExperiment }: TheoryTabProps) {
  return (
    <View>
      <View className="mt-2 flex-row gap-3 rounded-[20px] border p-4" style={{ borderColor: neutralColors.border }}>
        <View className="flex-1">
          <Text className="text-[14px] font-poppins-bold text-text-primary">Introduction</Text>
          <Text
            className="mt-1.5 text-[13px] font-poppins-regular leading-[20px]"
            style={{ color: neutralColors.textSecondary }}
          >
            Acid-base titration is an analytical technique used to determine the concentration of an
            unknown acid or base solution by reacting it with a solution of known concentration
            (standard solution).
          </Text>
        </View>
        <TitrationMiniIllustration accentColor={accentColor} width={90} />
      </View>

      <Text className="mt-5 text-[14px] font-poppins-bold text-text-primary">Principle</Text>
      <View className="mt-2 rounded-[20px] border p-4" style={{ borderColor: neutralColors.border }}>
        <Text className="text-[13px] font-poppins-regular leading-[20px]" style={{ color: neutralColors.textSecondary }}>
          A titration is based on a neutralization reaction between an acid and a base. The reaction
          proceeds until the stoichiometric point (equivalence point) is reached, where the moles of
          acid equal the moles of base.
        </Text>
        <View className="mt-3 items-center rounded-[14px] py-3" style={{ backgroundColor: neutralColors.surface }}>
          <Text className="text-[14px] font-poppins-bold text-text-primary">HA + BOH → BA + H₂O</Text>
          <Text className="mt-1 text-[11px] font-poppins-medium" style={{ color: neutralColors.textSecondary }}>
            Acid + Base → Salt + Water
          </Text>
        </View>
      </View>

      <Text className="mt-5 text-[14px] font-poppins-bold text-text-primary">Key Concepts</Text>
      <View className="mt-2 gap-2">
        {KEY_CONCEPTS.map((concept) => (
          <View
            key={concept.title}
            className="flex-row items-start gap-3 rounded-[16px] border p-3"
            style={{ borderColor: neutralColors.border }}
          >
            <View className="h-9 w-9 items-center justify-center rounded-full" style={{ backgroundColor: accentTint }}>
              <Ionicons name={concept.icon} size={16} color={accentColor} />
            </View>
            <View className="flex-1">
              <Text className="text-[13px] font-poppins-semibold text-text-primary">{concept.title}</Text>
              <Text
                className="text-[12px] font-poppins-regular leading-[18px]"
                style={{ color: neutralColors.textSecondary }}
              >
                {concept.description}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <Text className="mt-5 text-[14px] font-poppins-bold text-text-primary">Indicator</Text>
      <View className="mt-2 rounded-[20px] border p-4" style={{ borderColor: neutralColors.border }}>
        <Text className="text-[13px] font-poppins-regular leading-[20px]" style={{ color: neutralColors.textSecondary }}>
          Indicators are used to detect the endpoint of the titration by showing a visible color change.
        </Text>
        <View className="mt-3 flex-row items-center justify-around">
          {INDICATOR_SWATCHES.map((swatch) => (
            <View key={swatch.label} className="items-center gap-1.5">
              <View className="h-9 w-9 rounded-full border" style={{ backgroundColor: swatch.color, borderColor: neutralColors.border }} />
              <Text className="text-[11px] font-poppins-medium" style={{ color: neutralColors.textSecondary }}>
                {swatch.label}
              </Text>
            </View>
          ))}
        </View>
        <View className="mt-3 rounded-[14px] p-3" style={{ backgroundColor: accentTint }}>
          <Text className="text-[12px] font-poppins-semibold text-text-primary">
            Common Indicator: <Text className="font-poppins-regular">Phenolphthalein</Text>
          </Text>
          <Text className="mt-0.5 text-[12px] font-poppins-semibold text-text-primary">
            Color Change: <Text className="font-poppins-regular">Colorless → Faint Pink</Text>
          </Text>
        </View>
      </View>

      <Text className="mt-5 text-[14px] font-poppins-bold text-text-primary">Calculations</Text>
      <View className="mt-2 flex-row gap-3 rounded-[20px] border p-4" style={{ borderColor: neutralColors.border }}>
        <View className="items-center justify-center rounded-[14px] px-4 py-6" style={{ backgroundColor: neutralColors.surface }}>
          <Text className="text-[15px] font-poppins-bold" style={{ color: primaryColors.purple }}>
            C₁V₁ = C₂V₂
          </Text>
        </View>
        <View className="flex-1 gap-1">
          <FormulaLegend symbol="C₁" description="Concentration of titrant (M)" />
          <FormulaLegend symbol="V₁" description="Volume of titrant used (L)" />
          <FormulaLegend symbol="C₂" description="Concentration of analyte (M)" />
          <FormulaLegend symbol="V₂" description="Volume of analyte (L)" />
        </View>
      </View>

      <TitrationTipCard tip="Add the titrant slowly near the endpoint for more accurate results." accentTint={accentTint} />

      <TitrationBottomNav
        ctaLabel="Start Experiment"
        ctaIcon="play"
        accentColor={accentColor}
        onPressCta={onStartExperiment}
        onPressPrevious={onPressPrevious}
        onPressNext={onPressNext}
      />
    </View>
  );
}

function FormulaLegend({ symbol, description }: { symbol: string; description: string }) {
  return (
    <Text className="text-[11px] font-poppins-regular" style={{ color: neutralColors.textSecondary }}>
      <Text className="font-poppins-semibold text-text-primary">{symbol} </Text>= {description}
    </Text>
  );
}
