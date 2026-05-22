'use client';

import FadeIn from "@/components/fade-in";
import "../carousel.css";
import { useState, useEffect, useRef } from "react";
import AboutPlaceholderImage from "@/components/about-placeholder-image";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

import {
  SiUnity,
  SiSharp,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiFigma,
  SiArduino,
} from "react-icons/si";

import { BiLogoAdobe } from "react-icons/bi";

const identityBlocks = [
  {
    title: "Interactive Systems",
    text: "I design and develop digital systems where users can interact with visuals, sound and real-time feedback.",
  },
  {
    title: "Immersive Experiences",
    text: "I explore VR, physical computing and audiovisual environments to create experiences that feel present and alive.",
  },
  {
    title: "Creative Technology",
    text: "I use code, design and emerging tools as a medium for experimentation, expression and storytelling.",
  },
];

const toolSections = [
  {
    title: "Development",
    description:
      "Building interactive systems, web experiences and real-time applications.",
    items: [
      "Unity",
      "C#",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
    ],
  },
  {
    title: "Creative & Interactive",
    description:
      "Exploring immersive, audiovisual and physical interaction.",
    items: [
      "VR Development",
      "Processing",
      "Arduino",
      "ESP32",
    ],
  },
  {
    title: "Design & Audiovisual",
    description:
      "Designing interfaces, visuals, 3D assets and audiovisual content.",
    items: [
      "Figma",
      "3D Modeling",
      "Adobe Creative Suite",
      "UX/UI Design",
    ],
  },
  {
    title: "Exploration Areas",
    description:
      "Fields where technology becomes a creative medium.",
    items: [
      "Immersive Experiences",
      "Real-time Visuals",
      "Physical Computing",
      "Audiovisual Systems",
      "Sound Design",
    ],
  },
];

const toolsCarousel = [
  { name: "Unity", icon: SiUnity },
  { name: "C#", icon: SiSharp },
  { name: "JavaScript", icon: SiJavascript },
  { name: "TypeScript", icon: SiTypescript },
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "Figma", icon: SiFigma },
  { name: "Adobe Suite", icon: BiLogoAdobe },
  { name: "Arduino", icon: SiArduino },
];

