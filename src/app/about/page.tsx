'use client';

import FadeIn from "@/components/fade-in";
import { useState, useEffect, useRef, type ComponentType } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

import {
  SiCplusplus,
  SiUnity,
  SiSharp,
  SiJavascript,
  SiPostgresql,
  SiMongodb,
  SiReact,
  SiNextdotjs,
  SiBlender,
  SiFigma,
  SiArduino,
} from "react-icons/si";

import { FaJava } from "react-icons/fa";

import { BiLogoAdobe } from "react-icons/bi";
import { 
  HiOutlineUserGroup, 
  HiOutlineChatBubbleLeftRight, 
  HiOutlineLightBulb, 
  HiOutlineSparkles, 
  HiOutlineArrowsRightLeft,
  HiOutlineHeart,
  HiOutlineCursorArrowRays,
  HiOutlineViewfinderCircle,
  HiOutlineCodeBracketSquare,
  HiOutlineGlobeAlt,
  HiOutlineCpuChip,
  HiOutlineSwatch,
  HiOutlineMusicalNote,
  HiOutlineVideoCamera,
  HiOutlineTv,
  HiOutlineSpeakerWave,
} from "react-icons/hi2";

type ToolIcon = ComponentType<{ className?: string }>;

const identityBlocks = [
  {
    title: "Interactive Systems",
    icon: HiOutlineCursorArrowRays,
    text: "I design and develop digital systems where users can interact with visuals, sound and real-time feedback.",
  },
  {
    title: "Immersive Experiences",
    icon: HiOutlineViewfinderCircle,
    text: "I explore VR, physical computing and audiovisual environments to create experiences that feel present and alive.",
  },
  {
    title: "Creative Technology",
    icon: HiOutlineCodeBracketSquare,
    text: "I use code, design and emerging tools as a medium for experimentation, expression and storytelling.",
  },
];

const softSkills = [
  { name: "Communication", icon: HiOutlineChatBubbleLeftRight },
  { name: "Teamwork", icon: HiOutlineUserGroup },
  { name: "Problem Solving", icon: HiOutlineLightBulb },
  { name: "Creative Thinking", icon: HiOutlineSparkles },
  { name: "Adaptability", icon: HiOutlineArrowsRightLeft },
  { name: "Empathy", icon: HiOutlineHeart },
];

const languages = [
  { name: "Spanish", level: "Native", code: "ESP" },
  { name: "Catalan", level: "Native", code: "CAT" },
  { name: "English", level: "B2", code: "ENG" },
];

const toolSections = [
  {
    title: "Development tools",
    icon: HiOutlineCodeBracketSquare,
    items: [
      "Unity",
      "C++",
      "C#",
      "Java",
      "JavaScript",
      "Next.js",
      "SQL",
      "noSQL",
    ],
  },
  {
    title: "Creative & Interactive",
    icon: HiOutlineCursorArrowRays,
    items: [
      "VR Development",
      "Processing",
      "Arduino",
      "ESP32",
    ],
  },
  {
    title: "Design & Audiovisual",
    icon: HiOutlineSparkles,
    description:
      "Designing interfaces, visuals, 3D assets and audiovisual content.",
    items: [
      "Figma",
      "3D Modeling",
      "Adobe Suite",
      "Affinity",
      "FL Studio",
      "UX/UI Design",
    ],
  },
  {
    title: "Exploration Areas",
    icon: HiOutlineViewfinderCircle,
    items: [
      "Virtual Reality",
      "Immersive Experiences",
      "Real-time Visuals",
      "Audiovisual Systems",
      "Sound Design",
    ],
  },
];

const toolsCarousel = [
  { name: "Unity", icon: SiUnity },
  { name: "C, C#, C++", icon: SiSharp },
  { name: "JavaScript", icon: SiJavascript },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Blender", icon: SiBlender },
  { name: "Figma", icon: SiFigma },
  { name: "Adobe Suite", icon: BiLogoAdobe },
  { name: "Arduino", icon: SiArduino },
];

