"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import { PIECE_COLORS } from "./approachColors";
import { CanvasTexture, Color, ExtrudeGeometry, Group, MathUtils, Mesh, MeshStandardMaterial, Shape, Vector3 } from "three";

type Vec = [number, number, number];
type Props = {
  panel: RefObject<HTMLDivElement | null>;
  overlay: RefObject<HTMLDivElement | null>;
  halo: RefObject<HTMLDivElement | null>;
  active: RefObject<number>;
  animated: boolean;
  onReady: () => void;
  onError: () => void;
};

const COLS = 3;
const PIECE_W = 2;
const PIECE_H = 1.3;

// One piece per tantangan, in the same order as `challenges`.
const MODULES: { from: Vec; to: Vec; spin: Vec; color: string }[] = [
  { from: [-4.5, 2.8, -2.4], to: [-PIECE_W, PIECE_H / 2, 0], spin: [.9, -1.2, .5], color: PIECE_COLORS[0] },
  { from: [.6, 3.8, -3.2], to: [0, PIECE_H / 2, 0], spin: [-1.1, .8, -.9], color: PIECE_COLORS[1] },
  { from: [4.7, 2.3, -1.8], to: [PIECE_W, PIECE_H / 2, 0], spin: [.6, 1.5, .3], color: PIECE_COLORS[2] },
  { from: [-4.9, -2.1, -2.0], to: [-PIECE_W, -PIECE_H / 2, 0], spin: [-.7, -.9, 1.1], color: PIECE_COLORS[3] },
  { from: [-.4, -3.6, -2.8], to: [0, -PIECE_H / 2, 0], spin: [1.2, .6, -.4], color: PIECE_COLORS[4] },
  { from: [5.1, -2.6, -1.5], to: [PIECE_W, -PIECE_H / 2, 0], spin: [-.5, 1.1, .8], color: PIECE_COLORS[5] },
];

/**
 * A jigsaw outline. Each edge is flat (0), a tab (1) or a socket (-1); the knob
 * profile is symmetric about the edge midpoint so a tab fits its neighbour's socket.
 */
function puzzleShape(w: number, h: number, edges: [number, number, number, number]) {
  const hw = w / 2;
  const hh = h / 2;
  const corners: Vec[] = [[-hw, -hh, 0], [hw, -hh, 0], [hw, hh, 0], [-hw, hh, 0]];
  const knob = Math.min(w, h) * .34;
  const neck = Math.min(w, h) * .14;
  const shape = new Shape();
  shape.moveTo(corners[0][0], corners[0][1]);

  for (let edge = 0; edge < 4; edge++) {
    const [ax, ay] = corners[edge];
    const [bx, by] = corners[(edge + 1) % 4];
    const dx = bx - ax;
    const dy = by - ay;
    const length = Math.hypot(dx, dy);
    const sign = edges[edge];
    if (!sign) {
      shape.lineTo(bx, by);
      continue;
    }
    // Outward normal for this counter-clockwise traversal.
    const nx = dy / length;
    const ny = -dx / length;
    const at = (t: number, out = 0): [number, number] => [ax + dx * t + nx * out, ay + dy * t + ny * out];
    const reach = sign * knob * 1.25;
    shape.lineTo(...at(.5 - neck / length));
    shape.bezierCurveTo(
      ...at(.5 - neck * 2.6 / length, reach),
      ...at(.5 + neck * 2.6 / length, reach),
      ...at(.5 + neck / length),
    );
    shape.lineTo(bx, by);
  }
  return shape;
}

function pieceGeometry(index: number) {
  const col = index % COLS;
  const row = Math.floor(index / COLS);
  // Edge order matches the traversal in puzzleShape: bottom, right, top, left.
  const edges: [number, number, number, number] = [
    row === 1 ? 0 : 1,
    col === COLS - 1 ? 0 : 1,
    row === 0 ? 0 : -1,
    col === 0 ? 0 : -1,
  ];
  const geometry = new ExtrudeGeometry(puzzleShape(PIECE_W, PIECE_H, edges), {
    // Ketebalan sedikit berbeda tiap keping supaya permukaannya tidak rata seragam.
    depth: .3 + (index % 3) * .035,
    bevelEnabled: true,
    bevelThickness: .028,
    bevelSize: .028,
    bevelSegments: 2,
    curveSegments: 18,
  });
  geometry.translate(0, 0, -(.3 + (index % 3) * .035) / 2);
  return geometry;
}


