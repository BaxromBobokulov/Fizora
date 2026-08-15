import { Text, View } from "react-native";
import Svg, { Circle, Line, Path } from "react-native-svg";

import { neutralColors, primaryColors, semanticColors } from "@/constants/theme/colors";
import {
  PENDULUM_RANGES,
  theoreticalPeriod,
} from "@/data/physics/mechanics/pendulum-motion";
import type { PendulumRun } from "@/store/usePendulumExperimentStore";

const WIDTH = 300;
const HEIGHT = 180;
const PADDING = 28;

type PeriodVsLengthChartProps = {
  runs: PendulumRun[];
  gravity: number;
};

export function PeriodVsLengthChart({ runs, gravity }: PeriodVsLengthChartProps) {
  const { min: lengthMin, max: lengthMax } = PENDULUM_RANGES.length;
  const maxTheoreticalPeriod = theoreticalPeriod(lengthMax, gravity);
  const periodCeiling = Math.max(maxTheoreticalPeriod * 1.15, ...runs.map((r) => r.period * 1.15));

  const toX = (length: number) =>
    PADDING + ((length - lengthMin) / (lengthMax - lengthMin)) * (WIDTH - PADDING * 2);
  const toY = (period: number) => HEIGHT - PADDING - (period / periodCeiling) * (HEIGHT - PADDING * 2);

  const curvePoints: string[] = [];
  const steps = 40;
  for (let i = 0; i <= steps; i++) {
    const length = lengthMin + (i / steps) * (lengthMax - lengthMin);
    const period = theoreticalPeriod(length, gravity);
    curvePoints.push(`${i === 0 ? "M" : "L"} ${toX(length).toFixed(1)} ${toY(period).toFixed(1)}`);
  }

  const avgRelativeError =
    runs.length === 0
      ? null
      : runs.reduce((sum, run) => {
          const expected = theoreticalPeriod(run.length, run.gravity);
          return sum + Math.abs(run.period - expected) / expected;
        }, 0) / runs.length;

  const goodMatch = avgRelativeError !== null && avgRelativeError < 0.05;

  return (
    <View className="mt-3 rounded-[20px] p-4" style={{ backgroundColor: "#F6F7FB" }}>
      <View className="flex-row items-center justify-between">
        <Text className="text-[14px] font-poppins-bold text-text-primary">Period vs Length</Text>
        {avgRelativeError !== null && (
          <View
            className="flex-row items-center gap-1 rounded-full px-2.5 py-1"
            style={{ backgroundColor: goodMatch ? "#DCFCE7" : "#FEF3C7" }}
          >
            <Text
              className="text-[11px] font-poppins-bold"
              style={{ color: goodMatch ? semanticColors.success : semanticColors.warning }}
            >
              {goodMatch ? "Good Match" : "Needs More Runs"}
            </Text>
          </View>
        )}
      </View>

      <Svg width="100%" height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="mt-2">
        <Line x1={PADDING} y1={PADDING} x2={PADDING} y2={HEIGHT - PADDING} stroke={neutralColors.border} strokeWidth={1} />
        <Line x1={PADDING} y1={HEIGHT - PADDING} x2={WIDTH - PADDING} y2={HEIGHT - PADDING} stroke={neutralColors.border} strokeWidth={1} />

        <Path d={curvePoints.join(" ")} stroke={primaryColors.purple} strokeWidth={2} fill="none" />

        {runs.map((run) => (
          <Circle
            key={run.length}
            cx={toX(run.length)}
            cy={toY(run.period)}
            r={4}
            fill={primaryColors.orange}
          />
        ))}
      </Svg>

      <View className="mt-1 flex-row items-center justify-between px-1">
        <Text className="text-[11px] font-poppins-medium" style={{ color: neutralColors.textSecondary }}>
          Length (m)
        </Text>
        <View className="flex-row gap-3">
          <Legend color={primaryColors.purple} label="Theoretical" />
          <Legend color={primaryColors.orange} label="Experimental" />
        </View>
      </View>

      <Text className="mt-3 text-[12px] font-poppins-regular leading-[18px]" style={{ color: neutralColors.textSecondary }}>
        {runs.length === 0
          ? "Run the experiment at a few different lengths to plot your measured period against the theoretical curve."
          : goodMatch
            ? "Your measured periods closely track the theoretical curve — a strong confirmation of T = 2π√(L/g)."
            : "Your measured periods are trending with the curve. Try a few more lengths for a tighter comparison."}
      </Text>
    </View>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <View className="flex-row items-center gap-1">
      <View className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
      <Text className="text-[11px] font-poppins-medium" style={{ color: neutralColors.textSecondary }}>
        {label}
      </Text>
    </View>
  );
}
