import { images } from "@/constants/images";
import type { Lab } from "@/types/lab";

// Placeholder photos pending real Tulki-style illustrations for each experiment.
export const chemistryLabs: Lab[] = [
  {
    id: "acid-base-titration",
    subject: "chemistry",
    topic: "acids-bases",
    title: "Acid-Base Titration",
    description: "Mix acids and bases to find the exact point of neutralization.",
    dimension: "2d",
    difficulty: "intermediate",
    durationMinutes: 12,
    image: images.chemistryIcon,
    parameters: [
      { key: "acidConcentration", label: "Acid Concentration", unit: "mol/L", min: 0.1, max: 2, step: 0.1, defaultValue: 1 },
      { key: "baseConcentration", label: "Base Concentration", unit: "mol/L", min: 0.1, max: 2, step: 0.1, defaultValue: 1 },
      { key: "baseVolume", label: "Base Volume Added", unit: "mL", min: 0, max: 50, step: 1, defaultValue: 0 },
    ],
  },
  {
    id: "states-of-matter",
    subject: "chemistry",
    topic: "matter-states",
    title: "States of Matter Explorer",
    description: "Heat and cool a substance to observe transitions between solid, liquid, and gas.",
    dimension: "2d",
    difficulty: "beginner",
    durationMinutes: 10,
    image: { uri: "https://picsum.photos/seed/states-of-matter/400/300" },
    parameters: [
      { key: "temperature", label: "Temperature", unit: "°C", min: -50, max: 150, step: 1, defaultValue: 20 },
      { key: "pressure", label: "Pressure", unit: "atm", min: 0.5, max: 3, step: 0.1, defaultValue: 1 },
    ],
  },
  {
    id: "reaction-rates",
    subject: "chemistry",
    topic: "reactions",
    title: "Chemical Reaction Rates",
    description: "Change temperature and concentration to see how fast a reaction proceeds.",
    dimension: "2d",
    difficulty: "intermediate",
    durationMinutes: 14,
    image: { uri: "https://picsum.photos/seed/reaction-rates/400/300" },
    parameters: [
      { key: "temperature", label: "Temperature", unit: "°C", min: 0, max: 100, step: 1, defaultValue: 25 },
      { key: "concentration", label: "Concentration", unit: "mol/L", min: 0.1, max: 2, step: 0.1, defaultValue: 0.5 },
      { key: "catalystAmount", label: "Catalyst Amount", unit: "g", min: 0, max: 10, step: 0.5, defaultValue: 0 },
    ],
  },
  {
    id: "molecular-bonding",
    subject: "chemistry",
    topic: "bonding",
    title: "Molecular Bonding Simulator",
    description: "Build molecules by connecting atoms and discover ionic vs covalent bonds.",
    dimension: "3d",
    difficulty: "advanced",
    durationMinutes: 16,
    image: { uri: "https://picsum.photos/seed/molecular-bonding/400/300" },
    parameters: [
      { key: "electronegativityDiff", label: "Electronegativity Difference", unit: "Δ", min: 0, max: 3.3, step: 0.1, defaultValue: 0.5 },
      { key: "bondDistance", label: "Bond Distance", unit: "pm", min: 50, max: 250, step: 5, defaultValue: 150 },
    ],
  },
  {
    id: "periodic-trends",
    subject: "chemistry",
    topic: "elements",
    title: "Periodic Table Trends",
    description: "Explore how atomic radius and reactivity change across the periodic table.",
    dimension: "2d",
    difficulty: "beginner",
    durationMinutes: 8,
    image: { uri: "https://picsum.photos/seed/periodic-trends/400/300" },
    parameters: [
      { key: "atomicNumber", label: "Atomic Number", unit: "Z", min: 1, max: 118, step: 1, defaultValue: 11 },
    ],
  },
];