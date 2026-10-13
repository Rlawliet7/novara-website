"use client";

import { RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { createContext, useContext, useEffect, useMemo, useRef, type ReactNode, type RefObject } from "react";
import { CanvasTexture, Group, MathUtils, Quaternion, Vector3 } from "three";

export type Vec = [number, number, number];
export type Action = "idle" | "talk" | "walk" | "type" | "shake" | "present" | "carry";

/** Shared animation clock. Methods rather than field writes, so callers never
 *  assign onto a value handed to them as a prop. */
export class Anim {
  time = 0;
  zone = 0;
  advance(step: number) { this.time += step; }
  moveTo(zone: number) { this.zone = zone; }
}

/** One soft contact blob texture shared by every shadow in the scene. */
const BlobContext = createContext<CanvasTexture | null>(null);

export function BlobProvider({ children }: { children: ReactNode }) {
  const texture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 96;
    const context = canvas.getContext("2d")!;
    const gradient = context.createRadialGradient(48, 48, 0, 48, 48, 48);
    gradient.addColorStop(0, "rgba(23,37,66,.34)");
    gradient.addColorStop(.55, "rgba(23,37,66,.14)");
    gradient.addColorStop(1, "rgba(23,37,66,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 96, 96);
    return new CanvasTexture(canvas);
  }, []);
  useEffect(() => () => texture.dispose(), [texture]);
  return <BlobContext.Provider value={texture}>{children}</BlobContext.Provider>;
}

export function Shadow({ at, size = 1 }: { at: Vec; size?: number }) {
  const texture = useContext(BlobContext);
  if (!texture) return null;
  return (
    <mesh position={[at[0], at[1] + .015, at[2]]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[size, size * .82]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} toneMapped={false} />
    </mesh>
  );
}

export function Limb({ from, to, radius, color }: { from: Vec; to: Vec; radius: number; color: string }) {
  const start = new Vector3(...from);
  const end = new Vector3(...to);
  const direction = end.clone().sub(start);
  const rotation = new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), direction.clone().normalize());
  return (
    <mesh position={start.add(end).multiplyScalar(.5)} quaternion={rotation}>
      <capsuleGeometry args={[radius, Math.max(.001, direction.length() - radius * 2), 4, 10]} />
      <meshStandardMaterial color={color} roughness={.7} />
    </mesh>
  );
}

export function Blob({ at, scale, color, rough = .7 }: { at: Vec; scale: Vec; color: string; rough?: number }) {
  return (
    <mesh position={at} scale={scale}>
      <sphereGeometry args={[1, 20, 14]} />
      <meshStandardMaterial color={color} roughness={rough} />
    </mesh>
  );
}

export function Box({ at, size, color, rotation = 0, rough = .65 }: { at: Vec; size: Vec; color: string; rotation?: number; rough?: number }) {
  const radius = Math.min(.055, Math.min(...size) / 2 - .002);
  return (
    <RoundedBox position={at} rotation={[0, rotation, 0]} args={size} radius={Math.max(.004, radius)} smoothness={2} creaseAngle={.5}>
      <meshStandardMaterial color={color} roughness={rough} metalness={.04} />
    </RoundedBox>
  );
}

const PANTS = "#2b3a57";
const SHOE = "#1b2435";

