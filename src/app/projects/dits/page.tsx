"use client";

import FadeIn from "@/components/fade-in";
import DitsCanvas from "@/components/dits-canvas";
import HomeButton from "@/components/home-button";
import YouTubeVideo from "@/components/youtube-video";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  FiActivity,
  FiClock,
  FiCpu,
  FiHeadphones,
  FiFileText,
  FiMonitor,
  FiMusic,
  FiSettings,
  FiSliders,
  FiTarget,
  FiUploadCloud,
  FiVolume2,
} from "react-icons/fi";

import { LuDrum } from "react-icons/lu";

import { MdOutlineWavingHand } from "react-icons/md";

import { FaUnity } from "react-icons/fa6";
import { SiSharp, SiMidi, SiBlender } from "react-icons/si";
import { PiMouseLeftClickFill } from "react-icons/pi";
import { TbBadge3D } from "react-icons/tb";
import { DiIllustrator } from "react-icons/di";
import { BsHeadsetVr } from "react-icons/bs";
import { TbPlayerPlayFilled } from "react-icons/tb";



const projectTags = [
  "VR Development",
  "Unity",
  "C#",
  "MIDI",
  "Meta Quest 3",
  "UX/UI Design",
  "Audio Systems",
  "3D Modeling",
];

const features = [
  {
    title: "Modular Drum Kit",
    Icon: LuDrum,
    image: "/assets/images/dits/kit.webp",
    text: "Users can spawn, move and configure individual drum pieces to build their own custom kit inside the virtual studio.",
  },
  {
    title: "Performance Mode",
    Icon: FiActivity,
    image: "/assets/images/dits/performanceMode.webp",
    text: "Virtual drumsticks detect impact position, velocity and intensity to generate dynamic sound and visual feedback.",
  },
  {
    title: "MIDI In / Out",
    Icon: SiMidi,
    image: "/assets/images/dits/midiInOut.webp",
    text: "The system can receive input from external MIDI instruments and send the virtual performance to a DAW for recording or production.",
  },
  {
    title: "MIDI Song Player",
    Icon: TbPlayerPlayFilled,
    image: "/assets/images/dits/midiSongPlayer.webp",
    text: "Users can import MIDI songs, control playback speed and follow notes visually in real time for practice.",
  },
  {
    title: "Window Viewer",
    Icon: FiMonitor,
    image: "/assets/images/dits/windowViewer.webp",
    text: "Desktop windows can be projected inside the VR space to view sheet music, control a DAW or play background tracks.",
  },
  {
    title: "Accessible VR Interface",
    Icon: FiSliders,
    image: "/assets/images/dits/vrInterface.webp",
    text: "The application includes height adjustment, drumstick angle calibration, reset view and ambidextrous menu placement.",
  },
];

const technicalBlocks = [
  {
    title: "Hit Detection",
    Icon: FiTarget,
    image: "/assets/images/dits/hitDetection.webp",
    text: "The first collider-based prototype evolved into a linecast system to detect drumstick movement between frames with more precision.",
  },
  {
    title: "Dynamic Audio",
    Icon: FiVolume2,
    image: "/assets/images/dits/dynamicAudio.webp",
    text: "Each instrument uses multiple samples, velocity-based volume, pitch variation and normalized audio clips for a more natural response.",
  },
  {
    title: "MIDI Synchronization",
    Icon: FiClock,
    image: "/assets/images/dits/MIDISyncronization.webp",
    text: "MIDI playback and visual note movement are synchronized using Unity DSP time to reduce timing errors and keep audio aligned.",
  },
  {
    title: "VR Optimization",
    Icon: FiSettings,
    image: "/assets/images/dits/vrOptimization.webp",
    text: "Low-poly modeling, baked lighting, light probes, reflection probes and object pooling help keep the experience stable and responsive.",
  },
];

const tools = [
  { text: "Unity", Icon: FaUnity },
  { text: "C#", Icon: SiSharp },
  { text: "XR Interaction Toolkit", Icon: FiCpu },
  { text: "DryWetMidi", Icon: SiMidi },
  { text: "uWindowCapture", Icon: FiMonitor },
  { text: "Audacity", Icon: FiHeadphones },
  { text: "Blender", Icon: SiBlender },
  { text: "3DS Max", Icon: TbBadge3D },
  { text: "Adobe Illustrator", Icon: DiIllustrator },
  { text: "Meta Quest 3", Icon: BsHeadsetVr },
];

