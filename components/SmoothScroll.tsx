"use client";

/**
 * Passthrough: Wir nutzen natives CSS Scroll-Snap (eine Sektion pro Screen),
 * das mit JS-Smooth-Scroll (Lenis) kollidiert. Daher hier bewusst kein Lenis.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
