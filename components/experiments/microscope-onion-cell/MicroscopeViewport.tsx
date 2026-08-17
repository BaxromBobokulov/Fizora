import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { useAnimatedStyle, withTiming } from "react-native-reanimated";

import { neutralColors } from "@/constants/theme/colors";
import type { MicroscopeMagnification, MicroscopeTool } from "@/types/microscope";
import { AnnotationOverlay } from "./AnnotationOverlay";
import { SpecimenView } from "./SpecimenView";
import {
  MAGNIFICATION_OPTIONS,
  MICROSCOPE_RANGE,
  SPEED_OPTIONS,
  ZOOM_OPTIONS,
  type SpeedOption,
  type ZoomOption,
} from "./microscopeMath";

const VIEWPORT_DIAMETER = 240;

type MicroscopeViewportProps = {
  magnification: MicroscopeMagnification;
  focusBlur: number;
  lightIntensity: number;
  stageX: number;
  zoom: number;
  isPlaying: boolean;
  speed: SpeedOption;
  resetEpoch: number;
  accentColor: string;
  accentTint: string;
  activeTool: MicroscopeTool;
  onMagnificationChange: (value: MicroscopeMagnification) => void;
  onLightIntensityChange: (value: number) => void;
  onTogglePlaying: () => void;
  onSpeedChange: (value: SpeedOption) => void;
  onZoomChange: (value: ZoomOption) => void;
  onToolChange: (tool: MicroscopeTool) => void;
  onCapture: () => void;
  onReset: () => void;
  onExpand?: () => void;
  diameter?: number;
};

export function MicroscopeViewport({
  magnification,
  focusBlur,
  lightIntensity,
  stageX,
  zoom,
  isPlaying,
  speed,
  resetEpoch,
  accentColor,
  accentTint,
  activeTool,
  onMagnificationChange,
  onLightIntensityChange,
  onTogglePlaying,
  onSpeedChange,
  onZoomChange,
  onToolChange,
  onCapture,
  onReset,
  onExpand,
  diameter = VIEWPORT_DIAMETER,
}: MicroscopeViewportProps) {
  const [speedMenuOpen, setSpeedMenuOpen] = useState(false);
  const [zoomMenuOpen, setZoomMenuOpen] = useState(false);

  const zoomStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(zoom, { duration: 200 }) }],
  }));

  return (
    <View
      className="overflow-hidden rounded-[24px] px-4 pb-4 pt-14"
      style={{ backgroundColor: accentTint }}
    >
      {/* Top-left toolbar: cursor / pencil / camera */}
      <View className="absolute left-3 top-3 gap-2">
        <ToolButton
          icon="navigate-outline"
          active={activeTool === "cursor"}
          accentColor={accentColor}
          onPress={() => onToolChange("cursor")}
        />
        <ToolButton
          icon="pencil-outline"
          active={activeTool === "pencil"}
          accentColor={accentColor}
          onPress={() => onToolChange("pencil")}
        />
        <ToolButton
          icon="camera-outline"
          active={activeTool === "camera"}
          accentColor={accentColor}
          onPress={() => {
            onToolChange("camera");
            onCapture();
          }}
        />
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

      {/* Right column: magnification buttons, vertically centered on the circle */}
      <View className="absolute bottom-4 right-3 top-14 items-center justify-center gap-2">
        {MAGNIFICATION_OPTIONS.map((option) => {
          const active = option === magnification;
          return (
            <TouchableOpacity
              key={option}
              onPress={() => onMagnificationChange(option)}
              activeOpacity={0.8}
              className="items-center rounded-[14px] px-4 py-2.5"
              style={{ backgroundColor: active ? accentColor : "#FFFFFF" }}
            >
              <Text
                className="text-[13px] font-poppins-bold"
                style={{ color: active ? "#FFFFFF" : neutralColors.textPrimary }}
              >
                {option}x
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Circular viewport */}
      <View className="items-center justify-center pr-16">
        <Animated.View
          style={[
            zoomStyle,
            {
              padding: 4,
              borderRadius: diameter / 2 + 4,
              backgroundColor: "#FFFFFF",
            },
          ]}
        >
          <View style={{ width: diameter, height: diameter }}>
            <SpecimenView
              magnification={magnification}
              diameter={diameter}
              focusBlur={focusBlur}
              lightIntensity={lightIntensity}
              stageX={stageX}
              isPlaying={isPlaying}
              speed={speed}
              resetEpoch={resetEpoch}
              accentColor={accentColor}
            />
            <AnnotationOverlay diameter={diameter} active={activeTool === "pencil"} color={accentColor} />
          </View>
        </Animated.View>
      </View>

      {/* Quick light-intensity dial under the viewport */}
      <View className="mt-4 items-center pr-16">
        <Ionicons name="sunny-outline" size={16} color={neutralColors.textSecondary} />
        <View className="mt-2 w-full max-w-[220px] flex-row items-center gap-2">
          <StepButton
            symbol="−"
            onPress={() => onLightIntensityChange(Math.max(MICROSCOPE_RANGE.min, lightIntensity - 5))}
          />
          <View className="h-1.5 flex-1 overflow-hidden rounded-full" style={{ backgroundColor: neutralColors.border }}>
            <View
              className="h-1.5 rounded-full"
              style={{ width: `${lightIntensity}%`, backgroundColor: accentColor }}
            />
          </View>
          <StepButton
            symbol="+"
            onPress={() => onLightIntensityChange(Math.min(MICROSCOPE_RANGE.max, lightIntensity + 5))}
          />
        </View>
      </View>

      {/* Bottom-left play/speed */}
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
              <View className="absolute bottom-11 left-0 rounded-[14px] bg-white p-1 shadow-sm" style={{ zIndex: 20 }}>
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

        <View className="flex-row items-center gap-2">
          <View>
            <TouchableOpacity
              onPress={() => setZoomMenuOpen((open) => !open)}
              activeOpacity={0.85}
              className="flex-row items-center gap-1 rounded-full bg-white px-3 py-2.5"
            >
              <Text className="text-[12px] font-poppins-semibold text-text-primary">{zoom.toFixed(1)}x</Text>
              <Ionicons name="chevron-down" size={13} color={neutralColors.textSecondary} />
            </TouchableOpacity>

            {zoomMenuOpen && (
              <View className="absolute bottom-11 right-0 rounded-[14px] bg-white p-1 shadow-sm" style={{ zIndex: 20 }}>
                {ZOOM_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => {
                      onZoomChange(option);
                      setZoomMenuOpen(false);
                    }}
                    activeOpacity={0.7}
                    className="rounded-[10px] px-4 py-2"
                    style={{ backgroundColor: option === zoom ? neutralColors.surface : "transparent" }}
                  >
                    <Text className="text-[12px] font-poppins-medium text-text-primary">{option.toFixed(1)}x</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
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

function StepButton({ symbol, onPress }: { symbol: string; onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="h-7 w-7 items-center justify-center rounded-full bg-white"
    >
      <Text className="text-[15px] font-poppins-bold text-text-secondary">{symbol}</Text>
    </TouchableOpacity>
  );
}
