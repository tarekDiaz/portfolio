"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const markerLayerRef = useRef<HTMLDivElement>(null);
  const hoverLeftLabelRef = useRef<HTMLDivElement>(null);
  const hoverRightLabelRef = useRef<HTMLDivElement>(null);

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

    const pointer = new THREE.Vector2(0, 0);
    let targetRotationY = 0;
    const raycaster = new THREE.Raycaster();
    let hoverTargets: THREE.Mesh[] = [];
    let cubeTargets: THREE.Mesh[] = [];
    const cubeMarkerMap = new Map<THREE.Mesh, HTMLDivElement>();
    let activeHoverTarget: THREE.Mesh | null = null;
    let hoverScale = 1;
    let hoverScaleVelocity = 0;
    const hoveredWorldPosition = new THREE.Vector3();

    // LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);

    directionalLight.position.set(5, 5, 5);

    scene.add(directionalLight);

    // MODEL
    const loader = new GLTFLoader();

    let model: THREE.Object3D | null = null;

    const collectMeshes = (root: THREE.Object3D) => {
      const meshes: THREE.Mesh[] = [];

      root.traverse((child) => {
        if ((child as THREE.Mesh).isMesh && !child.name.includes("Plane")) {
          meshes.push(child as THREE.Mesh);
        }
      });

      return meshes;
    };

    const collectCubeMeshes = (root: THREE.Object3D) => {
      return collectMeshes(root).filter((mesh) => mesh.name.includes("Cube"));
    };

    const logModelHierarchy = (object: THREE.Object3D, indent = 0) => {
      const prefix = "  ".repeat(indent);
      const typeLabel = object.type || "Object3D";
      const nameLabel = object.name ? `: ${object.name}` : "";

      console.log(`${prefix}${typeLabel}${nameLabel}`);

      object.children.forEach((child) => {
        logModelHierarchy(child, indent + 1);
      });
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const normalizedX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const normalizedY = -(((event.clientY - rect.top) / rect.height) * 2 - 1);

      pointer.set(normalizedX, normalizedY);
      targetRotationY = normalizedX * 0.1;
    };

    const setCubeHoverVisibility = (visible: boolean) => {
      if (hoverLeftLabelRef.current) {
        hoverLeftLabelRef.current.style.opacity = visible ? "1" : "0";
      }

      if (hoverRightLabelRef.current) {
        hoverRightLabelRef.current.style.opacity = visible ? "1" : "0";
        hoverRightLabelRef.current.textContent = "Work in progress";
      }
    };

    const updateCubeMarkers = () => {
      if (!wrapperRef.current || cubeMarkerMap.size === 0) return;

      const rect = wrapperRef.current.getBoundingClientRect();

      cubeMarkerMap.forEach((marker, mesh) => {
        mesh.getWorldPosition(hoveredWorldPosition);
        hoveredWorldPosition.project(camera);

        const x = ((hoveredWorldPosition.x + 1) / 2) * rect.width;
        const y = ((-hoveredWorldPosition.y + 1) / 2) * rect.height;

        marker.style.left = `${x}px`;
        marker.style.top = `${y}px`;
      });
    };

    const updateCubeHoverOverlay = (mesh: THREE.Mesh | null) => {
      if (!mesh || !wrapperRef.current) {
        setCubeHoverVisibility(false);
        return;
      }

      mesh.getWorldPosition(hoveredWorldPosition);
      hoveredWorldPosition.project(camera);

      const rect = wrapperRef.current.getBoundingClientRect();
      const x = ((hoveredWorldPosition.x + 1) / 2) * rect.width;
      const y = ((-hoveredWorldPosition.y + 1) / 2) * rect.height;

      const hoveredMarker = cubeMarkerMap.get(mesh);

      if (hoveredMarker) {
        hoveredMarker.style.left = `${x}px`;
        hoveredMarker.style.top = `${y}px`;
      }

      setCubeHoverVisibility(true);
    };

    window.addEventListener("pointermove", handlePointerMove);

    loader.load(
      "/models/habitacion.glb",
      (gltf) => {
        model = gltf.scene;

        // CENTER MODEL
        const box = new THREE.Box3().setFromObject(model);

        const center = box.getCenter(new THREE.Vector3());

        model.position.sub(center);

        scene.add(model);

        console.group("Hero GLB hierarchy");
        logModelHierarchy(model);
        console.groupEnd();

        hoverTargets = collectMeshes(model);
        cubeTargets = collectCubeMeshes(model);

        if (markerLayerRef.current) {
          markerLayerRef.current.innerHTML = "";

          cubeTargets.forEach((mesh) => {
            const marker = document.createElement("div");
            marker.className =
              "cube-marker pointer-events-none absolute z-20 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-text/50 opacity-90 transition-transform duration-150 ease-out";

            markerLayerRef.current?.appendChild(marker);
            cubeMarkerMap.set(mesh, marker);
          });
        }

        console.log(
          "Hero GLB mesh names:",
          hoverTargets.map((mesh) => mesh.name || "(unnamed mesh)")
        );

        // AUTO CAMERA FIT
        const size = box.getSize(new THREE.Vector3()).length();

        camera.position.set(
          0,
          size * 0.28,
          size * 0.9
        );

        camera.lookAt(0, size * 0.08, 0);

        model.position.y += size * 0.08;
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
    let animationFrameId = 0;

    const animate = () => {
      animationFrameId = window.requestAnimationFrame(animate);

      if (model) {
        model.rotation.y = THREE.MathUtils.lerp(
          model.rotation.y,
          targetRotationY,
          0.06
        );

        if (hoverTargets.length > 0) {
          raycaster.setFromCamera(pointer, camera);

          const intersects = raycaster.intersectObjects(cubeTargets, false);
          const hoveredMesh = intersects[0]?.object as THREE.Mesh | undefined;

          if (activeHoverTarget && activeHoverTarget !== hoveredMesh) {
            activeHoverTarget.scale.setScalar(1);
          }

          if (hoveredMesh) {
            if (activeHoverTarget !== hoveredMesh) {
              console.log(
                "Hovering object:",
                hoveredMesh.name || hoveredMesh.uuid
              );

              hoverScale = 1;
              hoverScaleVelocity = 0;
            }

            activeHoverTarget = hoveredMesh;
            const targetScale = 1.08;
            const springStrength = 14;
            const springDamping = 10;

            hoverScaleVelocity += (targetScale - hoverScale) * springStrength * 0.016;
            hoverScaleVelocity *= Math.exp(-springDamping * 0.016);
            hoverScale += hoverScaleVelocity;

            activeHoverTarget.scale.setScalar(hoverScale);
          } else {
            const springStrength = 14;
            const springDamping = 10;

            hoverScaleVelocity += (1 - hoverScale) * springStrength * 0.016;
            hoverScaleVelocity *= Math.exp(-springDamping * 0.016);
            hoverScale += hoverScaleVelocity;

            if (activeHoverTarget) {
              activeHoverTarget.scale.setScalar(hoverScale);

              if (Math.abs(hoverScale - 1) < 0.001) {
                activeHoverTarget = null;
                hoverScale = 1;
                hoverScaleVelocity = 0;
              }
            }
          }

          updateCubeMarkers();

          cubeMarkerMap.forEach((marker, mesh) => {
            const isHovered = mesh === hoveredMesh;
            marker.style.transform = isHovered
              ? "translate(-50%, -50%) scale(1.45)"
              : "translate(-50%, -50%) scale(1)";
          });

          updateCubeHoverOverlay(hoveredMesh ?? null);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // CLEANUP
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();

      cubeMarkerMap.clear();

      renderer.dispose();
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative h-full w-full rounded-3xl">
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-3xl block"
      />

      <div
        ref={markerLayerRef}
        className="pointer-events-none absolute inset-0 z-20"
      />

      <div
        ref={hoverLeftLabelRef}
        className="pointer-events-none absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-text/20 bg-background/65 px-4 py-2 text-xs uppercase tracking-[0.25em] text-text opacity-0 backdrop-blur-md transition-opacity duration-200"
      >
        Interactable
      </div>

      <div
        ref={hoverRightLabelRef}
        className="pointer-events-none absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-text/20 bg-background/65 px-4 py-2 text-xs uppercase tracking-[0.25em] text-text opacity-0 backdrop-blur-md transition-opacity duration-200"
      >
        Work in progress
      </div>
    </div>
  );
}