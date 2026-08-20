import { Text, View } from "react-native";
import Svg, { Circle, Line, Path } from "react-native-svg";

import { neutralColors, primaryColors, semanticColors } from "@/constants/theme/colors";
import {
  theoreticalStopTime,
  theoreticalVelocityAtTime,
} from "@/data/physics/mechanics/newtons-first-law";
import type { NewtonsLawRun } from "@/store/useNewtonsLawExperimentStore";

const WIDTH = 300;
const HEIGHT = 180;
const PADDING = 28;

type MotionChartProps = {
  run: NewtonsLawRun;
};

export function MotionChart({ run }: MotionChartProps) {
  const theoreticalStop = theoreticalStopTime(run.initialVelocity, run.friction);
  // Frictionless (or a run that never stopped) shows one lap of flat motion instead.
  const timeCeiling = theoreticalStop ?? (run.initialVelocity > 0 ? run.distanceTraveled / run.initialVelocity : 1);

  const toX = (t: number) => PADDING + (t / timeCeiling) * (WIDTH - PADDING * 2);
  const toY = (v: number) =>
    HEIGHT - PADDING - (v / Math.max(run.initialVelocity, 0.01)) * (HEIGHT - PADDING * 2);

  const curvePoints: string[] = [];
  const steps = 40;
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * timeCeiling;
    const v = theoreticalVelocityAtTime(run.initialVelocity, run.frictionless ? 0 : run.friction, t);
    curvePoints.push(`${i === 0 ? "M" : "L"} ${toX(t).toFixed(1)} ${toY(v).toFixed(1)}`);
  }

  const relativeError =
    theoreticalStop !== null && run.timeToStop !== null
      ? Math.abs(run.timeToStop - theoreticalStop) / theoreticalStop
      : null;
  const goodMatch = relativeError !== null && relativeError < 0.15;

  return (
    <View className="mt-3 rounded-[20px] p-4" style={{ backgroundColor: "#F6F7FB" }}>
      <View className="flex-row items-center justify-between">
        <Text className="text-[14px] font-poppins-bold text-text-primary">Velocity vs Time</Text>
        {relativeError !== null && (
          <View
            className="flex-row items-center gap-1 rounded-full px-2.5 py-1"
            style={{ backgroundColor: goodMatch ? "#DCFCE7" : "#FEF3C7" }}
          >
            <Text
              className="text-[11px] font-poppins-bold"
              style={{ color: goodMatch ? semanticColors.success : semanticColors.warning }}
            >
              {goodMatch ? "Good Match" : "Run Again"}
            </Text>
          </View>
        )}
      </View>

      <Svg width="100%" height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="mt-2">
        <Line x1={PADDING} y1={PADDING} x2={PADDING} y2={HEIGHT - PADDING} stroke={neutralColors.border} strokeWidth={1} />
        <Line x1={PADDING} y1={HEIGHT - PADDING} x2={WIDTH - PADDING} y2={HEIGHT - PADDING} stroke={neutralColors.border} strokeWidth={1} />

        <Path d={curvePoints.join(" ")} stroke={primaryColors.purple} strokeWidth={2} fill="none" />

        {run.timeToStop !== null && (
          <Circle cx={toX(run.timeToStop)} cy={toY(0)} r={4} fill={primaryColors.orange} />
        )}
      </Svg>

      <View className="mt-1 flex-row items-center justify-between px-1">
        <Text className="text-[11px] font-poppins-medium" style={{ color: neutralColors.textSecondary }}>
          Time (s)
        </Text>
        <View className="flex-row gap-3">
          <Legend color={primaryColors.purple} label="Theoretical" />
          {run.timeToStop !== null && <Legend color={primaryColors.orange} label="Measured Stop" />}
        </View>
      </View>

      <Text className="mt-3 text-[12px] font-poppins-regular leading-[18px]" style={{ color: neutralColors.textSecondary }}>
        {run.frictionless
          ? "With zero friction, the puck's velocity stays constant — no unbalanced force acts on it."
          : goodMatch
            ? "Your measured stopping time closely tracks the theoretical curve — a strong confirmation of a = μg."
            : "Your measured stopping time is trending with the curve. Try running the experiment again for a tighter comparison."}
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
