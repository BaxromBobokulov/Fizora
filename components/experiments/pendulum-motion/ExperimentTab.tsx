import { Modal, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { ParameterSlider } from "@/components/labs/ParameterSlider";
import {
  PENDULUM_RANGES,
  theoreticalFrequency,
  theoreticalMaxVelocity,
  theoreticalPeriod,
} from "@/data/physics/mechanics/pendulum-motion";
import type { SpeedOption } from "@/data/physics/mechanics/pendulum-motion";
import { BottomNav } from "./BottomNav";
import { GravityPresetRow } from "./GravityPresetRow";
import { PendulumCanvas } from "./PendulumCanvas";
import { ProcedureCard } from "./ProcedureCard";
import { ReadoutPanel } from "./ReadoutPanel";
import { TipCard } from "./TipCard";
import type { PendulumFrame } from "./usePendulumSimulation";

type ExperimentTabProps = {
  length: number;
  mass: number;
  gravity: number;
  speed: SpeedOption;
  isPlaying: boolean;
  frame: PendulumFrame;
  onLengthChange: (value: number) => void;
  onMassChange: (value: number) => void;
  onGravityChange: (value: number) => void;
  onSpeedChange: (value: SpeedOption) => void;
  onTogglePlay: () => void;
  onReset: () => void;
  onPressPrevious?: () => void;
  onPressNext?: () => void;
  onStartExperiment: () => void;
};

export function ExperimentTab({
  length,
  mass,
  gravity,
  speed,
  isPlaying,
  frame,
  onLengthChange,
  onMassChange,
  onGravityChange,
  onSpeedChange,
  onTogglePlay,
  onReset,
  onPressPrevious,
  onPressNext,
  onStartExperiment,
}: ExperimentTabProps) {
  const [fullscreen, setFullscreen] = useState(false);

  const period = theoreticalPeriod(length, gravity);
  const frequency = theoreticalFrequency(period);
  const velocity = isPlaying ? frame.liveVelocity : theoreticalMaxVelocity(length, gravity);

  return (
    <View>
      <PendulumCanvas
        length={length}
        mass={mass}
        frame={frame}
        isPlaying={isPlaying}
        speed={speed}
        onTogglePlay={onTogglePlay}
        onReset={onReset}
        onSpeedChange={onSpeedChange}
        onExpand={() => setFullscreen(true)}
      />

      <Modal visible={fullscreen} animationType="fade" onRequestClose={() => setFullscreen(false)}>
        <View style={{ flex: 1, backgroundColor: "#0D132B", padding: 16, justifyContent: "center" }}>
          <PendulumCanvas
            length={length}
            mass={mass}
            frame={frame}
            isPlaying={isPlaying}
            speed={speed}
            onTogglePlay={onTogglePlay}
            onReset={onReset}
            onSpeedChange={onSpeedChange}
            height={560}
          />
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

      <View className="mt-4 flex-row gap-4">
        <View className="flex-1">
          <ParameterSlider
            label="Length (L)"
            value={length}
            min={PENDULUM_RANGES.length.min}
            max={PENDULUM_RANGES.length.max}
            step={PENDULUM_RANGES.length.step}
            unit="m"
            formatValue={(v) => v.toFixed(2)}
            onChange={onLengthChange}
          />
          <ParameterSlider
            label="Mass (m)"
            value={mass}
            min={PENDULUM_RANGES.mass.min}
            max={PENDULUM_RANGES.mass.max}
            step={PENDULUM_RANGES.mass.step}
            unit="kg"
            formatValue={(v) => v.toFixed(2)}
            onChange={onMassChange}
          />

          <GravityPresetRow gravity={gravity} onSelect={onGravityChange} />
          <ParameterSlider
            label="Gravity (g)"
            value={gravity}
            min={PENDULUM_RANGES.gravity.min}
            max={PENDULUM_RANGES.gravity.max}
            step={PENDULUM_RANGES.gravity.step}
            unit="m/s²"
            formatValue={(v) => v.toFixed(2)}
            onChange={onGravityChange}
          />
        </View>

        <ReadoutPanel period={period} frequency={frequency} velocity={velocity} />
      </View>

      <ProcedureCard />
      <TipCard tip="Try changing the length and mass to see how they affect the period of the pendulum." />

      <BottomNav
        ctaLabel="Start Experiment"
        onPressCta={onStartExperiment}
        onPressPrevious={onPressPrevious}
        onPressNext={onPressNext}
      />
    </View>
  );
}
