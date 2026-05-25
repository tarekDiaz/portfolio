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

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.2;

    const ambientLight = new THREE.AmbientLight(0xffffff, 2.2);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 3.2);
    directionalLight.position.set(4, 6, 5);
    scene.add(ambientLight, directionalLight);

    const loader = new GLTFLoader();
    let model: THREE.Object3D | null = null;

    loader.load(
      "/models/chopper.glb",
      (gltf) => {
        model = gltf.scene;
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material instanceof THREE.MeshStandardMaterial || Array.isArray(child.material)) {
              return;
            }
          }
        });

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);

        const size = box.getSize(new THREE.Vector3()).length();
        camera.position.set(0, size * 0.45, size * 1.15);
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
    <div className="relative h-[60vh] min-h-[360px] w-full overflow-hidden rounded-2xl border border-background3 bg-background2">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {loadState !== "ready" && (
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
          <div className="max-w-md rounded-2xl border border-background3 bg-background/75 px-6 py-5 backdrop-blur-md">
            <p className="mb-2 text-lg font-semibold text-text">
              {loadState === "loading" ? "Loading Chopper 3D model" : "3D preview placeholder"}
            </p>

            <p className="text-sm leading-relaxed text-text3">
              Place your file as <span className="font-medium text-text">/public/models/chopper.glb</span> to show the spinning 3D model here.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}