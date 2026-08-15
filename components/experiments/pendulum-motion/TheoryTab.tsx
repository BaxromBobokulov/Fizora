import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Circle, Line, Rect } from "react-native-svg";

import { neutralColors, primaryColors } from "@/constants/theme/colors";
import { RELEASE_ANGLE_RAD } from "@/data/physics/mechanics/pendulum-motion";
import { BottomNav } from "./BottomNav";
import { FormulaCard } from "./FormulaCard";
import { SineWaveChart } from "./SineWaveChart";
import { TipCard } from "./TipCard";

const KEY_CONCEPTS = [
  {
    icon: "arrow-undo-outline" as const,
    title: "Restoring Force",
    description: "Gravity pulls the bob back toward its resting position at the bottom.",
  },
  {
    icon: "repeat-outline" as const,
    title: "Periodic Motion",
    description: "The pendulum repeats the same swing pattern at a constant interval.",
  },
  {
    icon: "analytics-outline" as const,
    title: "Small Angle Approximation",
    description: "For small release angles, the period depends only on length and gravity.",
  },
];

const APPLICATIONS = [
  { icon: "time-outline" as const, label: "Grandfather Clocks" },
  { icon: "pulse-outline" as const, label: "Seismographs" },
  { icon: "musical-notes-outline" as const, label: "Metronomes" },
];

function PendulumDiagram() {
  const w = 120;
  const h = 90;
  const pivot = { x: w / 2, y: 14 };
  const length = 55;
  const bob = {
    x: pivot.x + length * Math.sin(RELEASE_ANGLE_RAD),
    y: pivot.y + length * Math.cos(RELEASE_ANGLE_RAD),
  };

  return (
    <View className="items-center justify-center rounded-[16px] p-3" style={{ backgroundColor: "#F1EEFF" }}>
      <Svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <Rect x={pivot.x - 24} y={pivot.y - 5} width={48} height={10} rx={5} fill={primaryColors.purple} />
        <Line x1={pivot.x} y1={pivot.y} x2={pivot.x} y2={pivot.y + length} stroke={neutralColors.border} strokeWidth={1.5} strokeDasharray="3,3" />
        <Line x1={pivot.x} y1={pivot.y} x2={bob.x} y2={bob.y} stroke="#4C3B8C" strokeWidth={2} />
        <Circle cx={bob.x} cy={bob.y} r={9} fill={primaryColors.purple} />
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
            A pendulum is a mass suspended from a fixed point that swings back and forth under
            gravity. Its period depends only on the length of the string and the strength of
            gravity, not on the mass of the bob.
          </Text>
        </View>
        <PendulumDiagram />
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
      <SineWaveChart />

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

      <TipCard tip="Try changing the length and mass to see how they affect the period of the pendulum." />

      <BottomNav
        ctaLabel="Start Experiment"
        onPressCta={onStartExperiment}
        onPressPrevious={onPressPrevious}
        onPressNext={onPressNext}
      />
    </View>
  );
}
