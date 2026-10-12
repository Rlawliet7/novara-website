"use client";

import dynamic from "next/dynamic";
import { challenges } from "@/config/content";
import { PIECE_COLORS } from "./approachColors";
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useNearViewport } from "./useNearViewport";

const ApproachScene = dynamic(() => import("./ApproachScene"), { ssr: false });

class SceneBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

/**
 * The same six items for small screens, no WebGL, or reduced motion — shaped as
 * interlocking puzzle pieces, but static: no scroll-driven motion here.
 * Each piece sits above the next one so its tab fills the next piece's socket.
 */
function ChallengeGrid() {
  return (
    <ul className="challenge-stack">
      {challenges.map((item, i) => (
        <li
          key={item.label}
          className="challenge-piece"
          style={{ "--brand": PIECE_COLORS[i], zIndex: challenges.length - i } as React.CSSProperties}
        >
          <span className="challenge-piece-no">{String(i + 1).padStart(2, "0")}</span>
          <p className="challenge-piece-label">{item.label}</p>
          <p className="challenge-piece-problem">{item.problem}</p>
          <p className="challenge-piece-answer">{item.answer}</p>
        </li>
      ))}
    </ul>
  );
}

export function ApproachVisual() {
  const panel = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);
  const halo = useRef<HTMLDivElement>(null);
  const activeRef = useRef(-1);
  const [active, setActive] = useState(-1);
  const [stage, setStage] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const near = useNearViewport(panel, stage && !failed);
  const fail = useCallback(() => setFailed(true), []);
  const onReady = useCallback(() => setReady(true), []);

  useEffect(() => { activeRef.current = active; }, [active]);

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
      } catch { /* The plain grid below stands in without WebGL. */ }
      setStage(supported && wide.matches && !motion.matches);
    };
    update();
    motion.addEventListener("change", update);
    wide.addEventListener("change", update);
    return () => {
      motion.removeEventListener("change", update);
      wide.removeEventListener("change", update);
    };
  }, []);

  if (!stage || failed) return <ChallengeGrid />;

  const hold = (index: number) => ({
    onMouseEnter: () => setActive(index),
    onMouseLeave: () => setActive((current) => (current === index ? -1 : current)),
    onFocus: () => setActive(index),
    onBlur: () => setActive((current) => (current === index ? -1 : current)),
    onClick: () => setActive((current) => (current === index ? -1 : index)),
  });

  return (
    <div ref={panel} className="approach-stage">
      <div ref={halo} className="approach-halo" aria-hidden="true">
        {challenges.map((item, i) => <span key={item.label} style={{ "--brand": PIECE_COLORS[i] } as React.CSSProperties} />)}
      </div>

      {near && (
        <SceneBoundary onError={fail}>
          <div className={`absolute inset-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}>
            <ApproachScene panel={panel} overlay={overlay} halo={halo} active={activeRef} animated onReady={onReady} onError={fail} />
          </div>
        </SceneBoundary>
      )}

      <div ref={overlay} className="approach-overlay" data-shown="false">
        {challenges.map((item, i) => (
          <div key={item.label} className="approach-hotspot" data-active={active === i} data-below={i < 3} style={{ "--brand": PIECE_COLORS[i] } as React.CSSProperties}>
            <button type="button" className="approach-chip" aria-expanded={active === i} aria-controls={`challenge-${i}`} {...hold(i)}>
              <span className="approach-chip-no">{String(i + 1).padStart(2, "0")}</span>
              {item.label}
            </button>
            <div id={`challenge-${i}`} className="approach-detail" role="region" aria-label={item.label}>
              <p className="approach-detail-problem">{item.problem}</p>
              <p className="approach-detail-answer">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="approach-hint">
        {active === -1
          ? "Arahkan kursor ke tiap modul untuk melihat detailnya."
          : "Enam kebutuhan terpisah, dirakit menjadi satu sistem yang terhubung."}
      </p>
    </div>
  );
}
