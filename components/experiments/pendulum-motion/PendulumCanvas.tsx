import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg, {
  Circle,
  Defs,
  Line,
  Path,
  RadialGradient,
  Rect,
  Stop,
} from "react-native-svg";

import { neutralColors, primaryColors } from "@/constants/theme/colors";
import {
  SPEED_OPTIONS,
  swingExtremes,
  type SpeedOption,
} from "@/data/physics/mechanics/pendulum-motion";
import type { PendulumFrame } from "./usePendulumSimulation";

const VIEW_W = 340;
const VIEW_H = 360;
const PIVOT_PX = { x: VIEW_W / 2, y: 46 };
const PX_PER_METER = 120;

function toPx(meters: { x: number; y: number }) {
  return { x: PIVOT_PX.x + meters.x * PX_PER_METER, y: PIVOT_PX.y + meters.y * PX_PER_METER };
}

function bobRadiusPx(mass: number) {
  return Math.min(24, Math.max(10, 10 + mass * 2));
}

type PendulumCanvasProps = {
  length: number;
  mass: number;
  frame: PendulumFrame;
  isPlaying: boolean;
  speed: SpeedOption;
  onTogglePlay: () => void;
  onReset: () => void;
  onSpeedChange: (speed: SpeedOption) => void;
  onExpand?: () => void;
  height?: number;
};

export function PendulumCanvas({
  length,
  mass,
  frame,
  isPlaying,
  speed,
  onTogglePlay,
  onReset,
  onSpeedChange,
  onExpand,
  height = VIEW_H,
}: PendulumCanvasProps) {
  const [speedMenuOpen, setSpeedMenuOpen] = useState(false);

  const extremes = swingExtremes(length);
  const leftPx = toPx(extremes.left);
  const rightPx = toPx(extremes.right);
  const bobPx = toPx({ x: frame.bobX, y: frame.bobY });
  const radius = bobRadiusPx(mass);

  const arcPath = `M ${leftPx.x} ${leftPx.y} A ${length * PX_PER_METER} ${
    length * PX_PER_METER
  } 0 0 1 ${rightPx.x} ${rightPx.y}`;

  return (
    <View
      className="overflow-hidden rounded-[24px]"
      style={{ backgroundColor: "#EFEBFF", height }}
    >
      <Svg width="100%" height="100%" viewBox={`0 0 ${VIEW_W} ${height}`}>
        <Defs>
          <RadialGradient id="bobGradient" cx="35%" cy="30%" r="70%">
            <Stop offset="0%" stopColor="#A78BFA" />
            <Stop offset="100%" stopColor={primaryColors.purple} />
          </RadialGradient>
        </Defs>

        {/* Dashed swing boundary */}
        <Line
          x1={PIVOT_PX.x}
          y1={PIVOT_PX.y}
          x2={leftPx.x}
          y2={leftPx.y}
          stroke={neutralColors.textSecondary}
          strokeWidth={1.5}
          strokeDasharray="4,4"
          opacity={0.5}
        />
        <Line
          x1={PIVOT_PX.x}
          y1={PIVOT_PX.y}
          x2={rightPx.x}
          y2={rightPx.y}
          stroke={neutralColors.textSecondary}
          strokeWidth={1.5}
          strokeDasharray="4,4"
          opacity={0.5}
        />
        <Path
          d={arcPath}
          stroke={neutralColors.textSecondary}
          strokeWidth={1.5}
          strokeDasharray="4,4"
          opacity={0.5}
          fill="none"
        />

        {/* Ghost bobs at the extremes */}
        <Circle cx={leftPx.x} cy={leftPx.y} r={radius * 0.7} fill="#FFFFFF" opacity={0.6} />
        <Circle cx={rightPx.x} cy={rightPx.y} r={radius * 0.7} fill="#FFFFFF" opacity={0.6} />

        {/* String */}
        <Line
          x1={PIVOT_PX.x}
          y1={PIVOT_PX.y}
          x2={bobPx.x}
          y2={bobPx.y}
          stroke="#4C3B8C"
          strokeWidth={2}
        />

        {/* Pivot bar */}
        <Rect
          x={PIVOT_PX.x - 100}
          y={PIVOT_PX.y - 7}
          width={200}
          height={14}
          rx={7}
          fill={primaryColors.purple}
        />
        <Circle cx={PIVOT_PX.x} cy={PIVOT_PX.y} r={5} fill="#FFFFFF" />

        {/* Bob */}
        <Circle cx={bobPx.x} cy={bobPx.y} r={radius} fill="url(#bobGradient)" />
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