const futureWork = [
  { text: "Hand tracking support", Icon: MdOutlineWavingHand },
  { text: "More instruments and percussion elements", Icon: FiMusic },
  { text: "Expanded MIDI song catalogue", Icon: FiFileText },
  { text: "Improved sound libraries", Icon: FiHeadphones },
  { text: "Application publishing preparation", Icon: FiUploadCloud },
  { text: "Future interactive web preview", Icon: FiMonitor },
];

export default function DrumminInTheStudioPage() {
  const [hoveredFeatureIndex, setHoveredFeatureIndex] = useState<number | null>(null);
  const [isPreviewImageVisible, setIsPreviewImageVisible] = useState(false);
  const [hoveredTechIndex, setHoveredTechIndex] = useState<number | null>(null);
  const [isTechPreviewVisible, setIsTechPreviewVisible] = useState(false);
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const springConfig = { damping: 25, stiffness: 220, mass: 0.5 };
  const smoothMouse = {
    x: useSpring(mouse.x, springConfig),
    y: useSpring(mouse.y, springConfig),
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x.set(e.clientX);
      mouse.y.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouse.x, mouse.y]);

  const demoThumbnail = "https://img.youtube.com/vi/Vp44KLID_AE/maxresdefault.jpg";

  const handleFeatureLeave = () => {
    setHoveredFeatureIndex(null);
  };

  const handleFeatureClick = (index: number) => {
    setHoveredFeatureIndex(index);
    setIsPreviewImageVisible((current) => !current);
  };

  const handleTechLeave = () => {
    setHoveredTechIndex(null);
  };

  const handleTechClick = (index: number) => {
    setHoveredTechIndex(index);
    setIsTechPreviewVisible((current) => !current);
  };

  const visibleFeatureIndex = hoveredFeatureIndex;
  const hoveredFeature =
    visibleFeatureIndex !== null ? features[visibleFeatureIndex] : null;
  const showFeatureImage = hoveredFeatureIndex !== null && isPreviewImageVisible;
  const visibleTechIndex = hoveredTechIndex;
  const hoveredTech = visibleTechIndex !== null ? technicalBlocks[visibleTechIndex] : null;
  const showTechImage = hoveredTechIndex !== null && isTechPreviewVisible;

  return (
    <div className="min-h-screen max-w-5xl mx-auto pt-35 pb-20">
      <section className="pb-16">
        <FadeIn delay={0.1} duration={0.6} distance={30}>
          <span className="text-sm uppercase tracking-[0.25em] gradient-text">
            VR Music Application
          </span>

          <h1 className="max-w-4xl font-bold leading-tight text-text text-5xl md:text-6xl">
            Drummin In The Studio
          </h1>
          <div className="mt-4 flex flex-wrap gap-2">
            {projectTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-background3 bg-background2 px-4 py-2 text-sm text-text2"
              >
                {tag}
              </span>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.2} duration={0.6}>
          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-text2">
            A virtual reality drum studio designed to practice, customize and
            create music through modular instruments, MIDI integration and
            immersive interaction.
          </p>
        </FadeIn>
      </section>

      {hoveredTech !== null && (
        <>
          {showTechImage && (
            <motion.div
              className="pointer-events-none fixed left-0 top-0 hidden md:block"
              style={{
                zIndex: 700,
                x: smoothMouse.x,
                y: smoothMouse.y,
                translateX: "-50%",
                translateY: "-50%",
              }}
            >
              <div className="relative h-62.5 w-100 overflow-hidden rounded-xl">
                <img
                  src={hoveredTech.image}
                  alt={hoveredTech.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />

                <div className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full bg-background3/80 px-3 py-2 text-xs tracking-widest text-text2">
                  <span className="whitespace-nowrap">Close</span>
                  <PiMouseLeftClickFill size={14} aria-hidden="true" />
                </div>
              </div>
            </motion.div>
          )}

          <motion.div
            className="pointer-events-none fixed left-0 top-0 hidden md:block"
            style={{
              zIndex: 600,
              x: smoothMouse.x,
              y: smoothMouse.y,
              translateX: "18px",
              translateY: "-50%",
            }}
          >
            <div className="inline-flex px-4 py-2 gap-2 text-sm tracking-widest text-text2 justify-center items-center">
              <PiMouseLeftClickFill size={18} aria-hidden="true" />
              <span className="whitespace-nowrap">See details</span>
            </div>
          </motion.div>
        </>
      )}

      <section id="demo" className="pb-24">
        <FadeIn delay={0.1} duration={0.6}>
          <div className="mb-6">
            <span className="mb-2 text-sm uppercase tracking-[0.25em] gradient-text">
              Video
            </span>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} duration={0.6}>
          <div className="mx-auto max-w-4xl">
            <YouTubeVideo
              videoId="Vp44KLID_AE"
              thumbnailSrc={demoThumbnail}
            />
          </div>
        </FadeIn>
  
      </section>

      <section className="pb-24">
        
        <FadeIn delay={0.1} duration={0.6}>
            <span className="mb-2 text-sm uppercase tracking-[0.25em] gradient-text">
              Overview
            </span>
        </FadeIn>

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <FadeIn delay={0.1} duration={0.6}>
            <div>
              <h1 className="text-3xl font-semibold leading-tight text-text md:text-4xl">
                A complete VR space for practicing and creating music.
              </h1>
            </div>
          </FadeIn>

          <div className="space-y-6">
            <FadeIn delay={0.2} duration={0.6}>
              <p className="leading-relaxed text-text2">
                Drummin In The Studio is a virtual reality application developed
                in Unity for Meta Quest 3. The project explores how VR can reduce
                the physical, acoustic and economic limitations of practicing
                drums, while adding tools for customization, learning and music
                production.
              </p>
            </FadeIn>

            <FadeIn delay={0.3} duration={0.6}>
              <p className="leading-relaxed text-text2">
                The result is not only a drum simulator, but a modular practice
                environment where users can build their own drum kit, play with
                virtual drumsticks, import MIDI songs, connect external MIDI
                instruments and send their performance to a DAW.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <FadeIn delay={0.1} duration={0.6}>
          <div className="mb-10">
            <span className="mb-2 text-sm uppercase tracking-[0.25em] gradient-text">
              Main Features
            </span>

            <h1 className="text-3xl font-semibold text-text md:text-4xl">
              What the application includes.
            </h1>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <FadeIn
              key={feature.title}
              delay={0.15 + index * 0.05}
              duration={0.6}
              distance={20}
            >
              <article
                className="h-full cursor-pointer rounded-2xl border border-background3 bg-background2 p-6 transition-transform duration-300 hover:scale-102"
                onMouseEnter={() => setHoveredFeatureIndex(index)}
                onMouseLeave={handleFeatureLeave}
                onClick={() => handleFeatureClick(index)}
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center text-text">
                    <feature.Icon size={22} aria-hidden="true" />
                  </span>

                  <h3 className="text-xl font-semibold text-text">{feature.title}</h3>
                </div>

                <p className="text-sm leading-relaxed text-text3">
                  {feature.text}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      {hoveredFeature !== null && (
        <>
          {/* Centered image overlay (appears when preview toggled) */}
          {showFeatureImage && (
            <motion.div
              className="pointer-events-none fixed left-0 top-0 hidden md:block"
              style={{
                zIndex: 700,
                x: smoothMouse.x,
                y: smoothMouse.y,
                translateX: "-50%",
                translateY: "-50%",
              }}
            >
              <div className="relative h-62.5 w-100 overflow-hidden rounded-xl">
                <img
                  src={hoveredFeature.image}
                  alt={hoveredFeature.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />

                <div className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full bg-background3/80 px-3 py-2 text-xs tracking-widest text-text2">
                  <span className="whitespace-nowrap">Close</span>
                  <PiMouseLeftClickFill size={14} aria-hidden="true" />
                </div>
              </div>
            </motion.div>
          )}

          {/* Offset callout that remains to the right of the cursor */}
          <motion.div
            className="pointer-events-none fixed left-0 top-0 hidden md:block"
            style={{
              zIndex: 600,
              x: smoothMouse.x,
              y: smoothMouse.y,
              translateX: "18px",
              translateY: "-50%",
            }}
          >
            <div className="inline-flex px-4 py-2 gap-2 text-sm tracking-widest text-text2 justify-center items-center">
              <PiMouseLeftClickFill size={20} aria-hidden="true" />
              <span className="whitespace-nowrap">See details</span>
            </div>
          </motion.div>
        </>
      )}

      <section className="pb-24">
        <FadeIn delay={0.1} duration={0.6}>
          <div className="mb-10">
            <span className="mb-2 text-sm uppercase tracking-[0.25em] gradient-text">
              Technical Breakdown
            </span>

            <h1 className="text-3xl font-semibold text-text md:text-4xl">
              Engineering behind the experience.
            </h1>

            <p className="mt-4 max-w-3xl leading-relaxed text-text2">
              The project combines VR interaction, real-time audio, MIDI
              communication, UI design, 3D modeling and performance optimization
              into a single interactive system.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {technicalBlocks.map((block, index) => (
            <FadeIn
              key={block.title}
              delay={0.2 + index * 0.08}
              duration={0.6}
              distance={20}
            >
              <article className="h-full rounded-2xl border border-background3 bg-background2 p-6 transition-transform duration-300 hover:scale-102"
                onMouseEnter={() => setHoveredTechIndex(index)}
                onMouseLeave={handleTechLeave}
                onClick={() => handleTechClick(index)}
              >
                {/* static image removed from card (preview shown on hover/click) */}

                <div className="mb-3 flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center text-text">
                    <block.Icon size={22} aria-hidden="true" />
                  </span>

                  <h3 className="text-xl font-semibold text-text">{block.title}</h3>
                </div>

                <p className="text-sm leading-relaxed text-text3">
                  {block.text}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="pb-24">
        <FadeIn delay={0.1} duration={0.6}>
          <div className="mb-8">
            <span className="mb-2 text-sm uppercase tracking-[0.25em] gradient-text">
              Interactive Preview
            </span>

            <h1 className="text-3xl font-semibold text-text md:text-4xl">
              Virtual studio preview.
            </h1>

            <p className="mt-4 max-w-3xl leading-relaxed text-text2">
              This space is reserved for a future interactive 3D preview of the
              virtual drum room, allowing visitors to explore a simplified
              version of the VR environment directly from the browser.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} duration={0.6}>
          <DitsCanvas />
        </FadeIn>
      </section>

      <section className="pb-24">
        <div className="grid gap-10 lg:grid-cols-2">
          <FadeIn delay={0.1} duration={0.6}>
            <div>
              <span className="mb-3 inline-block text-sm uppercase tracking-[0.25em] gradient-text">
                Tools
              </span>

              <div className="rounded-2xl border border-background3 bg-background2 p-6">
                <h2 className="mb-5 text-3xl font-semibold text-text">
                  Built with.
                </h2>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {tools.map((tool) => (
                    <div
                      key={tool.text}
                      className="flex items-center gap-3 rounded-xl border border-background3 bg-background px-4 py-3 text-sm text-text2 transition-transform duration-300 hover:scale-102"
                    >
                      <span className="inline-flex h-9 w-9 items-center justify-center text-text">
                        <tool.Icon size={22} aria-hidden="true" />
                      </span>

                      <span className="leading-relaxed">{tool.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} duration={0.6}>
            <div>
              <span className="mb-3 inline-block text-sm uppercase tracking-[0.25em] gradient-text">
                Future Work
              </span>

              <div className="rounded-2xl border border-background3 bg-background2 p-6">
                <h2 className="mb-5 text-3xl font-semibold text-text">
                  Next steps.
                </h2>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {futureWork.map((item) => (
                    <div
                      key={item.text}
                      className="flex items-center gap-3 rounded-xl border border-background3 bg-background px-4 py-3 text-sm text-text2 transition-transform duration-300 hover:scale-102"
                    >
                      <span className="inline-flex h-9 w-9 items-center justify-center text-text">
                        <item.Icon size={22} aria-hidden="true" />
                      </span>

                      <span className="leading-relaxed">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="pb-28">
        <FadeIn delay={0.1} duration={0.6}>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
            <button
              type="button"
              disabled
              className="inline-flex items-center justify-center px-8 py-3 rounded-full border border-text3 text-text3 gap-3 opacity-70 cursor-not-allowed transition-all duration-300"
            >
              <span className="whitespace-nowrap">View publication</span>
            </button>

            <HomeButton href="/contact">Contact</HomeButton>

            <HomeButton href="/projects">See other projects</HomeButton>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}