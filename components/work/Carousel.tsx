"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

export type CarouselApi = { step: (dir: number) => void; go: (i: number) => void };

export type Item = {
  style: string;
  artist: string;
  title: string;
  duration: string;
};

/* Platzhalter-Textur: entsättigter Verlauf + [BILD]-Label, on-canvas gezeichnet
   (kein externer Font-/HDRI-Fetch). Später durch echte Foto-Texturen ersetzen. */
function makeTexture(index: number, style: string): THREE.Texture {
  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 640;
  const ctx = c.getContext("2d")!;
  const g = ctx.createLinearGradient(0, 0, 512, 640);
  g.addColorStop(0, "#1b1b1f");
  g.addColorStop(0.55, "#0e0e10");
  g.addColorStop(1, "#202024");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 640);
  ctx.strokeStyle = "#26262a";
  ctx.lineWidth = 3;
  ctx.strokeRect(10, 10, 492, 620);
  ctx.fillStyle = "#8a8782";
  ctx.font = "600 24px monospace";
  ctx.fillText(`[BILD_${String(index + 1).padStart(2, "0")}]`, 32, 52);
  ctx.fillStyle = "#ece8e1";
  ctx.font = "600 46px sans-serif";
  ctx.fillText(style, 32, 596);
  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 4;
  tex.needsUpdate = true;
  return tex;
}

function Cards({
  items,
  posRef,
  draggingRef,
  targetRef,
  onActive,
}: {
  items: Item[];
  posRef: React.RefObject<number>;
  draggingRef: React.RefObject<boolean>;
  targetRef: React.RefObject<number>;
  onActive: (i: number) => void;
}) {
  const group = useRef<THREE.Group>(null);
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const lastActive = useRef(-1);

  const textures = useMemo(
    () => items.map((it, i) => makeTexture(i, it.style)),
    [items]
  );

  const N = items.length;
  const STEP = 0.62; // Winkelabstand pro Karte (rad)
  const RADIUS = 4.2;
  const SPREAD = 3.4;

  useFrame(() => {
    // Sanftes Einrasten auf Ziel, wenn nicht gezogen wird
    if (!draggingRef.current) {
      posRef.current += (targetRef.current - posRef.current) * 0.1;
    }
    const cur = posRef.current;

    const active = Math.max(0, Math.min(N - 1, Math.round(cur)));
    if (active !== lastActive.current) {
      lastActive.current = active;
      onActive(active);
    }

    for (let i = 0; i < N; i++) {
      const m = refs.current[i];
      if (!m) continue;
      const offset = i - cur;
      const angle = offset * STEP;
      const abs = Math.abs(offset);

      m.position.x = Math.sin(angle) * SPREAD;
      m.position.z = -(1 - Math.cos(angle)) * RADIUS;
      m.rotation.y = -angle * 0.6;

      const scale = THREE.MathUtils.clamp(1.15 - abs * 0.18, 0.55, 1.15);
      m.scale.setScalar(scale);

      const mat = m.material as THREE.MeshBasicMaterial;
      mat.opacity = THREE.MathUtils.clamp(1 - abs * 0.32, 0, 1);
      m.visible = abs < 4.2;
      // mittlere Karte nach vorne
      m.renderOrder = Math.round(100 - abs);
    }
  });

  return (
    <group ref={group}>
      {items.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
        >
          <planeGeometry args={[2, 2.5]} />
          <meshBasicMaterial
            map={textures[i]}
            transparent
            toneMapped={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

export default function Carousel({
  items,
  onActive,
  registerApi,
}: {
  items: Item[];
  onActive: (i: number) => void;
  registerApi?: (api: CarouselApi) => void;
}) {
  const pos = useRef(0);
  const target = useRef(0);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startPos = useRef(0);
  const [ready, setReady] = useState(false);
  const N = items.length;

  const clampTarget = () => {
    target.current = Math.max(0, Math.min(N - 1, Math.round(pos.current)));
  };

  useEffect(() => {
    registerApi?.({
      step: (dir) => {
        target.current = Math.max(
          0,
          Math.min(N - 1, Math.round(pos.current) + dir)
        );
      },
      go: (i) => {
        target.current = Math.max(0, Math.min(N - 1, i));
      },
    });
  }, [registerApi, N]);

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      onCreated={() => setReady(true)}
      style={{
        opacity: ready ? 1 : 0,
        transition: "opacity 0.8s var(--ease-quart)",
        touchAction: "pan-y",
        cursor: "grab",
      }}
      onPointerDown={(e) => {
        dragging.current = true;
        startX.current = e.clientX;
        startPos.current = pos.current;
        (e.target as HTMLElement).style.cursor = "grabbing";
      }}
      onPointerMove={(e) => {
        if (!dragging.current) return;
        const dx = e.clientX - startX.current;
        pos.current = Math.max(
          -0.4,
          Math.min(N - 0.6, startPos.current - dx * 0.006)
        );
      }}
      onPointerUp={(e) => {
        dragging.current = false;
        clampTarget();
        (e.target as HTMLElement).style.cursor = "grab";
      }}
      onPointerLeave={() => {
        if (dragging.current) {
          dragging.current = false;
          clampTarget();
        }
      }}
      onWheel={(e) => {
        target.current = Math.max(
          0,
          Math.min(N - 1, Math.round(pos.current) + Math.sign(e.deltaY))
        );
      }}
    >
      <Cards
        items={items}
        posRef={pos}
        draggingRef={dragging}
        targetRef={target}
        onActive={onActive}
      />
    </Canvas>
  );
}
