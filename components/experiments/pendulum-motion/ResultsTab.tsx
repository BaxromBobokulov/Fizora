import { Text, View } from "react-native";

import { neutralColors, primaryColors } from "@/constants/theme/colors";
import { PENDULUM_DEFAULTS } from "@/data/physics/mechanics/pendulum-motion";
import type { PendulumRun } from "@/store/usePendulumExperimentStore";
import { BottomNav } from "./BottomNav";
import { FormulaCard } from "./FormulaCard";
import { PeriodVsLengthChart } from "./PeriodVsLengthChart";
import { RunsDataTable } from "./RunsDataTable";
import { TipCard } from "./TipCard";

type ResultsTabProps = {
  runs: PendulumRun[];
  currentGravity: number;
  onPressPrevious?: () => void;
  onPressNext?: () => void;
  onRepeatExperiment: () => void;
};

export function ResultsTab({
  runs,
  currentGravity,
  onPressPrevious,
  onPressNext,
  onRepeatExperiment,
}: ResultsTabProps) {
  const lastRun = runs[runs.length - 1];

  const stats = lastRun
    ? [
        { label: "Length", value: `${lastRun.length.toFixed(2)} m` },
        { label: "Mass", value: `${lastRun.mass.toFixed(2)} kg` },
        { label: "Period", value: `${lastRun.period.toFixed(2)} s` },
        { label: "Frequency", value: `${lastRun.frequency.toFixed(2)} Hz` },
        { label: "Velocity", value: `${lastRun.velocity.toFixed(2)} m/s` },
        { label: "Gravity", value: `${lastRun.gravity.toFixed(2)} m/s²` },
      ]
    : [];

  return (
    <View>
      <Text className="mt-3 text-[14px] font-poppins-bold text-text-primary">Summary</Text>

      {lastRun ? (
        <View className="mt-2 flex-row flex-wrap gap-2">
          {stats.map((stat) => (
            <View
              key={stat.label}
              className="rounded-[16px] p-3"
              style={{ backgroundColor: "#F1EEFF", width: "31.5%" }}
            >
              <Text
                className="text-[11px] font-poppins-medium"
                style={{ color: neutralColors.textSecondary }}
              >
                {stat.label}
              </Text>
              <Text
                className="mt-0.5 text-[14px] font-poppins-bold"
                style={{ color: primaryColors.purple }}
              >
                {stat.value}
              </Text>
            </View>
          ))}
        </View>
      ) : (
        <View
          className="mt-2 items-center rounded-[20px] border border-dashed p-6"
          style={{ borderColor: neutralColors.border }}
        >
          <Text
            className="text-center text-[12px] font-poppins-medium"
            style={{ color: neutralColors.textSecondary }}
          >
            Run the experiment on the Experiment tab to see your results here.
          </Text>
        </View>
      )}

      <PeriodVsLengthChart runs={runs} gravity={lastRun?.gravity ?? currentGravity ?? PENDULUM_DEFAULTS.gravity} />

      <Text className="mt-5 text-[14px] font-poppins-bold text-text-primary">Data Table</Text>
      <RunsDataTable runs={runs} />

      <View className="mt-5 rounded-[20px] border p-4" style={{ borderColor: neutralColors.border }}>
        <Text className="text-[14px] font-poppins-bold text-text-primary">Conclusion</Text>
        <Text
          className="mt-1.5 text-[13px] font-poppins-regular leading-[20px]"
          style={{ color: neutralColors.textSecondary }}
        >
          The period of a simple pendulum depends only on its length and the local gravity — not
          on the mass of the bob. This matches the small-angle formula below, which your
          experimental data should closely follow.
        </Text>
        <FormulaCard />
      </View>

      <TipCard tip="Try changing the length and mass to see how they affect the period of the pendulum." />

      <BottomNav
        ctaLabel="Repeat Experiment"
        onPressCta={onRepeatExperiment}
        onPressPrevious={onPressPrevious}
        onPressNext={onPressNext}
      />
    </View>
  );
}
