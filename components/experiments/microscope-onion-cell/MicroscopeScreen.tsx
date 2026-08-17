import { useEffect, useState } from "react";
import { ScrollView, Share, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { SUBJECT_META } from "@/constants/subjects";
import { allExperiments, getExperimentById, getExperimentsBySubject } from "@/data/labs";
import { useProgressStore } from "@/store/useProgressStore";
import { useMicroscopeStore } from "@/store/useMicroscopeStore";
import { ExperimentTab } from "./ExperimentTab";
import { MicroscopeTabHeader, type MicroscopeTab } from "./MicroscopeTabHeader";
import { ResultsTab } from "./ResultsTab";
import { TheoryTab } from "./TheoryTab";

const LAB_ID = "microscope-onion-cell";

export function MicroscopeScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<MicroscopeTab>("experiment");
  const [bookmarked, setBookmarked] = useState(false);

  const lab = getExperimentById(LAB_ID);
  const subject = SUBJECT_META.biology;

  const cellsLabs = getExperimentsBySubject("biology").filter((entry) => entry.topic === "cells");
  const currentIndex = cellsLabs.findIndex((entry) => entry.id === LAB_ID);
  const prevLab = currentIndex > 0 ? cellsLabs[currentIndex - 1] : undefined;
  const nextLab =
    currentIndex >= 0 && currentIndex < cellsLabs.length - 1 ? cellsLabs[currentIndex + 1] : undefined;

  const {
    magnification,
    focus,
    lightIntensity,
    stageX,
    zoom,
    isPlaying,
    speed,
    activeTool,
    resetEpoch,
    setMagnification,
    setFocus,
    setLightIntensity,
    setStageX,
    setZoom,
    setSpeed,
    setActiveTool,
    togglePlaying,
    reset,
  } = useMicroscopeStore();

  const completedLabIds = useProgressStore((state) => state.completedLabIds);
  const completeLab = useProgressStore((state) => state.completeLab);

  // Per-session viewport state — reset on mount and unmount so re-entering
  // the lab (or navigating Previous/Next) always starts from a clean slate.
  useEffect(() => {
    reset();
    return () => reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!lab || !lab.microscope) {
    return null;
  }

  const specimen = lab.microscope;

  const goToLab = (id: string) => {
    const targetLab = allExperiments.find((entry) => entry.id === id);
    router.push(`/lab/${targetLab?.dimension ?? "2d"}/${id}` as never);
  };

  const handleStartExperiment = () => {
    setActiveTab("experiment");
    if (!completedLabIds.includes(LAB_ID)) {
      completeLab(LAB_ID);
    }
  };

  const handleRepeatExperiment = () => {
    setActiveTab("experiment");
    reset();
  };

  const handleShare = () => {
    Share.share({
      message: "Check out the Microscope: Onion Cell lab in Fizora!",
    }).catch(() => {});
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView contentContainerClassName="px-5 pb-10 pt-2" showsVerticalScrollIndicator={false}>
        <MicroscopeTabHeader
          subjectLabel={subject.label}
          activeTab={activeTab}
          bookmarked={bookmarked}
          accentColor={subject.color}
          accentTint={subject.tileBackground}
          onBack={() => router.back()}
          onChangeTab={setActiveTab}
          onToggleBookmark={() => setBookmarked((value) => !value)}
          onShare={handleShare}
        />

        <View className="mt-4">
          {activeTab === "experiment" && (
            <ExperimentTab
              specimen={specimen}
              magnification={magnification}
              focus={focus}
              lightIntensity={lightIntensity}
              stageX={stageX}
              zoom={zoom}
              isPlaying={isPlaying}
              speed={speed}
              activeTool={activeTool}
              resetEpoch={resetEpoch}
              accentColor={subject.color}
              accentTint={subject.tileBackground}
              onMagnificationChange={setMagnification}
              onFocusChange={setFocus}
              onLightIntensityChange={setLightIntensity}
              onStageXChange={setStageX}
              onZoomChange={setZoom}
              onSpeedChange={setSpeed}
              onToolChange={setActiveTool}
              onTogglePlaying={togglePlaying}
              onReset={reset}
              onPressPrevious={prevLab ? () => goToLab(prevLab.id) : undefined}
              onPressNext={nextLab ? () => goToLab(nextLab.id) : undefined}
              onStartExperiment={handleStartExperiment}
            />
          )}

          {activeTab === "theory" && (
            <TheoryTab
              specimen={specimen}
              accentColor={subject.color}
              accentTint={subject.tileBackground}
              onPressPrevious={prevLab ? () => goToLab(prevLab.id) : undefined}
              onPressNext={nextLab ? () => goToLab(nextLab.id) : undefined}
              onStartExperiment={handleStartExperiment}
            />
          )}

          {activeTab === "results" && (
            <ResultsTab
              specimen={specimen}
              magnification={magnification}
              focus={focus}
              lightIntensity={lightIntensity}
              accentColor={subject.color}
              accentTint={subject.tileBackground}
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
