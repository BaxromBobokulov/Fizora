import { images } from "@/constants/images";
import type { Lab } from "@/types/lab";

export const mechanicsLabs: Lab[] = [
  {
    id: "newtons-first-law",
    subject: "physics",
    topic: "mechanics",
    title: "Newton's First Law",
    description:
      "Explore inertia and understand how objects keep their state of motion.",
    dimension: "2d",
    difficulty: "beginner",
    durationMinutes: 15,
    image: images.newtonsFirstLawToy,
    parameters: [
      { key: "initialVelocity", label: "Initial Velocity", unit: "m/s", min: 0, max: 10, step: 0.5, defaultValue: 3 },
      { key: "mass", label: "Mass", unit: "kg", min: 0.1, max: 5, step: 0.1, defaultValue: 1 },
      { key: "friction", label: "Friction", unit: "coeff", min: 0, max: 1, step: 0.05, defaultValue: 0.1 },
    ],
  },
  {
    id: "pendulum-motion",
    subject: "physics",
    topic: "mechanics",
    title: "Pendulum Motion",
    description: "Study the motion of a pendulum and understand its principles.",
    dimension: "2d",
    difficulty: "beginner",
    durationMinutes: 10,
    image: images.homePendulumToy,
    parameters: [
      { key: "length", label: "String Length", unit: "m", min: 0.2, max: 2, step: 0.1, defaultValue: 1 },
      { key: "angle", label: "Release Angle", unit: "°", min: 5, max: 60, step: 1, defaultValue: 20 },
      { key: "gravity", label: "Gravity", unit: "m/s²", min: 1, max: 20, step: 0.1, defaultValue: 9.8 },
    ],
  },
  {
    id: "projectile-motion",
    subject: "physics",
    topic: "mechanics",
    title: "Projectile Motion",
    description: "Launch objects and analyze trajectory, range, and max height.",
    dimension: "3d",
    difficulty: "intermediate",
    durationMinutes: 12,
    // Placeholder photo pending a real illustration — swap for a proper Tulki-style asset.
    image: { uri: "https://picsum.photos/seed/projectile-motion/400/300" },
    parameters: [
      { key: "launchAngle", label: "Launch Angle", unit: "°", min: 0, max: 90, step: 1, defaultValue: 45 },
      { key: "initialSpeed", label: "Initial Speed", unit: "m/s", min: 1, max: 50, step: 1, defaultValue: 20 },
      { key: "gravity", label: "Gravity", unit: "m/s²", min: 1, max: 20, step: 0.1, defaultValue: 9.8 },
    ],
  },
  {
    id: "free-fall-gravity",
    subject: "physics",
    topic: "mechanics",
    title: "Free Fall & Gravity",
    description: "Drop objects and measure acceleration due to gravity.",
    dimension: "2d",
    difficulty: "beginner",
    durationMinutes: 8,
    image: images.homeGravity,
    parameters: [
      { key: "height", label: "Drop Height", unit: "m", min: 1, max: 100, step: 1, defaultValue: 20 },
      { key: "mass", label: "Mass", unit: "kg", min: 0.1, max: 10, step: 0.1, defaultValue: 1 },
      { key: "airResistance", label: "Air Resistance", unit: "coeff", min: 0, max: 1, step: 0.05, defaultValue: 0 },
    ],
  },
];