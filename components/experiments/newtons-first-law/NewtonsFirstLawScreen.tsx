import { useCallback, useState } from "react";
import { ScrollView, Share, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { getLabById, getLabsByTopic, getTopicById } from "@/data/physics";
import { useProgressStore } from "@/store/useProgressStore";
import { useNewtonsLawExperimentStore } from "@/store/useNewtonsLawExperimentStore";
import { ExperimentTab } from "./ExperimentTab";
import { NewtonsLawTabHeader, type NewtonsLawTab } from "./NewtonsLawTabHeader";
import { ResultsTab } from "./ResultsTab";
import { TheoryTab } from "./TheoryTab";
import { useNewtonsLawSimulation, type MotionMeasurement } from "./useNewtonsLawSimulation";

const LAB_ID = "newtons-first-law";

export function NewtonsFirstLawScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<NewtonsLawTab>("experiment");
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
    initialVelocity,
    mass,
    friction,
    frictionless,
    speed,
    isPlaying,
    runs,
    setInitialVelocity,
    setMass,
    setFriction,
    setFrictionless,
    setSpeed,
    play,
    togglePlay,
    reset: resetStore,
    recordRun,
  } = useNewtonsLawExperimentStore();

  const completedLabIds = useProgressStore((state) => state.completedLabIds);
  const completeLab = useProgressStore((state) => state.completeLab);

  const handleMotionMeasured = useCallback(
    ({ finalVelocity, distanceTraveled, timeToStop }: MotionMeasurement) => {
      recordRun({
        initialVelocity,
        mass,
        friction,
        frictionless,
        finalVelocity,
        distanceTraveled,
        timeToStop,
      });
      if (!completedLabIds.includes(LAB_ID)) {
        completeLab(LAB_ID);
      }
    },
    [recordRun, initialVelocity, mass, friction, frictionless, completedLabIds, completeLab]
  );

  const { frame, reset: resetSimulation } = useNewtonsLawSimulation({
    initialVelocity,
    mass,
    friction,
    frictionless,
    speed,
    // Only step the physics loop while its canvas is actually visible — avoids
    // driving 60fps re-renders through the whole screen while reading Theory/Results.
    isPlaying: isPlaying && activeTab === "experiment",
    onMotionMeasured: handleMotionMeasured,
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
      message: "Check out the Newton's First Law lab in Fizora!",
    }).catch(() => {});
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView contentContainerClassName="px-5 pb-10 pt-2" showsVerticalScrollIndicator={false}>
        <NewtonsLawTabHeader
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
              initialVelocity={initialVelocity}
              mass={mass}
              friction={friction}
              frictionless={frictionless}
              speed={speed}
              isPlaying={isPlaying}
              frame={frame}
              onInitialVelocityChange={setInitialVelocity}
              onMassChange={setMass}
              onFrictionChange={setFriction}
              onFrictionlessChange={setFrictionless}
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
