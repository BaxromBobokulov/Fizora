import { create } from "zustand";

import { PENDULUM_DEFAULTS, type SpeedOption } from "@/data/physics/mechanics/pendulum-motion";

export type PendulumRun = {
  length: number;
  mass: number;
  gravity: number;
  period: number;
  frequency: number;
  velocity: number;
};

type PendulumExperimentState = {
  length: number;
  mass: number;
  gravity: number;
  isPlaying: boolean;
  speed: SpeedOption;
  runs: PendulumRun[];

  setLength: (value: number) => void;
  setMass: (value: number) => void;
  setGravity: (value: number) => void;
  setSpeed: (value: SpeedOption) => void;
  play: () => void;
  pause: () => void;
  togglePlay: () => void;
  reset: () => void;
  recordRun: (run: PendulumRun) => void;
};

export const usePendulumExperimentStore = create<PendulumExperimentState>((set) => ({
  length: PENDULUM_DEFAULTS.length,
  mass: PENDULUM_DEFAULTS.mass,
  gravity: PENDULUM_DEFAULTS.gravity,
  isPlaying: false,
  speed: 1,
  runs: [],

  // Length/gravity changes reshape the constraint & world gravity, so the swing
  // pauses until the student presses Play again to see the new setup in motion.
  setLength: (value) => set({ length: value, isPlaying: false }),
  setGravity: (value) => set({ gravity: value, isPlaying: false }),
  // Mass hot-swaps on the live body without touching geometry, so it can apply
  // while the pendulum keeps swinging.
  setMass: (value) => set({ mass: value }),
  setSpeed: (value) => set({ speed: value }),

  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  reset: () => set({ isPlaying: false }),

  recordRun: (run) =>
    set((state) => {
      const existingIndex = state.runs.findIndex(
        (existing) => Math.abs(existing.length - run.length) < 1e-6
      );
      if (existingIndex === -1) {
        return { runs: [...state.runs, run] };
      }
      const runs = [...state.runs];
      runs[existingIndex] = run;
      return { runs };
    }),
}));
