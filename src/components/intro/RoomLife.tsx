"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, type RefObject } from "react";
import { CanvasTexture, Group, Quaternion, Sprite, Vector3 } from "three";

type Point = [number, number, number];
type Props = {
  scrollRoot: RefObject<HTMLDivElement | null>;
  thoughtRef: RefObject<HTMLDivElement | null>;
  animated: boolean;
};

function Limb({ from, to, radius, color }: { from: Point; to: Point; radius: number; color: string }) {
  const start = new Vector3(...from);
  const end = new Vector3(...to);
  const direction = end.clone().sub(start);
  const rotation = new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), direction.clone().normalize());
  return <mesh position={start.add(end).multiplyScalar(.5)} quaternion={rotation} castShadow>
    <capsuleGeometry args={[radius, Math.max(.001, direction.length() - radius * 2), 5, 12]} />
    <meshStandardMaterial color={color} roughness={.8} />
  </mesh>;
}

function Shape({ at, scale, color }: { at: Point; scale: Point; color: string }) {
  return <mesh position={at} scale={scale} castShadow>
    <sphereGeometry args={[1, 20, 16]} />
    <meshStandardMaterial color={color} roughness={.8} />
  </mesh>;
}

export function RoomLife({ scrollRoot, thoughtRef, animated }: Props) {
  const { invalidate } = useThree();
  const upperBody = useRef<Group>(null);
  const head = useRef<Group>(null);
  const steam = useRef<(Sprite | null)[]>([]);
  const elapsed = useRef(0);
  const anchor = useMemo(() => new Vector3(), []);
  const headAnchor = useMemo(() => new Vector3(), []);
  const steamTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 64;
    const context = canvas.getContext("2d")!;
    const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(223,246,255,.6)");
    gradient.addColorStop(.35, "rgba(223,246,255,.3)");
    gradient.addColorStop(1, "rgba(223,246,255,0)");
    context.fillStyle = gradient;
    context.fillRect(0, 0, 64, 64);
    return new CanvasTexture(canvas);
  }, []);

  useEffect(() => () => steamTexture.dispose(), [steamTexture]);
  useEffect(() => {
    if (!animated) return;
    // Keep the demand renderer at ~25 fps only while the intro is on screen.
    const timer = window.setInterval(() => {
      const root = scrollRoot.current;
      if (!root || document.hidden) return;
      const bounds = root.getBoundingClientRect();
      const travel = root.offsetHeight - (root.querySelector<HTMLElement>(".room-stage")?.offsetHeight ?? innerHeight);
      if (bounds.top <= innerHeight && -bounds.top < travel * .91) invalidate();
    }, 40);
    return () => clearInterval(timer);
  }, [animated, invalidate, scrollRoot]);

  useFrame(({ camera, size }, delta) => {
    if (animated && !document.hidden) elapsed.current += Math.min(delta, .08);
    const time = elapsed.current;
    if (upperBody.current) {
      upperBody.current.position.y = Math.sin(time * 1.4) * .012;
      upperBody.current.rotation.z = Math.sin(time * .65) * .018;
    }
    if (head.current) {
      head.current.rotation.y = .55 + Math.sin(time * .6) * .09;
      head.current.rotation.z = -.1 + Math.sin(time * .8) * .025;
    }
    steam.current.forEach((puff, i) => {
      if (!puff) return;
      const life = (time * .22 + i / 9) % 1;
      puff.position.set(-1.43 + Math.sin(life * 6 + i * 1.7) * .045 + life * .07, 1.77 + life * .7, -.47 + Math.cos(life * 4 + i) * .025);
      puff.scale.set(.09 + life * .22, .14 + life * .32, 1);
      puff.material.opacity = Math.sin(life * Math.PI) * .47;
    });
    if (thoughtRef.current) {
      anchor.set(-1.05, 2.55, 1.04).project(camera);
      const width = Math.min(264, size.width - 40);
      const x = Math.max(width / 2 + 20, Math.min(size.width - width / 2 - 20, (anchor.x * .5 + .5) * size.width));
      const y = size.width < 640 ? 255 : Math.max(190, (1 - (anchor.y * .5 + .5)) * size.height - 18);
      thoughtRef.current.style.setProperty("--thought-x", `${x}px`);
      thoughtRef.current.style.setProperty("--thought-y", `${y}px`);
      // Keep the trailing puffs pointed at the head wherever the bubble gets clamped to.
      let tail = 0;
      let tilt = 0;
      if (head.current) {
        head.current.getWorldPosition(headAnchor);
        headAnchor.y += .3;
        headAnchor.project(camera);
        const headX = (headAnchor.x * .5 + .5) * size.width;
        const headY = (1 - (headAnchor.y * .5 + .5)) * size.height;
        const limit = Math.max(0, width / 2 - 34);
        tail = Math.max(-limit, Math.min(limit, headX - x));
        const reach = Math.atan2(headX - x - tail, Math.max(28, headY - y)) * 180 / Math.PI;
        tilt = -Math.max(-32, Math.min(32, reach));
      }
      thoughtRef.current.style.setProperty("--thought-tail", `${tail}px`);
      thoughtRef.current.style.setProperty("--thought-tilt", `${tilt}deg`);
    }
  });

  return <>
    {/* A stylized thinker seated in the existing chair, hand resting on the chin. */}
    <group position={[-1.05, 0, 1.04]} rotation={[0, -.32, 0]}>
      <Shape at={[0, .92, -.05]} scale={[.32, .16, .3]} color="#102344" />
      {[-.19, .19].map((x) => <group key={x}>
        <Limb from={[x, .91, -.05]} to={[x, .8, -.63]} radius={.125} color="#172e50" />
        <Limb from={[x, .8, -.63]} to={[x, .2, -.65]} radius={.105} color="#172e50" />
        <Shape at={[x, .12, -.76]} scale={[.13, .1, .23]} color="#d0eaff" />
      </group>)}
      <group ref={upperBody}>
        <Shape at={[0, 1.3, -.06]} scale={[.34, .43, .24]} color="#078ccc" />
        <Shape at={[0, 1.61, -.01]} scale={[.22, .13, .2]} color="#0868a7" />
        <Limb from={[0, 1.59, -.08]} to={[0, 1.79, -.1]} radius={.085} color="#d99c78" />
        <group ref={head} position={[0, 1.97, -.12]} rotation={[0, .55, -.1]}>
          <Shape at={[0, 0, 0]} scale={[.23, .28, .225]} color="#e4ad88" />
          <Shape at={[0, .12, .045]} scale={[.24, .21, .21]} color="#162033" />
          <Shape at={[-.14, .17, -.105]} scale={[.12, .09, .15]} color="#162033" />
          <Shape at={[0, -.015, -.23]} scale={[.042, .045, .053]} color="#d89a77" />
          {[-1, 1].map((side) => <group key={side}>
            <Shape at={[side * .224, -.02, .005]} scale={[.042, .065, .042]} color="#d99c78" />
            <Shape at={[side * .085, .017, -.204]} scale={[.022, .023, .012]} color="#132039" />
            <Limb from={[side * .06, .07, -.204]} to={[side * .12, .079, -.185]} radius={.012} color="#162033" />
          </group>)}
        </group>
        {/* Left hand on knee, right hand under chin. */}
        <Limb from={[-.26, 1.52, -.06]} to={[-.37, 1.15, -.27]} radius={.1} color="#078ccc" />
        <Limb from={[-.37, 1.15, -.27]} to={[-.22, .99, -.53]} radius={.068} color="#e4ad88" />
        <Shape at={[-.22, .99, -.53]} scale={[.085, .045, .1]} color="#e4ad88" />
        <Limb from={[.26, 1.52, -.06]} to={[.4, 1.22, -.3]} radius={.1} color="#078ccc" />
        <Limb from={[.4, 1.22, -.3]} to={[.23, 1.76, -.33]} radius={.068} color="#e4ad88" />
        <Shape at={[.23, 1.76, -.33]} scale={[.065, .085, .065]} color="#e4ad88" />
      </group>
    </group>
    {Array.from({ length: 9 }, (_, i) => <sprite key={i} ref={(element) => { steam.current[i] = element; }}>
      <spriteMaterial map={steamTexture} transparent depthWrite={false} opacity={0} toneMapped={false} />
    </sprite>)}
  </>;
}
