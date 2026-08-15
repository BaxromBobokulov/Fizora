import { useCallback, useEffect, useRef, useState } from "react";
import Matter from "matter-js";

import {
  FIXED_DT_SECONDS,
  PIVOT,
  bobStartPosition,
} from "@/data/physics/mechanics/pendulum-motion";

export type PendulumFrame = {
  bobX: number;
  bobY: number;
  liveVelocity: number;
};

export type PeriodMeasurement = {
  period: number;
  velocity: number;
};

type UsePendulumSimulationArgs = {
  length: number;
  mass: number;
  gravity: number;
  speed: number;
  isPlaying: boolean;
  onPeriodMeasured: (measurement: PeriodMeasurement) => void;
};

export function usePendulumSimulation({
  length,
  mass,
  gravity,
  speed,
  isPlaying,
  onPeriodMeasured,
}: UsePendulumSimulationArgs) {
  const engineRef = useRef(Matter.Engine.create({ gravity: { x: 0, y: 1, scale: gravity } }));
  const bobRef = useRef<Matter.Body | null>(null);
  const rafRef = useRef<number | null>(null);

  const simTimeRef = useRef(0);
  const lastCrossingTimeRef = useRef<number | null>(null);
  const maxSpeedSinceCrossingRef = useRef(0);
  const prevSideRef = useRef<-1 | 0 | 1>(1);

  const onPeriodMeasuredRef = useRef(onPeriodMeasured);
  useEffect(() => {
    onPeriodMeasuredRef.current = onPeriodMeasured;
  }, [onPeriodMeasured]);

  const [frame, setFrame] = useState<PendulumFrame>(() => {
    const start = bobStartPosition(length);
    return { bobX: start.x, bobY: start.y, liveVelocity: 0 };
  });

  const buildWorld = useCallback((len: number, m: number, g: number) => {
    const engine = engineRef.current;
    Matter.World.clear(engine.world, false);
    engine.gravity.x = 0;
    engine.gravity.y = 1;
    engine.gravity.scale = g;

    const start = bobStartPosition(len);
    const bob = Matter.Bodies.circle(start.x, start.y, 0.05, {
      mass: m,
      frictionAir: 0,
      friction: 0,
      frictionStatic: 0,
      restitution: 0,
    });
    Matter.Body.setInertia(bob, Infinity);

    const rod = Matter.Constraint.create({
      pointA: { x: PIVOT.x, y: PIVOT.y },
      bodyB: bob,
      length: len,
      stiffness: 1,
      damping: 0,
    });

    Matter.World.add(engine.world, [bob, rod]);
    bobRef.current = bob;

    simTimeRef.current = 0;
    lastCrossingTimeRef.current = null;
    maxSpeedSinceCrossingRef.current = 0;
    prevSideRef.current = start.x >= PIVOT.x ? 1 : -1;

    setFrame({ bobX: start.x, bobY: start.y, liveVelocity: 0 });
  }, []);

  // Length/gravity change the constraint geometry and world gravity, so the world
  // is rebuilt from rest. Mass hot-swaps separately below without disturbing motion.
  useEffect(() => {
    buildWorld(length, mass, gravity);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mass intentionally excluded, handled by the effect below
  }, [length, gravity, buildWorld]);

  useEffect(() => {
    const bob = bobRef.current;
    if (bob) Matter.Body.setMass(bob, mass);
  }, [mass]);

  useEffect(() => {
    if (!isPlaying) return;

    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      const engine = engineRef.current;
      const bob = bobRef.current;
      const dt = FIXED_DT_SECONDS * speed;

      Matter.Engine.update(engine, dt);

      if (bob) {
        const vx = bob.velocity.x / dt;
        const vy = bob.velocity.y / dt;
        const liveVelocity = Math.hypot(vx, vy);

        simTimeRef.current += dt;
        maxSpeedSinceCrossingRef.current = Math.max(
          maxSpeedSinceCrossingRef.current,
          liveVelocity
        );

        const offset = bob.position.x - PIVOT.x;
        const side: -1 | 0 | 1 = offset > 0 ? 1 : offset < 0 ? -1 : 0;
        if (side !== 0 && side !== prevSideRef.current) {
          if (side === 1) {
            if (lastCrossingTimeRef.current !== null) {
              const period = simTimeRef.current - lastCrossingTimeRef.current;
              onPeriodMeasuredRef.current({
                period,
                velocity: maxSpeedSinceCrossingRef.current,
              });
            }
            lastCrossingTimeRef.current = simTimeRef.current;
            maxSpeedSinceCrossingRef.current = 0;
          }
          prevSideRef.current = side;
        }

        setFrame({ bobX: bob.position.x, bobY: bob.position.y, liveVelocity });
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, speed]);

  const reset = useCallback(() => {
    buildWorld(length, mass, gravity);
  }, [buildWorld, length, mass, gravity]);

  return { frame, reset };
}