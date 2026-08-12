import { images } from "@/constants/images";
import type { Lab } from "@/types/lab";

// The remaining images below are placeholder photos pending real Tulki-style illustrations.
export const wavesLabs: Lab[] = [
  {
    id: "wave-interference",
    topic: "waves",
    title: "Wave Interference",
    description:
      "Explore constructive and destructive interference between two wave sources.",
    dimension: "2d",
    difficulty: "intermediate",
    durationMinutes: 12,
    image: images.wavesLabIcon,
    parameters: [
      { key: "frequency", label: "Frequency", unit: "Hz", min: 1, max: 20, step: 1, defaultValue: 5 },
      { key: "amplitude", label: "Amplitude", unit: "cm", min: 1, max: 10, step: 0.5, defaultValue: 3 },
      { key: "phaseDifference", label: "Phase Difference", unit: "°", min: 0, max: 360, step: 5, defaultValue: 0 },
    ],
  },
  {
    id: "simple-harmonic-motion",
    topic: "waves",
    title: "Simple Harmonic Motion",
    description:
      "Investigate the oscillation of a mass on a spring and measure its period.",
    dimension: "2d",
    difficulty: "beginner",
    durationMinutes: 10,
    image: { uri: "https://picsum.photos/seed/simple-harmonic-motion/400/300" },
    parameters: [
      { key: "springConstant", label: "Spring Constant", unit: "N/m", min: 1, max: 100, step: 1, defaultValue: 20 },
      { key: "mass", label: "Mass", unit: "kg", min: 0.1, max: 5, step: 0.1, defaultValue: 1 },
      { key: "amplitude", label: "Amplitude", unit: "cm", min: 1, max: 20, step: 1, defaultValue: 5 },
    ],
  },
  {
    id: "sound-wave-frequency",
    topic: "waves",
    title: "Sound Wave Frequency",
    description: "Change frequency and amplitude to see how sound waves are shaped.",
    dimension: "2d",
    difficulty: "beginner",
    durationMinutes: 8,
    image: { uri: "https://picsum.photos/seed/sound-wave-frequency/400/300" },
    parameters: [
      { key: "frequency", label: "Frequency", unit: "Hz", min: 20, max: 2000, step: 10, defaultValue: 440 },
      { key: "amplitude", label: "Amplitude", unit: "%", min: 1, max: 100, step: 1, defaultValue: 50 },
    ],
  },
  {
    id: "standing-waves",
    topic: "waves",
    title: "Standing Waves on a String",
    description: "Create standing waves on a string and measure wavelength and nodes.",
    dimension: "2d",
    difficulty: "advanced",
    durationMinutes: 14,
    image: { uri: "https://picsum.photos/seed/standing-waves/400/300" },
    parameters: [
      { key: "tension", label: "String Tension", unit: "N", min: 1, max: 50, step: 1, defaultValue: 10 },
      { key: "stringLength", label: "String Length", unit: "m", min: 0.5, max: 3, step: 0.1, defaultValue: 1.5 },
      { key: "frequency", label: "Frequency", unit: "Hz", min: 1, max: 100, step: 1, defaultValue: 20 },
    ],
  },
];