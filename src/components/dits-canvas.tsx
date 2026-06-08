'use client';

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

type LoadState = "loading" | "ready" | "error";

type BounceState = {
  baseScale: THREE.Vector3;
  factor: number;
  velocity: number;
  targetFactor: number;
  phase: "up" | "down";
};

export default function DitsCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadState, setLoadState] = useState<LoadState>("loading");

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.background = null;
    const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 1000);
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setClearColor(0x000000, 0);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    // Temporizador ligero que reemplaza a THREE.Clock
    class ThreeTimer {
      last: number;
      constructor() {
        this.last = performance.now();
      }
      getDelta() {
        const now = performance.now();
        const delta = (now - this.last) / 1000;
        this.last = now;
        return delta;
      }
    }

    const threeTimer = new ThreeTimer();
    const bounceStates = new Map<THREE.Object3D, BounceState>();

    const ambientLight = new THREE.AmbientLight(0xffffff, 2.4);
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.3);
    keyLight.position.set(4, 6, 5);
    const topLight = new THREE.DirectionalLight(0xffffff, 2.8);
    topLight.position.set(0, 10, 2);
    const rimLight = new THREE.DirectionalLight(0xfff2d8, 1.9);
    rimLight.position.set(-3, 8, -2);
    const fillLight = new THREE.DirectionalLight(0x8fd3ff, 1.4);
    fillLight.position.set(-4, 2, 4);

    scene.add(ambientLight, keyLight, topLight, rimLight, fillLight);

    const loader = new GLTFLoader();
    let model: THREE.Object3D | null = null;

    const triggerBounce = (object: THREE.Object3D) => {
      let state = bounceStates.get(object);

      if (!state) {
        state = {
          baseScale: object.scale.clone(),
          factor: 1,
          velocity: 0,
          targetFactor: 1,
          phase: "up",
        };

        bounceStates.set(object, state);
      }

      state.factor = 1;
      state.velocity = 0;
      state.targetFactor = 1.12;
      state.phase = "up";
      object.scale.copy(state.baseScale);
    };

    const updateBounces = (delta: number) => {
      bounceStates.forEach((state, object) => {
        // parámetros suavizados: menor fuerza de resorte y mayor amortiguación
        const springStrength = 16;
        const damping = 14;

        state.velocity += (state.targetFactor - state.factor) * springStrength * delta;
        state.velocity *= Math.exp(-damping * delta);
        state.factor += state.velocity;

        object.scale.copy(state.baseScale).multiplyScalar(state.factor);

        if (state.phase === "up" && state.factor >= state.targetFactor) {
          state.phase = "down";
          state.targetFactor = 1;
        }

        if (
          state.phase === "down" &&
          Math.abs(state.factor - 1) < 0.001 &&
          Math.abs(state.velocity) < 0.001
        ) {
          object.scale.copy(state.baseScale);
          bounceStates.delete(object);
        }
      });
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!model) return;

      const rect = canvas.getBoundingClientRect();

      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(pointer, camera);

      const intersects = raycaster.intersectObjects([model], true);
      const clickedObject = intersects[0]?.object;

      if (clickedObject) {
        triggerBounce(clickedObject);
      }
    };

    canvas.addEventListener("pointerdown", handlePointerDown);

    loader.load(
      "/models/drumkit.glb",
      (gltf) => {
        model = gltf.scene;

        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        const maxDimension = Math.max(size.x, size.y, size.z);
        const targetSize = 4.2;
        const scale = maxDimension > 0 ? targetSize / maxDimension : 1;

        model.scale.setScalar(scale);
        model.position.sub(center.multiplyScalar(scale));

        const fittedBox = new THREE.Box3().setFromObject(model);
        const fittedSize = fittedBox.getSize(new THREE.Vector3()).length();

        // Posicionar la cámara: más frontal y más cerca
        // Reducimos Y para estar más a la altura del frente y reducimos Z para acercar
        camera.position.set(0, fittedSize * 0.15, fittedSize * 0.60);
        camera.lookAt(0, 0, 0);

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

      const delta = Math.min(threeTimer.getDelta(), 0.05);

      if (model) {
        updateBounces(delta);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointerdown", handlePointerDown);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative h-[60vh] min-h-90 w-full overflow-hidden rounded-2xl border border-background3 bg-background2">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full cursor-pointer" />

      {loadState !== "ready" && (
        <div className="absolute inset-0 flex items-center justify-center px-6 text-center pointer-events-none">
          <p className="text-sm uppercase tracking-[0.2em] text-text/45">
            {loadState === "loading" ? "Loading drumkit preview" : "3D preview unavailable"}
          </p>
        </div>
      )}
    </div>
  );
}