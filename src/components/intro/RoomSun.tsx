"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import {
  AdditiveBlending, BufferAttribute, BufferGeometry, CanvasTexture, Points, Quaternion, Vector3,
} from "three";

/**
 * Sunlight for the intro room.
 *
 * The window sits at (0, 3.18, -3.72) facing into the room, so the sun comes
 * from behind and above it and lands on the floor to the front-right. Every
 * piece here — the key light, the shafts, the floor pools and the dust — uses
 * that same direction, otherwise the shafts and the shadows disagree.
 */

const WINDOW = new Vector3(0, 3.18, -3.6);
// Dipilih ke kiri-depan: jalur ke kanan tertutup monitor, meja, dan ranjang,
// sehingga berkasnya tidak akan terlihat sama sekali.
const LANDS_ON = new Vector3(-2, 0, 1.7);
const DIR = LANDS_ON.clone().sub(WINDOW).normalize();
const REACH = LANDS_ON.distanceTo(WINDOW);

/** Deterministic stand-in for Math.random: the dust must land in the same spot
 *  on every render, and random() during render is not allowed. */
function noise(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const WARM = "#ffd27f";
const WARM_DEEP = "#ffa63f";

/** Soft-edged streak: bright at the window, fading out along its length. */
function useShaftTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 128;
    canvas.height = 256;
    const context = canvas.getContext("2d")!;
    const along = context.createLinearGradient(0, 0, 0, 256);
    along.addColorStop(0, "rgba(255,255,255,.92)");
    along.addColorStop(.25, "rgba(255,255,255,.62)");
    along.addColorStop(.55, "rgba(255,255,255,.3)");
    along.addColorStop(.82, "rgba(255,255,255,.08)");
    along.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = along;
    context.fillRect(0, 0, 128, 256);

    // Fade the two long edges so the beam has no visible border.
    context.globalCompositeOperation = "destination-in";
    const across = context.createLinearGradient(0, 0, 128, 0);
    across.addColorStop(0, "rgba(0,0,0,0)");
    across.addColorStop(.26, "rgba(0,0,0,.55)");
    across.addColorStop(.48, "rgba(0,0,0,1)");
    across.addColorStop(.52, "rgba(0,0,0,1)");
    across.addColorStop(.74, "rgba(0,0,0,.55)");
    across.addColorStop(1, "rgba(0,0,0,0)");
    context.fillStyle = across;
    context.fillRect(0, 0, 128, 256);

    return new CanvasTexture(canvas);
  }, []);
}

/** Round, soft pool for where the light actually lands. */
function usePoolTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 128;
    const context = canvas.getContext("2d")!;
    const glow = context.createRadialGradient(64, 64, 0, 64, 64, 64);
    glow.addColorStop(0, "rgba(255,206,126,.9)");
    glow.addColorStop(.3, "rgba(255,196,110,.52)");
    glow.addColorStop(.62, "rgba(255,186,96,.2)");
    glow.addColorStop(1, "rgba(255,178,84,0)");
    context.fillStyle = glow;
    context.fillRect(0, 0, 128, 128);
    return new CanvasTexture(canvas);
  }, []);
}

/** Soft-edged rectangle: the shape a window pane actually casts. */
function useRectTexture() {
  return useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 128;
    const context = canvas.getContext("2d")!;
    context.fillStyle = "rgba(255,198,112,.92)";
    context.fillRect(0, 0, 128, 128);
    context.globalCompositeOperation = "destination-in";
    for (const [x0, y0, x1, y1] of [[0, 0, 128, 0], [0, 128, 128, 128]] as const) {
      const fade = context.createLinearGradient(x0, y0, x1, y1);
      fade.addColorStop(0, "rgba(0,0,0,1)");
      fade.addColorStop(1, "rgba(0,0,0,1)");
      context.fillStyle = fade;
      context.fillRect(0, 0, 128, 128);
    }
    const soft = context.createRadialGradient(64, 64, 8, 64, 64, 86);
    soft.addColorStop(0, "rgba(0,0,0,1)");
    soft.addColorStop(.5, "rgba(0,0,0,.72)");
    soft.addColorStop(.8, "rgba(0,0,0,.26)");
    soft.addColorStop(1, "rgba(0,0,0,0)");
    context.fillStyle = soft;
    context.fillRect(0, 0, 128, 128);
    return new CanvasTexture(canvas);
  }, []);
}

/** The light rig. Shadows come from the sun, so they match the visible beams. */
export function SunRig() {
  // A directional light aims at the origin, so its position is placed along the
  // reverse of DIR to get exactly the direction the shafts travel.
  const from = useMemo(() => DIR.clone().multiplyScalar(-11).toArray() as [number, number, number], []);
  return (
    <>
      <directionalLight
        position={from}
        intensity={3.2}
        color={WARM}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-radius={3}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-normalBias={.035}
        shadow-bias={-.0004}
      />
      {/* Warm bounce from the lit floor, and a soft glow just inside the glass. */}
      <pointLight position={[LANDS_ON.x, .45, LANDS_ON.z]} intensity={5} color={WARM_DEEP} distance={6} decay={2} />
      <pointLight position={[0, 3.1, -3.2]} intensity={7.5} color={WARM} distance={7} decay={2} />
    </>
  );
}

