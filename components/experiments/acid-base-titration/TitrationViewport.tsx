import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Svg from "react-native-svg";

import { neutralColors } from "@/constants/theme/colors";
import type { TitrationTool } from "@/store/useTitrationStore";
import { BuretteReadingPanel } from "./BuretteReadingPanel";
import { Burette } from "./Burette";
import { ErlenmeyerFlask } from "./ErlenmeyerFlask";
import { RingStand } from "./RingStand";
import { SPEED_OPTIONS, type SpeedOption } from "./titrationMath";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./titrationLayout";

type TitrationViewportProps = {
  buretteVolumeML: number;
  totalLiquidVolumeML: number;
  pinkProgress: number;
  isPlaying: boolean;
  speed: SpeedOption;
  resetEpoch: number;
  activeTool: TitrationTool;
  accentColor: string;
  accentTint: string;
  onTogglePlaying: () => void;
  onSpeedChange: (value: SpeedOption) => void;
  onToolChange: (value: TitrationTool) => void;
  onReset: () => void;
  onExpand?: () => void;
  svgWidth?: number;
};

export function TitrationViewport({
  buretteVolumeML,
  totalLiquidVolumeML,
  pinkProgress,
  isPlaying,
  speed,
  resetEpoch,
  activeTool,
  accentColor,
  accentTint,
  onTogglePlaying,
  onSpeedChange,
  onToolChange,
  onReset,
  onExpand,
  svgWidth = 170,
}: TitrationViewportProps) {
  const [speedMenuOpen, setSpeedMenuOpen] = useState(false);
  const svgHeight = (svgWidth / CANVAS_WIDTH) * CANVAS_HEIGHT;

  return (
    <View className="overflow-hidden rounded-[24px] px-4 pb-4 pt-14" style={{ backgroundColor: accentTint }}>
      {/* Top-left toolbar: select / dropper / ruler */}
      <View className="absolute left-3 top-3 gap-2" style={{ zIndex: 10 }}>
        <ToolButton
          icon="navigate-outline"
          active={activeTool === "cursor"}
          accentColor={accentColor}
          onPress={() => onToolChange("cursor")}
        />
        <ToolButton
          icon="water-outline"
          active={activeTool === "dropper"}
          accentColor={accentColor}
          // TODO: dropper/pipette tool has no defined interaction yet — out of
          // scope for this task, just a visual toggle for now.
          onPress={() => onToolChange("dropper")}
        />
        <ToolButton
          icon="resize-outline"
          active={activeTool === "ruler"}
          accentColor={accentColor}
          // TODO: ruler/measuring tool has no defined interaction yet — out of
          // scope for this task, just a visual toggle for now.
          onPress={() => onToolChange("ruler")}
        />
      </View>

      {/* Top-right reset */}
      <TouchableOpacity
        onPress={onReset}
        activeOpacity={0.8}
        className="absolute right-3 top-3 flex-row items-center gap-1.5 rounded-full bg-white px-3 py-2"
        style={{ zIndex: 10 }}
      >
        <Ionicons name="refresh" size={15} color={neutralColors.textPrimary} />
        <Text className="text-[12px] font-poppins-semibold text-text-primary">Reset</Text>
      </TouchableOpacity>

      {/* Apparatus + burette reading panel */}
      <View className="flex-row items-center justify-center gap-4">
        <Svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${CANVAS_WIDTH} ${CANVAS_HEIGHT}`}>
          <RingStand accentColor={accentColor} />
          <Burette buretteVolumeML={buretteVolumeML} />
          <ErlenmeyerFlask
            totalLiquidVolumeML={totalLiquidVolumeML}
            pinkProgress={pinkProgress}
            isPlaying={isPlaying}
            resetEpoch={resetEpoch}
          />
        </Svg>

        <BuretteReadingPanel buretteVolumeML={buretteVolumeML} accentColor={accentColor} />
      </View>

      {/* Bottom row: play/speed + fullscreen */}
      <View className="mt-4 flex-row items-center justify-between">
        <View className="flex-row items-center gap-2">
          <TouchableOpacity
            onPress={onTogglePlaying}
            activeOpacity={0.85}
            className="h-10 w-10 items-center justify-center rounded-full bg-white"
          >
            <Ionicons name={isPlaying ? "pause" : "play"} size={17} color={accentColor} />
          </TouchableOpacity>

          <View>
            <TouchableOpacity
              onPress={() => setSpeedMenuOpen((open) => !open)}
              activeOpacity={0.85}
              className="flex-row items-center gap-1 rounded-full bg-white px-3 py-2.5"
            >
              <Text className="text-[12px] font-poppins-semibold text-text-primary">{speed.toFixed(1)}x</Text>
              <Ionicons name="chevron-down" size={13} color={neutralColors.textSecondary} />
            </TouchableOpacity>

            {speedMenuOpen && (
              <View
                className="absolute bottom-11 left-0 rounded-[14px] bg-white p-1 shadow-sm"
                style={{ zIndex: 20 }}
              >
                {SPEED_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => {
                      onSpeedChange(option);
                      setSpeedMenuOpen(false);
                    }}
                    activeOpacity={0.7}
                    className="rounded-[10px] px-4 py-2"
                    style={{ backgroundColor: option === speed ? neutralColors.surface : "transparent" }}
                  >
                    <Text className="text-[12px] font-poppins-medium text-text-primary">{option.toFixed(1)}x</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>

        {onExpand && (
          <TouchableOpacity
            onPress={onExpand}
            activeOpacity={0.85}
            className="h-10 w-10 items-center justify-center rounded-full bg-white"
          >
            <Ionicons name="expand" size={16} color={neutralColors.textPrimary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

function ToolButton({
  icon,
  active,
  accentColor,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  active: boolean;
  accentColor: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      className="h-9 w-9 items-center justify-center rounded-[12px]"
      style={{ backgroundColor: active ? accentColor : "#FFFFFF" }}
    >
      <Ionicons name={icon} size={16} color={active ? "#FFFFFF" : neutralColors.textSecondary} />
    </TouchableOpacity>
  );
}
