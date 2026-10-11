"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, type RefObject } from "react";
import { Group, MathUtils, Mesh } from "three";

type Vec = [number, number, number];
type Props = { panel: RefObject<HTMLDivElement | null>; animated: boolean; onReady: () => void; onError: () => void };

// One module per tantangan: scattered at rest, snapped into a tidy system once scrolled through.
const MODULES: { from: Vec; to: Vec; spin: Vec; color: string }[] = [
  { from: [-4.3, 2.7, -2.4], to: [-1.3, .75, 0], spin: [.9, -1.2, .5], color: "#2f6bff" },
  { from: [.6, 3.7, -3.2], to: [0, .75, 0], spin: [-1.1, .8, -.9], color: "#14c8b4" },
  { from: [4.5, 2.2, -1.8], to: [1.3, .75, 0], spin: [.6, 1.5, .3], color: "#2f6bff" },
  { from: [-4.7, -2.0, -2.0], to: [-1.3, -.05, 0], spin: [-.7, -.9, 1.1], color: "#1f50d6" },
  { from: [-.4, -3.5, -2.8], to: [0, -.05, 0], spin: [1.2, .6, -.4], color: "#2f6bff" },
  { from: [4.9, -2.5, -1.5], to: [1.3, -.05, 0], spin: [-.5, 1.1, .8], color: "#14c8b4" },
];

// Connectors only appear at the very end, so "terhubung" reads as the final state.
const BARS: { at: Vec; size: Vec }[] = [
  { at: [-.65, .75, 0], size: [.3, .085, .085] },
  { at: [.65, .75, 0], size: [.3, .085, .085] },
  { at: [-.65, -.05, 0], size: [.3, .085, .085] },
  { at: [.65, -.05, 0], size: [.3, .085, .085] },
  { at: [-1.3, .35, 0], size: [.085, .2, .085] },
  { at: [0, .35, 0], size: [.085, .2, .085] },
  { at: [1.3, .35, 0], size: [.085, .2, .085] },
];

function System({ panel, animated }: { panel: RefObject<HTMLDivElement | null>; animated: boolean }) {
  const { invalidate } = useThree();
  const group = useRef<Group>(null);
  const modules = useRef<(Mesh | null)[]>([]);
  const bars = useRef<(Mesh | null)[]>([]);
  const slab = useRef<Mesh>(null);
  const target = useRef(0);
  const eased = useRef(0);
  const elapsed = useRef(0);
  const visible = useRef(false);

  useEffect(() => {
    const element = panel.current;
    if (!element) return;
    const measure = () => {
      const rect = element.getBoundingClientRect();
      // Assembly runs from "panel enters the viewport" to "panel sits in the upper half".
      const span = innerHeight * .62;
      target.current = Math.max(0, Math.min(1, (innerHeight - rect.top - innerHeight * .2) / span));
      invalidate();
    };
    measure();
    const observer = new IntersectionObserver(([entry]) => { visible.current = entry.isIntersecting; }, { threshold: 0 });
    observer.observe(element);
    addEventListener("scroll", measure, { passive: true });
    addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      removeEventListener("scroll", measure);
      removeEventListener("resize", measure);
    };
  }, [invalidate, panel]);

  useEffect(() => {
    if (!animated) return;
    // Keep the demand renderer at ~25 fps, and only while the panel is on screen.
    const timer = window.setInterval(() => {
      if (visible.current && !document.hidden) invalidate();
    }, 40);
    return () => clearInterval(timer);
  }, [animated, invalidate]);

  useFrame((_, delta) => {
    const step = Math.min(delta, .08);
    eased.current = MathUtils.damp(eased.current, target.current, 4.2, step);
    if (animated && !document.hidden) elapsed.current += step;
    const progress = eased.current;
    const time = elapsed.current;

    MODULES.forEach((module, i) => {
      const mesh = modules.current[i];
      if (!mesh) return;
      const drift = Math.sin(time * .85 + i * 1.1) * .045 * progress;
      mesh.position.set(
        MathUtils.lerp(module.from[0], module.to[0], progress),
        MathUtils.lerp(module.from[1], module.to[1], progress) + drift,
        MathUtils.lerp(module.from[2], module.to[2], progress),
      );
      mesh.rotation.set(module.spin[0] * (1 - progress), module.spin[1] * (1 - progress), module.spin[2] * (1 - progress));
    });

    const linked = Math.max(0, (progress - .7) / .3);
    bars.current.forEach((bar) => bar?.scale.setScalar(linked));
    if (slab.current) slab.current.scale.set(linked, 1, 1);
    if (group.current) group.current.rotation.y = Math.sin(time * .32) * .13 * progress;
  });

  return <group ref={group}>
    {MODULES.map((module, i) => <mesh key={i} ref={(element) => { modules.current[i] = element; }}>
      <boxGeometry args={[1.08, .6, .5]} />
      <meshStandardMaterial color={module.color} roughness={.34} metalness={.18} />
    </mesh>)}
    {BARS.map((bar, i) => <mesh key={i} position={bar.at} ref={(element) => { bars.current[i] = element; }} scale={0}>
      <boxGeometry args={bar.size} />
      <meshStandardMaterial color="#7dd4ff" roughness={.25} metalness={.3} emissive="#1b4fd0" emissiveIntensity={.45} />
    </mesh>)}
    <mesh ref={slab} position={[0, -.62, 0]} scale={[0, 1, 1]}>
      <boxGeometry args={[4.1, .11, .86]} />
      <meshStandardMaterial color="#1a2a63" roughness={.5} metalness={.2} />
    </mesh>
  </group>;
}

export default function ApproachScene({ panel, animated, onReady, onError }: Props) {
  return <Canvas
    frameloop="demand"
    dpr={[1, 1.6]}
    camera={{ position: [0, .35, 6.4], fov: 42 }}
    gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
    onCreated={onReady}
    onError={onError}
  >
    <ambientLight intensity={1.05} />
    <directionalLight position={[3.5, 5, 4]} intensity={1.7} />
    <pointLight position={[-4, -2, 3]} intensity={28} color="#2f6bff" distance={14} />
    <System panel={panel} animated={animated} />
  </Canvas>;
}
