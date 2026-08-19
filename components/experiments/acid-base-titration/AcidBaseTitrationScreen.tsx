import { useEffect, useState } from "react";
import { ScrollView, Share, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

import { SUBJECT_META } from "@/constants/subjects";
import { allExperiments, getExperimentById, getExperimentsBySubject } from "@/data/labs";
import { useProgressStore } from "@/store/useProgressStore";
import { useTitrationStore } from "@/store/useTitrationStore";
import { ExperimentTab } from "./ExperimentTab";
import { ResultsTab } from "./ResultsTab";
import { TheoryTab } from "./TheoryTab";
import { TitrationTabHeader, type TitrationTab } from "./TitrationTabHeader";
import {
  TITRANT_CONCENTRATION_M,
  calculatePH,
  calculateTemperatureC,
  flaskLiquidVolumeML,
  indicatorPinkProgress,
  isEndpointReached,
} from "./titrationMath";
import { useTitrationSimulation } from "./useTitrationSimulation";

const LAB_ID = "acid-base-titration";

export function AcidBaseTitrationScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TitrationTab>("experiment");
  const [bookmarked, setBookmarked] = useState(false);

  const lab = getExperimentById(LAB_ID);
  const subject = SUBJECT_META.chemistry;

  const acidsBasesLabs = getExperimentsBySubject("chemistry").filter((entry) => entry.topic === "acids-bases");
  const currentIndex = acidsBasesLabs.findIndex((entry) => entry.id === LAB_ID);
  const prevLab = currentIndex > 0 ? acidsBasesLabs[currentIndex - 1] : undefined;
  const nextLab =
    currentIndex >= 0 && currentIndex < acidsBasesLabs.length - 1 ? acidsBasesLabs[currentIndex + 1] : undefined;

  const {
    acidConcentration,
    acidVolume,
    buretteVolumeML,
    indicator,
    isPlaying,
    speed,
    activeTool,
    resetEpoch,
    setAcidConcentration,
    setAcidVolume,
    setIndicator,
    setSpeed,
    setActiveTool,
    advanceBurette,
    togglePlaying,
    reset,
  } = useTitrationStore();

  const completedLabIds = useProgressStore((state) => state.completedLabIds);
  const completeLab = useProgressStore((state) => state.completeLab);

  // Per-session experiment state — reset on mount and unmount so re-entering
  // the lab (or navigating Previous/Next) always starts from a clean slate.
  useEffect(() => {
    reset();
    return () => reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Only advance the drip while the Experiment tab is actually visible —
  // same reasoning as PendulumMotionScreen's isPlaying guard.
  useTitrationSimulation({
    isPlaying: isPlaying && activeTab === "experiment",
    speed,
    onAdvance: advanceBurette,
  });

  if (!lab) {
    return null;
  }

  const pH = calculatePH(acidConcentration, acidVolume, buretteVolumeML, TITRANT_CONCENTRATION_M);
  const temperatureC = calculateTemperatureC(acidConcentration, acidVolume, buretteVolumeML, TITRANT_CONCENTRATION_M);
  const endpointReached = isEndpointReached(pH);
  const pinkProgress = indicatorPinkProgress(pH);
  const totalLiquidVolumeML = flaskLiquidVolumeML(acidVolume, buretteVolumeML);

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
      message: "Check out the Acid-Base Titration lab in Fizora!",
    }).catch(() => {});
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <ScrollView contentContainerClassName="px-5 pb-10 pt-2" showsVerticalScrollIndicator={false}>
        <TitrationTabHeader
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
              acidConcentration={acidConcentration}
              acidVolume={acidVolume}
              buretteVolumeML={buretteVolumeML}
              totalLiquidVolumeML={totalLiquidVolumeML}
              pinkProgress={pinkProgress}
              pH={pH}
              temperatureC={temperatureC}
              endpointReached={endpointReached}
              indicator={indicator}
              isPlaying={isPlaying}
              speed={speed}
              activeTool={activeTool}
              resetEpoch={resetEpoch}
              accentColor={subject.color}
              accentTint={subject.tileBackground}
              onAcidConcentrationChange={setAcidConcentration}
              onAcidVolumeChange={setAcidVolume}
              onIndicatorChange={setIndicator}
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
              accentColor={subject.color}
              accentTint={subject.tileBackground}
              onPressPrevious={prevLab ? () => goToLab(prevLab.id) : undefined}
              onPressNext={nextLab ? () => goToLab(nextLab.id) : undefined}
              onStartExperiment={handleStartExperiment}
            />
          )}

          {activeTab === "results" && (
            <ResultsTab
              acidConcentration={acidConcentration}
              acidVolume={acidVolume}
              buretteVolumeML={buretteVolumeML}
              pH={pH}
              temperatureC={temperatureC}
              endpointReached={endpointReached}
              indicator={indicator}
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
