import { Text, View } from "react-native";
import Svg, { Line, Path } from "react-native-svg";

import { neutralColors, primaryColors } from "@/constants/theme/colors";

const WIDTH = 300;
const HEIGHT = 140;
const MID_Y = HEIGHT / 2;
const AMPLITUDE = 48;
const CYCLES = 2;

function buildSinePath(): string {
  const points: string[] = [];
  const steps = 80;

  for (let i = 0; i <= steps; i++) {
    const x = (i / steps) * WIDTH;
    const t = (i / steps) * CYCLES * Math.PI * 2;
    const y = MID_Y - Math.sin(t) * AMPLITUDE;
    points.push(`${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`);
  }

  return points.join(" ");
}

export function SineWaveChart() {
  return (
    <View className="mt-3 items-center rounded-[20px] p-4" style={{ backgroundColor: "#F6F7FB" }}>
      <Svg width="100%" height={HEIGHT} viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
        <Line
          x1={0}
          y1={MID_Y}
          x2={WIDTH}
          y2={MID_Y}
          stroke={neutralColors.border}
          strokeWidth={1.5}
        />
        <Path d={buildSinePath()} stroke={primaryColors.purple} strokeWidth={2.5} fill="none" />
      </Svg>

      <View className="mt-2 w-full flex-row justify-between px-2">
        <Text className="text-[11px] font-poppins-medium" style={{ color: neutralColors.textSecondary }}>
          Time (t)
        </Text>
        <Text className="text-[11px] font-poppins-medium" style={{ color: neutralColors.textSecondary }}>
          Angular Displacement (θ)
        </Text>
      </View>
    </View>
  );
}
