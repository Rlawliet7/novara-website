"use client";

import dynamic from "next/dynamic";
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";

const ApproachScene = dynamic(() => import("./ApproachScene"), { ssr: false });

class SceneBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export function ApproachVisual() {
  const panel = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [animated, setAnimated] = useState(true);
  const fail = useCallback(() => setFailed(true), []);
  const onReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      let supported = false;
      try {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("webgl2");
        supported = !!context;
        context?.getExtension("WEBGL_lose_context")?.loseContext();
      } catch { /* The static diagram below stands in without WebGL. */ }
      setEnabled(supported && !preference.matches);
      setAnimated(!preference.matches);
    };
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  const live = enabled && !failed;

  return (
    <div
      ref={panel}
      className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-navy-900 sm:aspect-[5/4] lg:aspect-square"
    >
      <div className="approach-glow" aria-hidden="true" />

      {live && (
        <SceneBoundary onError={fail}>
          <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}>
            <ApproachScene panel={panel} animated={animated} onReady={onReady} onError={fail} />
          </div>
        </SceneBoundary>
      )}

      {/* Static stand-in: shown until the scene paints, and permanently without WebGL. */}
      {(!live || !ready) && (
        <div className="absolute inset-0 grid place-items-center p-8" aria-hidden="true">
          <div className="grid w-full max-w-[280px] grid-cols-3 gap-2.5">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className={`h-10 rounded-md ${i % 3 === 1 ? "bg-teal/80" : "bg-electric/80"}`}
              />
            ))}
            <div className="col-span-3 mt-1 h-1.5 rounded-full bg-navy-700" />
          </div>
        </div>
      )}

      <p className="absolute bottom-5 left-6 right-6 text-xs leading-relaxed text-white/45">
        Enam kebutuhan terpisah, dirakit menjadi satu sistem yang terhubung.
      </p>
    </div>
  );
}
