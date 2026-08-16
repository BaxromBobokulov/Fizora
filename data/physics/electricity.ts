import { images } from "@/constants/images";
import type { Lab } from "@/types/lab";

export const electricityLabs: Lab[] = [
  {
    id: "ohms-law",
    subject: "physics",
    topic: "electricity",
    title: "Ohm's Law Circuit",
    description:
      "Build a simple circuit and discover the relationship between voltage, current, and resistance.",
    dimension: "2d",
    difficulty: "beginner",
    durationMinutes: 10,
    image: images.homeElectricity,
    parameters: [
      { key: "voltage", label: "Voltage", unit: "V", min: 1, max: 24, step: 1, defaultValue: 9 },
      { key: "resistance", label: "Resistance", unit: "Ω", min: 1, max: 1000, step: 1, defaultValue: 100 },
    ],
  },
  {
    id: "series-parallel-circuits",
    subject: "physics",
    topic: "electricity",
    title: "Series & Parallel Circuits",
    description:
      "Compare current and voltage behavior.",
    dimension: "2d",
    difficulty: "intermediate",
    durationMinutes: 14,
    // Placeholder photo pending a real illustration — swap for a proper Tulki-style asset.
    image: { uri: "https://picsum.photos/seed/series-parallel-circuits/400/300" },
    parameters: [
      { key: "resistor1", label: "Resistor 1", unit: "Ω", min: 1, max: 500, step: 1, defaultValue: 100 },
      { key: "resistor2", label: "Resistor 2", unit: "Ω", min: 1, max: 500, step: 1, defaultValue: 200 },
      { key: "voltage", label: "Voltage", unit: "V", min: 1, max: 24, step: 1, defaultValue: 12 },
    ],
  },
  {
    id: "capacitor-charging",
    subject: "physics",
    topic: "electricity",
    title: "Capacitor Charging & Discharging",
    description:
      "Observe how a capacitor charges and discharges through a resistor over time.",
    dimension: "2d",
    difficulty: "advanced",
    durationMinutes: 16,
    // Placeholder photo pending a real illustration — swap for a proper Tulki-style asset.
    image: { uri: "https://picsum.photos/seed/capacitor-charging/400/300" },
    parameters: [
      { key: "capacitance", label: "Capacitance", unit: "µF", min: 1, max: 1000, step: 1, defaultValue: 100 },
      { key: "resistance", label: "Resistance", unit: "Ω", min: 1, max: 1000, step: 1, defaultValue: 200 },
      { key: "voltage", label: "Voltage", unit: "V", min: 1, max: 24, step: 1, defaultValue: 9 },
    ],
  },
  {
    id: "electromagnetic-induction",
    subject: "physics",
    topic: "electricity",
    title: "Electromagnetic Induction",
    description: "Move a magnet through a coil and generate an induced current.",
    dimension: "3d",
    difficulty: "intermediate",
    durationMinutes: 15,
    image: images.homeMagnetism,
    parameters: [
      { key: "coilTurns", label: "Coil Turns", unit: "turns", min: 10, max: 500, step: 10, defaultValue: 100 },
      { key: "magnetSpeed", label: "Magnet Speed", unit: "m/s", min: 0.1, max: 5, step: 0.1, defaultValue: 1 },
      { key: "magnetStrength", label: "Magnet Strength", unit: "T", min: 0.1, max: 2, step: 0.1, defaultValue: 0.5 },
    ],
  },
];