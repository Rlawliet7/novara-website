"use client";

import dynamic from "next/dynamic";
import { process } from "@/config/content";
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useNearViewport } from "./useNearViewport";

const ProcessScene = dynamic(() => import("./ProcessScene"), { ssr: false });

class SceneBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

/** The plain timeline: small screens, no WebGL, or reduced motion. */
function Timeline() {
  return (
    <ol className="mx-auto max-w-3xl space-y-6">
      {process.map((item, i) => (
        <li key={item.step} className="relative">
          {i < process.length - 1 && (
            <div className="absolute bottom-0 left-6 top-12 w-0.5 bg-line" aria-hidden="true" />
          )}
          <div className="relative pl-16">
            <div className="absolute left-0 top-1 z-10 flex h-12 w-12 items-center justify-center rounded-full border-4 border-navy-900 bg-white">
              <span className="text-2xl font-extrabold text-electric">{item.step}</span>
            </div>
            <div className="rounded-2xl border border-line bg-white p-6 md:p-8">
              <h3 className="text-xl font-bold text-navy-900">{item.title}</h3>
              <p className="mt-2 text-base leading-relaxed text-slate-600">{item.desc}</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function ProcessJourney() {
  const container = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const [active, setActive] = useState(0);
  const [live, setLive] = useState(false);
  const [stacked, setStacked] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const near = useNearViewport(container, live && !failed);
  const fail = useCallback(() => setFailed(true), []);
  const onReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wide = window.matchMedia("(min-width: 1024px)");
    const update = () => {
      let supported = false;
      try {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("webgl2");
        supported = !!context;
        context?.getExtension("WEBGL_lose_context")?.loseContext();
      } catch { /* The timeline below stands in without WebGL. */ }
      setLive(supported && !motion.matches);
      setStacked(!wide.matches);
    };
    update();
    motion.addEventListener("change", update);
    wide.addEventListener("change", update);
    return () => {
      motion.removeEventListener("change", update);
      wide.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!live) return;
    const element = container.current;
    if (!element) return;
    const measure = () => {
      const rect = element.getBoundingClientRect();
      let value: number;
      if (stacked) {
        // The cards sit on top of each other in one panel, so there are no card
        // positions to anchor to — drive progress from the spacer's scroll range.
        const travel = Math.max(1, rect.height - innerHeight);
        value = Math.max(0, Math.min(1, -rect.top / travel));
      } else {
        const steps = [...element.querySelectorAll<HTMLElement>(".process-step")];
        if (steps.length < 2) return;
        // Anchor progress to the cards themselves: when a card sits at the middle
        // of the screen, the traveller is exactly on its node.
        const centre = (node: HTMLElement) => node.getBoundingClientRect().top - rect.top + node.offsetHeight / 2;
        const first = centre(steps[0]);
        const span = Math.max(1, centre(steps[steps.length - 1]) - first);
        value = Math.max(0, Math.min(1, (-rect.top + innerHeight / 2 - first) / span));
      }
      progress.current = value;
      // Only re-render when the highlighted step actually changes.
      const index = Math.round(value * (process.length - 1));
      setActive((current) => (current === index ? current : index));
    };
    measure();
    addEventListener("scroll", measure, { passive: true });
    addEventListener("resize", measure);
    return () => {
      removeEventListener("scroll", measure);
      removeEventListener("resize", measure);
    };
  }, [live, stacked]);

  if (!live || failed) return <Timeline />;

  return (
    <div ref={container} className="process-journey" data-stacked={stacked}>
      <div ref={stage} className="process-stage">
        <div className={`process-canvas transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`} aria-hidden="true">
          {near && (
            <SceneBoundary onError={fail}>
              <ProcessScene stage={stage} progress={progress} onReady={onReady} onError={fail} />
            </SceneBoundary>
          )}
        </div>
        <p className="process-stage-caption">
          Tahap {process[active].step} dari {String(process.length).padStart(2, "0")}
        </p>
      </div>

      <div className="process-rail">
        <ol className="process-steps">
          {process.map((item, i) => (
            <li key={item.step} className="process-step" data-state={i === active ? "active" : i < active ? "done" : "next"}>
              <span className="process-step-no">{item.step}</span>
              <h3 className="process-step-title">{item.title}</h3>
              <p className="process-step-desc">{item.desc}</p>
            </li>
          ))}
        </ol>
        {stacked && (
          <div className="process-dots" aria-hidden="true">
            {process.map((item, i) => <span key={item.step} data-on={i <= active} />)}
          </div>
        )}
      </div>
      {stacked && <div className="process-spacer" aria-hidden="true" />}
    </div>
  );
}