const toolItemIcons: Record<string, ToolIcon> = {
  Unity: SiUnity,
  "C++": SiCplusplus,
  "C#": SiSharp,
  Java: FaJava,
  JavaScript: SiJavascript,
  "Next.js": SiNextdotjs,
  SQL: SiPostgresql,
  noSQL: SiMongodb,
  "VR Development": HiOutlineViewfinderCircle,
  Processing: HiOutlineCodeBracketSquare,
  Arduino: SiArduino,
  ESP32: HiOutlineCpuChip,
  Figma: SiFigma,
  "3D Modeling": SiBlender,
  "Adobe Suite": BiLogoAdobe,
  Affinity: HiOutlineSwatch,
  "FL Studio": HiOutlineMusicalNote,
  "UX/UI Design": HiOutlineCursorArrowRays,
  "Virtual Reality": HiOutlineViewfinderCircle,
  "Immersive Experiences": HiOutlineSparkles,
  "Real-time Visuals": HiOutlineVideoCamera,
  "Audiovisual Systems": HiOutlineTv,
  "Sound Design": HiOutlineSpeakerWave,
};

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
    <div className="min-h-screen max-w-5xl mx-auto pt-35 md:pt-30 pb-20 px-6 relative">
      {/* About Me Section */}
      <FadeIn delay={0.1} duration={0.6} distance={30}>
          <h2 className="mb-2">
            <span className="text-sm uppercase tracking-[0.25em] gradient-text mb-4">
              Who I am
            </span>
          </h2>
      </FadeIn>
      <section className="ml-4">
        <FadeIn delay={0.1} duration={0.6}>
          <img 
            src="/assets/images/tarekDiaz.webp" 
            alt="Tárek Díaz Carissimi" 
            className="w-40 h-40 rounded-full justify-self-center block md:hidden m-8" 
          />
        </FadeIn>

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
            , a Multimedia Engineering graduate driven by curiosity, creativity and the desire to build
            experiences that feel meaningful, immersive and human. 
          </p>
          <p className="text-text text-xl mb-6 leading-relaxed">
            My work moves between development,
            audiovisual design and interactive technologies, combining artistic sensitivity with logical
            thinking through visuals, sound and interaction.
          </p>

        </FadeIn>
        
      </section>

      
      {/* Soft Skills & Languages Section */}
      <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] md:gap-20 mt-20">
        {/* Soft Skills */}
        <section className="md:pr-4">
          <FadeIn delay={0.1} duration={0.6}>
            <h2 className="mb-6">
              <span className="text-sm uppercase tracking-[0.25em] gradient-text">
                Soft Skills
              </span>
            </h2>
            <div className="grid grid-cols-2 gap-4 ml-4">
              {softSkills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <FadeIn key={skill.name} delay={0.2 + index * 0.05} duration={0.5} distance={10}>
                    <div className="flex min-w-0 items-center gap-3 overflow-hidden rounded-xl border border-text/10 bg-text/[0.02] p-4 transition-all duration-200 hover:scale-105 hover:bg-text/[0.05]">
                      <div className="flex h-8 w-8 aspect-square shrink-0 items-center justify-center rounded-lg bg-text/[0.05] text-text/70">
                        <Icon className="text-lg" />
                      </div>
                      <span className="min-w-0 overflow-hidden text-ellipsis text-sm font-medium text-text/80">
                        {skill.name}
                      </span>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </FadeIn>
        </section>

        {/* Languages */}
        <section className="md:pl-8 lg:pl-12">
          <FadeIn delay={0.3} duration={0.6}>
            <h2 className="mb-6">
              <span className="text-sm uppercase tracking-[0.25em] gradient-text">
                Languages
              </span>
            </h2>
            <div className="flex flex-col gap-4 ml-4">
              {languages.map((lang, index) => (
                <FadeIn key={lang.name} delay={0.4 + index * 0.1} duration={0.5} distance={15}>
                  <div className="group flex min-w-0 items-center justify-between overflow-hidden rounded-2xl border border-text/10 bg-text/[0.03] p-3 transition-all duration-200 hover:scale-105 hover:border-text/20 hover:bg-text/[0.06]">
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="flex h-10 w-10 aspect-square shrink-0 items-center justify-center rounded-xl bg-text/[0.05] text-text/40">
                        <HiOutlineGlobeAlt className="text-xl group-hover:text-text/70 transition-colors" />
                      </div>
                      <div className="min-w-0 overflow-hidden">
                        <h3 className="overflow-hidden text-ellipsis whitespace-nowrap font-semibold text-text">
                          {lang.name}
                        </h3>
                        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-xs uppercase tracking-wider text-text/40">
                          {lang.code}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 rounded-full bg-text/[0.05] px-4 py-1.5 text-sm font-medium text-text/70">
                      {lang.level}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </FadeIn>
        </section>
      </div>

      {/* Tools & Technologies Section */}
      <FadeIn delay={0.2} duration={0.6}>
        <h2 className="text-text/50 tracking-[0.25em] uppercase text-sm mt-16 mb-8">        
          <span className="text-sm uppercase tracking-[0.25em] gradient-text">
            Tools & Technologies
          </span>
        </h2>
      </FadeIn>
      <section >
        <FadeIn delay={0.4} duration={0.6}>
          <div className="relative overflow-hidden border-y border-text/10 py-6">
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent" />
            <div className="scroll-marquee flex w-max gap-4">
              {duplicatedTools.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <div key={`${tool.name}-${index}`} className="flex min-w-fit items-center gap-3 rounded-full border border-text/10 bg-text/[0.03] px-5 py-3 text-text/75 transition-transform duration-200 hover:scale-105">
                    <Icon className="text-xl text-text" />
                    <span className="text-sm whitespace-nowrap">{tool.name}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8 px-4">
          {toolSections.map((section, index) => (
            <FadeIn key={section.title} delay={0.4 + index * 0.1} duration={0.6} distance={20}>
              <div className="h-full rounded-2xl border border-text/10 bg-text/[0.03] p-6 transition-transform duration-200 hover:scale-105">
                <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-text">
                  <section.icon className="text-2xl text-text/70" />
                  <span>{section.title}</span>
                </h3>
                  <div className="flex flex-wrap gap-2">
                  {section.items.map((item) => {
                    const TagIcon = toolItemIcons[item];

                    return (
                      <span
                        key={item}
                        className="flex items-center gap-2 rounded-full border border-text/10 px-3 py-1 text-sm text-text/65 transition-transform duration-200 hover:scale-105"
                      >
                        {TagIcon ? <TagIcon className="shrink-0 text-sm text-text/50" /> : null}
                        <span className="whitespace-nowrap">{item}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>


      <FadeIn delay={0.1} duration={0.6} distance={30}>
       <h2 className="mt-16 mb-4">
          <span className="text-sm uppercase tracking-[0.25em] gradient-text">
            Work Identity
          </span>
        </h2>
      </FadeIn>  
      <section className="ml-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {identityBlocks.map((block, index) => {
            const Icon = block.icon;
            return (
              <FadeIn key={block.title} delay={0.45 + index * 0.1} duration={0.6} distance={20}>
                <div className="h-full rounded-2xl border border-text/10 bg-text/[0.03] p-5 transition-transform duration-200 hover:scale-105 group">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-text/[0.05] text-text transition-colors group-hover:bg-text2 group-hover:text-background">
                      <Icon className="text-xl" />
                    </div>
                    <h2 className="text-lg font-semibold text-text mb-0">{block.title}</h2>
                  </div>
                  <p className="text-sm leading-relaxed text-text/60 mt-2">{block.text}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
        <FadeIn delay={0.3} duration={0.6}>
          <p className="text-text/75 mb-6 leading-relaxed text-xl">
            My work moves between development, audiovisual design and interactive technologies, 
            combining <strong>technical thinking</strong> with <strong>artistic sensitivity</strong>.
             I enjoy creating projects where visuals, sound and interaction come together naturally.
          </p>
        </FadeIn>

        <FadeIn delay={0.4} duration={0.6}>
          <p className="text-text/75 leading-relaxed mt-6 text-xl">
            Over last times, I have explored web development, UX/UI design, videogames, virtual reality 
            and physical computing. What interests me most is connecting different mediums to shape how 
            people experience digital spaces.
          </p>
        </FadeIn>
      </section>

      {/* Syntesys Section */}
      <FadeIn delay={0.1} duration={0.6} distance={30}>
       <h2 className="mt-16 mb-4">
          <span className="text-sm uppercase tracking-[0.25em] gradient-text">
            Where I stand
          </span>
        </h2>
      </FadeIn>  
      <section className="ml-4">
        <FadeIn delay={0.2} duration={0.6} distance={30}>

          <h1 className="text-2xl md:text-2xl font-bold mb-8 text-text italic justify-center flex">
            "Caught within the logic of art"
          </h1>
          <p className="text-text/75 text-xl leading-relaxed">
            This phrase reflects the space I often find myself in: between emotional and artistic expression, 
            and the logical, structured thinking of engineering. It is a balance that has shaped my studies, 
            my work and the way I understand myself: as someone who moves naturally between the creative and the technical.
          </p>
        </FadeIn>
        <FadeIn delay={0.4} duration={0.8} direction="none">
          <div className="border-l border-text/20 pl-6 mt-8">
            <p className="text-text/70 italic leading-relaxed">
              I see technology not only as a tool or a functional system, but as a natural
              extension of human expression. What we often call artificial is usually placed
              in opposition to nature, yet I believe it can also be understood as another
              form of nature, one shaped by our need to create, connect and give meaning to
              the world around us.
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
              translateX: '10px',
              translateY: '10px',
              pointerEvents: 'none',
              zIndex: 600,
            }}
          >
                <div
                  style={{ width: 150, height: 150 }}
                  className="overflow-hidden rounded-full border-2 border-text/20 shadow-lg"
                >
                  <img
                    src="/assets/images/tarekDiaz.webp"
                    alt="Tárek Díaz Carissimi"
                    className="h-full w-full object-cover"
                  />
                </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}