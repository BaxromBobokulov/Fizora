import { Modal, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { ParameterSlider } from "@/components/labs/ParameterSlider";
import {
  NEWTONS_LAW_RANGES,
  type SpeedOption,
} from "@/data/physics/mechanics/newtons-first-law";
import { BottomNav } from "./BottomNav";
import { NewtonsLawCanvas } from "./NewtonsLawCanvas";
import { ProcedureCard } from "./ProcedureCard";
import { ReadoutPanel } from "./ReadoutPanel";
import { SurfaceToggle } from "./SurfaceToggle";
import { TipCard } from "./TipCard";
import type { NewtonsLawFrame } from "./useNewtonsLawSimulation";

type ExperimentTabProps = {
  initialVelocity: number;
  mass: number;
  friction: number;
  frictionless: boolean;
  speed: SpeedOption;
  isPlaying: boolean;
  frame: NewtonsLawFrame;
  onInitialVelocityChange: (value: number) => void;
  onMassChange: (value: number) => void;
  onFrictionChange: (value: number) => void;
  onFrictionlessChange: (value: boolean) => void;
  onSpeedChange: (value: SpeedOption) => void;
  onTogglePlay: () => void;
  onReset: () => void;
  onPressPrevious?: () => void;
  onPressNext?: () => void;
  onStartExperiment: () => void;
};

export function ExperimentTab({
  initialVelocity,
  mass,
  friction,
  frictionless,
  speed,
  isPlaying,
  frame,
  onInitialVelocityChange,
  onMassChange,
  onFrictionChange,
  onFrictionlessChange,
  onSpeedChange,
  onTogglePlay,
  onReset,
  onPressPrevious,
  onPressNext,
  onStartExperiment,
}: ExperimentTabProps) {
  const [fullscreen, setFullscreen] = useState(false);

  const hasStarted = frame.distanceTraveled > 0 || isPlaying;
  const stopped = hasStarted && !isPlaying && frame.velocity < 0.05 && initialVelocity > 0.05;
  const motionState = !hasStarted
    ? "Ready"
    : stopped
      ? "Stopped"
      : frictionless
        ? "Constant Velocity"
        : "Decelerating";

  return (
    <View>
      <NewtonsLawCanvas
        mass={mass}
        frame={frame}
        frictionless={frictionless}
        isPlaying={isPlaying}
        speed={speed}
        onTogglePlay={onTogglePlay}
        onReset={onReset}
        onSpeedChange={onSpeedChange}
        onExpand={() => setFullscreen(true)}
      />

      <Modal visible={fullscreen} animationType="fade" onRequestClose={() => setFullscreen(false)}>
        <View style={{ flex: 1, backgroundColor: "#0D132B", padding: 16, justifyContent: "center" }}>
          <NewtonsLawCanvas
            mass={mass}
            frame={frame}
            frictionless={frictionless}
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
          <SurfaceToggle frictionless={frictionless} onChange={onFrictionlessChange} />

          <ParameterSlider
            label="Initial Velocity (v₀)"
            value={initialVelocity}
            min={NEWTONS_LAW_RANGES.initialVelocity.min}
            max={NEWTONS_LAW_RANGES.initialVelocity.max}
            step={NEWTONS_LAW_RANGES.initialVelocity.step}
            unit="m/s"
            formatValue={(v) => v.toFixed(1)}
            onChange={onInitialVelocityChange}
          />
          <ParameterSlider
            label="Mass (m)"
            value={mass}
            min={NEWTONS_LAW_RANGES.mass.min}
            max={NEWTONS_LAW_RANGES.mass.max}
            step={NEWTONS_LAW_RANGES.mass.step}
            unit="kg"
            formatValue={(v) => v.toFixed(2)}
            onChange={onMassChange}
          />

          <View pointerEvents={frictionless ? "none" : "auto"} style={{ opacity: frictionless ? 0.4 : 1 }}>
            <ParameterSlider
              label="Friction Coefficient (μ)"
              value={friction}
              min={NEWTONS_LAW_RANGES.friction.min}
              max={NEWTONS_LAW_RANGES.friction.max}
              step={NEWTONS_LAW_RANGES.friction.step}
              unit=""
              formatValue={(v) => v.toFixed(2)}
              onChange={onFrictionChange}
            />
          </View>
        </View>

        <ReadoutPanel
          velocity={frame.velocity}
          distanceTraveled={frame.distanceTraveled}
          motionState={motionState}
        />
      </View>

      <ProcedureCard />
      <TipCard tip="Try the frictionless surface first, then switch to friction and see how quickly the puck stops." />

      <BottomNav
        ctaLabel="Start Experiment"
        onPressCta={onStartExperiment}
        onPressPrevious={onPressPrevious}
        onPressNext={onPressNext}
      />
    </View>
  );
}
