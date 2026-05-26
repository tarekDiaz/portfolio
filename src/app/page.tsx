'use client';

import HeroCanvasSuspense from "@/components/hero-canvas-suspense";
import { Download } from "@/components/icons/Download";
import { Copy } from "@/components/icons/Copy";
import ScrollIndicator from "@/components/scroll-indicator";
import { Arrow } from "@/components/icons/Arrow";
import FadeIn from "@/components/fade-in";
import { useState } from "react";
import Link from "next/link";
import HomeButton from "@/components/home-button";

export default function Home() {

  const email = "tdiazcar@gmail.com";

  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const featuredProjects = [
    {
      title: "D.I.T.S. (Drumming In The Studio)",
      description:
        "Design and development of a musical application in virtual reality with MIDI integration. Final project graded with honors.",
      tags: ["Unity", "VR", "Music", "Drums", "MIDI", "Honors"],
      href: "/projects/dits",
    },
  ];

  return (
    <main className="w-full overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative h-dvh w-full flex items-center justify-center overflow-hidden">

        {/* Hero Content */}
        <div className="relative z-20 w-full h-full flex flex-col items-center text-center pt-35 md:pt-30">

          {/* Top content */}
          <div className="space-y-2">
            <FadeIn delay={0.1} duration={0.8} distance={30}>
              <h1 className="text-[clamp(2.5rem,8vw,5rem)] font-medium gradient-text leading-none pt-5">
                TAREK DIAZ CARISSIMI
              </h1>
            </FadeIn>

            <FadeIn delay={0.2} duration={0.8} distance={20}>
              <p className="mx-auto font-light tracking-[0.15em] text-[clamp(1rem,2vw,1.25rem)] text-text">
                Multimedia Engineer | UX/UI Designer | VR Developer | Web Developer
              </p>
            </FadeIn>
          </div>

          {/* Canvas adaptativo */}
          <div className="flex-1 w-full max-w-4xl flex items-center justify-center min-h-0 z-10">
            <FadeIn delay={0.4} duration={0.9} distance={0} className="w-full h-full flex items-center justify-center">
              <HeroCanvasSuspense />
            </FadeIn>
          </div>

          {/* Scroll Indicator justo debajo del canvas */}
          <FadeIn direction="none" delay={1.1} duration={0.5}>
            <div className="flex flex-col items-center gap-2 z-10 animate-bounce text-text/20 mt-3 mb-3">
              <ScrollIndicator width={30} height={30} angle={180} />
            </div>
          </FadeIn>
        </div>

      </section>

      {/* ABOUT / SUMMARY */}
      <section className="relative z-10 py-30">
        <div className="mb-4 max-w-6xl mx-auto">
          <FadeIn delay={0.1} direction="none">
            <span className="text-sm uppercase tracking-[0.25em] gradient-text mb-4">
              About
            </span>
          </FadeIn>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-4 md:gap-12 items-start">
          <FadeIn direction="left" delay={0.2}>
            <div>
              <h1 className="mb-8 w-full leading-tight text-4xl text-text italic md:text-[clamp(1.5rem,3.7vw,3rem)] md:block hidden">
                <span className="whitespace-nowrap">"Caught within</span>
                <br />
                <span className="whitespace-nowrap ml-10">the logic of art"</span>
              </h1>
              <h2 className="my-8 w-full justify-center text-4xl italic md:hidden flex">
                <span className="whitespace-nowrap">"Caught within the logic of art"</span>
              </h2>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.5}>
            <div className="space-y-8 leading-10 text-text2 text-xl md:text-xl">
              <p>
                I am Tárek, a <strong>Multimedia Engineer</strong> driven by <strong>creativity</strong>,
                <strong> experimentation </strong> and <strong>interactive experiences</strong>.
              </p>
              <p>
                My work and perspective combine <strong>development</strong>, <strong>audiovisual design </strong>
                and <strong>immersive technologies </strong>to create experiences that connect visuals, sound and
                interaction.
              </p>
              <p>
                I've always been naturally drawn to the space where <strong>art </strong> and <strong>logic </strong>
                meet, and somehow that's where I ended up.
              </p>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.3}>
          <div className="mt-32 flex justify-center">
            <HomeButton href="/about" className="group">
              Know me better
            </HomeButton>
          </div>
        </FadeIn>
      </section>

      {/* SELECTED WORK */}
      <section className="px-6 py-30">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <FadeIn direction="none" delay={0.1}>
              <span className="text-sm uppercase tracking-[0.25em] gradient-text mb-4">
                Selected Work
              </span>
            </FadeIn>
          </div>

          <div className="flex flex-col gap-12">
            {featuredProjects.map((project, index) => (
              <FadeIn key={project.title} delay={index * 0.15}>
                <Link href={project.href} className="project-card group block">
                  <div className="relative grid md:grid-cols-2 gap-8 items-center p-8 rounded-4xl border border-text4 bg-transparent transition-all duration-500 hover:border-text2 overflow-hidden">

                    {/* Placeholder for Project Image */}
                    <div className="h-full w-full rounded-3xl overflow-hidden bg-background2 relative transition-transform duration-500 group-hover:scale-99">
                      
                      <img src="/assets/images/imageDits.webp" alt="Tárek Díaz Carissimi" className="w-full h-full object-cover" />
                      
                    </div>

                    {/* Content Area */}
                    <div className="">
                      <h3 className="project-title text-5xl font-normal text-text transition-all duration-300">
                        {project.title.includes('(') ? (
                          <>
                            <span className="block">{project.title.split('(')[0].trim()}</span>
                            <span className="block text-2xl md:text-3xl font-light mt-1 text-text2">
                              ({project.title.split('(')[1]}
                            </span>
                          </>
                        ) : (
                          project.title
                        )}
                      </h3>
                      <p className="text-lg text-text3 leading-relaxed font-light max-w-lg my-6">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="
                              px-3 py-1
                              rounded-full
                              border border-text4
                              text-xs tracking-widest text-text/40
                            "
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="pt-4 flex items-center gap-3 text-text4 group-hover:text-text transition-colors duration-300">
                        <span>Explore project</span>
                        <div className="transition-transform duration-300 group-hover:translate-x-1">
                          <Arrow width={24} height={24} angle={90} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>

          <div className="flex justify-center mt-20">
            <FadeIn delay={0.2}>
              <HomeButton href="/projects" className="group">
                More projects
              </HomeButton>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CONTACT */}

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn  direction="none" delay={0.2}>
            <span className="text-sm uppercase tracking-[0.25em] gradient-text">
              Contact
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-6 max-w-3xl">
              <h2 className="text-4xl md:text-5xl italic mb-6 leading-tight text-text">
                Open to new opportunities.
              </h2>

              <p className="text-text2 text-lg leading-relaxed">
                I am currently looking for new opportunities where I can keep
                growing as a developer, designer and engineer.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            <FadeIn delay={0.15}>
              <div className="h-full rounded-2xl border border-background3 p-5 hover:scale-102 hover:bg-background2 transition-all duration-300">
                <h3 className="text-text font-semibold mb-2">
                  Software Development
                </h3>
                <p className="text-text3 text-sm leading-relaxed">
                  Interested in junior roles where I can build, learn and improve
                  through clean code, problem-solving and real projects.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.25}>
              <div className="h-full rounded-2xl border border-background3 p-5 hover:scale-102 hover:bg-background2 transition-all duration-300">
                <h3 className="text-text font-semibold mb-2">
                  Digital Products
                </h3>
                <p className="text-text3 text-sm leading-relaxed">
                  Open to working on websites, interfaces, frontend experiences and
                  digital products that combine usability and visual design.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.35}>
              <div className="h-full rounded-2xl border border-background3 p-5 hover:scale-102 hover:bg-background2 transition-all duration-300">
                <h3 className="text-text font-semibold mb-2">
                  Design & Multimedia
                </h3>
                <p className="text-text3 text-sm leading-relaxed">
                  Also interested in roles related to UX/UI, audiovisual design,
                  interactive media, 3D, creative tools and multimedia experiences.
                </p>
              </div>
            </FadeIn>
          </div>

          <div className="mt-12 border-t border-background3 pt-16">
            <div className="grid gap-8 md:grid-cols-2 px-8">

              <FadeIn direction="left" delay={0.2}>
              <div className="space-y-3 ">
                <p className="text-sm uppercase tracking-[0.25em] gradient-text">
                  Contact me via email:
                </p>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="text-xl inline-flex items-center gap-2 text-left text-text2 transition-colors hover:text-text pt-2 pl-2"
                  aria-label={`Copy ${email} to clipboard`}
                >
                  <span>{email}</span>
                  <Copy width={24} height={24} className="text-text transition-colors" />
                </button>

                {copied && <span className="block text-sm text-primary">Copied!</span>}
              </div>
            </FadeIn>
            <FadeIn direction="right" delay={0.2}>
              <div className="space-y-4 md:text-right text-left">
                <p className="text-sm uppercase tracking-[0.25em] gradient-text">
                  download my cv!
                </p>

                <a
                  href="/assets/CV - Tarek Diaz Carisismi.pdf"
                  download
                  className="
                    inline-flex items-center justify-center
                    px-4 py-2
                    rounded-full
                    border border-text2
                    text-text2
                    transition-all duration-300
                    hover:text-text
                    hover:border-text
                    gap-3
                    mx-2
                  "
                >
                  <Download width={24} height={24} />
                  <span className="whitespace-nowrap">Download CV</span>
                </a>
              </div>
              </FadeIn>
            </div>
            
            <FadeIn delay={0.4}>
            <div className="mt-8 flex justify-center">
              <HomeButton href="/contact" className="group">
                Contact page
              </HomeButton>
            </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </main>
  );
}