
'use client';

import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const projects = [
  {
    title: "D.I.T.S (Drumming In The Studio)",
    description: "Design and development of a musical application in virtual reality and MIDI integration. Final project honored.",
    tags: ["Unity", "VR", "Music", "Drums", "MIDI", "Honors"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    href: "/projects/dits"
  },
  {
    title: "Def a Mole",
    description: "3D Tower defense videogame developed in Unity. Be part of the insects and defend your garden from invading moles.",
    tags: ["Unity", "3D", "Tower Defense"],
    image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=600&auto=format&fit=crop",
    href: "/projects/defamole"
  },
  {
    title: "3D Animation",
    description: "3D animation of the character chopper from the anime One Piece. Modeling, texturing and animation done in 3ds Max.",
    tags: ["3ds Max", "Modeling", "Texturing", "Animation"],
    image: "https://images.unsplash.com/photo-1618005198143-e528346d9a99?q=80&w=600&auto=format&fit=crop",
    href: "/projects/3danimations"
  },
  {
    title: "This website!",
    description: "Personal website developed with Next.js and Tailwind CSS. Showcases my portfolio and experience in software development.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "React"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop",
    href: "/projects/thiswebsite"
  }
];

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
    <div className="min-h-screen max-w-4xl mx-auto pt-35 md:pt-30 px-6 pb-20 relative">
      <h1 className="text-4xl font-bold mb-8 inline-block">Projects</h1>
      
      <div className="grid gap-8">
        {projects.map((project, index) => (
          <Link
            key={index}
            href={project.href}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="block border border-text/20 rounded-lg p-6 transition-all duration-300 hover:border-text/40 hover:bg-text/5 hover:scale-[1.02]"
          >
            <h2 className="text-2xl font-semibold mb-4">{project.title}</h2>
            <p className="text-text mb-4">{project.description}</p>
            <div className="flex gap-2 flex-wrap">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
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
              translateY: '-50%', // Centered exactly at the mouse position
              pointerEvents: 'none',
              zIndex: 600, // Higher than the custom cursor (z-index: 500) so the cursor is hidden behind the image
            }}
            className="w-[400px] h-[250px] rounded-xl overflow-hidden shadow-xl border border-text/10 bg-background hidden md:block"
          >
            <img
              src={projects[hoveredIndex].image}
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}