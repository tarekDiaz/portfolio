"use client";

import { Canvas, ThreeEvent, useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

type SphereInteractionProps = {
  haloImpulseRef: React.MutableRefObject<number>;
};

function AnimatedOuterSphere({
  haloImpulseRef,
}: SphereInteractionProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<THREE.SphereGeometry>(null);

  const basePositions = useRef<Float32Array | null>(null);
  const tempVec = useMemo(() => new THREE.Vector3(), []);

  const clickImpulseRef = useRef(0);
  const scaleImpulseRef = useRef(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!geometryRef.current) return;

    const positionAttr = geometryRef.current.attributes.position;

    basePositions.current = new Float32Array(
      positionAttr.array as Float32Array
    );

    audioRef.current = new Audio("assets/sounds/wavy-sphere-touch.mp3");
    audioRef.current.volume = 0.45;
    audioRef.current.preload = "auto";

    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const handleSphereClick = (
    event: ThreeEvent<MouseEvent>
  ) => {
    event.stopPropagation();

    clickImpulseRef.current = 1.1;
    scaleImpulseRef.current = 1;

    // Contrae el halo interior.
    haloImpulseRef.current = 0.6;

    const audio = audioRef.current;

    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  };

  useFrame((state, delta) => {
    if (
      !geometryRef.current ||
      !basePositions.current ||
      !meshRef.current
    ) {
      return;
    }

    const time = state.clock.getElapsedTime();
    const geometry = geometryRef.current;
    const positionAttr = geometry.attributes.position;
    const positions = positionAttr.array as Float32Array;
    const base = basePositions.current;

    clickImpulseRef.current = THREE.MathUtils.damp(
      clickImpulseRef.current,
      0,
      6,
      delta * 0.8
    );

    const clickImpulse = clickImpulseRef.current;

    for (let i = 0; i < positions.length; i += 3) {
      const x = base[i];
      const y = base[i + 1];
      const z = base[i + 2];

      tempVec.set(x, y, z).normalize();

      const wave1 =
        Math.sin(y * 4.5 + time * 1.4) * 0.032;

      const wave2 =
        Math.sin(x * 5.5 + time * 1.1) * 0.022;

      const wave3 =
        Math.sin((x + y + z) * 3.5 + time * 1.6) *
        0.018;

      const clickWave =
        Math.sin(y * x * z * 5 + time * 17) *
        0.13 *
        clickImpulse;

      const compression =
        -0.045 * clickImpulse;

      const displacement =
        wave1 +
        wave2 +
        wave3 +
        clickWave +
        compression;

      positions[i] =
        x + tempVec.x * displacement;

      positions[i + 1] =
        y + tempVec.y * displacement;

      positions[i + 2] =
        z + tempVec.z * displacement;
    }

    positionAttr.needsUpdate = true;
    geometry.computeVertexNormals();

    scaleImpulseRef.current = THREE.MathUtils.damp(
      scaleImpulseRef.current,
      0,
      3,
      delta
    );

    const targetScale =
      1 + scaleImpulseRef.current * 0.12;

    const currentScale =
      THREE.MathUtils.damp(
        meshRef.current.scale.x,
        targetScale,
        5,
        delta
      );

    meshRef.current.scale.setScalar(currentScale);
  });

  return (
    <mesh
      ref={meshRef}
      onClick={handleSphereClick}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "default";
      }}
    >
      <sphereGeometry
        ref={geometryRef}
        args={[1.5, 32, 32]}
      />

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

function InnerCoreSphere({
  haloImpulseRef,
}: SphereInteractionProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    const corePulse =
      1 + Math.sin(time * 2.2) * 0.04;

    if (groupRef.current) {
      groupRef.current.scale.setScalar(corePulse);
    }

    /*El impulso empieza en 1 al hacer clic y vuelve poco a poco a 0.*/
    haloImpulseRef.current = THREE.MathUtils.damp(
      haloImpulseRef.current,
      0,
      1.8,
      delta
    );

    const impulse = haloImpulseRef.current;

    // HALO
    if (glowRef.current) {
      const normalGlowScale =
        1.25 + Math.sin(time * 2.2) * 0.08;

      const contraction =
        1 - impulse * 0.95;

      const targetGlowScale =
        normalGlowScale * contraction;

      const smoothGlowScale =
        THREE.MathUtils.damp(
          glowRef.current.scale.x,
          targetGlowScale,
          5,
          delta
        );

      glowRef.current.scale.setScalar(smoothGlowScale);
    }

    // ESFERA INTERIOR
    if (coreRef.current) {
      // Se contrae solo un poco: de 1 a 0.95
      const targetCoreScale =
        1 - impulse * 0.05;

      const smoothCoreScale =
        THREE.MathUtils.damp(
          coreRef.current.scale.x,
          targetCoreScale,
          6,
          delta
        );

      coreRef.current.scale.setScalar(smoothCoreScale);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.26, 32, 32]} />

        <meshStandardMaterial
          color="#ffffff"
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
    </group>
  );
}

function InteractiveSphere() {
  const haloImpulseRef = useRef(0);

  return (
    <>
      <InnerCoreSphere
        haloImpulseRef={haloImpulseRef}
      />

      <AnimatedOuterSphere
        haloImpulseRef={haloImpulseRef}
      />
    </>
  );
}

function Scene() {
  const mouseDrivenGroupRef =
    useRef<THREE.Group>(null);

  const pointerRef = useRef({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handlePointerMove = (
      event: PointerEvent
    ) => {
      pointerRef.current.x =
        (event.clientX / window.innerWidth) * 2 - 1;

      pointerRef.current.y =
        -(
          (event.clientY / window.innerHeight) *
            2 -
          1
        );
    };

    window.addEventListener(
      "pointermove",
      handlePointerMove
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );
    };
  }, []);

  useFrame(() => {
    if (!mouseDrivenGroupRef.current) return;

    const targetRotationX =
      pointerRef.current.y * -0.35;

    const targetRotationY =
      pointerRef.current.x * 0.45;

    mouseDrivenGroupRef.current.rotation.x =
      THREE.MathUtils.lerp(
        mouseDrivenGroupRef.current.rotation.x,
        targetRotationX,
        0.08
      );

    mouseDrivenGroupRef.current.rotation.y =
      THREE.MathUtils.lerp(
        mouseDrivenGroupRef.current.rotation.y,
        targetRotationY,
        0.08
      );
  });

  return (
    <>
      <ambientLight intensity={0.4} />

      <directionalLight
        position={[4, 4, 5]}
        intensity={2.1}
        color="#ffffff"
      />

      <directionalLight
        position={[-4, -2, 3]}
        intensity={1.1}
        color="#d9d9d9"
      />

      <pointLight
        position={[0, 0, 4]}
        intensity={1.4}
        color="#ffffff"
      />

      <pointLight
        position={[2, -1, 2]}
        intensity={0.8}
        color="#f5f5f5"
      />

      <group ref={mouseDrivenGroupRef}>
        <InteractiveSphere />
      </group>
    </>
  );
}

export default function WavySphere() {
  return (
    <div className="relative h-105 w-105">
      <Canvas
        camera={{
          position: [0, 0, 4.5],
          fov: 45,
        }}
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