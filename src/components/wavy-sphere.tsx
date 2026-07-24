"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

function AnimatedOuterSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<THREE.SphereGeometry>(null);

  const basePositions = useRef<Float32Array | null>(null);
  const tempVec = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    if (!geometryRef.current) return;

    const positionAttr = geometryRef.current.attributes.position;
    basePositions.current = new Float32Array(positionAttr.array as Float32Array);
  }, []);

  useFrame((state) => {
    if (!geometryRef.current || !basePositions.current || !meshRef.current) return;

    const time = state.clock.getElapsedTime();
    const geometry = geometryRef.current;
    const positionAttr = geometry.attributes.position;
    const positions = positionAttr.array as Float32Array;
    const base = basePositions.current;

    for (let i = 0; i < positions.length; i += 3) {
      const x = base[i];
      const y = base[i + 1];
      const z = base[i + 2];

      tempVec.set(x, y, z).normalize();

      const wave1 = Math.sin(y * 4.5 + time * 1.4) * 0.032;
      const wave2 = Math.sin(x * 5.5 + time * 1.1) * 0.022;
      const wave3 = Math.sin((x + y + z) * 3.5 + time * 1.6) * 0.018;

      const displacement = wave1 + wave2 + wave3;

      positions[i] = x + tempVec.x * displacement;
      positions[i + 1] = y + tempVec.y * displacement;
      positions[i + 2] = z + tempVec.z * displacement;
    }

    positionAttr.needsUpdate = true;
    geometry.computeVertexNormals();

  });

  return (
    <mesh ref={meshRef}>
        <sphereGeometry ref={geometryRef} args={[1.5, 32, 32]} />
        <meshPhysicalMaterial
            color="#4a4747"
            metalness={0.5}
            roughness={0.2}
            clearcoat={1}
            clearcoatRoughness={0.2}
            reflectivity={0.8}
            transparent
            opacity={0.6}
            transmission={0.3}
            depthWrite={false}
        />
    </mesh>
  );
}

function InnerCoreSphere() {
  const groupRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const pulse = 1 + Math.sin(time * 2.2) * 0.04;

    if (groupRef.current) {
      groupRef.current.scale.setScalar(pulse);
    }

    if (lightRef.current) {
      lightRef.current.intensity = 3.2 + Math.sin(time * 2.2) * 0.7;
      lightRef.current.color.set("#d29b1c");
    }

    if (glowRef.current) {
      glowRef.current.scale.setScalar(1.25 + Math.sin(time * 2.2) * 0.08);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.26, 32, 32]} />
        <meshStandardMaterial
          color="#d29b1c"
          emissive="#d29b1c"
          emissiveIntensity={1.4}
          roughness={0.2}
          metalness={0}
        />
      </mesh>

      <mesh ref={glowRef}>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshBasicMaterial
          color="#d29b1c"
          transparent
          opacity={0.22}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>

      <pointLight
        ref={lightRef}
        position={[0, 0, 0]}
        color="#d29b1c"
        intensity={3.2}
        distance={4}
        decay={2}
      />
    </group>
  );
}

function Scene() {
  const mouseDrivenGroupRef = useRef<THREE.Group>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointerRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  useFrame(() => {
    if (!mouseDrivenGroupRef.current) return;

    const targetRotationX = pointerRef.current.y * 0.28;
    const targetRotationY = pointerRef.current.x * 0.45;

    mouseDrivenGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      mouseDrivenGroupRef.current.rotation.x,
      targetRotationX,
      0.08
    );

    mouseDrivenGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      mouseDrivenGroupRef.current.rotation.y,
      targetRotationY,
      0.08
    );
  });

  return (
    <>
      <ambientLight intensity={0.38} />

      <directionalLight position={[4, 4, 5]} intensity={2.1} color="#ffffff" />
      <directionalLight position={[-4, -2, 3]} intensity={1.1} color="#d9d9d9" />

      <pointLight position={[0, 0, 4]} intensity={1.4} color="#ffffff" />
      <pointLight position={[2, -1, 2]} intensity={0.8} color="#f5f5f5" />

      <group ref={mouseDrivenGroupRef}>
        <InnerCoreSphere />
        <AnimatedOuterSphere />
      </group>
    </>
  );
}

export default function WavyMetalSphere() {
  return (
    <div className="relative h-105 w-105">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
        }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}