/** A jointed figure: hips, knees and shoulders are real pivots so it can be animated. */
export function Figure({
  at, turn = 0, shirt = "#2f6bff", skin = "#e4ad88", hair = "#1b2435",
  seated = false, action = "idle", anim, offset = 0, groupRef, zone,
}: {
  at: Vec; turn?: number; shirt?: string; skin?: string; hair?: string;
  seated?: boolean; action?: Action; anim: RefObject<Anim>; offset?: number;
  groupRef?: RefObject<Group | null>; zone?: number;
}) {
  const body = useRef<Group>(null);
  const hips = useRef<Group>(null);
  const legs = [useRef<Group>(null), useRef<Group>(null)];
  const knees = [useRef<Group>(null), useRef<Group>(null)];
  const arms = [useRef<Group>(null), useRef<Group>(null)];
  const elbows = [useRef<Group>(null), useRef<Group>(null)];
  const head = useRef<Group>(null);

  const baseThigh = seated ? -1.45 : 0;
  const baseKnee = seated ? 1.5 : 0;

  useFrame(() => {
    // Sebelas figur tersebar di enam zona; tanpa penjagaan ini semuanya
    // menghitung rig tiap frame walau lima zona ada di luar layar.
    if (zone !== undefined && Math.abs(anim.current.zone - zone) > .75) return;
    const t = (anim.current?.time ?? 0) + offset;
    const set = (ref: RefObject<Group | null>, x: number) => { if (ref.current) ref.current.rotation.x = x; };

    let bob = 0;
    let armL = seated ? -.15 : 0;
    let armR = armL;
    let elbowL = seated ? .25 : .12;
    let elbowR = elbowL;
    let legL = baseThigh;
    let legR = baseThigh;
    let kneeL = baseKnee;
    let kneeR = baseKnee;
    let headTurn = 0;
    let headNod = 0;

    if (action === "walk") {
      const swing = Math.sin(t * 6.2);
      legL = swing * .62;
      legR = -swing * .62;
      kneeL = Math.max(0, -swing) * .9;
      kneeR = Math.max(0, swing) * .9;
      armL = -swing * .55;
      armR = swing * .55;
      elbowL = elbowR = .35;
      bob = Math.abs(Math.cos(t * 6.2)) * .045;
    } else if (action === "type") {
      armL = -1.18 + Math.sin(t * 9.5) * .06;
      armR = -1.18 + Math.sin(t * 9.5 + 1.7) * .06;
      elbowL = .95 + Math.sin(t * 9.5 + .6) * .18;
      elbowR = .95 + Math.sin(t * 9.5 + 2.3) * .18;
      headNod = Math.sin(t * 1.4) * .05;
      headTurn = Math.sin(t * .7) * .12;
    } else if (action === "shake") {
      const pump = Math.sin(t * 5.2);
      armR = -1.22 + pump * .1;
      elbowR = .55 - pump * .12;
      armL = .1;
      headNod = pump * .04;
    } else if (action === "present") {
      armR = -1.95 + Math.sin(t * 1.6) * .16;
      elbowR = .2;
      armL = .08;
      headTurn = -.25 + Math.sin(t * 1.1) * .1;
      bob = Math.sin(t * 1.3) * .012;
    } else if (action === "carry") {
      armL = armR = -1.3 + Math.sin(t * 1.5) * .05;
      elbowL = elbowR = .85;
      bob = Math.sin(t * 1.5) * .014;
    } else if (action === "talk") {
      armR = (seated ? -.15 : 0) + Math.sin(t * 2.4) * .3;
      elbowR = (seated ? .25 : .12) + .45 + Math.sin(t * 2.4 + .8) * .25;
      headTurn = Math.sin(t * .9) * .16;
      headNod = Math.sin(t * 1.8) * .05;
    } else {
      bob = Math.sin(t * 1.2) * .01;
      headTurn = Math.sin(t * .6) * .1;
    }

    if (body.current) body.current.position.y = bob;
    set(legs[0], legL); set(legs[1], legR);
    set(knees[0], kneeL); set(knees[1], kneeR);
    set(arms[0], armL); set(arms[1], armR);
    set(elbows[0], elbowL); set(elbows[1], elbowR);
    if (head.current) {
      head.current.rotation.y = headTurn;
      head.current.rotation.x = headNod;
    }
  });

  const hipY = seated ? .47 : .84;

  return (
    <group ref={groupRef} position={at} rotation={[0, turn, 0]}>
      <group ref={body}>
        <group ref={hips} position={[0, hipY, 0]}>
          {[0, 1].map((side) => (
            <group key={side} ref={legs[side]} position={[side ? .13 : -.13, 0, 0]}>
              <mesh position={[0, -.19, 0]}>
                <capsuleGeometry args={[.096, .2, 4, 10]} />
                <meshStandardMaterial color={PANTS} roughness={.75} />
              </mesh>
              <group ref={knees[side]} position={[0, -.38, 0]}>
                <mesh position={[0, -.18, 0]}>
                  <capsuleGeometry args={[.082, .2, 4, 10]} />
                  <meshStandardMaterial color={PANTS} roughness={.75} />
                </mesh>
                <Box at={[0, -.4, .06]} size={[.17, .085, .27]} color={SHOE} rough={.5} />
              </group>
            </group>
          ))}

          {/* Torso, neck and head */}
          <mesh position={[0, .23, 0]}>
            <capsuleGeometry args={[.19, .22, 5, 12]} />
            <meshStandardMaterial color={shirt} roughness={.68} />
          </mesh>
          <Blob at={[0, .12, 0]} scale={[.21, .14, .16]} color={shirt} />
          <mesh position={[0, .46, 0]}>
            <capsuleGeometry args={[.055, .05, 4, 8]} />
            <meshStandardMaterial color={skin} roughness={.6} />
          </mesh>

          <group ref={head} position={[0, .62, 0]}>
            <Blob at={[0, 0, 0]} scale={[.155, .175, .155]} color={skin} rough={.55} />
            <Blob at={[0, .055, -.012]} scale={[.163, .13, .165]} color={hair} rough={.75} />
            <Blob at={[0, -.04, .138]} scale={[.05, .04, .035]} color={skin} rough={.55} />
            {[-1, 1].map((s) => <Blob key={s} at={[s * .152, -.01, .01]} scale={[.032, .045, .035]} color={skin} rough={.55} />)}
          </group>

          {/* Arms: shoulder pivot, elbow pivot, hand */}
          {[0, 1].map((side) => (
            <group key={side} ref={arms[side]} position={[side ? .225 : -.225, .36, 0]}>
              <mesh position={[0, -.14, 0]}>
                <capsuleGeometry args={[.062, .16, 4, 10]} />
                <meshStandardMaterial color={shirt} roughness={.68} />
              </mesh>
              <group ref={elbows[side]} position={[0, -.29, 0]}>
                <mesh position={[0, -.13, 0]}>
                  <capsuleGeometry args={[.055, .15, 4, 10]} />
                  <meshStandardMaterial color={skin} roughness={.6} />
                </mesh>
                <Blob at={[0, -.26, 0]} scale={[.063, .062, .055]} color={skin} rough={.55} />
              </group>
            </group>
          ))}
        </group>
      </group>
      <Shadow at={[0, 0, seated ? .18 : 0]} size={seated ? 1.05 : .78} />
    </group>
  );
}

