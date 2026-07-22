"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import {
  RiFullscreenExitLine,
  RiFullscreenFill,
  RiZoomInLine,
  RiZoomOutLine,
} from "react-icons/ri";

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
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cameraZoomApiRef = useRef<{
    zoomIn: () => void;
    zoomOut: () => void;
  } | null>(null);

  const [loadState, setLoadState] =
    useState<LoadState>("loading");

  const [volume, setVolume] = useState(80);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [fullscreenCursor, setFullscreenCursor] = useState({
    x: 0,
    y: 0,
    visible: false,
  });

  const volumeRef = useRef(0.8);

  const audioContextRef =
    useRef<AudioContext | null>(null);

  const audioGainNodeRef =
    useRef<GainNode | null>(null);

  const setAudioVolume = (nextVolume: number) => {
    volumeRef.current = nextVolume;

    if (audioGainNodeRef.current) {
      audioGainNodeRef.current.gain.value = nextVolume;
    }
  };

  const handleToggleFullscreen = async () => {
    const wrapper = wrapperRef.current;

    if (!wrapper) return;

    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    await wrapper.requestFullscreen();
  };

  const updateFullscreenCursor = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (!isFullscreen) return;

    const rect = event.currentTarget.getBoundingClientRect();

    setFullscreenCursor({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      visible: true,
    });
  };

  const handleFullscreenPointerLeave = () => {
    if (!isFullscreen) return;

    setFullscreenCursor((current) => ({
      ...current,
      visible: false,
    }));
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        Boolean(document.fullscreenElement)
      );
    };

    document.addEventListener(
      "fullscreenchange",
      handleFullscreenChange
    );

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    /*
     * Scene
     */

    const scene = new THREE.Scene();
    scene.background = null;

    /*
     * Camera
     */

    const camera = new THREE.PerspectiveCamera(
      45,
      1,
      0.01,
      1000
    );

    /*
     * Renderer
     */

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    );

    renderer.outputColorSpace =
      THREE.SRGBColorSpace;

    renderer.setClearColor(0x000000, 0);

    /*
     * Responsive camera
     */

    const desktopCameraPosition = new THREE.Vector3(
      -0.151,
      1.63,
      3.815
    );

    const mobileCameraPosition = new THREE.Vector3(
      -0.171,
      3.764,
      7.407
    );

    const fixedCameraTarget = new THREE.Vector3(
      -0.107,
      -0.062,
      0.004
    );

    const cameraBasePosition = new THREE.Vector3();
    const cameraTargetPosition = new THREE.Vector3();
    let cameraInitialized = false;
    let zoomMultiplier = 1;

    const minZoomMultiplier = 0.7;
    const maxZoomMultiplier = 1.7;
    const zoomStep = 0.12;

    const getTailwindBreakpointPx = (cssVariable: string, fallbackPx: number) => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue(cssVariable)
        .trim();

      if (!value) return fallbackPx;

      if (value.endsWith("rem")) {
        const rootFontSize = parseFloat(
          getComputedStyle(document.documentElement).fontSize
        );

        return parseFloat(value) * rootFontSize;
      }

      if (value.endsWith("px")) {
        return parseFloat(value);
      }

      return fallbackPx;
    };

    const mobileBreakpoint = getTailwindBreakpointPx("--breakpoint-md", 768);

    const updateCameraTargetPosition = () => {
      cameraTargetPosition
        .copy(fixedCameraTarget)
        .add(
          cameraBasePosition
            .clone()
            .sub(fixedCameraTarget)
            .multiplyScalar(zoomMultiplier)
        );
    };

    const setZoomMultiplier = (nextMultiplier: number) => {
      zoomMultiplier = THREE.MathUtils.clamp(
        nextMultiplier,
        minZoomMultiplier,
        maxZoomMultiplier
      );

      updateCameraTargetPosition();
    };

    cameraZoomApiRef.current = {
      zoomIn: () => {
        setZoomMultiplier(zoomMultiplier - zoomStep);
      },
      zoomOut: () => {
        setZoomMultiplier(zoomMultiplier + zoomStep);
      },
    };

    const applyResponsiveCamera = (
      canvasWidth: number
    ) => {
      const isMobile =
        canvasWidth <= mobileBreakpoint;

      const cameraPosition = isMobile
        ? mobileCameraPosition
        : desktopCameraPosition;

      cameraBasePosition.copy(cameraPosition);
      updateCameraTargetPosition();

      if (!cameraInitialized) {
        camera.position.copy(cameraTargetPosition);
        cameraInitialized = true;
      }

      camera.lookAt(fixedCameraTarget);
      camera.updateProjectionMatrix();
    };

    /*
     * Audio
     */

    const soundFiles = {
      china: "/assets/sounds/china.mp3",
      cowbell: "/assets/sounds/cowbell.mp3",
      crash: "/assets/sounds/crash.mp3",
      hihat: "/assets/sounds/hihat.mp3",
      kick: "/assets/sounds/kick.mp3",
      ride20: "/assets/sounds/ride20.mp3",
      snare: "/assets/sounds/snare.mp3",
      tom1: "/assets/sounds/tom1.mp3",
      tom2: "/assets/sounds/tom2.mp3",
      tom3: "/assets/sounds/tom3.mp3",
    } as const;

    const normalizeName = (value: string) =>
      value
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");

    const findSoundUrl = (name: string) => {
      const normalized = normalizeName(name);

      if (normalized.includes("tom1")) {
        return soundFiles.tom1;
      }

      if (normalized.includes("tom2")) {
        return soundFiles.tom2;
      }

      if (normalized.includes("tom3")) {
        return soundFiles.tom3;
      }

      if (
        normalized.includes("hihat") ||
        normalized.includes("hh")
      ) {
        return soundFiles.hihat;
      }

      if (
        normalized.includes("kick") ||
        normalized.includes("bassdrum") ||
        normalized.includes("bd")
      ) {
        return soundFiles.kick;
      }

      if (normalized.includes("snare")) {
        return soundFiles.snare;
      }

      if (normalized.includes("crash")) {
        return soundFiles.crash;
      }

      if (normalized.includes("ride")) {
        return soundFiles.ride20;
      }

      if (normalized.includes("cowbell")) {
        return soundFiles.cowbell;
      }

      if (normalized.includes("china")) {
        return soundFiles.china;
      }

      return null;
    };

    const audioBufferMap =
      new Map<string, AudioBuffer>();

    const getAudioContext = () => {
      if (audioContextRef.current) {
        return audioContextRef.current;
      }

      const AudioContextConstructor =
        window.AudioContext ||
        (
          window as typeof window & {
            webkitAudioContext?: typeof AudioContext;
          }
        ).webkitAudioContext;

      if (!AudioContextConstructor) {
        return null;
      }

      const audioContext =
        new AudioContextConstructor();

      const gainNode =
        audioContext.createGain();

      gainNode.gain.value = volumeRef.current;
      gainNode.connect(audioContext.destination);

      audioContextRef.current = audioContext;
      audioGainNodeRef.current = gainNode;

      return audioContext;
    };

    const unlockAudioContext = () => {
      const context = getAudioContext();

      if (
        !context ||
        context.state === "running"
      ) {
        return;
      }

      void context.resume();
    };

    const loadAudioBuffer = async (
      url: string
    ) => {
      const context = getAudioContext();

      if (!context) return null;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Unable to load sound: ${url}`
        );
      }

      const arrayBuffer =
        await response.arrayBuffer();

      return await context.decodeAudioData(
        arrayBuffer
      );
    };

    const primeAudioBuffers = async () => {
      const entries = Object.entries(
        soundFiles
      ) as Array<
        [keyof typeof soundFiles, string]
      >;

      await Promise.all(
        entries.map(async ([key, url]) => {
          try {
            const buffer =
              await loadAudioBuffer(url);

            if (buffer) {
              audioBufferMap.set(key, buffer);
            }
          } catch {
            // El sonido se cargará al hacer clic.
          }
        })
      );
    };

    const playSound = async (
      name: string
    ) => {
      const url = findSoundUrl(name);

      if (!url) return;

      const context = getAudioContext();

      if (!context) return;

      if (
        context.state === "suspended"
      ) {
        await context.resume();
      }

      const bufferEntry =
        Object.entries(soundFiles).find(
          ([, fileUrl]) => fileUrl === url
        );

      const bufferKey =
        bufferEntry?.[0] as
          | keyof typeof soundFiles
          | undefined;

      let buffer = bufferKey
        ? audioBufferMap.get(bufferKey)
        : undefined;

      if (!buffer) {
        try {
          const loadedBuffer =
            await loadAudioBuffer(url);

          if (!loadedBuffer) return;

          buffer = loadedBuffer;

          if (bufferKey) {
            audioBufferMap.set(
              bufferKey,
              loadedBuffer
            );
          }
        } catch {
          return;
        }
      }

      const source =
        context.createBufferSource();

      source.buffer = buffer;

      source.connect(
        audioGainNodeRef.current ??
          context.destination
      );

      source.start(0);
    };

    /*
     * Interaction
     */

    const raycaster =
      new THREE.Raycaster();

    const pointer = new THREE.Vector2();

    class ThreeTimer {
      private last: number;

      constructor() {
        this.last = performance.now();
      }

      getDelta() {
        const now = performance.now();

        const delta =
          (now - this.last) / 1000;

        this.last = now;

        return delta;
      }
    }

    const threeTimer =
      new ThreeTimer();

    const bounceStates =
      new Map<THREE.Object3D, BounceState>();

    /*
     * Lights
     */

    const ambientLight =
      new THREE.AmbientLight(
        0xffffff,
        2.4
      );

    const keyLight =
      new THREE.DirectionalLight(
        0xffffff,
        3.3
      );

    keyLight.position.set(4, 6, 5);

    const topLight =
      new THREE.DirectionalLight(
        0xffffff,
        2.8
      );

    topLight.position.set(0, 10, 2);

    const rimLight =
      new THREE.DirectionalLight(
        0xfff2d8,
        1.9
      );

    rimLight.position.set(-3, 8, -2);

    const fillLight =
      new THREE.DirectionalLight(
        0x8fd3ff,
        1.4
      );

    fillLight.position.set(-4, 2, 4);

    scene.add(
      ambientLight,
      keyLight,
      topLight,
      rimLight,
      fillLight
    );

    /*
     * Model
     */

    const loader = new GLTFLoader();

    const modelRoot =
      new THREE.Group();

    scene.add(modelRoot);

    let model: THREE.Object3D | null = null;

    /*
     * Bounce animation
     */

    const triggerBounce = (
      object: THREE.Object3D
    ) => {
      let state =
        bounceStates.get(object);

      if (!state) {
        state = {
          baseScale:
            object.scale.clone(),
          factor: 1,
          velocity: 0,
          targetFactor: 1,
          phase: "up",
        };

        bounceStates.set(
          object,
          state
        );
      }

      state.factor = 1;
      state.velocity = 0;
      state.targetFactor = 1.12;
      state.phase = "up";

      object.scale.copy(
        state.baseScale
      );
    };

    const getBounceTarget = (
      object: THREE.Object3D
    ) => {
      let target = object;

      while (
        target.parent &&
        target.parent !== model
      ) {
        target = target.parent;
      }

      return target;
    };

    const getSoundTargetName = (
      object: THREE.Object3D
    ) => {
      let target:
        | THREE.Object3D
        | null = object;

      while (target) {
        if (
          target.name &&
          findSoundUrl(target.name)
        ) {
          return target.name;
        }

        if (target.parent === model) {
          break;
        }

        target = target.parent;
      }

      return object.name;
    };

    const updateBounces = (
      delta: number
    ) => {
      bounceStates.forEach(
        (state, object) => {
          const springStrength = 16;
          const damping = 14;

          state.velocity +=
            (state.targetFactor -
              state.factor) *
            springStrength *
            delta;

          state.velocity *= Math.exp(
            -damping * delta
          );

          state.factor += state.velocity;

          object.scale
            .copy(state.baseScale)
            .multiplyScalar(
              state.factor
            );

          if (
            state.phase === "up" &&
            state.factor >=
              state.targetFactor
          ) {
            state.phase = "down";
            state.targetFactor = 1;
          }

          if (
            state.phase === "down" &&
            Math.abs(
              state.factor - 1
            ) < 0.001 &&
            Math.abs(
              state.velocity
            ) < 0.001
          ) {
            object.scale.copy(
              state.baseScale
            );

            bounceStates.delete(object);
          }
        }
      );
    };

    const handlePointerDown = (
      event: PointerEvent
    ) => {
      if (!model) return;

      if (event.button !== 0) return;

      unlockAudioContext();

      const rect =
        canvas.getBoundingClientRect();

      pointer.x =
        ((event.clientX - rect.left) /
          rect.width) *
          2 -
        1;

      pointer.y =
        -(
          ((event.clientY - rect.top) /
            rect.height) *
            2 -
          1
        );

      raycaster.setFromCamera(
        pointer,
        camera
      );

      const intersects =
        raycaster.intersectObjects(
          [model],
          true
        );

      const clickedObject =
        intersects[0]?.object;

      if (!clickedObject) return;

      const bounceTarget =
        getBounceTarget(
          clickedObject
        );

      triggerBounce(bounceTarget);

      const soundTargetName =
        getSoundTargetName(
          clickedObject
        );

      if (soundTargetName) {
        void playSound(
          soundTargetName
        );
      }
    };

    canvas.addEventListener(
      "pointerdown",
      handlePointerDown
    );

    canvas.addEventListener(
      "touchstart",
      unlockAudioContext,
      {
        passive: true,
      }
    );

    void primeAudioBuffers();

    /*
     * Model loading
     */

    loader.load(
      "/models/drumkit.glb",

      (gltf) => {
        model = gltf.scene;

        model.updateMatrixWorld(true);

        const initialBox =
          new THREE.Box3().setFromObject(
            model
          );

        const initialSize =
          initialBox.getSize(
            new THREE.Vector3()
          );

        const maxDimension =
          Math.max(
            initialSize.x,
            initialSize.y,
            initialSize.z
          );

        const targetSize = 4.2;

        const modelScale =
          maxDimension > 0
            ? targetSize /
              maxDimension
            : 1;

        model.scale.setScalar(
          modelScale
        );

        model.updateMatrixWorld(true);

        /*
         * Centrar correctamente el modelo después
         * de haber aplicado la escala.
         */

        const scaledBox =
          new THREE.Box3().setFromObject(
            model
          );

        const scaledCenter =
          scaledBox.getCenter(
            new THREE.Vector3()
          );

        model.position.sub(
          scaledCenter
        );

        /*
         * Pequeño ajuste vertical del modelo.
         */

        model.position.y -= 0.05;

        model.updateMatrixWorld(true);

        modelRoot.add(model);

        const parent =
          canvas.parentElement;

        const currentWidth =
          parent?.clientWidth ??
          window.innerWidth;

        applyResponsiveCamera(
          currentWidth
        );

        setLoadState("ready");
      },

      undefined,

      (error) => {
        console.error(
          "Error loading drumkit:",
          error
        );

        setLoadState("error");
      }
    );

    /*
     * Resize
     */

    const resizeCanvas = () => {
      const parent =
        canvas.parentElement;

      if (!parent) return;

      const width =
        parent.clientWidth;

      const height =
        parent.clientHeight;

      if (
        width <= 0 ||
        height <= 0
      ) {
        return;
      }

      renderer.setSize(
        width,
        height,
        false
      );

      camera.aspect =
        width / height;

      camera.updateProjectionMatrix();

      /*
       * En móvil usa una cámara más alejada.
       * En escritorio recupera la cámara principal.
       */

      applyResponsiveCamera(width);
    };

    const resizeObserver =
      new ResizeObserver(() => {
        resizeCanvas();
      });

    if (canvas.parentElement) {
      resizeObserver.observe(
        canvas.parentElement
      );
    }

    resizeCanvas();

    /*
     * Camera debug
     *
     * Pulsa C para comprobar qué cámara se está usando.
     */

    const handleCameraDebug = (
      event: KeyboardEvent
    ) => {
      if (
        event.key.toLowerCase() !== "c"
      ) {
        return;
      }

      console.log("Camera position:");

      console.log({
        x: Number(
          camera.position.x.toFixed(3)
        ),
        y: Number(
          camera.position.y.toFixed(3)
        ),
        z: Number(
          camera.position.z.toFixed(3)
        ),
      });

      console.log("Camera target:");

      console.log({
        x: Number(
          fixedCameraTarget.x.toFixed(3)
        ),
        y: Number(
          fixedCameraTarget.y.toFixed(3)
        ),
        z: Number(
          fixedCameraTarget.z.toFixed(3)
        ),
      });
    };

    window.addEventListener(
      "keydown",
      handleCameraDebug
    );

    /*
     * Render loop
     */

    let animationFrame = 0;

    const animate = () => {
      animationFrame =
        requestAnimationFrame(
          animate
        );

      const delta = Math.min(
        threeTimer.getDelta(),
        0.05
      );

      camera.position.lerp(cameraTargetPosition, 0.08);
      camera.lookAt(fixedCameraTarget);

      if (model) {
        updateBounces(delta);
      }

      renderer.render(
        scene,
        camera
      );
    };

    animate();

    /*
     * Cleanup
     */

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      resizeObserver.disconnect();

      window.removeEventListener(
        "keydown",
        handleCameraDebug
      );

      canvas.removeEventListener(
        "pointerdown",
        handlePointerDown
      );

      canvas.removeEventListener(
        "touchstart",
        unlockAudioContext
      );

      bounceStates.clear();

      modelRoot.traverse(
        (object) => {
          if (
            object instanceof
            THREE.Mesh
          ) {
            object.geometry?.dispose();

            const materials =
              Array.isArray(
                object.material
              )
                ? object.material
                : [object.material];

            materials.forEach(
              (material) => {
                material.dispose();
              }
            );
          }
        }
      );

      if (
        audioContextRef.current
      ) {
        audioContextRef.current
          .close()
          .catch(() => undefined);

        audioContextRef.current = null;
        audioGainNodeRef.current = null;
      }

      cameraZoomApiRef.current = null;

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      onPointerMove={updateFullscreenCursor}
      onPointerEnter={updateFullscreenCursor}
      onPointerLeave={
        handleFullscreenPointerLeave
      }
      className={`relative h-[60vh] min-h-90 w-full overflow-hidden rounded-2xl border border-background3 bg-background2 transition-all duration-500 ease-out ${
        isFullscreen
          ? "h-screen w-screen rounded-none border-0"
          : ""
      }`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full cursor-pointer touch-manipulation"
      />

      {isFullscreen && (
        <div
          className={`pointer-events-none absolute inset-0 z-40 transition-opacity duration-150 ${
            fullscreenCursor.visible
              ? "opacity-100"
              : "opacity-0"
          }`}
        >
          <div
            className="absolute left-0 top-0"
            style={{
              transform: `translate(${fullscreenCursor.x}px, ${fullscreenCursor.y}px) translate(-50%, -50%)`,
              transition:
                "transform 40ms linear",
            }}
          >
            <div className="relative flex h-4 w-4 items-center justify-center">
              <span className="absolute inset-0 rounded-full border border-text/70 opacity-80" />

              <span className="h-2 w-2 rounded-full bg-text mix-blend-difference" />
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          void handleToggleFullscreen();
        }}
        className="absolute bottom-4 right-4 z-30 inline-flex items-center justify-center rounded-full border border-text/10 bg-background/75 p-3 text-text2 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-background hover:text-text active:scale-95"
        aria-label={
          isFullscreen
            ? "Exit fullscreen"
            : "Open fullscreen"
        }
        title={
          isFullscreen
            ? "Exit fullscreen"
            : "Open fullscreen"
        }
      >
        {isFullscreen ? (
          <RiFullscreenExitLine
            size={20}
            aria-hidden="true"
          />
        ) : (
          <RiFullscreenFill
            size={20}
            aria-hidden="true"
          />
        )}
      </button>

      <div className="absolute right-4 top-4 z-30 overflow-hidden rounded-full border border-text/10 bg-background/75 shadow-lg backdrop-blur-md">
        <button
          type="button"
          onClick={() => {
            cameraZoomApiRef.current?.zoomIn();
          }}
          className="flex h-12 w-12 items-center justify-center border-b border-text/10 text-text2 transition-all duration-300 hover:bg-background hover:text-text active:scale-95"
          aria-label="Zoom in"
          title="Zoom in"
        >
          <RiZoomInLine size={20} aria-hidden="true" />
        </button>

        <button
          type="button"
          onClick={() => {
            cameraZoomApiRef.current?.zoomOut();
          }}
          className="flex h-12 w-12 items-center justify-center text-text2 transition-all duration-300 hover:bg-background hover:text-text active:scale-95"
          aria-label="Zoom out"
          title="Zoom out"
        >
          <RiZoomOutLine size={20} aria-hidden="true" />
        </button>
      </div>

      <div className="absolute bottom-4 left-4 z-20 w-[min(16rem,calc(100%-2rem))] rounded-2xl border border-text/10 bg-background/70 px-4 py-3 shadow-lg backdrop-blur-md">
        <div className="mb-2 flex items-center justify-between gap-3 text-xs uppercase tracking-[0.25em] text-text2">
          <span>Volume</span>
          <span>{volume}%</span>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(event) => {
            const nextVolume =
              Number(
                event.target.value
              );

            setVolume(nextVolume);

            setAudioVolume(
              nextVolume / 100
            );
          }}
          onPointerDown={(event) => {
            event.stopPropagation();
          }}
          onClick={(event) => {
            event.stopPropagation();
          }}
          className="w-full cursor-pointer accent-text"
        />
      </div>

      {loadState !== "ready" && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-text/45">
            {loadState === "loading"
              ? "Loading drumkit preview"
              : "3D preview unavailable"}
          </p>
        </div>
      )}
    </div>
  );
}