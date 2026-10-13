"use client";

import { RoomLife } from "./RoomLife";
import { SunRig, SunShafts } from "./RoomSun";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { useEffect, useRef, type RefObject } from "react";
import { ACESFilmicToneMapping, MathUtils, PCFSoftShadowMap, Scene, Vector3 } from "three";
import { CSS3DObject, CSS3DRenderer } from "three/addons/renderers/CSS3DRenderer.js";

type Point = [number, number, number];
type SceneProps = { scrollRoot: RefObject<HTMLDivElement | null>; onReady: () => void; onError: () => void; thoughtRef: RefObject<HTMLDivElement | null>; animated: boolean };

function Box({ at, size, color, radius = .025, rotation = [0, 0, 0], metal = 0, shadow = true }: {
  at: Point; size: Point; color: string; radius?: number; rotation?: Point; metal?: number; shadow?: boolean;
}) {
  // `shadow={false}` dipakai untuk cangkang ruangan: jendela di scene ini kotak
  // padat, bukan lubang, jadi kalau ia membuang bayangan matahari tidak akan
  // pernah masuk ke dalam kamar.
  return <RoundedBox args={size} radius={radius} smoothness={2} position={at} rotation={rotation} castShadow={shadow} receiveShadow>
    <meshStandardMaterial color={color} roughness={metal ? .32 : .8} metalness={metal} />
  </RoundedBox>;
}

function Cylinder({ at, radius, height, color, top = radius }: { at: Point; radius: number; height: number; color: string; top?: number }) {
  return <mesh position={at} castShadow receiveShadow><cylinderGeometry args={[top, radius, height, 24]} /><meshStandardMaterial color={color} roughness={.7} /></mesh>;
}

function Plant({ at, scale = 1 }: { at: Point; scale?: number }) {
  return <group position={at} scale={scale}>
    <Cylinder at={[0, .2, 0]} radius={.2} top={.25} height={.4} color="#c7e5f5" />
    <Cylinder at={[0, .405, 0]} radius={.215} height={.018} color="#443b2d" />
    {Array.from({ length: 7 }, (_, i) => {
      const angle = i * 2.4;
      return <group key={i} rotation={[0, angle, 0]}>
        <mesh position={[.12, .63 + (i % 3) * .15, 0]} rotation={[0, 0, -.45 - (i % 2) * .2]} scale={[.13, .34, .055]} castShadow>
          <sphereGeometry args={[1, 12, 12]} /><meshStandardMaterial color={i % 2 ? "#536f48" : "#78925d"} roughness={.85} />
        </mesh>
        <Cylinder at={[.025, .57, 0]} radius={.012} height={.4} color="#516344" />
      </group>;
    })}
  </group>;
}

function Window() {
  return <group position={[0, 3.18, -3.72]}>
    <Box at={[0, 0, 0]} size={[4.15, 2.75, .17]} color="#234a78" shadow={false} />
    <mesh position={[0, 0, .1]}>
      <planeGeometry args={[3.9, 2.5]} />
      <meshBasicMaterial color="#83cbea" />
    </mesh>
    {/* A distant, quiet skyline behind the glass. */}
    {[-1.55, -.95, -.3, .45, 1.25, 1.7].map((x, i) => <Box key={x} at={[x, -.87 + (i % 3) * .1, .13]} size={[.45, .62 + (i % 3) * .2, .05]} color={i % 2 ? "#518fbd" : "#66a8cd"} radius={.005} />)}
    <mesh position={[-1.22, .63, .15]}><circleGeometry args={[.26, 32]} /><meshBasicMaterial color="#e0f9ff" /></mesh>
    {[-1.98, 0, 1.98].map((x) => <Box key={x} at={[x, 0, .21]} size={[.075, 2.64, .14]} color="#b5daef" radius={.01} />)}
    {[-1.29, .08, 1.29].map((y) => <Box key={y} at={[0, y, .22]} size={[4.02, .075, .14]} color="#b5daef" radius={.01} />)}
    <Box at={[0, -1.42, .23]} size={[4.45, .13, .55]} color="#5281ab" />
    <Box at={[0, 1.48, .28]} size={[4.9, .08, .1]} color="#1f4270" />
    {[-1, 1].map((side) => <group key={side} position={[side * 2.28, -.04, .35]}>
      {Array.from({ length: 6 }, (_, i) => <mesh key={i} position={[(i - 2.5) * .095, 0, Math.sin(i * 2) * .035]} castShadow>
        <cylinderGeometry args={[.085, .085, 2.88, 12]} /><meshStandardMaterial color={i % 2 ? "#4877a7" : "#6598c1"} roughness={1} />
      </mesh>)}
    </group>)}
  </group>;
}

