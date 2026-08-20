import { Text, View } from "react-native";
import Svg, { Line, Path } from "react-native-svg";

import { neutralColors, primaryColors } from "@/constants/theme/colors";

const WIDTH = 300;
const HEIGHT = 140;
const PADDING = 10;
const V0_Y = HEIGHT - PADDING - 90;

export function VelocityVsTimeChart() {
  const flatPath = `M ${PADDING} ${V0_Y} L ${WIDTH - PADDING} ${V0_Y}`;
  const rampPath = `M ${PADDING} ${V0_Y} L ${WIDTH - PADDING} ${HEIGHT - PADDING}`;

  return (
    <View className="mt-3 items-center rounded-[20px] p-4" style={{ backgroundColor: "#F6F7FB" }}>
      <Svg width="100%" height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
        <Line
          x1={PADDING}
          y1={HEIGHT - PADDING}
          x2={WIDTH - PADDING}
          y2={HEIGHT - PADDING}
          stroke={neutralColors.border}
          strokeWidth={1.5}
        />
        <Path d={flatPath} stroke={primaryColors.blue} strokeWidth={2.5} fill="none" />
        <Path d={rampPath} stroke={primaryColors.orange} strokeWidth={2.5} fill="none" />
      </Svg>

      <View className="mt-2 w-full flex-row items-center justify-between px-2">
        <Text className="text-[11px] font-poppins-medium" style={{ color: neutralColors.textSecondary }}>
          Time (t)
        </Text>
        <View className="flex-row gap-3">
          <Legend color={primaryColors.blue} label="Frictionless" />
          <Legend color={primaryColors.orange} label="With Friction" />
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