export function Chair({ at, turn = 0, color = "#44546f" }: { at: Vec; turn?: number; color?: string }) {
  return (
    <group position={at} rotation={[0, turn, 0]}>
      <Box at={[0, .43, 0]} size={[.54, .09, .52]} color={color} />
      <Box at={[0, .72, -.25]} size={[.52, .5, .09]} color={color} />
      <Limb from={[0, .41, 0]} to={[0, .06, 0]} radius={.052} color="#334155" />
      <Box at={[0, .055, 0]} size={[.46, .07, .46]} color="#334155" />
      <Shadow at={[0, 0, 0]} size={.95} />
    </group>
  );
}

export function Desk({ at, turn = 0, width = 1.9 }: { at: Vec; turn?: number; width?: number }) {
  return (
    <group position={at} rotation={[0, turn, 0]}>
      <Box at={[0, .73, 0]} size={[width, .07, .88]} color="#eef2f9" rough={.5} />
      <Box at={[-width / 2 + .13, .36, 0]} size={[.1, .73, .74]} color="#d4dcea" />
      <Box at={[width / 2 - .13, .36, 0]} size={[.1, .73, .74]} color="#d4dcea" />
      <Shadow at={[0, 0, 0]} size={width + .5} />
    </group>
  );
}

export function Monitor({ at, turn = 0, screen = "#2f6bff", width = .8 }: { at: Vec; turn?: number; screen?: string; width?: number }) {
  return (
    <group position={at} rotation={[0, turn, 0]}>
      <Box at={[0, .035, 0]} size={[.32, .05, .2]} color="#9fb0c7" rough={.45} />
      <Box at={[0, .18, 0]} size={[.07, .26, .07]} color="#9fb0c7" rough={.45} />
      <Box at={[0, .56, 0]} size={[width, .52, .055]} color="#263449" rough={.4} />
      <mesh position={[0, .56, .033]}>
        <planeGeometry args={[width - .07, .44]} />
        <meshStandardMaterial color={screen} emissive={screen} emissiveIntensity={.6} roughness={.35} />
      </mesh>
    </group>
  );
}

