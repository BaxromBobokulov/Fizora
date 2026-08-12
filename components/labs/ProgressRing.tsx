import { Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

import { neutralColors, primaryColors } from "@/constants/theme/colors";

type ProgressRingProps = {
  percent: number;
  size?: number;
  strokeWidth?: number;
};

export function ProgressRing({ percent, size = 88, strokeWidth = 10 }: ProgressRingProps) {
  const clampedPercent = Math.min(100, Math.max(0, percent));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - clampedPercent / 100);

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={neutralColors.surface}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={primaryColors.purple}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          fill="none"
          rotation={-90}
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      <View className="absolute inset-0 items-center justify-center">
        <Text className="text-[16px] font-poppins-bold text-[#0D132B]">{clampedPercent}%</Text>
      </View>
    </View>
  );
}