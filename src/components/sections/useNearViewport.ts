"use client";

import { useEffect, useState, type RefObject } from "react";

/**
 * True while the element is within `margin` of the viewport.
 *
 * Scenes use this to unmount their <Canvas> when they are far offscreen. A page
 * with several 3D sections otherwise holds every WebGL context open at once,
 * which wastes GPU memory and can hit the browser's context limit — once that
 * happens, the next canvas to mount fails and its error boundary disables it.
 */
export function useNearViewport(ref: RefObject<Element | null>, mounted: boolean, margin = "60%") {
  const [near, setNear] = useState(true);

  useEffect(() => {
    // `mounted` matters: callers render the observed element only after a feature
    // check passes, so on the first pass ref.current is still null.
    if (!mounted) return;
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), { rootMargin: margin });
    observer.observe(element);
    return () => observer.disconnect();
  }, [margin, mounted, ref]);

  return near;
}
