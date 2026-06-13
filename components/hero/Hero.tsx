"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { STUDIO } from "@/lib/studio";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const media = useRef<HTMLDivElement>(null);

  // Cinematischer Scroll-Parallax: das Video driftet langsamer als der Scroll
  // (Tiefenwirkung). Nur transform → günstig; reduced-motion aus.
  useEffect(() => {
    const el = media.current;
    if (!el) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      el.style.transform = `translate3d(0, ${window.scrollY * 0.18}px, 0) scale(1.18)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Kinetischer Headline-Reveal: Masken-Slide pro Zeile, gestaffelt
      gsap.set("[data-reveal-line] span", { yPercent: 115 });
      gsap.set("[data-fade]", { opacity: 0, y: 12 });

      const tl = gsap.timeline({ delay: 0.35 });
      tl.to("[data-reveal-line] span", {
        yPercent: 0,
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.12,
      }).to(
        "[data-fade]",
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out", stagger: 0.08 },
        "-=0.6"
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative h-[100svh] w-full overflow-hidden bg-obsidian"
    >
      {/* Video-Ebene: Old-School-Tattoomaschine, full-bleed */}
      <div ref={media} className="absolute inset-0 z-0 will-change-transform">
        <video
          className="h-full w-full object-cover"
          src="/hero-tattoo.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          // dezente Entsättigung + Abdunklung -> düster-eleganter Monochrom-Grade
          style={{ filter: "grayscale(0.55) contrast(1.05) brightness(0.62)" }}
        />
      </div>

      {/* Grading-/Vignette-Ebene für Textkontrast & Stimmung */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(90deg, rgba(11,11,12,0.85) 0%, rgba(11,11,12,0.45) 45%, rgba(11,11,12,0.25) 100%), radial-gradient(120% 90% at 50% 35%, transparent 35%, rgba(11,11,12,0.7) 100%)",
        }}
      />

      {/* Meta-Leiste oben (Editorial / technischer Ductus) */}
      <header className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-6 font-mono text-[11px] uppercase tracking-[0.2em] text-bone-dim md:px-10">
        <span className="text-bone">{STUDIO.name}</span>
        <nav className="hidden gap-8 md:flex">
          <a className="nav-link transition-colors hover:text-bone" href="#work">
            Work
          </a>
          <a className="nav-link transition-colors hover:text-bone" href="#artists">
            Artists
          </a>
          <a className="nav-link transition-colors hover:text-bone" href="#studio">
            Studio
          </a>
          <a className="nav-link transition-colors hover:text-bone" href="#contact">
            Contact
          </a>
        </nav>
        <a
          href="#contact"
          className="border border-line px-4 py-2 text-bone transition-colors hover:border-bone"
        >
          Anfrage
        </a>
      </header>

      {/* Kinetische Headline */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-10">
        <p
          data-fade
          className="mb-6 font-mono text-[11px] uppercase tracking-[0.35em] text-bone-dim"
        >
          {STUDIO.city} — Est. {STUDIO.established} / By Appointment
        </p>

        <h1 className="max-w-[14ch] font-display text-[clamp(3.2rem,12vw,11rem)] font-medium leading-[0.86] tracking-[-0.03em] text-bone">
          <span data-reveal-line className="block overflow-hidden">
            <span className="block">Tinte</span>
          </span>
          <span data-reveal-line className="block overflow-hidden">
            <span className="block">wird</span>
          </span>
          <span data-reveal-line className="block overflow-hidden">
            <span className="block italic text-bone-dim">Kunst.</span>
          </span>
        </h1>

        <p
          data-fade
          className="mt-8 max-w-[44ch] text-base leading-relaxed text-bone-dim md:text-lg"
        >
          {STUDIO.name} ist ein kuratiertes Tattoo-Atelier. Kein Katalog —
          jedes Stück entsteht im Dialog. <span className="text-bone">{STUDIO.claim}</span>
        </p>

        <div data-fade className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#contact"
            className="group relative overflow-hidden border border-bone px-7 py-4 font-mono text-[12px] uppercase tracking-[0.2em] text-obsidian"
          >
            <span className="absolute inset-0 bg-bone transition-transform duration-500 ease-[var(--ease-quart)] group-hover:translate-y-full" />
            <span className="relative">Termin anfragen</span>
          </a>
          <a
            href="#work"
            className="font-mono text-[12px] uppercase tracking-[0.2em] text-bone-dim transition-colors hover:text-bone"
          >
            Portfolio ansehen ↓
          </a>
        </div>
      </div>

      {/* Scroll-Cue + Koordinaten unten */}
      <footer className="absolute inset-x-0 bottom-0 z-30 flex items-end justify-between px-6 py-6 font-mono text-[11px] uppercase tracking-[0.2em] text-bone-dim md:px-10">
        <span data-fade>{STUDIO.geo.lat} / {STUDIO.geo.long}</span>
        <span data-fade className="flex items-center gap-3">
          Scroll
          <span className="block h-8 w-px animate-pulse bg-bone-dim" />
        </span>
      </footer>
    </section>
  );
}
