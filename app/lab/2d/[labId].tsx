import { useLocalSearchParams } from "expo-router";

import { LabDetailScreen } from "@/components/labs/LabDetailScreen";
import { PendulumMotionScreen } from "@/components/experiments/pendulum-motion/PendulumMotionScreen";

export default function Lab2DScreen() {
  const { labId } = useLocalSearchParams<{ labId: string }>();

  if (labId === "pendulum-motion") {
    return <PendulumMotionScreen />;
  }

  return <LabDetailScreen labId={labId} />;
}