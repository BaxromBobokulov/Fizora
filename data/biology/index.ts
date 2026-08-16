import { images } from "@/constants/images";
import { primaryColors } from "@/constants/theme/colors";
import type { Lab } from "@/types/lab";

// Placeholder photos pending real Tulki-style illustrations for the experiments
// that don't yet have dedicated art.
export const biologyLabs: Lab[] = [
  {
    id: "build-a-plant-cell",
    subject: "biology",
    topic: "cells",
    title: "Build a Plant Cell",
    description: "Explore the structure of plant cells and their functions.",
    dimension: "3d",
    difficulty: "beginner",
    durationMinutes: 20,
    image: images.plantCell,
    // Overrides Biology's purple brand color to match the plant-cell illustration.
    featuredBg: primaryColors.green,
    parameters: [
      { key: "chloroplastCount", label: "Chloroplast Count", unit: "count", min: 1, max: 20, step: 1, defaultValue: 6 },
      { key: "cellWallThickness", label: "Cell Wall Thickness", unit: "µm", min: 0.1, max: 5, step: 0.1, defaultValue: 1 },
    ],
  },
  {
    id: "human-heart-circulation",
    subject: "biology",
    topic: "human-body",
    title: "Human Heart & Circulation",
    description: "Control heart rate and blood flow to understand the circulatory system.",
    dimension: "2d",
    difficulty: "intermediate",
    durationMinutes: 15,
    image: { uri: "https://picsum.photos/seed/human-heart-circulation/400/300" },
    parameters: [
      { key: "heartRate", label: "Heart Rate", unit: "bpm", min: 40, max: 180, step: 1, defaultValue: 72 },
      { key: "bloodPressure", label: "Blood Pressure", unit: "mmHg", min: 80, max: 180, step: 1, defaultValue: 120 },
    ],
  },
  {
    id: "dna-genetic-traits",
    subject: "biology",
    topic: "genetics",
    title: "DNA & Genetic Traits",
    description: "Cross parent traits and predict offspring genotypes with Punnett squares.",
    dimension: "2d",
    difficulty: "advanced",
    durationMinutes: 18,
    image: { uri: "https://picsum.photos/seed/dna-genetic-traits/400/300" },
    parameters: [
      { key: "alleleFrequency", label: "Dominant Allele Frequency", unit: "%", min: 0, max: 100, step: 1, defaultValue: 50 },
      { key: "mutationRate", label: "Mutation Rate", unit: "%", min: 0, max: 10, step: 0.5, defaultValue: 0 },
    ],
  },
  {
    id: "ecosystem-food-web",
    subject: "biology",
    topic: "ecology",
    title: "Ecosystem Food Web",
    description: "Adjust population sizes and watch predator-prey balance shift over time.",
    dimension: "2d",
    difficulty: "intermediate",
    durationMinutes: 12,
    image: { uri: "https://picsum.photos/seed/ecosystem-food-web/400/300" },
    parameters: [
      { key: "preyPopulation", label: "Prey Population", unit: "count", min: 10, max: 500, step: 10, defaultValue: 200 },
      { key: "predatorPopulation", label: "Predator Population", unit: "count", min: 1, max: 100, step: 1, defaultValue: 20 },
    ],
  },
  {
    id: "photosynthesis-lab",
    subject: "biology",
    topic: "plants",
    title: "Photosynthesis Lab",
    description: "Change light intensity and CO2 levels to measure the rate of photosynthesis.",
    dimension: "2d",
    difficulty: "beginner",
    durationMinutes: 10,
    image: { uri: "https://picsum.photos/seed/photosynthesis-lab/400/300" },
    parameters: [
      { key: "lightIntensity", label: "Light Intensity", unit: "klux", min: 0, max: 100, step: 5, defaultValue: 50 },
      { key: "co2Concentration", label: "CO₂ Concentration", unit: "ppm", min: 100, max: 2000, step: 50, defaultValue: 400 },
    ],
  },
];