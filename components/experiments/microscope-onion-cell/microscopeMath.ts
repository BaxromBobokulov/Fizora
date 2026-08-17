import type { MicroscopeMagnification } from "@/types/microscope";

// Pure helpers for the microscope viewport's visual-state math (blur amount,
// light overlay opacities, stage pan). No physics engine involved — this is
// image swapping/blur/overlay/transform only, kept separate from rendering
// per AGENTS.md.

export const MICROSCOPE_RANGE = { min: 0, max: 100, step: 1 } as const;

export const MAGNIFICATION_OPTIONS: MicroscopeMagnification[] = [100, 400, 1000];

export const SPEED_OPTIONS = [0.5, 1, 1.5, 2] as const;
export type SpeedOption = (typeof SPEED_OPTIONS)[number];

export const ZOOM_OPTIONS = [1, 1.5, 2] as const;
export type ZoomOption = (typeof ZOOM_OPTIONS)[number];

const BLUR_MULTIPLIER = 1.6;
// expo-blur's `intensity` prop is 0-100 — capped short of 100 so the specimen
// is always at least faintly visible, never fully obscured.
const MAX_BLUR_INTENSITY = 90;

export function focusBlurIntensity(focus: number, idealFocus: number): number {
  return Math.min(MAX_BLUR_INTENSITY, Math.abs(focus - idealFocus) * BLUR_MULTIPLIER);
}

const MAX_DIM_OPACITY = 0.65;
const MAX_OVEREXPOSED_OPACITY = 0.55;
const MIDPOINT = 50;

// Below the midpoint, a black overlay dims the view (opacity falls to 0 at
// the midpoint); above it, a white overlay washes it out — so the slider
// reads like a real light dial rather than a linear dimmer.
export function lightOverlayOpacities(lightIntensity: number): { dim: number; overexposed: number } {
  const dim = lightIntensity < MIDPOINT ? ((MIDPOINT - lightIntensity) / MIDPOINT) * MAX_DIM_OPACITY : 0;
  const overexposed =
    lightIntensity > MIDPOINT ? ((lightIntensity - MIDPOINT) / MIDPOINT) * MAX_OVEREXPOSED_OPACITY : 0;
  return { dim, overexposed };
}

export function illuminationLabel(lightIntensity: number): "Low" | "Medium" | "High" {
  if (lightIntensity < 34) return "Low";
  if (lightIntensity <= 66) return "Medium";
  return "High";
}

// Maps the 0-100 stage slider to a pixel pan offset, capped by maxPanPx so
// the specimen image's edge never clears the circular viewport's bounds.
export function stagePanPx(stageValue: number, maxPanPx: number): number {
  return ((stageValue - MIDPOINT) / MIDPOINT) * maxPanPx;
}

// Focus level expressed the way Results-style summaries read it back (used
// by Observation Info / Results tab): distance from ideal, inverted to a
// 0-100 "closeness to sharp" percentage.
export function focusClarityPercent(focus: number, idealFocus: number): number {
  const deviation = Math.abs(focus - idealFocus);
  return Math.max(0, Math.round(100 - deviation * BLUR_MULTIPLIER));
}
