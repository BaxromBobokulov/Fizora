import { useCallback, useEffect, useRef, useState } from "react";
import Matter from "matter-js";

import {
  FIXED_DT_SECONDS,
  GRAVITY,
  GROUND_HALF_HEIGHT,
  GROUND_Y,
  PUCK_RADIUS,
  PUCK_Y,
  START_X,
  TRACK_LENGTH,
} from "@/data/physics/mechanics/newtons-first-law";

export type NewtonsLawFrame = {
  puckX: number;
  puckY: number;
  velocity: number;
  distanceTraveled: number;
};

export type MotionMeasurement = {
  finalVelocity: number;
  distanceTraveled: number;
  timeToStop: number | null;
};

// Below this speed the puck is considered visually at rest — matter.js contact
// friction asymptotically approaches zero rather than hitting it exactly.
const STOP_EPSILON = 0.05;

type UseNewtonsLawSimulationArgs = {
  initialVelocity: number;
  mass: number;
  friction: number;
  frictionless: boolean;
  speed: number;
  isPlaying: boolean;
  onMotionMeasured: (measurement: MotionMeasurement) => void;
};

export function useNewtonsLawSimulation({
  initialVelocity,
  mass,
  friction,
  frictionless,
  speed,
  isPlaying,
  onMotionMeasured,
}: UseNewtonsLawSimulationArgs) {
  const engineRef = useRef(Matter.Engine.create({ gravity: { x: 0, y: 1, scale: GRAVITY } }));
  const puckRef = useRef<Matter.Body | null>(null);
  const rafRef = useRef<number | null>(null);

  const simTimeRef = useRef(0);
  const distanceRef = useRef(0);
  const hasStoppedRef = useRef(false);
  const initialVelocityRef = useRef(initialVelocity);

  const onMotionMeasuredRef = useRef(onMotionMeasured);
  useEffect(() => {
    onMotionMeasuredRef.current = onMotionMeasured;
  }, [onMotionMeasured]);

  const [frame, setFrame] = useState<NewtonsLawFrame>({
    puckX: START_X,
    puckY: PUCK_Y,
    velocity: 0,
    distanceTraveled: 0,
  });

  const buildWorld = useCallback(
    (v0: number, m: number, frictionCoeff: number, isFrictionless: boolean) => {
      const engine = engineRef.current;
      Matter.World.clear(engine.world, false);
      engine.gravity.x = 0;
      engine.gravity.y = 1;
      engine.gravity.scale = GRAVITY;

      const effectiveFriction = isFrictionless ? 0 : frictionCoeff;

      const ground = Matter.Bodies.rectangle(
        TRACK_LENGTH / 2,
        GROUND_Y,
        TRACK_LENGTH + PUCK_RADIUS * 4,
        GROUND_HALF_HEIGHT * 2,
        { isStatic: true, friction: effectiveFriction, frictionStatic: effectiveFriction, restitution: 0 }
      );

      const puck = Matter.Bodies.circle(START_X, PUCK_Y, PUCK_RADIUS, {
        mass: m,
        friction: effectiveFriction,
        frictionStatic: effectiveFriction,
        frictionAir: 0,
        restitution: 0,
      });
      Matter.Body.setVelocity(puck, { x: v0, y: 0 });

      Matter.World.add(engine.world, [ground, puck]);
      puckRef.current = puck;

      simTimeRef.current = 0;
      distanceRef.current = 0;
      hasStoppedRef.current = false;
      initialVelocityRef.current = v0;

      setFrame({ puckX: START_X, puckY: PUCK_Y, velocity: v0, distanceTraveled: 0 });
    },
    []
  );

  // Initial velocity, friction and the frictionless toggle all define the puck's
  // starting condition or surface, so the world is rebuilt from rest. Mass
  // hot-swaps separately below without disturbing the current run.
  useEffect(() => {
    buildWorld(initialVelocity, mass, friction, frictionless);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mass intentionally excluded, handled by the effect below
  }, [initialVelocity, friction, frictionless, buildWorld]);

  useEffect(() => {
    const puck = puckRef.current;
    if (puck) Matter.Body.setMass(puck, mass);
  }, [mass]);

  useEffect(() => {
    if (!isPlaying) return;

    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      const engine = engineRef.current;
      const puck = puckRef.current;
      const dt = FIXED_DT_SECONDS * speed;

      Matter.Engine.update(engine, dt);

      if (puck) {
        const vx = puck.velocity.x / dt;
        const vy = puck.velocity.y / dt;
        const currentSpeed = Math.hypot(vx, vy);

        simTimeRef.current += dt;
        distanceRef.current += currentSpeed * dt;

        // The track loops: crossing TRACK_LENGTH teleports x back to the start
        // without touching velocity, so a frictionless puck can be watched
        // indefinitely inside a fixed-width canvas (see data file comment).
        if (puck.position.x > TRACK_LENGTH) {
          Matter.Body.setPosition(puck, { x: START_X, y: puck.position.y });
          if (frictionless) {
            onMotionMeasuredRef.current({
              finalVelocity: currentSpeed,
              distanceTraveled: distanceRef.current,
              timeToStop: null,
            });
          }
        }

        if (
          !hasStoppedRef.current &&
          initialVelocityRef.current > STOP_EPSILON &&
          currentSpeed < STOP_EPSILON
        ) {
          hasStoppedRef.current = true;
          onMotionMeasuredRef.current({
            finalVelocity: 0,
            distanceTraveled: distanceRef.current,
            timeToStop: simTimeRef.current,
          });
        }

        setFrame({
          puckX: puck.position.x,
          puckY: puck.position.y,
          velocity: currentSpeed,
          distanceTraveled: distanceRef.current,
        });
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isPlaying, speed, frictionless]);

  const reset = useCallback(() => {
    buildWorld(initialVelocity, mass, friction, frictionless);
  }, [buildWorld, initialVelocity, mass, friction, frictionless]);

  return { frame, reset };
}