export default function About() {
  const duplicatedTools = [...toolsCarousel, ...toolsCarousel];

  const [showPhoto, setShowPhoto] = useState(false);

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0)
  };

  // Smooth, organic spring physics for mouse following (same as in Projects page)
  const springConfig = { damping: 25, stiffness: 220, mass: 0.5 };
  const smoothMouse = {
    x: useSpring(mouse.x, springConfig),
    y: useSpring(mouse.y, springConfig)
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x.set(e.clientX);
      mouse.y.set(e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        mouse.x.set(e.touches[0].clientX);
        mouse.y.set(e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="min-h-screen max-w-4xl mx-auto pt-35 md:pt-30 pb-20 px-6 relative">
      {/* About Me Section */}
      <FadeIn delay={0.1} duration={0.6} distance={30}>
          <h1 className="text-text/50 mb-2 tracking-[0.25em] uppercase text-sm">About Me</h1>
      </FadeIn>
      <section className="ml-4">
        <FadeIn delay={0.2} duration={0.6}>
          <p className="text-text text-xl mb-6 leading-relaxed" style={{ position: 'relative' }}>
            I am{' '}
            <span
              onMouseEnter={(e) => {
                setShowPhoto(true);
                mouse.x.set(e.clientX);
                mouse.y.set(e.clientY);
              }}
              onMouseLeave={() => setShowPhoto(false)}
              onTouchStart={(e) => {
                setShowPhoto(true);
                if (e.touches && e.touches[0]) {
                  mouse.x.set(e.touches[0].clientX);
                  mouse.y.set(e.touches[0].clientY);
                }
              }}
              onTouchEnd={() => setShowPhoto(false)}
              onTouchCancel={() => setShowPhoto(false)}
              className="font-bold select-none cursor-default relative"
              style={{ transition: 'color 0.2s' }}
            >
              Tárek Díaz Carissimi
            </span>
            , a Multimedia Engineer driven by curiosity, creativity and the desire to build experiences 
            that feel meaningful, immersive and human.
          </p>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {identityBlocks.map((block, index) => (
            <FadeIn key={block.title} delay={0.45 + index * 0.1} duration={0.6} distance={20}>
              <div className="h-full rounded-2xl border border-text/10 bg-text/[0.03] p-5">
                <h2 className="text-lg font-semibold text-text mb-2">{block.title}</h2>
                <p className="text-sm leading-relaxed text-text/60">{block.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.3} duration={0.6}>
          <p className="text-text/75 mb-6 leading-relaxed">
            My work moves between development, audiovisual design and interactive technologies, 
            combining <strong>technical thinking</strong> with <strong>artistic sensitivity</strong>.
             I enjoy creating projects where visuals, sound and interaction come together naturally.
          </p>
        </FadeIn>

        <FadeIn delay={0.4} duration={0.6}>
          <p className="text-text/75 leading-relaxed mt-6">
            Over last times, I have explored web development, UX/UI design, videogames, virtual reality 
            and physical computing. What interests me most is connecting different mediums to shape how 
            people experience digital spaces.
          </p>
        </FadeIn>
      </section>

      {/* Tools & Technologies Section */}
      <h1 className="text-text/50 mb-2 tracking-[0.25em] uppercase text-sm mt-16">
        Tools & Technologies
      </h1>
      <section className="ml-4">
        <FadeIn delay={0.7} duration={0.6}>
          <div className="mb-8">
            <p className="text-text/70 leading-relaxed text-xl">
                A selection of technologies I've worked with across development, design, audiovisual
                creation and interactive experiences.
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={0.8} duration={0.6}>
          <div className="relative overflow-hidden border-y border-text/10 py-6">
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent" />
            <div className="flex w-max animate-[scroll_28s_linear_infinite] gap-4" style={{ animationName: 'scroll', animationDuration: '28s', animationTimingFunction: 'linear', animationIterationCount: 'infinite' }}>
              {duplicatedTools.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <div key={`${tool.name}-${index}`} className="flex min-w-fit items-center gap-3 rounded-full border border-text/10 bg-text/[0.03] px-5 py-3 text-text/75">
                    <Icon className="text-xl text-text" />
                    <span className="text-sm whitespace-nowrap">{tool.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
          {toolSections.map((section, index) => (
            <FadeIn key={section.title} delay={0.9 + index * 0.1} duration={0.6} distance={20}>
              <div className="h-full rounded-2xl border border-text/10 bg-text/[0.03] p-6">
                <h3 className="text-xl font-semibold text-text mb-2">{section.title}</h3>
                <p className="text-sm text-text/55 leading-relaxed mb-5">{section.description}</p>
                <div className="flex flex-wrap gap-2">
                  {section.items.map((item) => (
                    <span key={item} className="rounded-full border border-text/10 px-3 py-1 text-sm text-text/65">{item}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Syntesys Section */}
       <h1 className="text-text/50 tracking-[0.25em] uppercase text-sm mt-16 mb-2">
        Where I stand
      </h1>
      <section className="ml-4">
        <FadeIn delay={0.1} duration={0.6} distance={30}>

          <h1 className="text-2xl md:text-2xl font-bold mb-8 text-text italic justify-center flex">
            "Caught within the logic of art"
          </h1>
          <p className="text-text/75 leading-relaxed">
            This phrase reflects the space I often find myself in: between emotional and artistic expression, 
            and the logical, structured thinking of engineering. It is a balance that has shaped my studies, 
            my work and the way I understand myself: as someone who moves naturally between the creative and the technical.
          </p>
        </FadeIn>
        <FadeIn delay={1.2} duration={0.8} direction="none">
          <div className="border-l border-text/20 pl-6 mt-8">
            <p className="text-text/70 italic leading-relaxed">
              "I see technology not only as a tool or a functional system, but as a natural
              extension of human expression. What we often call artificial is usually placed
              in opposition to nature, yet I believe it can also be understood as another
              form of nature, one shaped by our need to create, connect and give meaning to
              the world around us."
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Easter Egg floating placeholder image on hold */}
      <AnimatePresence>
        {showPhoto && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            style={{
              position: 'fixed',
              left: 0,
              top: 0,
              x: smoothMouse.x,
              y: smoothMouse.y,
              translateX: '20px',
              translateY: '20px',
              pointerEvents: 'none',
              zIndex: 600,
            }}
          >
            <AboutPlaceholderImage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}