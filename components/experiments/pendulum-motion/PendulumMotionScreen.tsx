import { useCallback, useState } from "react";
import { ScrollView, Share, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { getLabById, getLabsByTopic, getTopicById } from "@/data/physics";
import {
  theoreticalFrequency,
} from "@/data/physics/mechanics/pendulum-motion";
import { useProgressStore } from "@/store/useProgressStore";
import { usePendulumExperimentStore } from "@/store/usePendulumExperimentStore";
import { ExperimentTab } from "./ExperimentTab";
import { PendulumTabHeader, type PendulumTab } from "./PendulumTabHeader";
import { ResultsTab } from "./ResultsTab";
import { TheoryTab } from "./TheoryTab";
import { usePendulumSimulation } from "./usePendulumSimulation";

const LAB_ID = "pendulum-motion";

export function PendulumMotionScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<PendulumTab>("experiment");
  const [bookmarked, setBookmarked] = useState(false);

  const lab = getLabById(LAB_ID);
  const topic = lab ? getTopicById(lab.topic) : undefined;

  const mechanicsLabs = getLabsByTopic("mechanics");
  const currentIndex = mechanicsLabs.findIndex((entry) => entry.id === LAB_ID);
  const prevLab = currentIndex > 0 ? mechanicsLabs[currentIndex - 1] : undefined;
  const nextLab =
    currentIndex >= 0 && currentIndex < mechanicsLabs.length - 1
      ? mechanicsLabs[currentIndex + 1]
      : undefined;

  const {
    length,
    mass,
    gravity,
    speed,
    isPlaying,
    runs,
    setLength,
    setMass,
    setGravity,
    setSpeed,
    play,
    togglePlay,
    reset: resetStore,
    recordRun,
  } = usePendulumExperimentStore();

  const completedLabIds = useProgressStore((state) => state.completedLabIds);
  const completeLab = useProgressStore((state) => state.completeLab);

  const handlePeriodMeasured = useCallback(
    ({ period, velocity }: { period: number; velocity: number }) => {
      recordRun({
        length,
        mass,
        gravity,
        period,
        frequency: theoreticalFrequency(period),
        velocity,
      });
      if (!completedLabIds.includes(LAB_ID)) {
        completeLab(LAB_ID);
      }
    },
    [recordRun, length, mass, gravity, completedLabIds, completeLab]
  );

  const { frame, reset: resetSimulation } = usePendulumSimulation({
    length,
    mass,
    gravity,
    speed,
    // Only step the physics loop while its canvas is actually visible — avoids
    // driving 60fps re-renders through the whole screen while reading Theory/Results.
    isPlaying: isPlaying && activeTab === "experiment",
    onPeriodMeasured: handlePeriodMeasured,
  });

  const handleReset = () => {
    resetStore();
    resetSimulation();
  };

  const goToLab = (id: string) => {
    const targetLab = getLabById(id);
    router.push(`/lab/${targetLab?.dimension ?? "2d"}/${id}`);
  };

  const handleStartExperiment = () => {
    setActiveTab("experiment");
    play();
  };

  const handleRepeatExperiment = () => {
    setActiveTab("experiment");
    resetStore();
    resetSimulation();
    play();
  };

  const handleShare = () => {
    Share.share({
      message: "Check out the Pendulum Motion lab in Fizora!",
    }).catch(() => {});
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView contentContainerClassName="px-5 pb-10 pt-2" showsVerticalScrollIndicator={false}>
        <PendulumTabHeader
          topicLabel={topic?.title ?? "Mechanics"}
          activeTab={activeTab}
          bookmarked={bookmarked}
          onBack={() => router.back()}
          onChangeTab={setActiveTab}
          onToggleBookmark={() => setBookmarked((value) => !value)}
          onShare={handleShare}
        />

        <View className="mt-4">
          {activeTab === "experiment" && (
            <ExperimentTab
              length={length}
              mass={mass}
              gravity={gravity}
              speed={speed}
              isPlaying={isPlaying}
              frame={frame}
              onLengthChange={setLength}
              onMassChange={setMass}
              onGravityChange={setGravity}
              onSpeedChange={setSpeed}
              onTogglePlay={togglePlay}
              onReset={handleReset}
              onPressPrevious={prevLab ? () => goToLab(prevLab.id) : undefined}
              onPressNext={nextLab ? () => goToLab(nextLab.id) : undefined}
              onStartExperiment={handleStartExperiment}
            />
          )}

          {activeTab === "theory" && (
            <TheoryTab
              onPressPrevious={prevLab ? () => goToLab(prevLab.id) : undefined}
              onPressNext={nextLab ? () => goToLab(nextLab.id) : undefined}
              onStartExperiment={handleStartExperiment}
            />
          )}

          {activeTab === "results" && (
            <ResultsTab
              runs={runs}
              currentGravity={gravity}
              onPressPrevious={prevLab ? () => goToLab(prevLab.id) : undefined}
              onPressNext={nextLab ? () => goToLab(nextLab.id) : undefined}
              onRepeatExperiment={handleRepeatExperiment}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
