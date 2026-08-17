import { Circle } from "react-native-svg";
import Animated, { useAnimatedProps, type SharedValue } from "react-native-reanimated";

import type { OnionCellGranule } from "./onionCellData";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const DRIFT_AMPLITUDE_PX = 2.2;

// Isolated on purpose: this is the one piece that a future matter.js-based
// Brownian-motion upgrade would replace — everything else (grid shape,
// nucleus, walls) is static geometry that a physics engine wouldn't touch.
type GranuleProps = {
  granule: OnionCellGranule;
  driftPhase: SharedValue<number>;
  color: string;
};

export function Granule({ granule, driftPhase, color }: GranuleProps) {
  // Distinct per-granule frequency/phase/direction so dots sharing one clock
  // still read as independently wandering rather than moving in lockstep.
  const freq = 0.7 + (granule.seed % 1) * 0.6;
  const phaseOffset = (granule.seed * 2.7) % (Math.PI * 2);
  const angle = (granule.seed * 5.1) % (Math.PI * 2);

  const animatedProps = useAnimatedProps(() => {
    const t = driftPhase.value * Math.PI * 2 * freq + phaseOffset;
    return {
      cx: granule.baseX + Math.cos(angle) * Math.sin(t) * DRIFT_AMPLITUDE_PX,
      cy: granule.baseY + Math.sin(angle) * Math.sin(t * 0.85) * DRIFT_AMPLITUDE_PX,
    };
  });

  return <AnimatedCircle animatedProps={animatedProps} r={1.6} fill={color} opacity={0.75} />;
}
