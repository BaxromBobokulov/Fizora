import { useEffect } from "react";
import { Circle, ClipPath, Defs, Ellipse, G, Path, Rect } from "react-native-svg";
import Animated, {
  Easing,
  cancelAnimation,
  interpolateColor,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import {
  BURETTE_CENTER_X,
  DROPPER_TIP_Y,
  FLASK_BASE_HALF_WIDTH,
  FLASK_BASE_Y,
  FLASK_NECK_BOTTOM_Y,
  FLASK_NECK_HALF_WIDTH,
  FLASK_NECK_TOP_Y,
  STIR_PLATE_HEIGHT,
  STIR_PLATE_Y,
  STOPCOCK_BOTTOM_Y,
} from "./titrationLayout";
import { flaskFillFraction } from "./titrationMath";

const AnimatedRect = Animated.createAnimatedComponent(Rect);
const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const NECK_LEFT = BURETTE_CENTER_X - FLASK_NECK_HALF_WIDTH;
const NECK_RIGHT = BURETTE_CENTER_X + FLASK_NECK_HALF_WIDTH;
const BASE_LEFT = BURETTE_CENTER_X - FLASK_BASE_HALF_WIDTH;
const BASE_RIGHT = BURETTE_CENTER_X + FLASK_BASE_HALF_WIDTH;

const FLASK_OUTLINE_D = `
  M ${NECK_LEFT} ${FLASK_NECK_TOP_Y}
  L ${NECK_LEFT} ${FLASK_NECK_BOTTOM_Y}
  L ${BASE_LEFT + 6} ${FLASK_BASE_Y - 4}
  Q ${BASE_LEFT} ${FLASK_BASE_Y} ${BASE_LEFT + 10} ${FLASK_BASE_Y + 2}
  L ${BASE_RIGHT - 10} ${FLASK_BASE_Y + 2}
  Q ${BASE_RIGHT} ${FLASK_BASE_Y} ${BASE_RIGHT - 6} ${FLASK_BASE_Y - 4}
  L ${NECK_RIGHT} ${FLASK_NECK_BOTTOM_Y}
  L ${NECK_RIGHT} ${FLASK_NECK_TOP_Y}
  Z
`;

const LIQUID_TOP_FULL_Y = FLASK_NECK_BOTTOM_Y;
const LIQUID_TOP_EMPTY_Y = FLASK_BASE_Y;

const COLORLESS = "rgba(224, 231, 255, 0.35)";
const FAINT_PINK = "rgba(244, 114, 182, 0.55)";

type ErlenmeyerFlaskProps = {
  totalLiquidVolumeML: number;
  pinkProgress: number; // 0 = colorless, 1 = fully faint pink (phenolphthalein endpoint)
  isPlaying: boolean;
  resetEpoch: number;
};

// Conical flask on a stir plate. Liquid level and color are both
// state-driven: level tracks the real combined acid + titrant volume, color
// fades toward pink as pH crosses the phenolphthalein threshold (see
// titrationMath.ts) — neither is a hardcoded/pre-baked animation.
export function ErlenmeyerFlask({ totalLiquidVolumeML, pinkProgress, isPlaying, resetEpoch }: ErlenmeyerFlaskProps) {
  const fillToY = (fraction: number) => LIQUID_TOP_EMPTY_Y - fraction * (LIQUID_TOP_EMPTY_Y - LIQUID_TOP_FULL_Y);

  const liquidTopY = useSharedValue(fillToY(flaskFillFraction(totalLiquidVolumeML)));
  const colorProgress = useSharedValue(pinkProgress);
  const swirlPhase = useSharedValue(0);

  useEffect(() => {
    liquidTopY.value = withTiming(fillToY(flaskFillFraction(totalLiquidVolumeML)), { duration: 250 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalLiquidVolumeML]);

  useEffect(() => {
    colorProgress.value = withTiming(pinkProgress, { duration: 400 });
  }, [pinkProgress, colorProgress]);

  const runSwirl = () => {
    swirlPhase.value = withRepeat(withTiming(1, { duration: 1400, easing: Easing.inOut(Easing.sin) }), -1, true);
  };

  useEffect(() => {
    if (isPlaying) runSwirl();
    else cancelAnimation(swirlPhase);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  // Reset snaps the swirl/drop clock back to its start rather than freezing
  // it mid-cycle, same convention as OnionCellGrid's driftPhase reset.
  useEffect(() => {
    cancelAnimation(swirlPhase);
    swirlPhase.value = 0;
    if (isPlaying) runSwirl();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetEpoch]);

  const liquidProps = useAnimatedProps(() => ({
    y: liquidTopY.value,
    height: Math.max(0, FLASK_BASE_Y + 4 - liquidTopY.value),
    fill: interpolateColor(colorProgress.value, [0, 1], [COLORLESS, FAINT_PINK]),
  }));

  const swirlProps = useAnimatedProps(() => ({
    rx: 12 + Math.sin(swirlPhase.value * Math.PI * 2) * 3,
  }));

  const dropletProps = useAnimatedProps(() => {
    const t = swirlPhase.value;
    return {
      cy: DROPPER_TIP_Y + t * (FLASK_NECK_BOTTOM_Y - DROPPER_TIP_Y),
      opacity: isPlaying ? 0.9 - t * 0.7 : 0,
    };
  });

  return (
    <G>
      <Defs>
        <ClipPath id="flaskLiquidClip">
          <Path d={FLASK_OUTLINE_D} />
        </ClipPath>
      </Defs>

      {/* stir plate */}
      <Rect
        x={BASE_LEFT - 20}
        y={STIR_PLATE_Y}
        width={FLASK_BASE_HALF_WIDTH * 2 + 40}
        height={STIR_PLATE_HEIGHT}
        rx={6}
        fill="#FFFFFF"
        stroke="#E5E7EB"
        strokeWidth={1}
      />

      {/* dropper tip connecting the burette's stopcock to the flask mouth —
          only spans that gap, so it doesn't draw over the burette tube above it */}
      <Rect
        x={BURETTE_CENTER_X - 1.5}
        y={STOPCOCK_BOTTOM_Y}
        width={3}
        height={FLASK_NECK_TOP_Y - STOPCOCK_BOTTOM_Y}
        fill="#C7CCDA"
      />

      {/* falling titrant droplet, only visible while actively dispensing */}
      <AnimatedCircle cx={BURETTE_CENTER_X} r={2} fill="#8B5CF6" animatedProps={dropletProps} />

      {/* flask glass outline */}
      <Path d={FLASK_OUTLINE_D} fill="#FFFFFF" fillOpacity={0.5} stroke="#C7CCDA" strokeWidth={1.5} />

      {/* liquid, clipped to the flask's silhouette */}
      <AnimatedRect
        x={BASE_LEFT - 10}
        width={BASE_RIGHT - BASE_LEFT + 20}
        clipPath="url(#flaskLiquidClip)"
        animatedProps={liquidProps}
      />

      {/* subtle swirl ripple on the liquid surface while playing */}
      <AnimatedEllipse
        cx={BURETTE_CENTER_X}
        cy={FLASK_BASE_Y - 20}
        ry={4}
        fill="#FFFFFF"
        opacity={0.25}
        animatedProps={swirlProps}
      />

      <Ellipse
        cx={BURETTE_CENTER_X}
        cy={FLASK_NECK_TOP_Y}
        rx={FLASK_NECK_HALF_WIDTH}
        ry={2}
        fill="none"
        stroke="#C7CCDA"
        strokeWidth={1.5}
      />
    </G>
  );
}
