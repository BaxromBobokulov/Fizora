// Physics setup for the Newton's First Law lab (data/physics/mechanics/newtons-first-law.ts),
// kept separate from rendering per AGENTS.md. The simulation itself runs on matter.js
// (see components/experiments/newtons-first-law/useNewtonsLawSimulation.ts): a puck rests
// on a static ground body under gravity, and matter.js's own contact friction — not a
// hand-rolled kinematics loop — decelerates it. This file holds the constants and
// closed-form formulas used to both drive and validate that simulation.

// World runs entirely in meters — pixel conversion happens only at render time — so
// matter.js's gravity/friction math stays in real SI units instead of matter's usual
// pixel-tuned defaults. y is down-positive, matching the pendulum lab's convention.
export const GRAVITY = 9.81;

export const PUCK_RADIUS = 0.15;
export const GROUND_HALF_HEIGHT = 0.3;
// Puck y is fixed at 0; ground sits just below it so the puck rests on its surface.
export const PUCK_Y = 0;
export const GROUND_Y = PUCK_Y + PUCK_RADIUS + GROUND_HALF_HEIGHT;

// The track loops: once the puck crosses TRACK_LENGTH it's teleported back to
// START_X with its velocity untouched. This only recycles the x position for
// rendering inside a fixed-width canvas — friction and velocity in matter.js
// depend on contact/speed, never on x — so it doesn't fake or alter the physics.
export const TRACK_LENGTH = 4;
export const START_X = 0.4;

export const FIXED_DT_SECONDS = 1 / 60;

export const SPEED_OPTIONS = [0.5, 1, 1.5, 2] as const;
export type SpeedOption = (typeof SPEED_OPTIONS)[number];

export const NEWTONS_LAW_DEFAULTS = {
  initialVelocity: 3,
  mass: 1,
  friction: 0.1,
  frictionless: false,
} as const;

export const NEWTONS_LAW_RANGES = {
  initialVelocity: { min: 0, max: 10, step: 0.5 },
  mass: { min: 0.1, max: 5, step: 0.1 },
  friction: { min: 0, max: 1, step: 0.05 },
} as const;

// a = μg — kinetic friction deceleration is independent of mass (the mass term
// cancels: F = μmg, a = F/m = μg), which is why the Mass slider changes momentum
// but not how fast the puck slows down.
export function frictionDeceleration(friction: number, gravity: number = GRAVITY): number {
  return friction * gravity;
}

export function theoreticalStopTime(initialVelocity: number, friction: number): number | null {
  const a = frictionDeceleration(friction);
  if (a <= 0) return null;
  return initialVelocity / a;
}

export function theoreticalStopDistance(initialVelocity: number, friction: number): number | null {
  const a = frictionDeceleration(friction);
  if (a <= 0) return null;
  return (initialVelocity * initialVelocity) / (2 * a);
}

export function theoreticalVelocityAtTime(
  initialVelocity: number,
  friction: number,
  t: number
): number {
  const a = frictionDeceleration(friction);
  return Math.max(0, initialVelocity - a * t);
}
