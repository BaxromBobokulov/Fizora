import { create } from "zustand";

import { NEWTONS_LAW_DEFAULTS, type SpeedOption } from "@/data/physics/mechanics/newtons-first-law";

export type NewtonsLawRun = {
  initialVelocity: number;
  mass: number;
  friction: number;
  frictionless: boolean;
  finalVelocity: number;
  distanceTraveled: number;
  timeToStop: number | null;
};

type NewtonsLawExperimentState = {
  initialVelocity: number;
  mass: number;
  friction: number;
  frictionless: boolean;
  isPlaying: boolean;
  speed: SpeedOption;
  runs: NewtonsLawRun[];

  setInitialVelocity: (value: number) => void;
  setMass: (value: number) => void;
  setFriction: (value: number) => void;
  setFrictionless: (value: boolean) => void;
  setSpeed: (value: SpeedOption) => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  reset: () => void;
  recordRun: (run: NewtonsLawRun) => void;
};

export const useNewtonsLawExperimentStore = create<NewtonsLawExperimentState>((set) => ({
  initialVelocity: NEWTONS_LAW_DEFAULTS.initialVelocity,
  mass: NEWTONS_LAW_DEFAULTS.mass,
  friction: NEWTONS_LAW_DEFAULTS.friction,
  frictionless: NEWTONS_LAW_DEFAULTS.frictionless,
  isPlaying: false,
  speed: 1,
  runs: [],

  // Initial velocity, friction, and the frictionless toggle all define the puck's
  // starting condition/surface, so changing them pauses the run until Play is
  // pressed again to see the new setup from a fresh start.
  setInitialVelocity: (value) => set({ initialVelocity: value, isPlaying: false }),
  setFriction: (value) => set({ friction: value, isPlaying: false }),
  setFrictionless: (value) => set({ frictionless: value, isPlaying: false }),
  // Mass hot-swaps on the live body without touching the surface setup — friction
  // deceleration (a = μg) doesn't depend on mass, so this can apply mid-run.
  setMass: (value) => set({ mass: value }),
  setSpeed: (value) => set({ speed: value }),

  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  reset: () => set({ isPlaying: false }),

  recordRun: (run) =>
    set((state) => {
      const existingIndex = state.runs.findIndex(
        (existing) =>
          Math.abs(existing.initialVelocity - run.initialVelocity) < 1e-6 &&
          Math.abs(existing.friction - run.friction) < 1e-6 &&
          existing.frictionless === run.frictionless
      );
      if (existingIndex === -1) {
        return { runs: [...state.runs, run] };
      }
      const runs = [...state.runs];
      runs[existingIndex] = run;
      return { runs };
    }),
}));
