"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, MeshDistortMaterial } from "@react-three/drei";
import { useRef, useState } from "react";
import * as THREE from "three";

/**
 * Liquid-Chrome "Ink Drop" — die zentrale 3D-Idee der Hero.
 * Statt eines Tattoo-Fotos (wie in allen 5 Vorlagen-Varianten) zeigen wir
 * Tinte als abstraktes, flüssiges Metall-Objekt: das Material VOR der Kunst.
 *
 * Performance-Prinzipien:
 *  - Reflexionen kommen aus In-Scene-Lightformern (kein externes HDRI-Fetch)
 *  - dpr gedeckelt, Geometrie mit moderater Auflösung
 *  - Pointer-Parallax wird gedämpft interpoliert (lerp), nie hart gesetzt
 */
function InkDrop({ pointer }: { pointer: React.RefObject<THREE.Vector2> }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    // ruhige Eigenrotation
    mesh.current.rotation.y += delta * 0.12;
    mesh.current.rotation.z = Math.sin(t * 0.25) * 0.08;

    // gedämpfte Pointer-Neigung
    const px = pointer.current?.x ?? 0;
    const py = pointer.current?.y ?? 0;
    mesh.current.rotation.x = THREE.MathUtils.lerp(
      mesh.current.rotation.x,
      py * 0.3,
      0.04
    );
    mesh.current.position.x = THREE.MathUtils.lerp(
      mesh.current.position.x,
      px * 0.25,
      0.04
    );
  });

  return (
    <mesh ref={mesh} scale={1.7}>
      <icosahedronGeometry args={[1, 64]} />
      <MeshDistortMaterial
        color="#0e0e10"
        metalness={1}
        roughness={0.18}
        distort={0.38}
        speed={1.4}
        envMapIntensity={1.1}
      />
    </mesh>
  );
}

function Rig({ pointer }: { pointer: React.RefObject<THREE.Vector2> }) {
  return (
    <>
      <InkDrop pointer={pointer} />
      {/* Kontrolliertes Studio-Licht für Chrom-Reflexe – komplett in-scene */}
      <Environment resolution={256} frames={1}>
        <Lightformer
          form="rect"
          intensity={3}
          position={[3, 2, 4]}
          scale={[6, 6, 1]}
          color="#ffffff"
        />
        <Lightformer
          form="rect"
          intensity={1.4}
          position={[-4, -1, 2]}
          scale={[5, 5, 1]}
          color="#9aa0b5"
        />
        <Lightformer
          form="ring"
          intensity={2}
          position={[0, 3, -3]}
          scale={[4, 4, 1]}
          color="#dfe3ee"
        />
      </Environment>
    </>
  );
}

export default function InkScene() {
  const pointer = useRef(new THREE.Vector2(0, 0));
  const [ready, setReady] = useState(false);

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 38 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={() => setReady(true)}
      onPointerMove={(e) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -(e.clientY / window.innerHeight) * 2 + 1;
        pointer.current.set(x, y);
      }}
      style={{
        opacity: ready ? 1 : 0,
        transition: "opacity 1.2s var(--ease-quart)",
      }}
    >
      <Rig pointer={pointer} />
    </Canvas>
  );
}
