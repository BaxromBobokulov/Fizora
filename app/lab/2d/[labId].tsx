import { useLocalSearchParams } from "expo-router";

import { LabDetailScreen } from "@/components/labs/LabDetailScreen";

export default function Lab2DScreen() {
  const { labId } = useLocalSearchParams<{ labId: string }>();
  return <LabDetailScreen labId={labId} />;
}