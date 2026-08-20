import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Circle, Line, Rect } from "react-native-svg";

import { neutralColors, primaryColors } from "@/constants/theme/colors";
import { BottomNav } from "./BottomNav";
import { FormulaCard } from "./FormulaCard";
import { TipCard } from "./TipCard";
import { VelocityVsTimeChart } from "./VelocityVsTimeChart";

const KEY_CONCEPTS = [
  {
    icon: "cube-outline" as const,
    title: "Inertia",
    description: "Every object resists changes to its state of motion — the more mass, the more inertia.",
  },
  {
    icon: "swap-horizontal-outline" as const,
    title: "Balanced Forces",
    description: "When the forces on an object cancel out, it keeps moving at constant velocity.",
  },
  {
    icon: "hand-left-outline" as const,
    title: "Friction as a Force",
    description: "Friction is an unbalanced force that opposes motion, which is why it slows the puck down.",
  },
];

const APPLICATIONS = [
  { icon: "car-sport-outline" as const, label: "Seatbelts" },
  { icon: "rocket-outline" as const, label: "Space Travel" },
  { icon: "snow-outline" as const, label: "Ice Skating" },
];

function NewtonsLawDiagram() {
  const w = 120;
  const h = 90;
  const trackY = 64;

  return (
    <View className="items-center justify-center rounded-[16px] p-3" style={{ backgroundColor: "#F1EEFF" }}>
      <Svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <Line x1={10} y1={trackY} x2={w - 10} y2={trackY} stroke={neutralColors.border} strokeWidth={2} />
        <Rect x={24} y={trackY - 14} width={22} height={14} rx={4} fill={primaryColors.purple} />
        <Line x1={50} y1={trackY - 7} x2={78} y2={trackY - 7} stroke={primaryColors.purple} strokeWidth={2} />
        <Circle cx={82} cy={trackY - 7} r={4} fill={primaryColors.purple} />
      </Svg>
    </View>
  );
}

type TheoryTabProps = {
  onPressPrevious?: () => void;
  onPressNext?: () => void;
  onStartExperiment: () => void;
};

export function TheoryTab({ onPressPrevious, onPressNext, onStartExperiment }: TheoryTabProps) {
  return (
    <View>
      <View className="mt-2 flex-row gap-3 rounded-[20px] border p-4" style={{ borderColor: neutralColors.border }}>
        <View className="flex-1">
          <Text className="text-[14px] font-poppins-bold text-text-primary">Overview</Text>
          <Text
            className="mt-1.5 text-[13px] font-poppins-regular leading-[20px]"
            style={{ color: neutralColors.textSecondary }}
          >
            Newton&apos;s First Law states that an object at rest stays at rest, and an object in
            motion stays in motion at constant velocity, unless acted on by an unbalanced force.
          </Text>
        </View>
        <NewtonsLawDiagram />
      </View>

      <Text className="mt-5 text-[14px] font-poppins-bold text-text-primary">Key Concepts</Text>
      <View className="mt-2 gap-2">
        {KEY_CONCEPTS.map((concept) => (
          <View
            key={concept.title}
            className="flex-row items-start gap-3 rounded-[16px] border p-3"
            style={{ borderColor: neutralColors.border }}
          >
            <View
              className="h-9 w-9 items-center justify-center rounded-full"
              style={{ backgroundColor: neutralColors.surface }}
            >
              <Ionicons name={concept.icon} size={16} color={primaryColors.purple} />
            </View>
            <View className="flex-1">
              <Text className="text-[13px] font-poppins-semibold text-text-primary">
                {concept.title}
              </Text>
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

      <Text className="mt-5 text-[14px] font-poppins-bold text-text-primary">Formula</Text>
      <FormulaCard />

      <Text className="mt-5 text-[14px] font-poppins-bold text-text-primary">
        Graphical Representation
      </Text>
      <VelocityVsTimeChart />

      <Text className="mt-5 text-[14px] font-poppins-bold text-text-primary">
        Real World Applications
      </Text>
      <View className="mt-2 flex-row gap-2">
        {APPLICATIONS.map((application) => (
          <View
            key={application.label}
            className="flex-1 items-center gap-2 rounded-[16px] border p-3"
            style={{ borderColor: neutralColors.border }}
          >
            <View
              className="h-9 w-9 items-center justify-center rounded-full"
              style={{ backgroundColor: neutralColors.surface }}
            >
              <Ionicons name={application.icon} size={16} color={primaryColors.purple} />
            </View>
            <Text
              className="text-center text-[11px] font-poppins-medium text-text-primary"
              numberOfLines={2}
            >
              {application.label}
            </Text>
          </View>
        ))}
      </View>

      <TipCard tip="Try the frictionless surface first, then switch to friction and see how quickly the puck stops." />

      <BottomNav
        ctaLabel="Start Experiment"
        onPressCta={onStartExperiment}
        onPressPrevious={onPressPrevious}
        onPressNext={onPressNext}
      />
    </View>
  );
}
