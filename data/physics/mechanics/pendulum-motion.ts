// Physics setup for the Pendulum Motion lab (data/physics/mechanics/pendulum-motion.ts),
// kept separate from rendering per AGENTS.md. The simulation itself runs on matter.js
// (see components/experiments/pendulum-motion/usePendulumSimulation.ts); this file holds
// the constants and formulas used to both drive and validate that simulation.

// Fixed pivot in simulation-space meters. The world runs entirely in meters — pixel
// conversion happens only at render time — so matter.js's gravity/constraint math stays
// in real SI units instead of matter's usual pixel-tuned defaults.
export const PIVOT = { x: 0, y: 0 } as const;

// Release angle is fixed (not user-adjustable) so the small-angle approximation
// T = 2π√(L/g) stays visually accurate, per AGENTS.md's 3D/2D accuracy rules.
export const RELEASE_ANGLE_DEG = 20;
export const RELEASE_ANGLE_RAD = (RELEASE_ANGLE_DEG * Math.PI) / 180;

// matter.js's Verlet integrator treats the `delta` passed to Engine.update as the
// literal per-step time unit (squared into the position update), so passing real
// seconds here — combined with gravity.scale = g — produces SI-accurate motion.
export const FIXED_DT_SECONDS = 1 / 60;

export type GravityPreset = {
  id: "earth" | "moon" | "mars";
  label: string;
  value: number;
};

export const GRAVITY_PRESETS: GravityPreset[] = [
  { id: "earth", label: "Earth", value: 9.81 },
  { id: "moon", label: "Moon", value: 1.62 },
  { id: "mars", label: "Mars", value: 3.71 },
];

export const SPEED_OPTIONS = [0.5, 1, 1.5, 2] as const;
export type SpeedOption = (typeof SPEED_OPTIONS)[number];

export const PENDULUM_DEFAULTS = {
  length: 1,
  mass: 1,
  gravity: 9.81,
} as const;

export const PENDULUM_RANGES = {
  length: { min: 0.2, max: 2, step: 0.05 },
  mass: { min: 0.1, max: 5, step: 0.1 },
  gravity: { min: 1, max: 20, step: 0.1 },
} as const;

// T = 2π√(L/g) — small-angle approximation, matches the fixed ~20° release angle.
export function theoreticalPeriod(length: number, gravity: number): number {
  return 2 * Math.PI * Math.sqrt(length / gravity);
}

export function theoreticalFrequency(period: number): number {
  return period === 0 ? 0 : 1 / period;
}

// Max bob speed at the bottom of the swing, from energy conservation:
// (1/2)v² = gL(1 − cosθ₀). Used only for the Theory tab's static curve —
// live readouts prefer the actual simulated velocity, per AGENTS.md.
export function theoreticalMaxVelocity(
  length: number,
  gravity: number,
  angleRad: number = RELEASE_ANGLE_RAD
): number {
  return Math.sqrt(2 * gravity * length * (1 - Math.cos(angleRad)));
}

export function bobStartPosition(length: number): { x: number; y: number } {
  return {
    x: PIVOT.x + length * Math.sin(RELEASE_ANGLE_RAD),
    y: PIVOT.y + length * Math.cos(RELEASE_ANGLE_RAD),
  };
}

export function swingExtremes(length: number): {
  left: { x: number; y: number };
  right: { x: number; y: number };
} {
  return {
    left: {
      x: PIVOT.x - length * Math.sin(RELEASE_ANGLE_RAD),
      y: PIVOT.y + length * Math.cos(RELEASE_ANGLE_RAD),
    },
    right: {
      x: PIVOT.x + length * Math.sin(RELEASE_ANGLE_RAD),
      y: PIVOT.y + length * Math.cos(RELEASE_ANGLE_RAD),
    },
  };
}