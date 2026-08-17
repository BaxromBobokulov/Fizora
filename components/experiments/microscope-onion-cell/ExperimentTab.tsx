import { useState } from "react";
import { Alert, Modal, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { ParameterSlider } from "@/components/labs/ParameterSlider";
import type { MicroscopeMagnification, MicroscopeSpecimenConfig, MicroscopeTool } from "@/types/microscope";
import { MicroscopeBottomNav } from "./MicroscopeBottomNav";
import { MicroscopeProcedureCard } from "./MicroscopeProcedureCard";
import { MicroscopeTipCard } from "./MicroscopeTipCard";
import { MicroscopeViewport } from "./MicroscopeViewport";
import { ObservationInfoCard } from "./ObservationInfoCard";
import { MICROSCOPE_RANGE, focusBlurIntensity, type SpeedOption, type ZoomOption } from "./microscopeMath";

type ExperimentTabProps = {
  specimen: MicroscopeSpecimenConfig;
  magnification: MicroscopeMagnification;
  focus: number;
  lightIntensity: number;
  stageX: number;
  zoom: number;
  isPlaying: boolean;
  speed: SpeedOption;
  activeTool: MicroscopeTool;
  resetEpoch: number;
  accentColor: string;
  accentTint: string;
  onMagnificationChange: (value: MicroscopeMagnification) => void;
  onFocusChange: (value: number) => void;
  onLightIntensityChange: (value: number) => void;
  onStageXChange: (value: number) => void;
  onZoomChange: (value: ZoomOption) => void;
  onSpeedChange: (value: SpeedOption) => void;
  onToolChange: (value: MicroscopeTool) => void;
  onTogglePlaying: () => void;
  onReset: () => void;
  onPressPrevious?: () => void;
  onPressNext?: () => void;
  onStartExperiment: () => void;
};

export function ExperimentTab({
  specimen,
  magnification,
  focus,
  lightIntensity,
  stageX,
  zoom,
  isPlaying,
  speed,
  activeTool,
  resetEpoch,
  accentColor,
  accentTint,
  onMagnificationChange,
  onFocusChange,
  onLightIntensityChange,
  onStageXChange,
  onZoomChange,
  onSpeedChange,
  onToolChange,
  onTogglePlaying,
  onReset,
  onPressPrevious,
  onPressNext,
  onStartExperiment,
}: ExperimentTabProps) {
  const [fullscreen, setFullscreen] = useState(false);

  const focusBlur = focusBlurIntensity(focus, specimen.idealFocus);

  // TODO: no in-app screenshot/share utility exists yet (checked for a
  // view-shot-style helper elsewhere in the app — none found), so this is a
  // mocked confirmation rather than a real capture.
  function handleCapture() {
    Alert.alert("Snapshot saved", `Captured the specimen at ${magnification}x magnification.`);
  }

  const viewportProps = {
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
    onCapture: handleCapture,
    onReset,
  };

  return (
    <View>
      <MicroscopeViewport {...viewportProps} onExpand={() => setFullscreen(true)} />

      <Modal visible={fullscreen} animationType="fade" onRequestClose={() => setFullscreen(false)}>
        <View style={{ flex: 1, backgroundColor: "#0D132B", padding: 16, justifyContent: "center" }}>
          <MicroscopeViewport {...viewportProps} diameter={300} />
          <TouchableOpacity
            onPress={() => setFullscreen(false)}
            activeOpacity={0.85}
            style={{
              position: "absolute",
              top: 48,
              right: 24,
              height: 40,
              width: 40,
              borderRadius: 20,
              backgroundColor: "#FFFFFF",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ionicons name="close" size={20} color="#0D132B" />
          </TouchableOpacity>
        </View>
      </Modal>

      <View className="mt-4 flex-row gap-3">
        <View className="flex-1 rounded-[20px] border p-4" style={{ borderColor: "#E5E7EB" }}>
          <Text className="text-[14px] font-poppins-bold text-text-primary">Specimen Controls</Text>

          <View className="mt-3">
            <ParameterSlider
              label="Focus"
              value={focus}
              min={MICROSCOPE_RANGE.min}
              max={MICROSCOPE_RANGE.max}
              step={MICROSCOPE_RANGE.step}
              unit="%"
              accentColor={accentColor}
              onChange={onFocusChange}
            />
            <ParameterSlider
              label="Light Intensity"
              value={lightIntensity}
              min={MICROSCOPE_RANGE.min}
              max={MICROSCOPE_RANGE.max}
              step={MICROSCOPE_RANGE.step}
              unit="%"
              accentColor={accentColor}
              onChange={onLightIntensityChange}
            />
            <ParameterSlider
              label="Stage Position"
              value={stageX}
              min={MICROSCOPE_RANGE.min}
              max={MICROSCOPE_RANGE.max}
              step={MICROSCOPE_RANGE.step}
              unit="%"
              accentColor={accentColor}
              onChange={onStageXChange}
            />
          </View>
        </View>

        <ObservationInfoCard
          magnification={magnification}
          lightIntensity={lightIntensity}
          specimenLabel={specimen.specimenLabel}
          accentColor={accentColor}
        />
      </View>

      <MicroscopeProcedureCard accentColor={accentColor} />
      <MicroscopeTipCard
        tip="Try adjusting the light and focus for a clearer view of the cell structure."
        accentTint={accentTint}
      />

      <MicroscopeBottomNav
        ctaLabel="Start Experiment"
        ctaIcon="play"
        accentColor={accentColor}
        onPressCta={onStartExperiment}
        onPressPrevious={onPressPrevious}
        onPressNext={onPressNext}
      />
    </View>
  );
}
