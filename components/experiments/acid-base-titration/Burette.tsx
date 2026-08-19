import { useEffect } from "react";
import { G, Line, Rect, Text as SvgText } from "react-native-svg";
import Animated, { useAnimatedProps, useSharedValue, withTiming } from "react-native-reanimated";

import { BURETTE_CAPACITY_ML, buretteFillFraction } from "./titrationMath";
import {
  BURETTE_BOTTOM_Y,
  BURETTE_CENTER_X,
  BURETTE_TOP_Y,
  BURETTE_WIDTH,
  BURETTE_X,
  STOPCOCK_BOTTOM_Y,
} from "./titrationLayout";

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const TUBE_HEIGHT = BURETTE_BOTTOM_Y - BURETTE_TOP_Y;
const TICK_STEP_ML = 10;
const LIQUID_COLOR = "#8B5CF6";
const GLASS_STROKE = "#C7CCDA";

type BuretteProps = {
  buretteVolumeML: number;
};

// Vertical graduated tube + stopcock. The liquid's top edge is the only
// state-driven part — it animates smoothly toward the new fill level instead
// of jumping, same withTiming approach as SpecimenView's stage pan.
export function Burette({ buretteVolumeML }: BuretteProps) {
  const fillFraction = useSharedValue(buretteFillFraction(buretteVolumeML));

  useEffect(() => {
    fillFraction.value = withTiming(buretteFillFraction(buretteVolumeML), { duration: 200 });
  }, [buretteVolumeML, fillFraction]);

  const liquidProps = useAnimatedProps(() => {
    const liquidHeight = fillFraction.value * TUBE_HEIGHT;
    return {
      y: BURETTE_BOTTOM_Y - liquidHeight,
      height: liquidHeight,
    };
  });

  const ticks: number[] = [];
  for (let ml = 0; ml <= BURETTE_CAPACITY_ML; ml += TICK_STEP_ML) ticks.push(ml);

  return (
    <G>
      {/* glass tube outline */}
      <Rect
        x={BURETTE_X}
        y={BURETTE_TOP_Y}
        width={BURETTE_WIDTH}
        height={TUBE_HEIGHT}
        rx={4}
        fill="#F5F3FF"
        stroke={GLASS_STROKE}
        strokeWidth={1.5}
      />

      {/* purple titrant fill, clipped to the tube by drawing inside its bounds */}
      <AnimatedRect
        x={BURETTE_X + 1.5}
        width={BURETTE_WIDTH - 3}
        animatedProps={liquidProps}
        fill={LIQUID_COLOR}
        opacity={0.85}
      />

      {/* graduation ticks, 0 mL at the top down to capacity at the bottom */}
      {ticks.map((ml) => {
        const y = BURETTE_TOP_Y + (ml / BURETTE_CAPACITY_ML) * TUBE_HEIGHT;
        return (
          <G key={ml}>
            <Line x1={BURETTE_X} y1={y} x2={BURETTE_X + 7} y2={y} stroke="#9CA3AF" strokeWidth={1} />
            <SvgText x={BURETTE_X - 4} y={y + 3} fontSize={7} fill="#6B7280" textAnchor="end">
              {ml}
            </SvgText>
          </G>
        );
      })}

      {/* stopcock / valve */}
      <Rect x={BURETTE_X + 6} y={BURETTE_BOTTOM_Y} width={BURETTE_WIDTH - 12} height={8} fill={GLASS_STROKE} />
      <Rect
        x={BURETTE_CENTER_X - 4}
        y={BURETTE_BOTTOM_Y + 4}
        width={8}
        height={STOPCOCK_BOTTOM_Y - BURETTE_BOTTOM_Y - 4}
        rx={3}
        fill="#7C3AED"
      />
      <Rect x={BURETTE_CENTER_X - 12} y={BURETTE_BOTTOM_Y + 6} width={24} height={5} rx={2.5} fill="#7C3AED" />
    </G>
  );
}
