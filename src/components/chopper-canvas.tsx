'use client';

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

type LoadState = "loading" | "ready" | "error";

export default function ChopperCanvas() {
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
    renderer.setClearColor(0x000000, 0);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.2;

    const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 3.2);
    directionalLight.position.set(2, 4, 6);
    const fillLight = new THREE.DirectionalLight(0xffffff, 1.2);
    fillLight.position.set(-3, 1, 4);
    scene.add(ambientLight, directionalLight, fillLight);

    const loader = new GLTFLoader();
    let model: THREE.Object3D | null = null;

    loader.load(
      "/models/chopperTpose.glb",
      (gltf) => {
        model = gltf.scene;

        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        const maxDimension = Math.max(size.x, size.y, size.z);
        const targetSize = 3.5;
        const scale = maxDimension > 0 ? targetSize / maxDimension : 1;

        model.scale.setScalar(scale);
        model.position.sub(center.multiplyScalar(scale));

        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material instanceof THREE.MeshStandardMaterial || Array.isArray(child.material)) {
              return;
            }
          }
        });

        const fittedBox = new THREE.Box3().setFromObject(model);
        const fittedSize = fittedBox.getSize(new THREE.Vector3()).length();
        camera.position.set(0, fittedSize * 0.15, fittedSize * 1.7);
        controls.target.set(0, 0, 0);
        controls.update();

        scene.add(model);
        setLoadState("ready");
      },
      undefined,
      () => {
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
        model.rotation.y += 0.007;
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
    <div className="relative h-[60vh] min-h-90 w-full overflow-hidden bg-transparent">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {loadState !== "ready" && (
        <div className="absolute inset-x-0 top-4 flex justify-center px-6 text-center pointer-events-none">
          <p className="text-sm uppercase tracking-[0.2em] text-text/45">
            {loadState === "loading" ? "Loading Chopper T-pose model" : "3D preview unavailable"}
          </p>
        </div>
      )}
    </div>
  );
}