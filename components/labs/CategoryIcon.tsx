import { Ionicons } from "@expo/vector-icons";
import Svg, { Circle, Line, Path } from "react-native-svg";

import type { LabTopicId } from "@/types/lab";

export type CategoryIconTopic = "all" | LabTopicId;

type CategoryIconProps = {
  topic: CategoryIconTopic;
  size: number;
  color: string;
};

export function CategoryIcon({ topic, size, color }: CategoryIconProps) {
  switch (topic) {
    case "all":
      return <Ionicons name="grid" size={size} color={color} />;
    case "electricity":
      return <Ionicons name="flash" size={size} color={color} />;
    case "mechanics":
      return <PendulumIcon size={size} color={color} />;
    case "waves":
      return <WaveIcon size={size} color={color} />;
    case "optics":
      return <LensIcon size={size} color={color} />;
  }
}

// Plumb-bob / pendulum: mount bar, string, weighted ball — echoes the
// Newton's-cradle/pendulum labs under Mechanics.
function PendulumIcon({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Line x1="9" y1="2.5" x2="9" y2="2.5" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <Circle cx="9" cy="2.5" r="1.4" fill={color} />
      <Line x1="9" y1="4" x2="9" y2="15" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <Circle cx="9" cy="19" r="4" fill={color} />
    </Svg>
  );
}

// Two rounded humps with dots at each peak, sitting on a baseline —
// echoes an oscilloscope-style wave trace for Waves.
function WaveIcon({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M2 18 H4 Q6 6 9 15 Q11 21 13 15 Q16 6 18 18 H22"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Circle cx="9" cy="15" r="1.3" fill={color} />
      <Circle cx="13" cy="15" r="1.3" fill={color} />
    </Svg>
  );
}

// Rounded "U" bracket with a ball at the open end — echoes the
// horseshoe-shaped optics/lens glyph used in the design.
function LensIcon({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M7 4 V12 A5 5 0 0 0 17 12 V6"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      <Circle cx="17" cy="4.5" r="2" fill={color} />
    </Svg>
  );
}