import { Circle, G, Rect } from "react-native-svg";

import { BURETTE_CENTER_X, CLAMP_Y, STAND_BASE_Y, STAND_POLE_X } from "./titrationLayout";

type RingStandProps = {
  accentColor: string;
};

// Static ring stand + clamp holding the burette in place — nothing here is
// state-driven, it never changes, so it's a plain <G> of shapes.
export function RingStand({ accentColor }: RingStandProps) {
  return (
    <G>
      {/* base */}
      <Rect x={STAND_POLE_X - 34} y={STAND_BASE_Y} width={70} height={10} rx={4} fill="#8A93A6" />
      {/* pole */}
      <Rect x={STAND_POLE_X - 3} y={20} width={6} height={STAND_BASE_Y - 20} rx={3} fill="#9CA3AF" />
      {/* clamp arm reaching from the pole to the burette */}
      <Rect
        x={STAND_POLE_X - 3}
        y={CLAMP_Y}
        width={BURETTE_CENTER_X - STAND_POLE_X + 20}
        height={8}
        rx={4}
        fill="#9CA3AF"
      />
      {/* clamp pads gripping the burette tube */}
      <Rect x={BURETTE_CENTER_X - 22} y={CLAMP_Y - 6} width={10} height={20} rx={3} fill="#6B7280" />
      <Rect x={BURETTE_CENTER_X + 12} y={CLAMP_Y - 6} width={10} height={20} rx={3} fill="#6B7280" />
      <Circle cx={BURETTE_CENTER_X - 17} cy={CLAMP_Y + 4} r={2.5} fill={accentColor} />
      <Circle cx={BURETTE_CENTER_X + 17} cy={CLAMP_Y + 4} r={2.5} fill={accentColor} />
    </G>
  );
}
