
'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import FadeIn from '@/components/fade-in';
import { Arrow } from '@/components/icons/Arrow';
import { ChopperIcon } from '@/components/icons/ChopperIcon';
import { MoleIcon } from '@/components/icons/MoleIcon';
import { DitsIcon } from '@/components/icons/DitsIcon';
import { Icon } from '@/components/icons/Icon';

type ProjectIcon = "dits" | "mole" | "chopper" | "website";

type ProjectItem = {
  title: string;
  description: string;
  tags: string[];
  image: string;
  href: string;
  icon: ProjectIcon;
};

const projects: ProjectItem[] = [
  {
    title: "D.I.T.S (Drumming In The Studio)",
    description: "Design and development of a musical application in virtual reality and MIDI integration. Final project honored.",
    tags: ["Unity", "VR", "Music", "Drums", "MIDI","University honors", "Game Development", "C#", "Game Design", "UI Design"],
    image: "/assets/images/imageDits.webp",
    href: "/projects/dits",
    icon: "dits",
  },
  {
    title: "Def a Mole",
    description: "3D Tower defense videogame developed in Unity. Be part of the insects and defend your garden from invading moles.",
    tags: ["Unity", "3D", "Tower Defense", "Game Development", "C#", "Game Design", "UI Design"],
    image: "/assets/images/defAMole.webp",
    href: "/projects/defamole",
    icon: "mole",
  },
  {
    title: "3D Animation",
    description: "3D animation of the character chopper from the anime One Piece. Modeling, texturing and animation done in 3ds Max.",
    tags: [ "Modeling", "Texturing", "Animation", "3ds Max"],
    image: "/assets/images/chopperLab.webp",
    href: "/projects/3danimations",
    icon: "chopper",
  },
  {
    title: "This website!",
    description: "Personal website developed with Next.js and Tailwind CSS. Showcases my portfolio and experience in software development.",
    tags: ["Web Development", "Next.js", "Tailwind CSS", "React", "Framer Motion", "3D", "Three.js", "Responsive Design", "Optimization", "Accessibility"],
    image: "/assets/images/porfolio.webp",
    href: "/projects/thiswebsite",
    icon: "website",
  }
];

function ProjectCardIcon({
  icon,
  width = 90,
  height = 90,
  className = "text-text2",
  gradient = false,
}: {
  icon: ProjectIcon;
  width?: number;
  height?: number;
  className?: string;
  gradient?: boolean;
}) {
  switch (icon) {
    case "dits":
      return <DitsIcon width={width} height={height} className={className} gradient={gradient} />;
    case "mole":
      return <MoleIcon width={width} height={height} className={className} gradient={gradient} />;
    case "chopper":
      return <ChopperIcon width={width} height={height} className={className} gradient={gradient} />;
    case "website":
    default:
      return <Icon width={width} height={height} className={className} gradient={gradient} />;
  }
}

export default function ProjectsPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0)
  };

  // Smooth, organic spring physics for mouse following
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

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="min-h-screen max-w-5xl mx-auto pt-35 pb-20 relative">
      <FadeIn delay={0.05} duration={0.6}>
        <h2 className="mb-8">
          <span className="text-sm uppercase tracking-[0.25em] gradient-text">
            Projects
          </span>
        </h2>
      </FadeIn>

      <div className="grid gap-8 md:px-16">
        {projects.map((project, index) => (
          <FadeIn key={project.href} delay={0.1 + index * 0.08} duration={0.6} distance={18}>
            <Link
              href={project.href}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="project-card block overflow-hidden border border-text4 rounded-lg p-6 transition-all duration-300 hover:border-text4 hover:bg-text/5 hover:scale-[1.02]"
            >
              <div className="grid items-stretch gap-8 md:grid-cols-[1fr_220px]">
                <div>
                  <h2 className="project-title mb-4 inline-flex w-fit items-center gap-4 text-2xl font-semibold text-text transition-all duration-300 max-md:gradient-text md:gap-0 md:inline-block">
                    <span className="md:hidden flex aspect-square items-center justify-center rounded-xl p-1">
                      <ProjectCardIcon icon={project.icon} width={56} height={56} className="text-text" />
                    </span>
                    <span>{project.title}</span>
                  </h2>
                  <p className="text-text2 mb-4">{project.description}</p>
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 border border-text4 hover:bg-text3 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 md:hidden overflow-hidden rounded-xl">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-48 w-full object-cover"
                    />
                  </div>
                </div>

                <div className="hidden md:flex items-center justify-center">
                  <div className="flex aspect-square items-center justify-center rounded-xl p-2">
                    <ProjectCardIcon icon={project.icon} gradient={hoveredIndex === index} />
                  </div>
                </div>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>


      {/* Lightweight floating preview that cleanly follows the cursor */}
      <AnimatePresence>
        {hoveredIndex !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              style={{
                position: 'fixed',
                left: 0,
                top: 0,
                x: smoothMouse.x,
                y: smoothMouse.y,
                translateX: '-50%',
                translateY: '-50%',
                pointerEvents: 'none',
                zIndex: 600,
              }}
              className="w-100 h-62.5 rounded-xl overflow-hidden shadow-xl bg-background hidden md:block"
            >
              <img
                src={projects[hoveredIndex].image}
                alt=""
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-background3/70 px-5 py-2 text-sm text-text2 shadow-lg tracking-widest">
                <span className="whitespace-nowrap">More details</span>
                <div className="animate-[bounceX_2.5s_infinite]">
                  <Arrow width={16} height={16} angle={90} />
                </div>
              </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}