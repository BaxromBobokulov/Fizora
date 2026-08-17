import { useEffect, useMemo } from "react";
import { Ellipse, Polygon, Svg } from "react-native-svg";
import { cancelAnimation, Easing, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

import type { MicroscopeMagnification } from "@/types/microscope";
import { Granule } from "./Granule";
import { generateOnionCellGrid } from "./onionCellData";
import type { SpeedOption } from "./microscopeMath";

const WALL_STROKE = "#7A8F5C";
const NUCLEUS_FILL = "#3F5233";
const GRANULE_FILL = "#6B5B3A";

const DRIFT_LOOP_MS = 6000;

type OnionCellGridProps = {
  magnification: MicroscopeMagnification;
  worldSize: number;
  accentColor: string;
  isPlaying: boolean;
  speed: SpeedOption;
  resetEpoch: number;
};

export function OnionCellGrid({
  magnification,
  worldSize,
  accentColor,
  isPlaying,
  speed,
  resetEpoch,
}: OnionCellGridProps) {
  // Slider drags (focus/light/stage) re-render this tree on every tick, but
  // none of that affects cell geometry — only re-generate when the thing
  // that actually changes the layout changes.
  const { cells } = useMemo(() => generateOnionCellGrid(magnification, worldSize), [magnification, worldSize]);
  const cytoplasmFill = `${accentColor}14`;

  // Single shared clock drives every granule's drift (see Granule.tsx) —
  // cheap to animate, and the one thing a future physics-based upgrade
  // would swap out. Ping-pongs 0<->1 forever (reverse=true) rather than
  // repeatedly easing toward a fixed target, which is what actually keeps
  // it moving indefinitely instead of freezing after the first cycle.
  const driftPhase = useSharedValue(0);

  useEffect(() => {
    if (isPlaying) {
      driftPhase.value = withRepeat(
        withTiming(1, { duration: DRIFT_LOOP_MS / speed, easing: Easing.linear }),
        -1,
        true
      );
    } else {
      cancelAnimation(driftPhase);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, speed]);

  // Reset returns the granules to their initial (un-drifted) position rather
  // than just freezing them where they were. Deliberately keyed on
  // resetEpoch alone — isPlaying/speed/driftPhase are read for their current
  // value, not meant to re-trigger this snap-back on every change.
  useEffect(() => {
    cancelAnimation(driftPhase);
    driftPhase.value = 0;
    if (isPlaying) {
      driftPhase.value = withRepeat(
        withTiming(1, { duration: DRIFT_LOOP_MS / speed, easing: Easing.linear }),
        -1,
        true
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetEpoch]);

  return (
    <Svg width={worldSize} height={worldSize}>
      {cells.map((cell) => (
        <Polygon
          key={cell.id}
          points={cell.points}
          fill={cytoplasmFill}
          stroke={WALL_STROKE}
          strokeWidth={cell.detailed ? 1.6 : 1}
          opacity={cell.detailed ? 0.9 : 1}
        />
      ))}

      {/* Faint duplicate outline behind the crisp one, only at the highest
          magnification, to suggest wall thickness/texture. */}
      {cells
        .filter((cell) => cell.detailed)
        .map((cell) => (
          <Polygon
            key={`${cell.id}-texture`}
            points={cell.points}
            fill="none"
            stroke={WALL_STROKE}
            strokeWidth={3}
            opacity={0.18}
          />
        ))}

      {cells
        .filter((cell) => cell.nucleus)
        .map((cell) => (
          <Ellipse
            key={`${cell.id}-nucleus`}
            cx={cell.nucleus!.cx}
            cy={cell.nucleus!.cy}
            rx={cell.nucleus!.rx}
            ry={cell.nucleus!.ry}
            fill={NUCLEUS_FILL}
            opacity={0.8}
          />
        ))}

      {cells.flatMap((cell) =>
        cell.granules.map((granule, index) => (
          <Granule
            key={`${cell.id}-granule-${index}`}
            granule={granule}
            driftPhase={driftPhase}
            color={GRANULE_FILL}
          />
        ))
      )}
    </Svg>
  );
}
