"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, type RefObject } from "react";
import { Group, MathUtils, Mesh, OrthographicCamera, Vector3 } from "three";
import { Anim, Blob, BlobProvider, Board, Box, Chair, Crate, Desk, Figure, Limb, Monitor, Plant, Shadow, Sheet, Table } from "./ProcessKit";

type Props = {
  stage: RefObject<HTMLDivElement | null>;
  progress: RefObject<number>;
  onReady: () => void;
  onError: () => void;
};
type ZoneProps = { anim: RefObject<Anim>; index: number };

const SPACING = 14;
const ZONES = 6;
const CLIENT = "#f0893f";
const NOVARA = "#2f6bff";
const RUGS = ["#dce7ff", "#daf1ec", "#e5e1ff", "#dce7ff", "#daf1ec", "#e5e1ff"];

/** True only for the zone on screen, so the other five skip their per-frame maths. */
const near = (anim: RefObject<Anim>, index: number) => Math.abs(anim.current.zone - index) < .75;

function Ground({ index }: { index: number }) {
  return (
    <group position={[index * SPACING, 0, 0]}>
      <Box at={[0, -.17, 0]} size={[6.4, .34, 5.5]} color="#f6f8fd" rough={.9} />
      <mesh position={[0, .014, .4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.5, 3.6]} />
        <meshStandardMaterial color={RUGS[index]} roughness={.95} />
      </mesh>
    </group>
  );
}

/** 01 — Konsultasi: klien dan Novara duduk berbincang. */
function Consultation({ anim }: ZoneProps) {
  return (
    <group>
      <Table at={[0, 0, .3]} />
      <mesh position={[-.22, .69, .32]}><cylinderGeometry args={[.075, .065, .13, 20]} /><meshStandardMaterial color="#ffffff" roughness={.5} /></mesh>
      <mesh position={[.24, .69, .44]}><cylinderGeometry args={[.075, .065, .13, 20]} /><meshStandardMaterial color="#ffffff" roughness={.5} /></mesh>
      <Chair at={[-1.4, 0, .3]} turn={Math.PI / 2} />
      <Chair at={[1.4, 0, .3]} turn={-Math.PI / 2} />
      <Figure at={[-1.4, 0, .3]} turn={Math.PI / 2} shirt={CLIENT} skin="#f0c4a0" seated action="talk" anim={anim} />
      <Figure at={[1.4, 0, .3]} turn={-Math.PI / 2} shirt={NOVARA} seated action="talk" anim={anim} offset={2.6} />
      <Plant at={[2.05, 0, -1.5]} />
      <Plant at={[-2.05, 0, -1.4]} scale={.85} />
    </group>
  );
}

/** 02 — Analisis Kebutuhan: kebutuhan dipetakan, klien menelaah sambil berjalan. */
function Analysis({ anim, index }: ZoneProps) {
  const walker = useRef<Group>(null);
  const facing = useRef(Math.PI / 2);
  useFrame((_, delta) => {
    if (!walker.current || !near(anim, index)) return;
    const t = anim.current.time;
    walker.current.position.x = Math.sin(t * .55) * 1.15 + .25;
    walker.current.position.z = .75 - Math.cos(t * .55) * .2;
    const want = Math.cos(t * .55) > 0 ? Math.PI / 2 : -Math.PI / 2;
    facing.current = MathUtils.damp(facing.current, want, 5, Math.min(delta, .08));
    walker.current.rotation.y = facing.current;
  });
  return (
    <group>
      <Board
        at={[0, 0, -1.9]}
        notes={[
          { at: [-.56, .3], color: "#ffd166" }, { at: [-.2, .33], color: "#8fd3ff" },
          { at: [.18, .29], color: "#ffb4a2" }, { at: [.56, .31], color: "#b6e3c6" },
          { at: [-.4, -.05], color: "#8fd3ff" }, { at: [.02, -.09], color: "#ffd166" },
          { at: [.46, -.07], color: "#c9c4ff" }, { at: [-.1, -.42], color: "#b6e3c6" },
        ]}
      />
      <Figure at={[-1.15, 0, -.8]} turn={2.33} shirt={NOVARA} action="present" anim={anim} />
      <Figure at={[0, 0, 0]} shirt={CLIENT} skin="#f0c4a0" action="walk" anim={anim} groupRef={walker} />
      <Desk at={[1.8, 0, 1.25]} turn={-.5} width={1.5} />
      <Sheet at={[1.65, .78, 1.15]} turn={.3} size={[.4, .54]} color="#f3f7ff" />
      <Plant at={[-2.05, 0, 1.45]} scale={.85} />
    </group>
  );
}

