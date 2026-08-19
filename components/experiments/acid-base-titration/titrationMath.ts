// Pure chemistry/visual-math helpers for the Acid-Base Titration lab (strong
// acid vs. strong base neutralization). No physics engine involved — this
// lab is titration-curve math plus SVG state, kept separate from rendering,
// matching AGENTS.md's 2D lab rule and the microscopeMath.ts precedent.

export const ACID_CONCENTRATION_RANGE = { min: 0.05, max: 0.5, step: 0.05, default: 0.1 } as const;
export const ACID_VOLUME_RANGE = { min: 10, max: 50, step: 1, default: 25 } as const;

// Standard NaOH titrant loaded in the burette — fixed, not student-adjustable.
// Only Acid Concentration/Volume are in scope for the student-facing sliders.
export const TITRANT_CONCENTRATION_M = 0.1;
export const BURETTE_CAPACITY_ML = 50;

export const SPEED_OPTIONS = [0.5, 1, 1.5, 2] as const;
export type SpeedOption = (typeof SPEED_OPTIONS)[number];

// mL of titrant dispensed per second of simulated time at 1.0x speed.
export const TITRATION_RATE_ML_PER_SEC = 2;

export type IndicatorId = "phenolphthalein";

// Dropdown intentionally holds just the one supported indicator — extensible
// for Methyl Orange etc. later, but that color-change logic isn't built yet.
export const INDICATOR_OPTIONS: { id: IndicatorId; label: string }[] = [
  { id: "phenolphthalein", label: "Phenolphthalein" },
];

const PHENOLPHTHALEIN_PH = 8.2;
const PH_MIN = 0;
const PH_MAX = 14;
const ROOM_TEMPERATURE_C = 25;
const MAX_TEMPERATURE_RISE_C = 4;

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export function molesOf(concentrationM: number, volumeML: number): number {
  return concentrationM * (volumeML / 1000);
}

// Strong acid + strong base titration curve — pH derived from the moles of
// H+/OH- actually left in solution after neutralization, not a lookup table.
export function calculatePH(
  acidConcentrationM: number,
  acidVolumeML: number,
  titrantVolumeML: number,
  titrantConcentrationM: number = TITRANT_CONCENTRATION_M
): number {
  const molesAcid = molesOf(acidConcentrationM, acidVolumeML);
  const molesBase = molesOf(titrantConcentrationM, titrantVolumeML);
  const totalVolumeL = (acidVolumeML + titrantVolumeML) / 1000;
  if (totalVolumeL <= 0) return 7;

  const EPS = 1e-9;
  const excessMoles = molesAcid - molesBase;

  if (excessMoles > EPS) {
    const hConcentration = excessMoles / totalVolumeL;
    return clamp(-Math.log10(hConcentration), PH_MIN, PH_MAX);
  }
  if (excessMoles < -EPS) {
    const ohConcentration = -excessMoles / totalVolumeL;
    const pOH = -Math.log10(ohConcentration);
    return clamp(14 - pOH, PH_MIN, PH_MAX);
  }
  return 7;
}

export function isEndpointReached(pH: number): boolean {
  return pH >= PHENOLPHTHALEIN_PH;
}

// 0 = colorless, 1 = fully faint-pink. Fades over a small pH band around the
// phenolphthalein threshold instead of snapping, so the flask color animates.
export function indicatorPinkProgress(pH: number): number {
  const FADE_START = 8.0;
  const FADE_END = 8.6;
  return clamp((pH - FADE_START) / (FADE_END - FADE_START), 0, 1);
}

// Simple exothermic-neutralization model: temperature rises with the
// fraction of acid actually neutralized so far. Not a full thermodynamics
// simulation — just enough to make the readout state-driven, not hardcoded.
export function calculateTemperatureC(
  acidConcentrationM: number,
  acidVolumeML: number,
  titrantVolumeML: number,
  titrantConcentrationM: number = TITRANT_CONCENTRATION_M
): number {
  const molesAcid = molesOf(acidConcentrationM, acidVolumeML);
  const molesBase = molesOf(titrantConcentrationM, titrantVolumeML);
  const molesReacted = Math.min(molesAcid, molesBase);
  const fractionReacted = molesAcid > 0 ? molesReacted / molesAcid : 0;
  return ROOM_TEMPERATURE_C + fractionReacted * MAX_TEMPERATURE_RISE_C;
}

// Theoretical volume of titrant needed to fully neutralize the acid — used
// to scale the titration curve chart and as a reference point for Results.
export function equivalenceVolumeML(
  acidConcentrationM: number,
  acidVolumeML: number,
  titrantConcentrationM: number = TITRANT_CONCENTRATION_M
): number {
  if (titrantConcentrationM <= 0) return 0;
  return (molesOf(acidConcentrationM, acidVolumeML) / titrantConcentrationM) * 1000;
}

// C1V1 = C2V2, solved for the analyte's concentration from the titrant
// actually delivered so far — mirrors the Results tab's "Calculations" card.
export function analyteConcentrationM(
  titrantConcentrationM: number,
  titrantVolumeML: number,
  analyteVolumeML: number
): number {
  return analyteVolumeML > 0 ? (titrantConcentrationM * titrantVolumeML) / analyteVolumeML : 0;
}

export function buretteFillFraction(buretteVolumeML: number): number {
  return clamp(1 - buretteVolumeML / BURETTE_CAPACITY_ML, 0, 1);
}

export function flaskLiquidVolumeML(acidVolumeML: number, buretteVolumeML: number): number {
  return acidVolumeML + buretteVolumeML;
}

const FLASK_VISUAL_CAPACITY_ML = 80;

// How full the flask should look, as a 0-1 fraction of its drawable height —
// grows with the real combined acid + titrant volume rather than a fixed image.
export function flaskFillFraction(totalLiquidVolumeML: number): number {
  return clamp(totalLiquidVolumeML / FLASK_VISUAL_CAPACITY_ML, 0, 1);
}
