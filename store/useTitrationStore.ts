import { create } from "zustand";

import {
  ACID_CONCENTRATION_RANGE,
  ACID_VOLUME_RANGE,
  BURETTE_CAPACITY_ML,
  type IndicatorId,
  type SpeedOption,
} from "@/components/experiments/acid-base-titration/titrationMath";

export type TitrationTool = "cursor" | "dropper" | "ruler";

type TitrationState = {
  acidConcentration: number;
  acidVolume: number;
  buretteVolumeML: number;
  indicator: IndicatorId;
  isPlaying: boolean;
  speed: SpeedOption;
  activeTool: TitrationTool;
  // Bumped by reset() so components (e.g. the flask's drop/swirl animation)
  // can snap back to their initial state, same convention as useMicroscopeStore.
  resetEpoch: number;

  setAcidConcentration: (value: number) => void;
  setAcidVolume: (value: number) => void;
  setIndicator: (value: IndicatorId) => void;
  setSpeed: (value: SpeedOption) => void;
  setActiveTool: (value: TitrationTool) => void;
  advanceBurette: (deltaML: number) => void;
  togglePlaying: () => void;
  reset: () => void;
};

const DEFAULTS = {
  acidConcentration: ACID_CONCENTRATION_RANGE.default,
  acidVolume: ACID_VOLUME_RANGE.default,
  buretteVolumeML: 0,
  indicator: "phenolphthalein" as IndicatorId,
  isPlaying: false,
  speed: 1 as SpeedOption,
  activeTool: "cursor" as TitrationTool,
};

// Per-session state for the Titration experiment screen only — not persisted,
// and not folded into useProgressStore. The screen resets it on mount/unmount
// so re-entering the lab always starts from a clean slate (see useMicroscopeStore).
export const useTitrationStore = create<TitrationState>((set, get) => ({
  ...DEFAULTS,
  resetEpoch: 0,

  setAcidConcentration: (value) => set({ acidConcentration: value }),
  setAcidVolume: (value) => set({ acidVolume: value }),
  setIndicator: (value) => set({ indicator: value }),
  setSpeed: (value) => set({ speed: value }),
  setActiveTool: (value) => set({ activeTool: value }),

  advanceBurette: (deltaML) => {
    const next = Math.min(BURETTE_CAPACITY_ML, get().buretteVolumeML + deltaML);
    set({ buretteVolumeML: next, isPlaying: next >= BURETTE_CAPACITY_ML ? false : get().isPlaying });
  },

  togglePlaying: () => set((state) => ({ isPlaying: !state.isPlaying })),
  reset: () => set((state) => ({ ...DEFAULTS, resetEpoch: state.resetEpoch + 1 })),
}));