/** 03 — Proposal & Kesepakatan: dokumen disepakati, tangan berjabat. */
function Agreement({ anim }: ZoneProps) {
  return (
    <group>
      <Desk at={[0, 0, -.95]} width={2.4} />
      <Sheet at={[-.4, .78, -.9]} turn={.1} size={[.54, .7]} color="#f3f7ff" />
      <mesh position={[-.4, .783, -1.12]} rotation={[-Math.PI / 2, 0, .1]}>
        <planeGeometry args={[.54, .12]} />
        <meshStandardMaterial color={NOVARA} roughness={.6} />
      </mesh>
      <Sheet at={[.42, .78, -.83]} turn={-.16} size={[.5, .64]} color="#fbfdff" />
      <Figure at={[-.54, 0, .8]} turn={Math.PI / 2} shirt={CLIENT} skin="#f0c4a0" action="shake" anim={anim} />
      <Figure at={[.54, 0, .8]} turn={-Math.PI / 2} shirt={NOVARA} action="shake" anim={anim} />
      <Plant at={[-2.05, 0, -1.3]} />
      <Box at={[2.0, 0, -1.5]} size={[.95, 1.6, .5]} color="#e1e7f3" />
    </group>
  );
}

/** 04 — Pengembangan: sistemnya dibangun. */
function Build({ anim, index }: ZoneProps) {
  const bars = useRef<(Mesh | null)[]>([]);
  useFrame(() => {
    if (!near(anim, index)) return;
    const t = anim.current.time;
    bars.current.forEach((bar, i) => {
      if (bar) bar.scale.x = .55 + (Math.sin(t * 3 + i * 1.3) * .5 + .5) * .45;
    });
  });
  return (
    <group>
      <Desk at={[0, 0, -.5]} width={2.7} />
      <Monitor at={[-.62, .77, -.72]} screen="#1d4ed8" />
      <Monitor at={[.58, .77, -.72]} turn={-.22} screen="#0f766e" width={.7} />
      <Box at={[0, .79, -.12]} size={[.8, .035, .28]} color="#dde4f0" rough={.5} />
      <Chair at={[-.05, 0, .58]} turn={Math.PI} />
      <Figure at={[-.05, 0, .52]} turn={Math.PI} shirt={NOVARA} seated action="type" anim={anim} />
      <Box at={[2.0, 0, -1.3]} size={[.78, 1.75, .66]} color="#ccd6e8" />
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[2.0, .42 + i * .36, -.96]} ref={(element) => { bars.current[i] = element; }}>
          <planeGeometry args={[.46, .055]} />
          <meshStandardMaterial color={i % 2 ? "#14c8b4" : "#2f6bff"} emissive={i % 2 ? "#14c8b4" : "#2f6bff"} emissiveIntensity={.75} />
        </mesh>
      ))}
      <Plant at={[-2.05, 0, -1.3]} />
    </group>
  );
}

/** 05 — Pengujian & QA: diperiksa butir demi butir. */
function Testing({ anim, index }: ZoneProps) {
  const checks = useRef<(Group | null)[]>([]);
  useFrame(() => {
    if (!near(anim, index)) return;
    const t = anim.current.time;
    checks.current.forEach((check, i) => {
      if (!check) return;
      const beat = ((t * .8 - i * .5) % 3 + 3) % 3;
      const on = MathUtils.clamp(beat * 4, 0, 1) * MathUtils.clamp((3 - beat) * 2.5, 0, 1);
      check.scale.setScalar(.86 + on * .18);
      check.position.y = 1.45 + i * .34 + on * .035;
    });
  });
  return (
    <group>
      <Desk at={[-.55, 0, -.6]} width={2.2} />
      <Monitor at={[-.55, .77, -.8]} screen="#0f766e" width={.95} />
      <Figure at={[1.35, 0, .1]} turn={-2.01} shirt={NOVARA} action="present" anim={anim} />
      <Figure at={[-1.9, 0, 1.0]} turn={2.5} shirt={CLIENT} skin="#f0c4a0" action="idle" anim={anim} offset={1.4} />
      {[0, 1, 2].map((i) => (
        <group key={i} position={[-.55, 1.45 + i * .34, .3]} ref={(element) => { checks.current[i] = element; }}>
          <Box at={[0, 0, 0]} size={[.95, .23, .03]} color="#ffffff" rough={.5} />
          <mesh position={[-.34, 0, .026]}><circleGeometry args={[.062, 20]} /><meshStandardMaterial color="#14c8b4" emissive="#14c8b4" emissiveIntensity={.6} /></mesh>
          <Box at={[.12, 0, .026]} size={[.4, .045, .01]} color="#cbd7e8" rough={.6} />
        </group>
      ))}
      <Plant at={[2.05, 0, -1.4]} scale={.9} />
    </group>
  );
}

