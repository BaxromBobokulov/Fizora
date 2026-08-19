import { Text, View } from "react-native";
import Svg, { Circle, Line, Path } from "react-native-svg";

import { neutralColors, primaryColors } from "@/constants/theme/colors";
import { BURETTE_CAPACITY_ML, TITRANT_CONCENTRATION_M, calculatePH } from "./titrationMath";

const WIDTH = 300;
const HEIGHT = 200;
const PADDING = 30;
const PH_MAX = 14;

type TitrationCurveChartProps = {
  acidConcentration: number;
  acidVolume: number;
  buretteVolumeML: number;
};

// Plots the theoretical pH-vs-volume curve (same calculatePH used to drive
// the live readout) with the student's current burette reading marked on it —
// mirrors PeriodVsLengthChart's theoretical-curve + experimental-point pattern.
export function TitrationCurveChart({ acidConcentration, acidVolume, buretteVolumeML }: TitrationCurveChartProps) {
  const toX = (volume: number) => PADDING + (volume / BURETTE_CAPACITY_ML) * (WIDTH - PADDING * 2);
  const toY = (pH: number) => HEIGHT - PADDING - (pH / PH_MAX) * (HEIGHT - PADDING * 2);

  const curvePoints: string[] = [];
  const steps = 60;
  for (let i = 0; i <= steps; i++) {
    const volume = (i / steps) * BURETTE_CAPACITY_ML;
    const pH = calculatePH(acidConcentration, acidVolume, volume, TITRANT_CONCENTRATION_M);
    curvePoints.push(`${i === 0 ? "M" : "L"} ${toX(volume).toFixed(1)} ${toY(pH).toFixed(1)}`);
  }

  const currentPH = calculatePH(acidConcentration, acidVolume, buretteVolumeML, TITRANT_CONCENTRATION_M);

  return (
    <View className="mt-3 rounded-[20px] p-4" style={{ backgroundColor: "#F6F7FB" }}>
      <Text className="text-[14px] font-poppins-bold text-text-primary">Titration Curve</Text>

      <Svg width="100%" height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="mt-2">
        <Line x1={PADDING} y1={PADDING} x2={PADDING} y2={HEIGHT - PADDING} stroke={neutralColors.border} strokeWidth={1} />
        <Line
          x1={PADDING}
          y1={HEIGHT - PADDING}
          x2={WIDTH - PADDING}
          y2={HEIGHT - PADDING}
          stroke={neutralColors.border}
          strokeWidth={1}
        />
        {/* phenolphthalein endpoint band, dashed */}
        <Line
          x1={PADDING}
          y1={toY(8.2)}
          x2={WIDTH - PADDING}
          y2={toY(8.2)}
          stroke={primaryColors.purple}
          strokeWidth={1}
          strokeDasharray="4 4"
          opacity={0.4}
        />

        <Path d={curvePoints.join(" ")} stroke={primaryColors.purple} strokeWidth={2} fill="none" />

        <Circle cx={toX(buretteVolumeML)} cy={toY(currentPH)} r={4} fill={primaryColors.orange} />
      </Svg>

      <View className="mt-1 flex-row items-center justify-between px-1">
        <Text className="text-[11px] font-poppins-medium" style={{ color: neutralColors.textSecondary }}>
          Volume of Titrant (mL)
        </Text>
        <View className="flex-row gap-3">
          <Legend color={primaryColors.purple} label="Theoretical" />
          <Legend color={primaryColors.orange} label="Current" />
        </View>
      </View>
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
