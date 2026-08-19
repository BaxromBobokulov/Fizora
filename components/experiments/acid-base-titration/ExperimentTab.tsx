import { useState } from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { ParameterSlider } from "@/components/labs/ParameterSlider";
import { neutralColors } from "@/constants/theme/colors";
import type { TitrationTool } from "@/store/useTitrationStore";
import { TitrationBottomNav } from "./TitrationBottomNav";
import { TitrationProcedureCard } from "./TitrationProcedureCard";
import { TitrationReadoutCard } from "./TitrationReadoutCard";
import { TitrationTipCard } from "./TitrationTipCard";
import { TitrationViewport } from "./TitrationViewport";
import {
  ACID_CONCENTRATION_RANGE,
  ACID_VOLUME_RANGE,
  INDICATOR_OPTIONS,
  type IndicatorId,
  type SpeedOption,
} from "./titrationMath";

type ExperimentTabProps = {
  acidConcentration: number;
  acidVolume: number;
  buretteVolumeML: number;
  totalLiquidVolumeML: number;
  pinkProgress: number;
  pH: number;
  temperatureC: number;
  endpointReached: boolean;
  indicator: IndicatorId;
  isPlaying: boolean;
  speed: SpeedOption;
  activeTool: TitrationTool;
  resetEpoch: number;
  accentColor: string;
  accentTint: string;
  onAcidConcentrationChange: (value: number) => void;
  onAcidVolumeChange: (value: number) => void;
  onIndicatorChange: (value: IndicatorId) => void;
  onSpeedChange: (value: SpeedOption) => void;
  onToolChange: (value: TitrationTool) => void;
  onTogglePlaying: () => void;
  onReset: () => void;
  onPressPrevious?: () => void;
  onPressNext?: () => void;
  onStartExperiment: () => void;
};

export function ExperimentTab({
  acidConcentration,
  acidVolume,
  buretteVolumeML,
  totalLiquidVolumeML,
  pinkProgress,
  pH,
  temperatureC,
  endpointReached,
  indicator,
  isPlaying,
  speed,
  activeTool,
  resetEpoch,
  accentColor,
  accentTint,
  onAcidConcentrationChange,
  onAcidVolumeChange,
  onIndicatorChange,
  onSpeedChange,
  onToolChange,
  onTogglePlaying,
  onReset,
  onPressPrevious,
  onPressNext,
  onStartExperiment,
}: ExperimentTabProps) {
  const [fullscreen, setFullscreen] = useState(false);
  const [indicatorMenuOpen, setIndicatorMenuOpen] = useState(false);

  const selectedIndicator = INDICATOR_OPTIONS.find((option) => option.id === indicator) ?? INDICATOR_OPTIONS[0];

  const viewportProps = {
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
  };

  return (
    <View>
      <TitrationViewport {...viewportProps} onExpand={() => setFullscreen(true)} />

      <Modal visible={fullscreen} animationType="fade" onRequestClose={() => setFullscreen(false)}>
        <View style={{ flex: 1, backgroundColor: "#0D132B", padding: 16, justifyContent: "center" }}>
          <TitrationViewport {...viewportProps} svgWidth={220} />
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
        <View className="flex-1 rounded-[20px] border p-4" style={{ borderColor: neutralColors.border }}>
          <Text className="text-[14px] font-poppins-bold text-text-primary">Controls</Text>

          <View className="mt-3">
            <ParameterSlider
              label="Acid Concentration (HCl)"
              value={acidConcentration}
              min={ACID_CONCENTRATION_RANGE.min}
              max={ACID_CONCENTRATION_RANGE.max}
              step={ACID_CONCENTRATION_RANGE.step}
              unit="M"
              accentColor={accentColor}
              formatValue={(value) => value.toFixed(3)}
              onChange={onAcidConcentrationChange}
            />
            <ParameterSlider
              label="Acid Volume"
              value={acidVolume}
              min={ACID_VOLUME_RANGE.min}
              max={ACID_VOLUME_RANGE.max}
              step={ACID_VOLUME_RANGE.step}
              unit="mL"
              accentColor={accentColor}
              formatValue={(value) => value.toFixed(2)}
              onChange={onAcidVolumeChange}
            />

            <Text className="text-[13px] font-poppins-semibold text-text-primary">Indicator</Text>
            <View className="mt-2">
              <TouchableOpacity
                onPress={() => setIndicatorMenuOpen((open) => !open)}
                activeOpacity={0.8}
                className="flex-row items-center justify-between rounded-[14px] border px-3 py-3"
                style={{ borderColor: neutralColors.border }}
              >
                <Text className="text-[13px] font-poppins-medium text-text-primary">{selectedIndicator.label}</Text>
                <Ionicons name="chevron-down" size={15} color={neutralColors.textSecondary} />
              </TouchableOpacity>

              {indicatorMenuOpen && (
                <View
                  className="mt-1 overflow-hidden rounded-[14px] border bg-white"
                  style={{ borderColor: neutralColors.border }}
                >
                  {INDICATOR_OPTIONS.map((option) => (
                    <TouchableOpacity
                      key={option.id}
                      onPress={() => {
                        onIndicatorChange(option.id);
                        setIndicatorMenuOpen(false);
                      }}
                      activeOpacity={0.7}
                      className="px-4 py-3"
                      style={{ backgroundColor: option.id === indicator ? neutralColors.surface : "transparent" }}
                    >
                      <Text className="text-[13px] font-poppins-medium text-text-primary">{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>
          </View>
        </View>

        <TitrationReadoutCard
          pH={pH}
          temperatureC={temperatureC}
          endpointReached={endpointReached}
          accentColor={accentColor}
        />
      </View>

      <TitrationProcedureCard accentColor={accentColor} />
      <TitrationTipCard tip="Add the titrant slowly near the endpoint for more accurate results." accentTint={accentTint} />

      <TitrationBottomNav
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
