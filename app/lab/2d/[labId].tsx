import { useLocalSearchParams } from "expo-router";

import { LabDetailScreen } from "@/components/labs/LabDetailScreen";
import { PendulumMotionScreen } from "@/components/experiments/pendulum-motion/PendulumMotionScreen";
import { NewtonsFirstLawScreen } from "@/components/experiments/newtons-first-law/NewtonsFirstLawScreen";
import { MicroscopeScreen } from "@/components/experiments/microscope-onion-cell/MicroscopeScreen";
import { AcidBaseTitrationScreen } from "@/components/experiments/acid-base-titration/AcidBaseTitrationScreen";

export default function Lab2DScreen() {
  const { labId } = useLocalSearchParams<{ labId: string }>();

  if (labId === "pendulum-motion") {
    return <PendulumMotionScreen />;
  }

  if (labId === "newtons-first-law") {
    return <NewtonsFirstLawScreen />;
  }

  if (labId === "microscope-onion-cell") {
    return <MicroscopeScreen />;
  }

  if (labId === "acid-base-titration") {
    return <AcidBaseTitrationScreen />;
  }

  return <LabDetailScreen labId={labId} />;
}