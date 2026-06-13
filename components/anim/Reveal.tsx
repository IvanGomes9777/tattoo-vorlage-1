"use client";

import {
  createElement,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

/**
 * Scroll-Reveal beim Eintreten in den Viewport (IntersectionObserver).
 * Bewusst kein Scroll-Scrubbing – ein sauberer Entrance pro Element, passend
 * zur kinetischen Grammatik des Hero (Masken-Slide, gestaffelte Fades).
 *
 * - `up`    : Text/Blöcke → von unten ein-faden
 * - `mask`  : Headlines → Wipe-Up mit Clip-Maske
 * - `image` : Bilder → dezenter Scale-/Clip-Settle (cinematisch)
 *
 * reduced-motion: Element rendert sofort sichtbar (kein verstecktes Layout).
 */
type RevealVariant = "up" | "mask" | "image";

type RevealProps = {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  as?: ElementType;
  className?: string;
  threshold?: number;
};

function useInView(threshold: number) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            io.disconnect();
          }
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);

  return { ref, shown };
}

function delayStyle(delay: number): CSSProperties | undefined {
  if (!delay) return undefined;
  return { "--reveal-delay": `${delay}s` } as CSSProperties;
}

export function Reveal({
  children,
  variant = "up",
  delay = 0,
  as = "div",
  className,
  threshold = 0.18,
}: RevealProps) {
  const { ref, shown } = useInView(threshold);

  return createElement(
    as,
    {
      ref,
      "data-reveal": variant,
      "data-shown": shown ? "" : undefined,
      className,
      style: delayStyle(delay),
    },
    children
  );
}

/**
 * Container, der seine direkten `[data-reveal-item]`-Kinder gestaffelt
 * einblendet (ein Observer für die ganze Gruppe). Stagger via inline
 * `--reveal-delay` pro Kind.
 */
type RevealGroupProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  threshold?: number;
};

export function RevealGroup({
  children,
  as = "div",
  className,
  threshold = 0.18,
}: RevealGroupProps) {
  const { ref, shown } = useInView(threshold);

  return createElement(
    as,
    {
      ref,
      "data-reveal-group": "",
      "data-shown": shown ? "" : undefined,
      className,
    },
    children
  );
}
