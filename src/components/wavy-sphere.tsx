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

    meshRef.current.rotation.y = time * 0.18;
    meshRef.current.rotation.x = Math.sin(time * 0.3) * 0.06;
  });

  return (
    <mesh ref={meshRef}>
        <sphereGeometry ref={geometryRef} args={[1.35, 128, 128]} />
        <meshPhysicalMaterial
            color="#b8b8b8"
            metalness={0.65}
            roughness={0.22}
            clearcoat={1}
            clearcoatRoughness={0.12}
            reflectivity={0.8}
            transparent
            opacity={0.78}
            transmission={0}
            depthWrite={false}
        />
    </mesh>
  );
}

function InnerCoreSphere() {
  const groupRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color("#ddbe11") }, // --gradient-1
      uColor2: { value: new THREE.Color("#a66821") }, // --gradient-2
    }),
    []
  );

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);

    const gradient1 =
      rootStyles.getPropertyValue("--gradient-1").trim() || "#ddbe11";
    const gradient2 =
      rootStyles.getPropertyValue("--gradient-2").trim() || "#a66821";

    if (materialRef.current) {
      materialRef.current.uniforms.uColor1.value = new THREE.Color(gradient1);
      materialRef.current.uniforms.uColor2.value = new THREE.Color(gradient2);
    }
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const pulse = 1 + Math.sin(time * 2.2) * 0.04;

    if (groupRef.current) {
      groupRef.current.scale.setScalar(pulse);
      groupRef.current.rotation.y = time * 0.2;
    }

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = time;
    }

    if (lightRef.current) {
      lightRef.current.intensity = 3.2 + Math.sin(time * 2.2) * 0.7;
      // luz con tono intermedio cálido
      lightRef.current.color.set("#c98c1a");
    }

    if (glowRef.current) {
      glowRef.current.scale.setScalar(1.25 + Math.sin(time * 2.2) * 0.08);
      glowRef.current.rotation.y = -time * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Núcleo con gradiente animado */}
      <mesh>
        <sphereGeometry args={[0.26, 64, 64]} />
        <shaderMaterial
          ref={materialRef}
          uniforms={uniforms}
          transparent={false}
          toneMapped={false}
          vertexShader={`
            varying vec3 vPosition;
            varying vec3 vNormal;

            void main() {
              vPosition = position;
              vNormal = normal;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={`
            uniform float uTime;
            uniform vec3 uColor1;
            uniform vec3 uColor2;

            varying vec3 vPosition;
            varying vec3 vNormal;

            void main() {
              vec3 p = normalize(vPosition);

              // rotación del gradiente
              float angle = uTime * 0.9;
              float c = cos(angle);
              float s = sin(angle);

              mat2 rot = mat2(c, -s, s, c);
              vec2 rotated = rot * p.xz;

              // mezcla angular + un poco vertical para que sea más orgánico
              float angular = rotated.x * 0.5 + 0.5;
              float vertical = p.y * 0.5 + 0.5;
              float gradient = mix(angular, vertical, 0.35);

              vec3 color = mix(uColor1, uColor2, gradient);

              // brillo hacia bordes y centro luminoso
              float fresnel = pow(1.0 - abs(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0))), 2.0);
              color += mix(uColor1, vec3(1.0), 0.35) * 0.18;
              color += fresnel * 0.12;

              gl_FragColor = vec4(color, 1.0);
            }
          `}
        />
      </mesh>

      {/* Halo visual cálido */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.42, 64, 64]} />
        <meshBasicMaterial
          color="#d29b1c"
          transparent
          opacity={0.22}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>

      {/* Luz emitida desde el núcleo */}
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
  return (
    <>
      <ambientLight intensity={0.38} />

      <directionalLight position={[4, 4, 5]} intensity={2.1} color="#ffffff" />
      <directionalLight position={[-4, -2, 3]} intensity={1.1} color="#d9d9d9" />

      <pointLight position={[0, 0, 4]} intensity={1.4} color="#ffffff" />
      <pointLight position={[2, -1, 2]} intensity={0.8} color="#f5f5f5" />

      <InnerCoreSphere />
      <AnimatedOuterSphere />
    </>
  );
}

export default function WavyMetalSphere() {
  return (
    <div className="relative h-[420px] w-[420px]">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 42 }}
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