/** 06 — Serah Terima & Dukungan: produk berpindah tangan. */
function Handover({ anim, index }: ZoneProps) {
  const crate = useRef<Group>(null);
  const crateShadow = useRef<Group>(null);
  const beacon = useRef<Group>(null);
  useFrame(() => {
    if (!near(anim, index)) return;
    const t = anim.current.time;
    if (crate.current) {
      const wave = (Math.sin(t * .75) + 1) / 2;
      const ease = wave * wave * (3 - 2 * wave);
      const slide = MathUtils.lerp(-.4, .4, ease);
      crate.current.position.x = slide;
      crate.current.position.y = .72 + Math.sin(ease * Math.PI) * .13;
      crate.current.rotation.y = .3 + ease * .55;
      // Bayangan ikut bergeser, kalau tidak kotaknya terlihat melayang lepas.
      if (crateShadow.current) crateShadow.current.position.x = slide;
    }
    if (beacon.current) beacon.current.scale.setScalar(1 + Math.sin(t * 2.4) * .13);
  });
  return (
    <group>
      <Figure at={[-1.1, 0, .6]} turn={Math.PI / 2} shirt={NOVARA} action="carry" anim={anim} />
      <Figure at={[1.1, 0, .6]} turn={-Math.PI / 2} shirt={CLIENT} skin="#f0c4a0" action="carry" anim={anim} offset={1.1} />
      <Crate at={[0, .72, .6]} color={NOVARA} groupRef={crate} />
      <group ref={crateShadow}><Shadow at={[0, 0, .6]} size={1} /></group>
      <Board at={[0, 0, -1.95]} />
      <mesh position={[0, 1.1, -1.88]}>
        <planeGeometry args={[1.56, .86]} />
        <meshStandardMaterial color="#2f6bff" emissive="#2f6bff" emissiveIntensity={.5} roughness={.35} />
      </mesh>
      <Limb from={[-2.3, .06, -.5]} to={[-2.3, 1.5, -.5]} radius={.036} color="#c6d2e4" />
      <group ref={beacon} position={[-2.3, 1.62, -.5]}>
        <Blob at={[0, 0, 0]} scale={[.15, .15, .15]} color="#14c8b4" rough={.3} />
      </group>
      <Plant at={[2.05, 0, -1.2]} />
    </group>
  );
}

const SCENES = [Consultation, Analysis, Agreement, Build, Testing, Handover];

function Rig({ stage, progress, anim }: Pick<Props, "stage" | "progress"> & { anim: RefObject<Anim> }) {
  const { invalidate } = useThree();
  const eased = useRef(0);
  const target = useRef(new Vector3());
  const onScreen = useRef(false);

  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => { onScreen.current = entry.isIntersecting; }, { threshold: 0 });
    observer.observe(element);
    // The characters animate continuously, so hold ~30fps — but only while on screen.
    const timer = window.setInterval(() => {
      if (onScreen.current && !document.hidden) invalidate();
    }, 33);
    return () => {
      observer.disconnect();
      clearInterval(timer);
    };
  }, [invalidate, stage]);

  useFrame((state, delta) => {
    const camera = state.camera as OrthographicCamera;
    // Frame the diorama the same way at any canvas size — a fixed zoom would
    // overflow the much smaller canvas on phones.
    const fit = Math.min(state.size.width / 6.6, state.size.height / 5.2);
    if (Math.abs(camera.zoom - fit) > .4) {
      camera.zoom = fit;
      camera.updateProjectionMatrix();
    }
    const step = Math.min(delta, .08);
    anim.current.advance(step);
    eased.current = MathUtils.damp(eased.current, progress.current, 3.4, step);
    anim.current.moveTo(eased.current * (ZONES - 1));
    const x = anim.current.zone * SPACING;
    target.current.set(x, .85, .1);
    camera.position.set(x + 9.5, 9, 9.5);
    camera.lookAt(target.current);
  });

  return null;
}

export default function ProcessScene({ onReady, onError, stage, progress }: Props) {
  const anim = useRef(new Anim());
  return (
    <Canvas
      orthographic
      frameloop="demand"
      dpr={[1, 1.6]}
      camera={{ position: [9.5, 9, 9.5], zoom: 88, near: -50, far: 100 }}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      onCreated={onReady}
      onError={onError}
    >
      <BlobProvider>
      <ambientLight intensity={1.25} />
      <directionalLight position={[6, 10, 6]} intensity={1.45} />
      <directionalLight position={[-6, 4, -4]} intensity={.5} color="#cfe0ff" />
      {SCENES.map((Scene, i) => (
        <group key={i} position={[i * SPACING, 0, 0]}>
          <Scene anim={anim} index={i} />
        </group>
      ))}
      {SCENES.map((_, i) => <Ground key={i} index={i} />)}
      <Rig stage={stage} progress={progress} anim={anim} />
      </BlobProvider>
    </Canvas>
  );
}
