import { images } from "@/constants/images";
import type { Lab } from "@/types/lab";

// The remaining images below are placeholder photos pending real Tulki-style illustrations.
export const opticsLabs: Lab[] = [
  {
    id: "lens-refraction",
    topic: "optics",
    title: "Lens Refraction",
    description: "Pass light through converging and diverging lenses and trace the rays.",
    dimension: "3d",
    difficulty: "intermediate",
    durationMinutes: 15,
    image: { uri: "https://picsum.photos/seed/lens-refraction/400/300" },
    parameters: [
      { key: "focalLength", label: "Focal Length", unit: "cm", min: 5, max: 50, step: 1, defaultValue: 15 },
      { key: "objectDistance", label: "Object Distance", unit: "cm", min: 5, max: 100, step: 1, defaultValue: 30 },
    ],
  },
  {
    id: "light-prism-dispersion",
    topic: "optics",
    title: "Light Dispersion Through a Prism",
    description: "Split white light into a spectrum using a glass prism.",
    dimension: "3d",
    difficulty: "beginner",
    durationMinutes: 10,
    image: images.opticsLabIcon,
    parameters: [
      { key: "incidentAngle", label: "Incident Angle", unit: "°", min: 0, max: 90, step: 1, defaultValue: 30 },
      { key: "prismAngle", label: "Prism Angle", unit: "°", min: 30, max: 90, step: 1, defaultValue: 60 },
    ],
  },
  {
    id: "mirror-reflection",
    topic: "optics",
    title: "Mirror Reflection Laws",
    description: "Explore the law of reflection using plane and curved mirrors.",
    dimension: "2d",
    difficulty: "beginner",
    durationMinutes: 8,
    image: { uri: "https://picsum.photos/seed/mirror-reflection/400/300" },
    parameters: [
      { key: "incidentAngle", label: "Incident Angle", unit: "°", min: 0, max: 90, step: 1, defaultValue: 40 },
    ],
  },
  {
    id: "total-internal-reflection",
    topic: "optics",
    title: "Total Internal Reflection",
    description: "Find the critical angle where light stops refracting and fully reflects.",
    dimension: "3d",
    difficulty: "advanced",
    durationMinutes: 16,
    image: { uri: "https://picsum.photos/seed/total-internal-reflection/400/300" },
    parameters: [
      { key: "refractiveIndex1", label: "Refractive Index 1", unit: "n", min: 1, max: 2.5, step: 0.05, defaultValue: 1.5 },
      { key: "refractiveIndex2", label: "Refractive Index 2", unit: "n", min: 1, max: 2.5, step: 0.05, defaultValue: 1 },
      { key: "incidentAngle", label: "Incident Angle", unit: "°", min: 0, max: 90, step: 1, defaultValue: 45 },
    ],
  },
];