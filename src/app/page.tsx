'use client';

import HeroCanvasSuspense from "@/components/hero-canvas-suspense";
import { Download } from "@/components/icons/Download";
import { Copy } from "@/components/icons/Copy";
import ScrollIndicator from "@/components/scroll-indicator";
import { Arrow } from "@/components/icons/Arrow";
import FadeIn from "@/components/fade-in";
import { useState } from "react";

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
      title: "D.I.T.S (Drumming In The Studio)",
      description:
        "Design and development of a musical application in virtual reality with MIDI integration. Final project graded with honors.",
      tags: ["Unity", "VR", "Music", "Drums", "MIDI", "Honors"],
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
              <h1 className="text-[clamp(2.5rem,8vw,6rem)] md:text-[clamp(2.5rem,8vw,5rem)] font-semibold tracking-tight gradient-text leading-none pt-5">
                TAREK DIAZ CARISSIMI
              </h1>
            </FadeIn>
            
            <FadeIn delay={0.25} duration={0.8} distance={20}>
                <p className="mx-auto font-light text-[clamp(1rem,2.5vw,1.5rem)] md:text-[clamp(1rem,2.5vw,1.5rem)] text-text/75">
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
          <FadeIn delay={0.7} duration={0.6}>
            <div className="flex flex-col items-center gap-2 z-10 animate-bounce text-text/20 mt-3 mb-3">
              <ScrollIndicator width={30} height={30} angle={180} />
            </div>
          </FadeIn>

        </div>

      </section>

      {/* ABOUT / SUMMARY */}
      <section className="relative z-10 pt-45 min-h-screen">
        <div className="mb-4 max-w-6xl mx-auto">
          <FadeIn direction="none">
            <span className="text-sm uppercase tracking-[0.25em] text-text/35 mb-4">
              About
            </span>
          </FadeIn>
        </div>
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-4 md:gap-12 items-start">
          <FadeIn direction="left" delay={0.1}>
            <div>
              <h2 className="mb-8 w-full leading-tight text-4xl md:text-[clamp(1.5rem,3.7vw,3rem)] md:block hidden">
                  <span className="whitespace-nowrap">"Caught within</span>
                    <br />
                  <span className="whitespace-nowrap ml-10">the logic of art"</span>
              </h2>
              <h2 className="mb-8 w-full text-[clamp(1.5rem,5vw,3rem)] md:hidden flex">
                  <span className="whitespace-nowrap">"Caught within the logic of art"</span>
              </h2>
            </div>
          </FadeIn>

          <FadeIn direction="right" delay={0.2}>
            <div className="space-y-8 leading-10 text-text/75 text-[clamp(0.9rem,1.5vw,1.2rem)]">
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
              <a
                href="/about"
                className="
                  inline-flex items-center justify-center
                  px-5 py-1.5
                  rounded-full
                  border border-text/20
                  text-text/70
                  transition-all duration-300
                  hover:text-text
                  hover:border-text/40
                  gap-3
                "
              >
                <span className="whitespace-nowrap">Know me better</span>
                <div className="animate-[bounceX_2.5s_infinite]">
                  <Arrow width={30} height={30} angle={90} />
                </div>
              </a>
            </div>
        </FadeIn>
      </section>

      {/* FEATURED PROJECT */}
      <section className="px-6 mt-35">
        <div className="max-w-6xl mx-auto">
          <div className="mb-4">
            <FadeIn direction="none">
              <span className="text-sm uppercase tracking-[0.25em] text-text/35 mb-4">
                Selected Work
              </span>
            </FadeIn>
          </div>

          <div className="grid gap-8 px-16">
            {featuredProjects.map((project, index) => (
              <FadeIn key={project.title} delay={index * 0.15}>
                <div
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-3xl
                    border border-text/10
                    bg-text/3
                    p-8
                    transition-all duration-500
                    hover:border-text/20
                    hover:bg-text/5
                  "
                >
                  {/* Fake preview area */}
                    <div className="aspect-16/8 rounded-2xl bg-background border border-text/10 mb-8 overflow-hidden relative">
                    <div className="absolute inset-0 bg-linear-to-br from-primary/15 to-transparent" />
                  </div>

                  <div className="space-y-5">
                    <h3 className="text-2xl">{project.title}</h3>

                    <p className="text-text/65 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="
                            px-3 py-1
                            rounded-full
                            bg-text/5
                            border border-text/10
                            text-sm text-text/55
                          "
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="flex justify-center mt-16">
            <FadeIn delay={0.2}>
              <a
                href="/projects"
                className="
                  inline-flex items-center justify-center
                  px-5 py-1.5
                  rounded-full
                  border border-text/20
                  text-text/70
                  transition-all duration-300
                  hover:text-text
                  hover:border-text/40
                  gap-3
                "
              >
                <span className="whitespace-nowrap">See all projects</span>
                <div className="animate-[bounceX_2.5s_infinite]">
                  <Arrow width={30} height={30} angle={90} />
                </div>
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <FadeIn direction="none">
            <span className="text-sm uppercase tracking-[0.25em] text-text3">
              Contact
            </span>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="mt-6 max-w-3xl">
              <h2 className="text-4xl md:text-5xl mb-6 leading-tight text-text">
                Open to new opportunities.
              </h2>

              <p className="text-text2 text-lg leading-relaxed">
                I am currently looking for junior opportunities where I can keep
                growing as a developer, designer and multimedia engineer. I am open to
                roles related to software development, web technologies, UX/UI design,
                interactive media and digital product creation.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
            <FadeIn delay={0.15}>
              <div className="h-full rounded-2xl border border-background3 bg-background2 p-5">
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
              <div className="h-full rounded-2xl border border-background3 bg-background2 p-5">
                <h3 className="text-text font-semibold mb-2">
                  Web & Digital Products
                </h3>
                <p className="text-text3 text-sm leading-relaxed">
                  Open to working on websites, interfaces, frontend experiences and
                  digital products that combine usability and visual design.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.35}>
              <div className="h-full rounded-2xl border border-background3 bg-background2 p-5">
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

          <FadeIn delay={0.45}>
            <div className="mt-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8 border-t border-background3 pt-8">
              <div>
                <p className="text-text2 mb-2">
                  If you think my profile could fit your team, project or opportunity,
                  feel free to reach out.
                </p>

                <div>
                  <p className="text-text/80 hover:text-text pl-4">
                    {email}
                    <Copy width={24} height={24} className="inline-block ml-2 text-text hover:text-text transition-colors cursor-pointer" onClick={handleCopyEmail} />
                    {copied && <span className="ml-2 text-sm text-primary">Copied!</span>}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/assets/CV - Tarek Diaz Carisismi.pdf"
                  download
                  className="
                    inline-flex items-center justify-center
                    px-5 py-2
                    rounded-full
                    border border-background3
                    bg-background2
                    text-text2
                    transition-all duration-300
                    hover:text-text
                    hover:border-text
                    text-center
                    gap-2
                  "
                >
                  <Download width={24} height={24} />
                  Download CV
                </a>

                <a
                  href="/contact"
                  className="
                    inline-flex items-center justify-center
                    px-5 py-2
                    rounded-full
                    border border-background3
                    bg-background2
                    text-text2
                    transition-all duration-300
                    hover:text-text
                    hover:border-text
                    text-center
                    gap-2
                  "
                >
                  <span className="whitespace-nowrap">Contact Page</span>
                  <div className="animate-[bounceX_2.5s_infinite]">
                    <Arrow width={24} height={24} angle={90} />
                  </div>
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}