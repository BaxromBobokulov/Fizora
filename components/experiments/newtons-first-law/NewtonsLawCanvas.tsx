import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg, {
  Defs,
  Line,
  LinearGradient,
  Polygon,
  RadialGradient,
  Rect,
  Stop,
} from "react-native-svg";

import { neutralColors, primaryColors } from "@/constants/theme/colors";
import {
  GROUND_HALF_HEIGHT,
  PUCK_RADIUS,
  SPEED_OPTIONS,
  TRACK_LENGTH,
  type SpeedOption,
} from "@/data/physics/mechanics/newtons-first-law";
import type { NewtonsLawFrame } from "./useNewtonsLawSimulation";

const VIEW_W = 340;
const VIEW_H = 300;
const TRACK_MARGIN_PX = 30;
const PX_PER_METER = (VIEW_W - TRACK_MARGIN_PX * 2) / TRACK_LENGTH;
// Leaves room below the track for the control row, and above it for the
// velocity arrow — scales with `height` so the fullscreen view (560px) isn't
// top-heavy the way a fixed origin would be.
const CONTROLS_CLEARANCE_PX = 110;
const ARROW_PX_PER_MPS = 9;
const ARROW_MAX_PX = 90;

function toPx(meters: { x: number; y: number }, originY: number) {
  return { x: TRACK_MARGIN_PX + meters.x * PX_PER_METER, y: originY + meters.y * PX_PER_METER };
}

function puckRadiusPx(mass: number) {
  return Math.min(24, Math.max(12, 12 + mass * 2));
}

type NewtonsLawCanvasProps = {
  mass: number;
  frame: NewtonsLawFrame;
  frictionless: boolean;
  isPlaying: boolean;
  speed: SpeedOption;
  onTogglePlay: () => void;
  onReset: () => void;
  onSpeedChange: (speed: SpeedOption) => void;
  onExpand?: () => void;
  height?: number;
};