function MonitorScreen({ onReady }: { onReady: () => void }) {
  const { gl, size, camera, invalidate } = useThree();
  const screen = useRef<{ renderer: CSS3DRenderer; scene: Scene } | null>(null);
  useEffect(() => {
    const renderer = new CSS3DRenderer();
    Object.assign(renderer.domElement.style, { position: "absolute", inset: "0", pointerEvents: "none", overflow: "hidden", zIndex: "10" });
    const frame = document.createElement("iframe");
    frame.className = "room-screen-frame";
    frame.title = "Hero website Novara pada layar komputer";
    frame.tabIndex = -1;
    frame.onload = () => { onReady(); invalidate(); };
    frame.src = "/intro-screen";
    const object = new CSS3DObject(frame);
    frame.style.pointerEvents = "none";
    object.position.set(0, 2.55, -1.32);
    object.scale.setScalar(2.8 / 1280);
    const scene = new Scene();
    scene.add(object);
    gl.domElement.parentElement?.appendChild(renderer.domElement);
    screen.current = { renderer, scene };
    invalidate();
    return () => {
      frame.onload = null;
      frame.remove();
      renderer.domElement.remove();
      screen.current = null;
    };
  }, [gl, onReady, invalidate]);
  useEffect(() => {
    screen.current?.renderer.setSize(size.width, size.height);
    invalidate();
  }, [size.width, size.height, invalidate]);
  useFrame(() => {
    if (screen.current) screen.current.renderer.render(screen.current.scene, camera);
  }, -1);
  return null;
}
function Desk({ onReady }: { onReady: () => void }) {
  return <group>
    <Box at={[0, 1.36, -.9]} size={[4.8, .16, 1.85]} color="#274e7c" radius={.055} />
    {/* Subtle grain strips across the blue-stained desktop. */}
    {Array.from({ length: 10 }, (_, i) => <Box key={i} at={[0, 1.443, -1.7 + i * .17]} size={[4.65, .003, .009]} color={i % 2 ? "#39638e" : "#204369"} radius={.001} />)}
    {[-2.12, 2.12].map((x) => <group key={x}>
      <Box at={[x, .67, -1.47]} size={[.11, 1.3, .12]} color="#102543" />
      <Box at={[x, .67, -.23]} size={[.11, 1.3, .12]} color="#102543" />
      <Box at={[x, .12, -.85]} size={[.13, .1, 1.48]} color="#102543" />
    </group>)}
    <Box at={[1.7, .7, -.95]} size={[.78, 1.15, 1.35]} color="#2e507c" />
    {[.34, .7, 1.06].map((y) => <group key={y}><Box at={[1.7, y, -.258]} size={[.71, .32, .04]} color="#3a6290" /><Box at={[1.7, y + .05, -.22]} size={[.22, .025, .03]} color="#69c6eb" radius={.005} /></group>)}
    {/* Aluminum monitor, stand and dark glass bezel. */}
    <Box at={[0, 1.49, -1.25]} size={[.85, .075, .49]} color="#868e8e" metal={.65} />
    <Box at={[0, 1.8, -1.45]} size={[.17, .64, .12]} color="#9ba3a3" metal={.65} />
    <Box at={[0, 2.55, -1.43]} size={[3.03, 1.98, .13]} color="#929b9b" radius={.07} metal={.5} />
    <Box at={[0, 2.55, -1.351]} size={[2.98, 1.92, .035]} color="#131a20" radius={.065} />
    <mesh position={[0, 2.55, -1.328]}><planeGeometry args={[2.8, 1.75]} /><meshBasicMaterial color="#060b1a" /></mesh>
    <MonitorScreen onReady={onReady} />
    <mesh position={[0, 1.615, -1.325]}><sphereGeometry args={[.012, 8, 8]} /><meshBasicMaterial color="#00cfff" /></mesh>
    <Box at={[-.2, 1.47, -.36]} size={[1.3, .055, .43]} color="#7399b6" />
    {Array.from({ length: 4 }, (_, row) => Array.from({ length: 14 }, (_, col) => <Box key={`${row}-${col}`} at={[-.79 + col * .091, 1.508, -.51 + row * .093]} size={[.074, .02, .069]} color={row === 3 && col > 3 && col < 10 ? "#008fe0" : "#cfecfa"} radius={.006} />))}
    <Box at={[.91, 1.457, -.33]} size={[.58, .018, .53]} color="#0755bf" />
    <mesh position={[.92, 1.51, -.34]} scale={[.09, .055, .15]} castShadow><sphereGeometry args={[1, 20, 16]} /><meshStandardMaterial color="#d9f2ff" roughness={.4} /></mesh>
    <Plant at={[1.98, 1.44, -1.47]} scale={.7} />
    <Cylinder at={[-1.43, 1.59, -.47]} radius={.12} height={.27} color="#b9e8ff" />
    <Cylinder at={[-1.43, 1.732, -.47]} radius={.098} height={.008} color="#493523" />
    <mesh position={[-1.57, 1.6, -.47]} rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[.085, .025, 10, 20]} /><meshStandardMaterial color="#b9e8ff" /></mesh>
    <Box at={[-1.9, 1.48, -.9]} size={[.45, .055, .59]} color="#075bdf" rotation={[0, -.14, 0]} />
    {/* Desk lamp. */}
    <Cylinder at={[-1.92, 1.48, -1.5]} radius={.2} height={.045} color="#113662" />
    <Cylinder at={[-1.92, 1.84, -1.5]} radius={.025} height={.72} color="#113662" />
    <mesh position={[-1.83, 2.2, -1.5]} rotation={[0, 0, -.35]} castShadow><coneGeometry args={[.23, .25, 24, 1, true]} /><meshStandardMaterial color="#008ee5" side={2} /></mesh>
    <pointLight position={[-1.82, 2.08, -1.43]} color="#5cdbff" intensity={1.5} distance={2.5} />
  </group>;
}

