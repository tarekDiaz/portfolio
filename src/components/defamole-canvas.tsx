'use client';

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

type LoadState = "loading" | "ready" | "error";

function buildFallbackScene(scene: THREE.Scene) {
  const group = new THREE.Group();

  const ground = new THREE.Mesh(
    new THREE.CylinderGeometry(2.8, 3.4, 0.25, 12),
    new THREE.MeshStandardMaterial({ color: 0x9fb36a, roughness: 0.95 })
  );
  ground.position.y = -1.25;
  group.add(ground);

  const body = new THREE.Mesh(
    new THREE.SphereGeometry(1.05, 32, 24),
    new THREE.MeshStandardMaterial({ color: 0xd46a3c, roughness: 0.55, metalness: 0.05 })
  );
  body.scale.set(1.1, 0.9, 1);
  body.position.set(0, 0.2, 0);
  group.add(body);

  const shell = new THREE.Mesh(
    new THREE.SphereGeometry(1.15, 32, 24),
    new THREE.MeshStandardMaterial({ color: 0x6e4525, roughness: 0.8 })
  );
  shell.scale.set(1, 0.75, 1);
  shell.position.set(0, 0.55, -0.1);
  group.add(shell);

  const shovel = new THREE.Mesh(
    new THREE.BoxGeometry(0.2, 0.9, 0.2),
    new THREE.MeshStandardMaterial({ color: 0x4c3320, roughness: 1 })
  );
  shovel.position.set(0.95, -0.1, 0.45);
  shovel.rotation.z = -0.7;
  group.add(shovel);

  const tip = new THREE.Mesh(
    new THREE.ConeGeometry(0.28, 0.65, 16),
    new THREE.MeshStandardMaterial({ color: 0x2f2419, roughness: 1 })
  );
  tip.position.set(1.15, -0.55, 0.45);
  tip.rotation.z = -0.7;
  group.add(tip);

  const eyeMaterial = new THREE.MeshStandardMaterial({ color: 0xf4f1da, roughness: 0.2 });
  const eye = new THREE.Mesh(new THREE.SphereGeometry(0.12, 20, 20), eyeMaterial);
  eye.position.set(0.28, 0.55, 1.02);
  group.add(eye.clone());
  const eye2 = eye.clone();
  eye2.position.x = -0.28;
  group.add(eye2);

  group.position.y = 0.15;
  scene.add(group);

  return group;
}

export default function DefaMoleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadState, setLoadState] = useState<LoadState>("loading");

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.4;

    scene.background = null;

    const ambientLight = new THREE.AmbientLight(0xffffff, 2.4);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 3.2);
    directionalLight.position.set(5, 6, 4);
    const fillLight = new THREE.DirectionalLight(0xffd2a1, 1.4);
    fillLight.position.set(-3, 2, 5);
    scene.add(ambientLight, directionalLight, fillLight);

    const loader = new GLTFLoader();
    let model: THREE.Object3D | null = null;

    loader.load(
      "/models/defamole.glb",
      (gltf) => {
        model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        const size = box.getSize(new THREE.Vector3()).length();
        camera.position.set(0, size * 0.5, size * 1.15);
        controls.target.set(0, 0, 0);
        controls.update();

        scene.add(model);
        setLoadState("ready");
      },
      undefined,
      () => {
        model = buildFallbackScene(scene);
        camera.position.set(0, 2.4, 6.5);
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

      if (model) {
        model.rotation.y += 0.006;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      controls.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative h-[60vh] min-h-[360px] w-full overflow-hidden rounded-2xl border border-background3 bg-background2">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {loadState === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <div className="max-w-md rounded-2xl border border-background3 bg-background/75 px-6 py-5 backdrop-blur-md">
            <p className="mb-2 text-lg font-semibold text-text">Loading Def a Mole preview</p>
            <p className="text-sm leading-relaxed text-text3">
              The canvas will use <span className="font-medium text-text">/models/defamole.glb</span> if you add it. Otherwise it shows a fallback animated character placeholder.
            </p>
          </div>
        </div>
      )}

      {loadState === "error" && (
        <div className="pointer-events-none absolute bottom-4 left-4 rounded-full border border-background3 bg-background/80 px-4 py-2 text-xs uppercase tracking-[0.2em] text-text3 backdrop-blur-md">
          Fallback preview active
        </div>
      )}
    </div>
  );
}