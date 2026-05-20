"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    // SCENE
    const scene = new THREE.Scene();

    // CAMERA
    const camera = new THREE.PerspectiveCamera(
      75,
      1,
      0.5,
      1000
    );

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);

    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    controls.enableZoom = false;
    controls.enablePan = true;
    controls.enableRotate = true;

    controls.minDistance = 1;
    controls.maxDistance = 10;
    controls.maxPolarAngle = Math.PI / 2;

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);

    directionalLight.position.set(5, 5, 5);

    scene.add(directionalLight);

    // MODEL
    const loader = new GLTFLoader();

    let model: THREE.Object3D | null = null;

    loader.load(
      "/models/habitacion.glb",
      (gltf) => {
        model = gltf.scene;

        // CENTER MODEL
        const box = new THREE.Box3().setFromObject(model);

        const center = box.getCenter(new THREE.Vector3());

        model.position.sub(center);

        scene.add(model);

        // AUTO CAMERA FIT
        const size = box.getSize(new THREE.Vector3()).length();

        camera.position.set(
          0,
          size * 0.65,
          size * 0.8
        );

        controls.target.set(0, 0, 0);

        controls.update();
      },
      undefined,
      (error) => {
        console.error("Error loading model:", error);
      }
    );

    // RESIZE FUNCTION
    const resizeCanvas = () => {
      const parent = canvas.parentElement;

      if (!parent) return;

      const width = parent.clientWidth;
      const height = parent.clientHeight;

      // REAL CANVAS SIZE
      canvas.width = width;
      canvas.height = height;

      // THREE SIZE
      renderer.setSize(width, height, false);

      // CAMERA
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    // OBSERVER
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    resizeCanvas();

    // ANIMATION LOOP
    const animate = () => {
      requestAnimationFrame(animate);

      controls.update();

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      resizeObserver.disconnect();

      controls.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full rounded-3xl block"
    />
  );
}