'use client';

import { useEffect, useId, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { LuRotate3D } from "react-icons/lu";

type LoadState = "loading" | "ready" | "error";

type CharacterPreviewCanvasProps = {
  modelSrc: string;
  title: string;
};

function GradientRotateIcon({ gradientId }: { gradientId: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5 shrink-0"
      fill="none"
      stroke={`url(#${gradientId})`}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <defs>
        <radialGradient id={gradientId} cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="var(--gradient-1)" />
          <stop offset="100%" stopColor="var(--gradient-2)" />
        </radialGradient>
      </defs>
      <path d="M16.466 7.5C15.643 4.237 13.952 2 12 2 9.239 2 7 6.477 7 12s2.239 10 5 10c.342 0 .677-.069 1-.2" />
      <path d="m15.194 13.707 3.814 1.86-1.86 3.814" />
      <path d="M19 15.57c-1.804.885-4.274 1.43-7 1.43-5.523 0-10-2.239-10-5s4.477-5 10-5c4.838 0 8.873 1.718 9.8 4" />
    </svg>
  );
}

function buildFallbackScene(scene: THREE.Scene, title: string) {
  const group = new THREE.Group();

  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(1.5, 1.8, 0.2, 10),
    new THREE.MeshStandardMaterial({ color: 0x8d7b5e, roughness: 0.95 })
  );
  base.position.y = -0.95;
  group.add(base);

  const body = new THREE.Mesh(
    new THREE.SphereGeometry(0.8, 24, 20),
    new THREE.MeshStandardMaterial({ color: 0xb89c72, roughness: 0.6 })
  );
  body.scale.set(1.1, 0.85, 1);
  body.position.set(0, -0.05, 0);
  group.add(body);

  const label = new THREE.Mesh(
    new THREE.BoxGeometry(0.95, 0.18, 0.12),
    new THREE.MeshStandardMaterial({ color: 0x3d342a, roughness: 1 })
  );
  label.position.set(0, 0.95, 0);
  group.add(label);

  const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0xf4f1da, roughness: 0.2 });
  const eye = new THREE.Mesh(new THREE.SphereGeometry(0.08, 16, 16), eyeMaterial);
  eye.position.set(0.18, 0.2, 0.72);
  group.add(eye.clone());
  const eye2 = eye.clone();
  eye2.position.x = -0.18;
  group.add(eye2);

  const textHint = new THREE.Mesh(
    new THREE.BoxGeometry(0.6, 0.08, 0.08),
    new THREE.MeshStandardMaterial({ color: 0xefe7d5, roughness: 0.8 })
  );
  textHint.position.set(0, 1.22, 0);
  group.add(textHint);

  group.position.y = 0.1;
  scene.add(group);

  return { group, title };
}

export default function CharacterPreviewCanvas({ modelSrc, title }: CharacterPreviewCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadState, setLoadState] = useState<LoadState>("loading");
  const [isRotating, setIsRotating] = useState(true);
  const isRotatingRef = useRef(true);
  const gradientId = useId();

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(45, 1, 0.05, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;

    const handleControlsStart = () => {
      isRotatingRef.current = false;
      setIsRotating(false);
    };

    controls.addEventListener("start", handleControlsStart);

    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(4, 6, 4);
    const fillLight = new THREE.DirectionalLight(0xffd9a6, 1.2);
    fillLight.position.set(-3, 2, 5);
    scene.add(ambientLight, keyLight, fillLight);

    let model: THREE.Object3D | null = null;
    const loader = new GLTFLoader();

    loader.load(
      modelSrc,
      (gltf) => {
        model = gltf.scene;

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        const size = box.getSize(new THREE.Vector3()).length();
        camera.position.set(0, size * 0.35, size * 1.05);
        controls.target.set(0, 0, 0);
        controls.update();

        scene.add(model);
        setLoadState("ready");
      },
      undefined,
      () => {
        const fallback = buildFallbackScene(scene, title);
        model = fallback.group;
        camera.position.set(0, 1.6, 4.6);
        controls.target.set(0, 0, 0);
        controls.update();
        setLoadState("error");
      }
    );

    const resizeCanvas = () => {
      const parent = canvas.parentElement;

      if (!parent) return;

      const width = parent.clientWidth;
      const height = parent.clientHeight;

      canvas.width = width;
      canvas.height = height;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(() => resizeCanvas());

    if (canvas.parentElement) resizeObserver.observe(canvas.parentElement);
    resizeCanvas();

    let animationFrame = 0;

    const animate = () => {
      animationFrame = requestAnimationFrame(animate);

      if (model && isRotatingRef.current) {
        model.rotation.y += 0.005;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      controls.removeEventListener("start", handleControlsStart);
      controls.dispose();
      renderer.dispose();
    };
  }, [modelSrc, title]);

  const toggleRotation = () => {
    setIsRotating((current) => {
      const nextValue = !current;
      isRotatingRef.current = nextValue;
      return nextValue;
    });
  };

  return (
    <div className="relative h-52 w-full overflow-hidden rounded-2xl border border-background3 bg-background2 sm:h-56">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <button
        type="button"
        onClick={toggleRotation}
        className="absolute bottom-3 right-3 inline-flex h-10 w-10 items-center justify-center rounded-full border border-background3 bg-background/80 text-text2 backdrop-blur-md transition-all duration-200 hover:border-text hover:text-text"
        aria-pressed={isRotating}
        aria-label={isRotating ? `Disable rotation for ${title}` : `Enable rotation for ${title}`}
      >
        {isRotating ? (
          <GradientRotateIcon gradientId={gradientId} />
        ) : (
          <LuRotate3D aria-hidden="true" className="h-5 w-5 shrink-0 text-text2" />
        )}
      </button>

      {loadState === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
          <div className="rounded-2xl border border-background3 bg-background/75 px-4 py-3 backdrop-blur-md">
            <p className="text-xs uppercase tracking-[0.22em] text-text3">Loading {title}</p>
          </div>
        </div>
      )}

      {loadState === "error" && (
        <div className="pointer-events-none absolute bottom-3 left-3 rounded-full border border-background3 bg-background/80 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-text3 backdrop-blur-md">
          Fallback preview
        </div>
      )}
    </div>
  );
}