function Furniture() {
  return <group>
    {/* Low bed with linen duvet and two pillows. */}
    <Box at={[3.53, .28, -.25]} size={[2.3, .4, 3.8]} color="#19375b" radius={.09} />
    <Box at={[3.53, .55, -.25]} size={[2.25, .25, 3.7]} color="#bbd4e9" radius={.12} />
    <Box at={[3.53, .73, .15]} size={[2.27, .18, 2.7]} color="#1450b9" radius={.085} />
    <Box at={[3.53, .86, -2.1]} size={[2.35, 1.1, .15]} color="#244a7b" radius={.06} />
    {[3, 4.06].map((x) => <Box key={x} at={[x, .79, -1.55]} size={[.94, .22, .65]} color="#d2edfc" radius={.105} rotation={[0, .025, 0]} />)}
    <Box at={[3.53, .84, 1.05]} size={[2.28, .045, .65]} color="#078cce" radius={.02} />
    {Array.from({ length: 10 }, (_, i) => <Box key={i} at={[2.51 + i * .225, .867, 1.05]} size={[.018, .008, .64]} color="#3dc6ef" radius={.001} />)}
    {/* A chair pulled slightly away from the desk. */}
    <group position={[-1.05, 0, 1.04]} rotation={[0, -.32, 0]}>
      <Cylinder at={[0, .42, 0]} radius={.045} height={.7} color="#122642" />
      <Box at={[0, .79, 0]} size={[.92, .16, .85]} color="#0851b1" radius={.075} />
      <Box at={[0, 1.24, .38]} size={[.89, .88, .14]} color="#0851b1" radius={.065} rotation={[-.08, 0, 0]} />
      {[-.47, .47].map((x) => <group key={x}><Box at={[x, .94, 0]} size={[.045, .32, .04]} color="#183357" /><Box at={[x, 1.09, -.04]} size={[.09, .05, .48]} color="#183357" /></group>)}
      {[0, 1, 2, 3, 4].map((i) => <group key={i} rotation={[0, i * Math.PI * 2 / 5, 0]}><Box at={[0, .12, .24]} size={[.07, .06, .53]} color="#122642" /><Cylinder at={[0, .065, .47]} radius={.065} height={.075} color="#0d1c32" /></group>)}
    </group>
    {/* Open bookcase against the left wall. */}
    <group position={[-3.55, 0, -2.65]}>
      {[-.67, .67].map((x) => <Box key={x} at={[x, 1.45, 0]} size={[.08, 2.9, .63]} color="#203d66" />)}
      {[.16, .86, 1.56, 2.26, 2.94].map((y) => <Box key={y} at={[0, y, 0]} size={[1.42, .065, .68]} color="#315986" />)}
      {[.9, 1.6, 2.3].map((y, row) => <group key={y}>
        {Array.from({ length: 5 }, (_, i) => <Box key={i} at={[-.48 + i * .18, y + .23, .04]} size={[.12, .36 + (i % 3) * .06, .36]} color={["#006cf5", "#85cef0", "#113697", "#c3e9fb", "#009ecb"][(i + row) % 5]} radius={.006} rotation={[0, 0, i === 4 ? -.12 : 0]} />)}
      </group>)}
      <Box at={[0, .45, .03]} size={[1.1, .48, .48]} color="#5178a1" />
      <Plant at={[0, 2.99, 0]} scale={.6} />
    </group>
    <Plant at={[-3.55, 0, .18]} scale={1.75} />
    {/* Wall art, side table and a small ceramic vase. */}
    <group position={[3.48, 2.6, -3.69]}>
      <Box at={[0, 0, 0]} size={[1.12, 1.4, .09]} color="#3483bb" />
      <Box at={[0, 0, .052]} size={[.96, 1.23, .02]} color="#0d254e" radius={.001} />
      <mesh position={[0, .19, .07]}><circleGeometry args={[.3, 40]} /><meshBasicMaterial color="#00c8f5" /></mesh>
      <Box at={[0, -.32, .08]} size={[.62, .28, .01]} color="#0655ef" radius={.005} />
    </group>
    <Box at={[1.93, .4, -2.8]} size={[.55, .75, .6]} color="#2d5080" />
    <Cylinder at={[1.93, .88, -2.8]} radius={.11} top={.07} height={.23} color="#64cbed" />
  </group>;
}

