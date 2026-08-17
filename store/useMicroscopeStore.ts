import { create } from "zustand";

import type { MicroscopeMagnification, MicroscopeTool } from "@/types/microscope";
import type { SpeedOption } from "@/components/experiments/microscope-onion-cell/microscopeMath";

type MicroscopeState = {
  magnification: MicroscopeMagnification;
  focus: number;
  lightIntensity: number;
  stageX: number;
  stageY: number;
  zoom: number;
  isPlaying: boolean;
  speed: SpeedOption;
  activeTool: MicroscopeTool;
  // Bumped by reset() — components watch this to snap running animations
  // (granule drift) back to their initial state, since reanimated shared
  // values don't reset on their own just because isPlaying flips.
  resetEpoch: number;

  setMagnification: (value: MicroscopeMagnification) => void;
  setFocus: (value: number) => void;
  setLightIntensity: (value: number) => void;
  setStageX: (value: number) => void;
  setStageY: (value: number) => void;
  setZoom: (value: number) => void;
  setSpeed: (value: SpeedOption) => void;
  setActiveTool: (value: MicroscopeTool) => void;
  togglePlaying: () => void;
  reset: () => void;
};

const DEFAULTS = {
  magnification: 400 as MicroscopeMagnification,
  focus: 50,
  lightIntensity: 50,
  stageX: 50,
  stageY: 50,
  zoom: 1,
  isPlaying: false,
  speed: 1 as SpeedOption,
  activeTool: "cursor" as MicroscopeTool,
};

// Per-session viewport state for the Microscope experiment screen only — not
// persisted, and not folded into useProgressStore. The screen resets it on
// mount/unmount so re-entering the lab always starts from a clean slate.
export const useMicroscopeStore = create<MicroscopeState>((set) => ({
  ...DEFAULTS,
  resetEpoch: 0,

  setMagnification: (value) => set({ magnification: value }),
  setFocus: (value) => set({ focus: value }),
  setLightIntensity: (value) => set({ lightIntensity: value }),
  setStageX: (value) => set({ stageX: value }),
  setStageY: (value) => set({ stageY: value }),
  setZoom: (value) => set({ zoom: value }),
  setSpeed: (value) => set({ speed: value }),
  setActiveTool: (value) => set({ activeTool: value }),
  togglePlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
  reset: () => set((state) => ({ ...DEFAULTS, resetEpoch: state.resetEpoch + 1 })),
}));
