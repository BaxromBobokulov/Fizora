import { useEffect, useRef } from "react";

import { TITRATION_RATE_ML_PER_SEC } from "./titrationMath";

type UseTitrationSimulationArgs = {
  isPlaying: boolean;
  speed: number;
  onAdvance: (deltaML: number) => void;
};

// Drives the burette's dispensed volume forward over real elapsed time while
// playing — a constant-rate drip, not a physics engine. AGENTS.md only
// requires matter.js for mechanics-style 2D labs; this one is chemistry state
// advancing over time, so a plain rAF loop is enough (mirrors the shape of
// usePendulumSimulation's tick loop without the Matter.js world).
export function useTitrationSimulation({ isPlaying, speed, onAdvance }: UseTitrationSimulationArgs) {
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const onAdvanceRef = useRef(onAdvance);

  useEffect(() => {
    onAdvanceRef.current = onAdvance;
  }, [onAdvance]);

  useEffect(() => {
    if (!isPlaying) {
      lastTimeRef.current = null;
      return;
    }

    let cancelled = false;

    const tick = (time: number) => {
      if (cancelled) return;
      if (lastTimeRef.current !== null) {
        const dtSeconds = (time - lastTimeRef.current) / 1000;
        onAdvanceRef.current(dtSeconds * speed * TITRATION_RATE_ML_PER_SEC);
      }
      lastTimeRef.current = time;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      lastTimeRef.current = null;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, speed]);
}