export function NewtonsLawCanvas({
  mass,
  frame,
  frictionless,
  isPlaying,
  speed,
  onTogglePlay,
  onReset,
  onSpeedChange,
  onExpand,
  height = VIEW_H,
}: NewtonsLawCanvasProps) {
  const [speedMenuOpen, setSpeedMenuOpen] = useState(false);

  const radius = puckRadiusPx(mass);
  const originY = height - CONTROLS_CLEARANCE_PX;
  const groundTopPx = toPx({ x: 0, y: PUCK_RADIUS }, originY).y;
  const groundHeightPx = GROUND_HALF_HEIGHT * 2 * PX_PER_METER;
  const trackStartPx = toPx({ x: 0, y: 0 }, originY);
  const puckPx = toPx({ x: frame.puckX, y: frame.puckY }, originY);

  const arrowLength = Math.min(ARROW_MAX_PX, frame.velocity * ARROW_PX_PER_MPS);
  const arrowY = puckPx.y - radius - 14;
  const surfaceColor = frictionless ? primaryColors.blue : primaryColors.orange;

  return (
    <View
      className="overflow-hidden rounded-[24px]"
      style={{ backgroundColor: "#EFEBFF", height }}
    >
      <Svg width="100%" height="100%" viewBox={`0 0 ${VIEW_W} ${height}`}>
        <Defs>
          <RadialGradient id="puckGradient" cx="35%" cy="30%" r="70%">
            <Stop offset="0%" stopColor="#A78BFA" />
            <Stop offset="100%" stopColor={primaryColors.purple} />
          </RadialGradient>
          <LinearGradient id="trackGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor={surfaceColor} stopOpacity={0.35} />
            <Stop offset="100%" stopColor={surfaceColor} stopOpacity={0.6} />
          </LinearGradient>
        </Defs>

        {/* Track surface */}
        <Rect
          x={trackStartPx.x}
          y={groundTopPx}
          width={TRACK_LENGTH * PX_PER_METER}
          height={groundHeightPx}
          rx={10}
          fill="url(#trackGradient)"
          stroke={surfaceColor}
          strokeWidth={1.5}
        />

        {/* Velocity vector arrow */}
        {frame.velocity > 0.05 && (
          <>
            <Line
              x1={puckPx.x}
              y1={arrowY}
              x2={puckPx.x + arrowLength}
              y2={arrowY}
              stroke={primaryColors.purple}
              strokeWidth={2.5}
            />
            <Polygon
              points={`${puckPx.x + arrowLength},${arrowY - 5} ${puckPx.x + arrowLength + 9},${arrowY} ${puckPx.x + arrowLength},${arrowY + 5}`}
              fill={primaryColors.purple}
            />
          </>
        )}

        {/* Puck */}
        <Rect
          x={puckPx.x - radius}
          y={puckPx.y - radius}
          width={radius * 2}
          height={radius * 2}
          rx={radius}
          fill="url(#puckGradient)"
        />
      </Svg>

      {/* Top-left placeholder tools */}
      <View className="absolute left-3 top-3 gap-2">
        <ToolButton icon="navigate-outline" />
        <ToolButton icon="resize-outline" />
      </View>

      {/* Top-right reset */}
      <TouchableOpacity
        onPress={onReset}
        activeOpacity={0.8}
        className="absolute right-3 top-3 flex-row items-center gap-1.5 rounded-full bg-white px-3 py-2"
      >
        <Ionicons name="refresh" size={15} color={neutralColors.textPrimary} />
        <Text className="text-[12px] font-poppins-semibold text-text-primary">Reset</Text>
      </TouchableOpacity>

      {/* Bottom-left play/speed */}
      <View className="absolute bottom-3 left-3 flex-row items-center gap-2">
        <TouchableOpacity
          onPress={onTogglePlay}
          activeOpacity={0.85}
          className="h-10 w-10 items-center justify-center rounded-full bg-white"
        >
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={17}
            color={primaryColors.purple}
          />
        </TouchableOpacity>

        <View>
          <TouchableOpacity
            onPress={() => setSpeedMenuOpen((open) => !open)}
            activeOpacity={0.85}
            className="flex-row items-center gap-1 rounded-full bg-white px-3 py-2.5"
          >
            <Text className="text-[12px] font-poppins-semibold text-text-primary">
              {speed.toFixed(1)}x
            </Text>
            <Ionicons name="chevron-down" size={13} color={neutralColors.textSecondary} />
          </TouchableOpacity>

          {speedMenuOpen && (
            <View className="absolute bottom-11 left-0 rounded-[14px] bg-white p-1 shadow-sm">
              {SPEED_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => {
                    onSpeedChange(option);
                    setSpeedMenuOpen(false);
                  }}
                  activeOpacity={0.7}
                  className="rounded-[10px] px-4 py-2"
                  style={{
                    backgroundColor: option === speed ? neutralColors.surface : "transparent",
                  }}
                >
                  <Text className="text-[12px] font-poppins-medium text-text-primary">
                    {option.toFixed(1)}x
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      {/* Surface mode badge */}
      <View className="absolute bottom-3 left-0 right-0 items-center">
        <View className="rounded-full px-3 py-2" style={{ backgroundColor: "#FFFFFF" }}>
          <Text className="text-[12px] font-poppins-semibold" style={{ color: surfaceColor }}>
            {frictionless ? "Frictionless" : "With Friction"}
          </Text>
        </View>
      </View>

      {/* Bottom-right expand */}
      {onExpand && (
        <TouchableOpacity
          onPress={onExpand}
          activeOpacity={0.85}
          className="absolute bottom-3 right-3 h-10 w-10 items-center justify-center rounded-full bg-white"
        >
          <Ionicons name="expand" size={16} color={neutralColors.textPrimary} />
        </TouchableOpacity>
      )}
    </View>
  );
}

function ToolButton({ icon }: { icon: keyof typeof Ionicons.glyphMap }) {
  return (
    <View className="h-9 w-9 items-center justify-center rounded-[12px] bg-white">
      <Ionicons name={icon} size={16} color={neutralColors.textSecondary} />
    </View>
  );
}