/** Relief di muka keping. Semua ikon dibangun dalam kisi yang sama:
 *  lebar 0.52, tiga baris di y 0.46 / 0.33 / 0.20, tebal garis 0.055. */
const ROWS = [.46, .33, .2];
const BAR = .055;

function Bit({ at, size, color, spin = 0 }: { at: Vec; size: Vec; color: string; spin?: number }) {
  return (
    <mesh position={at} rotation={[0, 0, spin]}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={.42} metalness={.08} />
    </mesh>
  );
}

function Dot({ at, radius, color }: { at: [number, number]; radius: number; color: string }) {
  return (
    <mesh position={[at[0], at[1], 0]}>
      <sphereGeometry args={[radius, 18, 14]} />
      <meshStandardMaterial color={color} roughness={.4} metalness={.1} />
    </mesh>
  );
}

function PieceFace({ index, tint, deep, z }: { index: number; tint: string; deep: string; z: number }) {
  const icon = [
    // 01 Identitas Digital — jendela peramban
    <group key="a">
      <Bit at={[0, .33, 0]} size={[.52, .38, .02]} color={deep} />
      <Bit at={[0, .465, .012]} size={[.52, .11, .02]} color={tint} />
      {[-.21, -.15, -.09].map((x) => <Dot key={x} at={[x, .465]} radius={.019} color={deep} />)}
      <Bit at={[-.14, .3, .012]} size={[.18, .17, .02]} color={tint} />
      <Bit at={[.1, .36, .012]} size={[.22, BAR, .02]} color={tint} />
      <Bit at={[.07, .26, .012]} size={[.16, BAR, .02]} color={tint} />
    </group>,
    // 02 Informasi Produk — daftar tersusun
    <group key="b">
      {ROWS.map((y, i) => (
        <group key={y}>
          <Dot at={[-.23, y]} radius={.036} color={i === 0 ? tint : deep} />
          <Bit at={[.02 + [.34, .26, .3][i] / 2, y, 0]} size={[[.34, .26, .3][i], BAR, .02]} color={i === 0 ? tint : deep} />
        </group>
      ))}
    </group>,
    // 03 Data Manual — tumpukan basis data
    <group key="c">
      {ROWS.map((y, i) => (
        <group key={y}>
          <Bit at={[0, y, 0]} size={[.44, .09, .02]} color={i === 0 ? tint : deep} />
          {[-.22, .22].map((x) => (
            <mesh key={x} position={[x, y, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[.045, .045, .02, 16]} />
              <meshStandardMaterial color={i === 0 ? tint : deep} roughness={.42} />
            </mesh>
          ))}
        </group>
      ))}
    </group>,
    // 04 Dashboard & Laporan — grafik batang
    <group key="d">
      <Bit at={[0, .17, 0]} size={[.52, .04, .02]} color={deep} />
      {[[-.17, .16], [0, .29], [.17, .22]].map(([x, h], i) => (
        <Bit key={i} at={[x, .19 + h / 2, 0]} size={[.11, h, .02]} color={i === 1 ? tint : deep} />
      ))}
    </group>,
    // 05 Proses Berulang — putaran berulang
    <group key="e">
      <mesh position={[0, .33, 0]}>
        <torusGeometry args={[.19, .032, 12, 30, Math.PI * 1.55]} />
        <meshStandardMaterial color={tint} roughness={.42} metalness={.08} />
      </mesh>
      <mesh position={[.19, .47, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <coneGeometry args={[.068, .12, 16]} />
        <meshStandardMaterial color={tint} roughness={.42} metalness={.08} />
      </mesh>
    </group>,
    // 06 Integrasi Sistem — simpul terhubung
    <group key="f">
      <Bit at={[-.1, .385, 0]} size={[.26, .042, .02]} color={deep} spin={-.62} />
      <Bit at={[.1, .385, 0]} size={[.26, .042, .02]} color={deep} spin={.62} />
      <Bit at={[0, .46, 0]} size={[.4, .042, .02]} color={deep} />
      <Dot at={[-.2, .46]} radius={.062} color={deep} />
      <Dot at={[.2, .46]} radius={.062} color={deep} />
      <Dot at={[0, .22]} radius={.07} color={tint} />
    </group>,
  ][index];

  return (
    <group position={[0, 0, z]}>
      {icon}
      {/* Dua garis aksen di bawah chip, ikut dipusatkan agar sejajar dengan ikon. */}
      <Bit at={[0, -.36, 0]} size={[.44, .05, .018]} color={deep} />
      <Bit at={[0, -.45, 0]} size={[.26, .05, .018]} color={deep} />
    </group>
  );
}

function System({ panel, overlay, halo, active, animated }: Omit<Props, "onReady" | "onError">) {
  const { invalidate } = useThree();
  const group = useRef<Group>(null);
  const pieces = useRef<(Mesh | null)[]>([]);
  const target = useRef(0);
  const eased = useRef(0);
  const lift = useRef<number[]>(MODULES.map(() => 0));
  const elapsed = useRef(0);
  const onScreen = useRef(false);
  const idle = useRef(false);
  const lastActive = useRef(-1);
  const projected = useRef(new Vector3());
  const geometries = useMemo(() => MODULES.map((_, i) => pieceGeometry(i)), []);
  const ground = useRef<Mesh>(null);

  // Warna turunan tiap keping untuk relief permukaannya.
  const tints = useMemo(() => MODULES.map((module, i) => {
    const base = new Color(module.color);
    return {
      // Keduanya lebih terang dari warna dasar — tint gelap hilang di keping navy.
      light: `#${base.clone().lerp(new Color("#ffffff"), .78).getHexString()}`,
      dark: `#${base.clone().lerp(new Color("#ffffff"), .4).getHexString()}`,
      // bevelThickness menambah ketebalan di luar depth, jadi muka keping ada di
      // depth/2 + bevel. Tanpa ini relief tenggelam di dalam keping.
      z: (.3 + (i % 3) * .035) / 2 + .028 + .014,
    };
  }), []);

  const groundTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 128;
    const context = canvas.getContext("2d")!;
    const gradient = context.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, "rgba(16,28,60,.3)");
    gradient.addColorStop(.5, "rgba(16,28,60,.12)");
    gradient.addColorStop(1, "rgba(16,28,60,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 128, 128);
    return new CanvasTexture(canvas);
  }, []);

  useEffect(() => () => groundTexture.dispose(), [groundTexture]);

  useEffect(() => () => geometries.forEach((geometry) => geometry.dispose()), [geometries]);

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
    // getBoundingClientRect memaksa layout, jadi satu event scroll jangan sampai
    // memicunya berkali-kali — satu pengukuran per frame sudah cukup.
    let frame = 0;
    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => { frame = 0; measure(); });
    };

    measure();
    const observer = new IntersectionObserver(([entry]) => { onScreen.current = entry.isIntersecting; }, { threshold: 0 });
    observer.observe(element);
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", schedule);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      removeEventListener("scroll", schedule);
      removeEventListener("resize", schedule);
    };
  }, [invalidate, panel]);

  useEffect(() => {
    if (!animated) return;
    // Laju adaptif, seperti di ProcessScene: 60fps selama keping masih bergerak
    // (25fps terasa tersendat saat scroll), lalu berhenti begitu semuanya diam.
    let tick = 0;
    const timer = window.setInterval(() => {
      if (!onScreen.current || document.hidden) return;
      tick += 1;
      if (!idle.current) invalidate();
      else if (active.current !== lastActive.current && tick % 2 === 0) invalidate();
    }, 16);
    return () => clearInterval(timer);
  }, [active, animated, invalidate]);

  useFrame(({ camera, size }, delta) => {
    const step = Math.min(delta, .08);
    eased.current = MathUtils.damp(eased.current, target.current, 4.2, step);
    if (animated && !document.hidden) elapsed.current += step;
    const progress = eased.current;
    const time = elapsed.current;
    const current = active.current;

    // Float while the pieces are still travelling, then hold still so the labels stay hoverable.
    const motion = 4 * progress * (1 - progress);
    if (group.current) {
      // A small resting tilt so the extruded edges catch the light.
      group.current.rotation.x = -.1 * progress;
      group.current.rotation.y = .17 * progress + Math.sin(time * .32) * .1 * motion;
    }

    MODULES.forEach((module, i) => {
      const mesh = pieces.current[i];
      if (!mesh) return;
      lift.current[i] = MathUtils.damp(lift.current[i], current === i ? 1 : 0, 9, step);
      const raised = lift.current[i] * progress;
      const drift = Math.sin(time * .85 + i * 1.1) * .05 * motion;
      mesh.position.set(
        MathUtils.lerp(module.from[0], module.to[0], progress),
        MathUtils.lerp(module.from[1], module.to[1], progress) + drift,
        MathUtils.lerp(module.from[2], module.to[2], progress) + raised * .5,
      );
      mesh.rotation.set(module.spin[0] * (1 - progress), module.spin[1] * (1 - progress), module.spin[2] * (1 - progress));
      mesh.scale.setScalar(1 + raised * .04);
      (mesh.material as MeshStandardMaterial).emissiveIntensity = raised * .7;
    });

    if (ground.current) ground.current.scale.setScalar(.55 + progress * .45);
    lastActive.current = current;
    idle.current = motion < .002
      && Math.abs(eased.current - target.current) < .001
      && lift.current.every((value, i) => Math.abs(value - (current === i ? 1 : 0)) < .001);

    // Pin the HTML labels onto their piece so the text stays crisp and selectable.
    const layer = overlay.current;
    if (!layer) return;
    const labels = Math.max(0, Math.min(1, (progress - .78) / .22));
    layer.style.setProperty("--labels", String(labels));
    layer.setAttribute("data-shown", labels > .5 ? "true" : "false");
    MODULES.forEach((_, i) => {
      const mesh = pieces.current[i];
      const node = layer.children[i] as HTMLElement | undefined;
      if (!mesh || !node) return;
      const point = mesh.getWorldPosition(projected.current).project(camera);
      const screenX = (point.x * .5 + .5) * size.width;
      const screenY = (1 - (point.y * .5 + .5)) * size.height;
      node.style.setProperty("--mx", `${screenX}px`);
      node.style.setProperty("--my", `${screenY}px`);
      // The open card must clear every other chip, whatever their depth order says.
      node.style.setProperty("z-index", i === current ? "2000" : String(500 - Math.round(point.z * 400)));

      // The halo sits behind the canvas, so it only shows around the piece's silhouette.
      const glow = halo.current?.children[i] as HTMLElement | undefined;
      if (!glow) return;
      glow.style.setProperty("--mx", `${screenX}px`);
      glow.style.setProperty("--my", `${screenY}px`);
      glow.style.setProperty("opacity", String(lift.current[i] * progress));
    });
  });

  return <group ref={group}>
    {MODULES.map((module, i) => (
      <mesh key={i} geometry={geometries[i]} ref={(element) => { pieces.current[i] = element; }}>
        <meshStandardMaterial
          color={module.color}
          emissive={module.color}
          emissiveIntensity={0}
          roughness={.36}
          metalness={.16}
        />
        <PieceFace index={i} tint={tints[i].light} deep={tints[i].dark} z={tints[i].z} />
      </mesh>
    ))}
    <mesh ref={ground} position={[0, -1.52, -.15]} rotation={[-Math.PI / 2, 0, 0]} scale={0}>
      <planeGeometry args={[6.4, 3.4]} />
      <meshBasicMaterial map={groundTexture} transparent depthWrite={false} toneMapped={false} />
    </mesh>
  </group>;
}

export default function ApproachScene({ onReady, onError, ...rest }: Props) {
  return <Canvas
    frameloop="demand"
    dpr={[1, 1.6]}
    camera={{ position: [0, 0, 6.1], fov: 42 }}
    gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
    onCreated={onReady}
    onError={onError}
  >
    <ambientLight intensity={1.15} />
    <directionalLight position={[3.5, 5, 4]} intensity={1.9} />
    <directionalLight position={[-4, -2, 3]} intensity={.5} color="#9ec5ff" />
    <directionalLight position={[-2.5, 3, -5]} intensity={.9} color="#7dd4ff" />
    <System {...rest} />
  </Canvas>;
}
