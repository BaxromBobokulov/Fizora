import { useLocalSearchParams } from "expo-router";

import { LabDetailScreen } from "@/components/labs/LabDetailScreen";
import { PendulumMotionScreen } from "@/components/experiments/pendulum-motion/PendulumMotionScreen";
import { MicroscopeScreen } from "@/components/experiments/microscope-onion-cell/MicroscopeScreen";

export default function Lab2DScreen() {
  const { labId } = useLocalSearchParams<{ labId: string }>();

  if (labId === "pendulum-motion") {
    return <PendulumMotionScreen />;
  }

  if (labId === "microscope-onion-cell") {
    return <MicroscopeScreen />;
  }

  return <LabDetailScreen labId={labId} />;
}