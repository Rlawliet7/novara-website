"use client";

import dynamic from "next/dynamic";
import { Logo } from "@/components/ui/Logo";
import { introStories } from "./stories";
import { scrollToY } from "@/components/scroll/lenisBus";
import { ArrowDown, ArrowUpRight, Pause, Play } from "lucide-react";
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";

const RoomScene = dynamic(() => import("./RoomScene"), { ssr: false });

class SceneBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export function RoomIntro({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const thoughtRef = useRef<HTMLDivElement>(null);
  const [storyIndex, setStoryIndex] = useState(0);
  const [animated, setAnimated] = useState(true);
  const story = introStories[storyIndex];
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
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
      } catch { /* The regular website remains available without WebGL. */ }
      setEnabled(supported && !preference.matches && !window.location.hash);
    };
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);

  const active = enabled && !failed;

  useEffect(() => {
    if (!active || !ready || !animated) return;
    const timer = window.setInterval(() => {
      const element = root.current;
      if (!element || document.hidden) return;
      const travel = element.offsetHeight - (element.querySelector<HTMLElement>(".room-stage")?.offsetHeight ?? innerHeight);
      if (-element.getBoundingClientRect().top > travel * .2) return;
      setStoryIndex((index) => (index + 1) % introStories.length);
    }, 5600);
    return () => clearInterval(timer);
  }, [active, ready, animated]);

  useEffect(() => {
    if (!active) return;
    const element = root.current;
    if (!element) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const bounds = element.getBoundingClientRect();
      const travel = Math.max(1, element.offsetHeight - (element.querySelector<HTMLElement>(".room-stage")?.offsetHeight ?? window.innerHeight));
      const progress = Math.max(0, Math.min(1, -bounds.top / travel));
      const fade = Math.max(0, Math.min(1, (progress - .85) / .06));
      element.style.setProperty("--room-opacity", String(1 - fade));
      element.style.setProperty("--website-opacity", String(Math.max(0, Math.min(1, (progress - .91) / .07))));
      element.dataset.transitioning = String(progress >= .75);
      element.style.setProperty("--thought-opacity", String(Math.max(0, 1 - progress / .42)));
      element.style.setProperty("--hint-opacity", String(Math.max(0, 1 - progress * 4)));
      element.style.setProperty("--intro-progress", String(progress));
      element.dataset.entered = String(progress >= .98);
      document.documentElement.dataset.roomIntro = progress < .98 ? "active" : "complete";
      const content = element.querySelector<HTMLElement>(".room-website");
      if (content) content.inert = progress < .98;
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      delete document.documentElement.dataset.roomIntro;
      const content = element.querySelector<HTMLElement>(".room-website");
      if (content) content.inert = false;
    };
  }, [active]);

  function skip() {
    const element = root.current;
    if (!element) return;
    // Lewat lenisBus: kalau Lenis sedang memegang scroll, lompatan native akan
    // langsung ditarik balik ke posisi internalnya.
    scrollToY(window.scrollY + element.getBoundingClientRect().top + element.offsetHeight - (element.querySelector<HTMLElement>(".room-stage")?.offsetHeight ?? window.innerHeight), true);
    // Move keyboard focus into the website when skipping the decorative scene.
    const content = element.querySelector<HTMLElement>(".room-website");
    if (content) {
      content.inert = false;
      content.focus({ preventScroll: true });
    }
  }

  return (
    <div ref={root} className={`room-intro ${active ? "room-intro--active" : ""}`} data-nav-theme="dark" data-ready={ready}>
      <div className="room-stage">
        <div className="room-website" tabIndex={-1}>{children}</div>
        {active && (
          <div className="room-experience">
            <div className="room-canvas" aria-hidden="true">
              <SceneBoundary onError={fail}>
                <RoomScene scrollRoot={root} thoughtRef={thoughtRef} animated={animated} onReady={onReady} onError={fail} />
              </SceneBoundary>
            </div>
            {!ready && <div className="room-loading" role="status"><span />Menyiapkan ruang ide Anda…</div>}
            <div className="room-topline">
              <span className="room-wordmark"><Logo size={44} /><span className="room-studio">/ DIGITAL STUDIO</span></span>
              <button type="button" onClick={skip} className="room-skip">Lewati intro <ArrowUpRight size={15} /></button>
            </div>
            <div ref={thoughtRef} className="room-thought" aria-live="off">
              <span className="room-thought-label">LAGI MIKIR?</span>
              <p key={storyIndex} className="room-story-enter">{story.thought}</p>
              <span className="room-thought-dots" aria-hidden="true"><i /><i /><i /></span>
            </div>
            <div className="room-caption" aria-live="off">
              <div key={storyIndex} className="room-story-enter">
                <p className="room-eyebrow">{story.eyebrow}</p>
                <p className="room-title">{story.title[0]}<br />{story.title[1]}</p>
                <p className="room-subtitle">{story.subtitle}</p>
              </div>
              <div className="room-story-controls" aria-label="Pilih cerita intro">
                {introStories.map((item, index) => <button key={item.thought} type="button" aria-label={item.thought} aria-pressed={index === storyIndex} onClick={() => { setStoryIndex(index); setAnimated(false); }}><span /></button>)}
              </div>
            </div>
            <div className="room-bottomline">
              <span className="room-scroll"><span className="room-scroll-icon"><ArrowDown size={16} /></span>Scroll untuk masuk</span>
              <button type="button" className="room-animation-toggle" onClick={() => setAnimated((value) => !value)} aria-pressed={!animated}>
                {animated ? <Pause size={13} /> : <Play size={13} />}{animated ? "Jeda animasi" : "Lanjutkan animasi"}
              </button>
            </div>
            <div className="room-progress" />
          </div>
        )}
      </div>
    </div>
  );
}
