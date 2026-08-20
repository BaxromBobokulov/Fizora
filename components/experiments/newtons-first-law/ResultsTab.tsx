import { Text, View } from "react-native";

import { neutralColors, primaryColors } from "@/constants/theme/colors";
import type { NewtonsLawRun } from "@/store/useNewtonsLawExperimentStore";
import { BottomNav } from "./BottomNav";
import { FormulaCard } from "./FormulaCard";
import { MotionChart } from "./MotionChart";
import { RunsDataTable } from "./RunsDataTable";
import { TipCard } from "./TipCard";

type ResultsTabProps = {
  runs: NewtonsLawRun[];
  onPressPrevious?: () => void;
  onPressNext?: () => void;
  onRepeatExperiment: () => void;
};

export function ResultsTab({ runs, onPressPrevious, onPressNext, onRepeatExperiment }: ResultsTabProps) {
  const lastRun = runs[runs.length - 1];

  const stats = lastRun
    ? [
        { label: "Initial Velocity", value: `${lastRun.initialVelocity.toFixed(1)} m/s` },
        { label: "Mass", value: `${lastRun.mass.toFixed(2)} kg` },
        { label: "Surface", value: lastRun.frictionless ? "Frictionless" : `μ = ${lastRun.friction.toFixed(2)}` },
        { label: "Final Velocity", value: `${lastRun.finalVelocity.toFixed(2)} m/s` },
        { label: "Distance", value: `${lastRun.distanceTraveled.toFixed(2)} m` },
        {
          label: "Time to Stop",
          value: lastRun.timeToStop !== null ? `${lastRun.timeToStop.toFixed(2)} s` : "Never stops",
        },
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

      {lastRun && <MotionChart run={lastRun} />}

      <Text className="mt-5 text-[14px] font-poppins-bold text-text-primary">Data Table</Text>
      <RunsDataTable runs={runs} />

      <View className="mt-5 rounded-[20px] border p-4" style={{ borderColor: neutralColors.border }}>
        <Text className="text-[14px] font-poppins-bold text-text-primary">Conclusion</Text>
        <Text
          className="mt-1.5 text-[13px] font-poppins-regular leading-[20px]"
          style={{ color: neutralColors.textSecondary }}
        >
          Without friction, the puck keeps moving at constant velocity — no force is needed to
          sustain motion. With friction, an unbalanced force acts against the puck, decelerating
          it until it stops. This matches Newton&apos;s First Law below.
        </Text>
        <FormulaCard />
      </View>

      <TipCard tip="Try the frictionless surface first, then switch to friction and see how quickly the puck stops." />

      <BottomNav
        ctaLabel="Repeat Experiment"
        onPressCta={onRepeatExperiment}
        onPressPrevious={onPressPrevious}
        onPressNext={onPressNext}
      />
    </View>
  );
}
