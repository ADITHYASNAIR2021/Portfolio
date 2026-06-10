"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

const ACCENT = new THREE.Color("#00d4ff");
const VIOLET = new THREE.Color("#8b5cf6");
const COUNT = 1100;

/**
 * Glowing particle cloud that:
 *  - slowly rotates and parallaxes to the pointer
 *  - repels points near the cursor (mouse-magnetic)
 *  - zooms + spins faster as the hero scrolls away (scroll-coupled)
 */
function NeuralCloud() {
  const group = useRef<THREE.Group>(null);
  const geom = useRef<THREE.BufferGeometry>(null);

  const { positions, colors, original } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const tmp = new THREE.Color();
    for (let i = 0; i < COUNT; i++) {
      const r = 1.4 + Math.random() * 1.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      tmp.copy(ACCENT).lerp(VIOLET, (r - 1.4) / 1.0 + (Math.random() - 0.5) * 0.3);
      colors[i * 3] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;
    }
    // original = immutable base the live positions ease back toward
    return { positions, colors, original: positions.slice() };
  }, []);

  const attractor = useMemo(() => new THREE.Vector3(), []);
  const invQuat = useMemo(() => new THREE.Quaternion(), []);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;

    // Base rotation + pointer parallax
    g.rotation.y += delta * 0.08;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, state.pointer.y * 0.35, 0.04);
    g.rotation.z = THREE.MathUtils.lerp(g.rotation.z, state.pointer.x * 0.12, 0.04);

    // Scroll-coupling: zoom in + spin faster while the hero is on screen
    const sp =
      typeof window !== "undefined"
        ? Math.min(1, window.scrollY / (window.innerHeight || 1))
        : 0;
    g.scale.setScalar(THREE.MathUtils.lerp(g.scale.x, 1 + sp * 0.5, 0.1));
    g.rotation.y += sp * delta * 0.6;

    // Mouse-magnetic repulsion in the cloud's local space
    const geo = geom.current;
    if (geo) {
      const posAttr = geo.attributes.position as THREE.BufferAttribute;
      const arr = posAttr.array as Float32Array;
      attractor.set(state.pointer.x * 2.7, state.pointer.y * 2.7, 1.6);
      invQuat.copy(g.quaternion).invert();
      attractor.applyQuaternion(invQuat);
      const RANGE = 1.2;
      const STR = 0.5;
      for (let i = 0; i < COUNT; i++) {
        const ix = i * 3;
        let x = arr[ix] + (original[ix] - arr[ix]) * 0.12;
        let y = arr[ix + 1] + (original[ix + 1] - arr[ix + 1]) * 0.12;
        let z = arr[ix + 2] + (original[ix + 2] - arr[ix + 2]) * 0.12;
        const dx = x - attractor.x;
        const dy = y - attractor.y;
        const dz = z - attractor.z;
        const d = Math.hypot(dx, dy, dz);
        if (d < RANGE) {
          const f = ((RANGE - d) * STR) / (d + 0.001);
          x += dx * f;
          y += dy * f;
          z += dz * f;
        }
        arr[ix] = x;
        arr[ix + 1] = y;
        arr[ix + 2] = z;
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry ref={geom}>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          vertexColors
          transparent
          opacity={0.95}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <Icosahedron args={[2.45, 1]}>
        <meshBasicMaterial color={ACCENT} wireframe transparent opacity={0.07} />
      </Icosahedron>
      <Icosahedron args={[1.25, 1]}>
        <meshBasicMaterial color={VIOLET} wireframe transparent opacity={0.1} />
      </Icosahedron>
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="w-full h-[340px]">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <NeuralCloud />
        <EffectComposer>
          <Bloom
            intensity={0.85}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.3}
            radius={0.7}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
