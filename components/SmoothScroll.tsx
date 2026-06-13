"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth-Scrolling (Lenis) – reines, freies Smooth-Scrollen.
 * KEIN Full-Page-Snapping/Anker-Einrasten mehr: die Seite scrollt durchgängig
 * weich, ohne sich an Sektionen festzusetzen.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