function CameraTravel({ scrollRoot }: Pick<SceneProps, "scrollRoot">) {
  const { invalidate } = useThree();
  useEffect(() => {
    const update = () => invalidate();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [invalidate]);
  useFrame(({ camera, size }) => {
    const root = scrollRoot.current;
    if (!root) return;
    const progress = MathUtils.clamp(-root.getBoundingClientRect().top / Math.max(1, root.offsetHeight - (root.querySelector<HTMLElement>(".room-stage")?.offsetHeight ?? window.innerHeight)), 0, 1);
    const t = MathUtils.smoothstep(progress, 0, .91);
    const portrait = size.width < size.height;
    const start = new Vector3(portrait ? 4.9 : 5.3, portrait ? 4.1 : 3.8, portrait ? 11.8 : 7.7);
    const aspect = size.width / size.height;
    const screenDistance = Math.min(1.75 / (2 * Math.tan(Math.PI / 9)), 2.8 / (2 * Math.tan(Math.PI / 9) * aspect)) * .88;
    const end = new Vector3(0, 2.55, -1.32 + screenDistance);
    camera.position.lerpVectors(start, end, t);
    camera.lookAt(MathUtils.lerp(0, 0, t), MathUtils.lerp(1.85, 2.55, t), -1.32);
    camera.updateProjectionMatrix();
    camera.updateMatrixWorld();
  }, -2);
  return null;
}

function ContextGuard({ onError }: { onError: () => void }) {
  const { gl } = useThree();
  useEffect(() => {
    const canvas = gl.domElement;
    const lost = (event: Event) => { event.preventDefault(); onError(); };
    canvas.addEventListener("webglcontextlost", lost);
    return () => canvas.removeEventListener("webglcontextlost", lost);
  }, [gl, onError]);
  return null;
}

export default function RoomScene({ scrollRoot, onReady, onError, thoughtRef, animated }: SceneProps) {
  return <Canvas
    shadows={{ type: PCFSoftShadowMap }}
    frameloop="demand"
    dpr={[1, 1.5]}
    camera={{ position: [5.3, 3.8, 7.7], fov: 40, near: .05, far: 45 }}
    gl={{ antialias: true, alpha: false, powerPreference: "low-power" }}
    onCreated={({ gl }) => { gl.toneMapping = ACESFilmicToneMapping; gl.toneMappingExposure = 1.15; }}
    fallback={<div className="room-loading">Browser ini tidak mendukung tampilan 3D.</div>}
  >
    <color attach="background" args={["#0b1833"]} />

    {/* Ambient dan hemisphere diturunkan supaya matahari punya ruang untuk terbaca. */}
    <ambientLight intensity={.56} />
    <hemisphereLight args={["#dbeaff", "#16325f", 1.05]} />

    {/* Matahari: satu-satunya sumber yang membuang bayangan, agar arah bayangan
        selalu sejalan dengan berkas cahaya yang terlihat. */}
    <SunRig />

    {/* Isian dingin dari arah kamera, menjaga sisi bayangan tidak mati. */}
    <directionalLight position={[3, 4, 5]} intensity={.7} color="#74b9ff" />
    <pointLight position={[-2.8, 2.8, -2.7]} intensity={3} color="#00c8ff" distance={7} />
    <pointLight position={[3.5, 1.8, 1.5]} intensity={1.7} color="#075bff" distance={6} />
    <group>
      <Box at={[0, -.15, 0]} size={[10.2, .25, 10]} color="#233b60" shadow={false} />
      {Array.from({ length: 24 }, (_, i) => <Box key={i} at={[-4.9 + i * .425, -.017, 0]} size={[.418, .02, 9.8]} color={["#355579", "#304d70", "#3a5c80", "#2e4b6c"][i % 4]} radius={.001} />)}
      <Box at={[0, 2.65, -3.95]} size={[10.2, 5.5, .3]} color="#20365e" shadow={false} />
      <Box at={[-5.08, 2.65, 0]} size={[.2, 5.5, 8]} color="#152c50" shadow={false} />
      <Box at={[5.08, 2.65, -1.2]} size={[.2, 5.5, 5.5]} color="#1b3158" shadow={false} />
      <Box at={[0, .095, -3.74]} size={[10, .18, .07]} color="#447aa3" />
      <Box at={[-4.94, .095, 0]} size={[.07, .18, 7.5]} color="#447aa3" />
      <Box at={[0, .005, 1.2]} size={[4.7, .04, 3.3]} color="#214978" radius={.015} />
      {Array.from({ length: 17 }, (_, i) => <Box key={i} at={[-2.22 + i * .275, .028, 1.2]} size={[.012, .003, 3.2]} color="#3574a2" radius={.001} />)}
      <Window />
      <Desk onReady={onReady} />
      <Furniture />
    </group>
    <SunShafts animated={animated} />
    <CameraTravel scrollRoot={scrollRoot} />
    <RoomLife scrollRoot={scrollRoot} thoughtRef={thoughtRef} animated={animated} />
    <ContextGuard onError={onError} />
  </Canvas>;
}