export function Table({ at, radius = .62 }: { at: Vec; radius?: number }) {
  return (
    <group position={at}>
      <mesh position={[0, .63, 0]}>
        <cylinderGeometry args={[radius, radius, .08, 48]} />
        <meshStandardMaterial color="#eef2f9" roughness={.5} />
      </mesh>
      <Limb from={[0, .6, 0]} to={[0, .07, 0]} radius={.058} color="#a7b4c9" />
      <mesh position={[0, .055, 0]}>
        <cylinderGeometry args={[.33, .35, .06, 20]} />
        <meshStandardMaterial color="#a7b4c9" roughness={.55} />
      </mesh>
      <Shadow at={[0, 0, 0]} size={radius * 2.6} />
    </group>
  );
}

export function Plant({ at, scale = 1 }: { at: Vec; scale?: number }) {
  return (
    <group position={at} scale={scale}>
      <mesh position={[0, .18, 0]}>
        <cylinderGeometry args={[.18, .14, .36, 16]} />
        <meshStandardMaterial color="#e4eaf5" roughness={.7} />
      </mesh>
      <mesh position={[0, .36, 0]}>
        <cylinderGeometry args={[.19, .19, .04, 16]} />
        <meshStandardMaterial color="#cfd8e8" roughness={.7} />
      </mesh>
      <Blob at={[0, .56, 0]} scale={[.23, .27, .23]} color="#3fae7a" rough={.8} />
      <Blob at={[.15, .45, .07]} scale={[.14, .17, .14]} color="#4ac98c" rough={.8} />
      <Blob at={[-.13, .48, -.06]} scale={[.12, .16, .12]} color="#349268" rough={.8} />
      <Shadow at={[0, 0, 0]} size={.8} />
    </group>
  );
}

export function Board({ at, turn = 0, notes = [] }: { at: Vec; turn?: number; notes?: { at: [number, number]; color: string }[] }) {
  return (
    <group position={at} rotation={[0, turn, 0]}>
      <Box at={[0, 1.1, 0]} size={[1.95, 1.18, .08]} color="#dbe3f0" rough={.5} />
      <Box at={[0, 1.1, .045]} size={[1.8, 1.04, .015]} color="#fbfdff" rough={.4} />
      {notes.map((note, i) => (
        <Box key={i} at={[note.at[0], 1.1 + note.at[1], .06]} size={[.24, .2, .012]} color={note.color} rough={.75} />
      ))}
      <Limb from={[-.72, .52, 0]} to={[-.72, .02, .24]} radius={.042} color="#a7b4c9" />
      <Limb from={[.72, .52, 0]} to={[.72, .02, .24]} radius={.042} color="#a7b4c9" />
      <Shadow at={[0, 0, .12]} size={2.1} />
    </group>
  );
}

export function Crate({ at, turn = 0, color = "#2f6bff", groupRef }: { at: Vec; turn?: number; color?: string; groupRef?: RefObject<Group | null> }) {
  return (
    <group ref={groupRef} position={at} rotation={[0, turn, 0]}>
      <Box at={[0, .22, 0]} size={[.62, .44, .5]} color={color} rough={.55} />
      <Box at={[0, .455, 0]} size={[.66, .06, .54]} color="#ffffff" rough={.45} />
      <Box at={[0, .23, .256]} size={[.17, .3, .015]} color="#ffffff" rough={.45} />
    </group>
  );
}

export function Sheet({ at, turn = 0, tilt = 0, size = [.5, .66], color = "#ffffff" }: { at: Vec; turn?: number; tilt?: number; size?: [number, number]; color?: string }) {
  return (
    <mesh position={at} rotation={[-Math.PI / 2 + tilt, 0, turn]}>
      <planeGeometry args={size} />
      <meshStandardMaterial color={color} roughness={.6} side={2} />
    </mesh>
  );
}

export const lerp = MathUtils.lerp;