function Dust({ animated }: { animated: boolean }) {
  const points = useRef<Points>(null);
  const side = useMemo(() => new Vector3(1, 0, 0).cross(DIR).normalize(), []);
  const up = useMemo(() => DIR.clone().cross(side).normalize(), [side]);

  const geometry = useMemo(() => {
    const count = 70;
    const array = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const t = noise(i * 4);
      const point = WINDOW.clone()
        .add(DIR.clone().multiplyScalar(t * REACH))
        .add(side.clone().multiplyScalar((noise(i * 4 + 1) - .5) * 2.6))
        .add(up.clone().multiplyScalar((noise(i * 4 + 2) - .5) * 1.9));
      array.set([point.x, point.y, point.z], i * 3);
      seeds[i] = noise(i * 4 + 3) * Math.PI * 2;
    }
    const geo = new BufferGeometry();
    geo.setAttribute("position", new BufferAttribute(array, 3));
    geo.setAttribute("seed", new BufferAttribute(seeds, 1));
    return geo;
  }, [side, up]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  const elapsed = useRef(0);
  useFrame((_, delta) => {
    if (!animated || document.hidden || !points.current) return;
    elapsed.current += Math.min(delta, .08);
    const time = elapsed.current;
    const position = geometry.getAttribute("position") as BufferAttribute;
    const seed = geometry.getAttribute("seed") as BufferAttribute;
    for (let i = 0; i < position.count; i++) {
      const s = seed.getX(i);
      // Drift sideways and bob; motes never leave the shaft this way.
      position.setY(i, position.getY(i) + Math.sin(time * .35 + s) * .0012);
      position.setX(i, position.getX(i) + Math.cos(time * .27 + s) * .0014);
    }
    position.needsUpdate = true;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial size={.035} color={WARM} transparent opacity={.75} sizeAttenuation depthWrite={false} blending={AdditiveBlending} toneMapped={false} />
    </points>
  );
}

export function SunShafts({ animated }: { animated: boolean }) {
  const shaft = useShaftTexture();
  const pool = usePoolTexture();
  const rect = useRectTexture();

  useEffect(() => () => { shaft.dispose(); pool.dispose(); rect.dispose(); }, [pool, rect, shaft]);

  // Align local +Y with the sun direction so every beam shares one orientation.
  const tilt = useMemo(() => new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), DIR), []);

  // Two beams, matching the window's left and right halves.
  const beams = [
    { offset: -1.35, width: 1.7, strength: .64 },
    { offset: 0, width: 1.7, strength: .54 },
    { offset: 1.35, width: 1.7, strength: .44 },
  ];

  return (
    <group>
      {beams.map((beam) => (
        <group key={beam.offset} position={[WINDOW.x + beam.offset, WINDOW.y, WINDOW.z]} quaternion={tilt}>
          {/* Crossed quads: a single plane would vanish when seen edge-on. */}
          {[0, Math.PI / 2].map((turn) => (
            <mesh key={turn} position={[0, REACH / 2, 0]} rotation={[0, turn, 0]}>
              <planeGeometry args={[beam.width, REACH]} />
              <meshBasicMaterial map={shaft} transparent opacity={beam.strength} blending={AdditiveBlending} depthWrite={false} toneMapped={false} color={WARM} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Jejak kaca di lantai: kisi 2x2 mengikuti palang jendela, dimiringkan
          searah datangnya cahaya. */}
      <group position={[LANDS_ON.x, .04, LANDS_ON.z]} rotation={[-Math.PI / 2, 0, -.36]}>
        {([[-1.0, .8], [1.0, .8], [-1.0, -.85], [1.0, -.85]] as const).map(([x, y], i) => (
          <mesh key={i} position={[x, y, 0]}>
            <planeGeometry args={[1.8, 1.45]} />
            <meshBasicMaterial map={rect} transparent opacity={i < 2 ? .54 : .4} blending={AdditiveBlending} depthWrite={false} toneMapped={false} />
          </mesh>
        ))}
      </group>
      {/* Sapuan tipis naik ke dinding kiri, tempat cahaya menyerempat. */}
      <mesh position={[-4.9, 1.35, 1.1]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[3.2, 2.8]} />
        <meshBasicMaterial map={pool} transparent opacity={.2} blending={AdditiveBlending} depthWrite={false} toneMapped={false} />
      </mesh>

      {/* Blown-out glass, so the window itself reads as the source. */}
      <mesh position={[0, 3.18, -3.56]}>
        <planeGeometry args={[4.1, 2.7]} />
        <meshBasicMaterial map={pool} transparent opacity={.56} blending={AdditiveBlending} depthWrite={false} toneMapped={false} />
      </mesh>

      <Dust animated={animated} />
    </group>
  );
}
