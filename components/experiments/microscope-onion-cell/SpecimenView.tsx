import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { BlurView } from "expo-blur";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import type { MicroscopeMagnification } from "@/types/microscope";
import { OnionCellGrid } from "./OnionCellGrid";
import { lightOverlayOpacities, stagePanPx, type SpeedOption } from "./microscopeMath";

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

const CROSSFADE_MS = 280;

// Crossfades (fade + slight scale-in) between the previous magnification's
// grid and the new one, instead of a hard cut — the old grid stays painted
// underneath, fully opaque, while the new one animates in on top.
function CrossfadeGrid({
  magnification,
  worldSize,
  accentColor,
  isPlaying,
  speed,
  resetEpoch,
}: {
  magnification: MicroscopeMagnification;
  worldSize: number;
  accentColor: string;
  isPlaying: boolean;
  speed: SpeedOption;
  resetEpoch: number;
}) {
  const [displayedMagnification, setDisplayedMagnification] = useState(magnification);
  const progress = useSharedValue(1);

  useEffect(() => {
    if (magnification === displayedMagnification) return;
    progress.value = 0;
    progress.value = withTiming(1, { duration: CROSSFADE_MS }, (finished) => {
      if (finished) runOnJS(setDisplayedMagnification)(magnification);
    });
    // displayedMagnification intentionally excluded — see CrossfadeImage's
    // original note: it's the fade target, not a dependency of the fade.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [magnification]);

  const incomingStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ scale: 0.94 + progress.value * 0.06 }],
  }));

  return (
    <View style={StyleSheet.absoluteFill}>
      <OnionCellGrid
        magnification={displayedMagnification}
        worldSize={worldSize}
        accentColor={accentColor}
        isPlaying={isPlaying}
        speed={speed}
        resetEpoch={resetEpoch}
      />
      {magnification !== displayedMagnification && (
        <Animated.View style={[StyleSheet.absoluteFill, incomingStyle]}>
          <OnionCellGrid
            magnification={magnification}
            worldSize={worldSize}
            accentColor={accentColor}
            isPlaying={isPlaying}
            speed={speed}
            resetEpoch={resetEpoch}
          />
        </Animated.View>
      )}
    </View>
  );
}

type SpecimenViewProps = {
  magnification: MicroscopeMagnification;
  diameter: number;
  focusBlur: number;
  lightIntensity: number;
  stageX: number;
  isPlaying: boolean;
  speed: SpeedOption;
  resetEpoch: number;
  accentColor: string;
};

export function SpecimenView({
  magnification,
  diameter,
  focusBlur,
  lightIntensity,
  stageX,
  isPlaying,
  speed,
  resetEpoch,
  accentColor,
}: SpecimenViewProps) {
  const worldSize = diameter * 1.5;
  const maxPanPx = (worldSize - diameter) / 2;

  const panX = useSharedValue(stagePanPx(stageX, maxPanPx));
  useEffect(() => {
    panX.value = withTiming(stagePanPx(stageX, maxPanPx), { duration: 150 });
  }, [stageX, maxPanPx, panX]);

  const panStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: panX.value }],
  }));

  const blurProps = useAnimatedProps(() => ({
    intensity: withTiming(focusBlur, { duration: 150 }),
  }));

  const { dim, overexposed } = lightOverlayOpacities(lightIntensity);

  return (
    <View
      style={{
        width: diameter,
        height: diameter,
        borderRadius: diameter / 2,
        overflow: "hidden",
        backgroundColor: "#E4EFE6",
      }}
    >
      <Animated.View
        style={[
          {
            position: "absolute",
            width: worldSize,
            height: worldSize,
            left: (diameter - worldSize) / 2,
            top: (diameter - worldSize) / 2,
          },
          panStyle,
        ]}
      >
        <CrossfadeGrid
          magnification={magnification}
          worldSize={worldSize}
          accentColor={accentColor}
          isPlaying={isPlaying}
          speed={speed}
          resetEpoch={resetEpoch}
        />
      </Animated.View>

      <View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: "#000000", opacity: dim }]} />
      <View
        pointerEvents="none"
        style={[StyleSheet.absoluteFill, { backgroundColor: "#FFFFFF", opacity: overexposed }]}
      />

      <AnimatedBlurView
        animatedProps={blurProps}
        tint="light"
        pointerEvents="none"
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}
