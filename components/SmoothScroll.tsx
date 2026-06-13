"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import Snap from "lenis/snap";

/**
 * Smooth-Scrolling (Lenis) + sanftes Full-Page-Snapping (Lenis Snap-Addon).
 * Statt hartem CSS-Anker rastet jede Sektion geeastet/smooth ein.
 * Snap nur auf größeren Screens; Mobile = normales Scrollen (längere Inhalte).
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let snap: Snap | undefined;
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (isDesktop) {
      snap = new Snap(lenis, {
        type: "mandatory",
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        debounce: 120,
      });
      document.querySelectorAll("main > section").forEach((el) => {
        snap!.addElement(el as HTMLElement, { align: ["start"] });
      });
    }

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      snap?.destroy();
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
