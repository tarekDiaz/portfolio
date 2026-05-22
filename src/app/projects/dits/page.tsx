import FadeIn from "@/components/fade-in";
//import { Download, ExternalLink } from "lucide-react";

const projectTags = [
  "VR Development",
  "Unity",
  "C#",
  "MIDI",
  "Meta Quest 3",
  "UX/UI",
  "Audio Systems",
  "3D Modeling",
];

const features = [
  {
    title: "Modular Drum Kit",
    text: "Users can spawn, move and configure individual drum pieces to build their own custom kit inside the virtual studio.",
  },
  {
    title: "Performance Mode",
    text: "Virtual drumsticks detect impact position, velocity and intensity to generate dynamic sound and visual feedback.",
  },
  {
    title: "MIDI In / Out",
    text: "The system can receive input from external MIDI instruments and send the virtual performance to a DAW for recording or production.",
  },
  {
    title: "MIDI Song Player",
    text: "Users can import MIDI songs, control playback speed and follow notes visually in real time for practice.",
  },
  {
    title: "Window Viewer",
    text: "Desktop windows can be projected inside the VR space to view sheet music, control a DAW or play background tracks.",
  },
  {
    title: "Accessible VR Interface",
    text: "The application includes height adjustment, drumstick angle calibration, reset view and ambidextrous menu placement.",
  },
];

const technicalBlocks = [
  {
    title: "Hit Detection",
    text: "The first collider-based prototype evolved into a linecast system to detect drumstick movement between frames with more precision.",
  },
  {
    title: "Dynamic Audio",
    text: "Each instrument uses multiple samples, velocity-based volume, pitch variation and normalized audio clips for a more natural response.",
  },
  {
    title: "MIDI Synchronization",
    text: "MIDI playback and visual note movement are synchronized using Unity DSP time to reduce timing errors and keep audio aligned.",
  },
  {
    title: "VR Optimization",
    text: "Low-poly modeling, baked lighting, light probes, reflection probes and object pooling help keep the experience stable and responsive.",
  },
];

const tools = [
  "Unity",
  "C#",
  "XR Interaction Toolkit",
  "DryWetMidi",
  "uWindowCapture",
  "Audacity",
  "Blender",
  "3DS Max",
  "Adobe Illustrator",
  "Meta Quest 3",
];

const futureWork = [
  "Hand tracking support",
  "More instruments and percussion elements",
  "Expanded MIDI song catalogue",
  "Improved sound libraries",
  "Application publishing preparation",
  "Future interactive web preview",
];

export default function DrumminInTheStudioPage() {
  return (
    <main className="min-h-screen bg-background text-text">
      <section className="mx-auto max-w-6xl px-6 pt-32 pb-20">
        <FadeIn delay={0.1} duration={0.6} distance={30}>
          <p className="mb-3 text-sm uppercase tracking-[0.25em] text-text3">
            Final Degree Project
          </p>

          <h1 className="max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
            Drummin In The Studio
          </h1>

          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-text2">
            A virtual reality drum studio designed to practice, customize and
            create music through modular instruments, MIDI integration and
            immersive interaction.
          </p>
        </FadeIn>

        <FadeIn delay={0.2} duration={0.6}>
          <div className="mt-8 flex flex-wrap gap-2">
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

        <FadeIn delay={0.3} duration={0.6}>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#demo"
              className="inline-flex items-center justify-center rounded-full border border-background3 bg-background2 px-5 py-2 text-text2 transition-all duration-300 hover:border-text hover:text-text"
            >
              Watch Demo
            </a>

            <a
              href="/assets/MemoriaTFG.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-background3 bg-background2 px-5 py-2 text-text2 transition-all duration-300 hover:border-text hover:text-text"
            >
              {/* <Download size={18} /> */}
              View Project Report
            </a>
          </div>
        </FadeIn>
      </section>

      <section id="demo" className="mx-auto max-w-6xl px-6 pb-24">
        <FadeIn delay={0.1} duration={0.6}>
          <div className="mb-6">
            <p className="mb-2 text-sm uppercase tracking-[0.25em] text-text3">
              Demo
            </p>

            <h2 className="text-3xl font-semibold text-text md:text-4xl">
              Project showcase.
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} duration={0.6}>
          <div className="aspect-video w-full overflow-hidden rounded-2xl border border-background3 bg-background2">
            <iframe
              className="h-full w-full"
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
              title="Drummin In The Studio Demo"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <FadeIn delay={0.1} duration={0.6}>
            <div>
              <p className="mb-2 text-sm uppercase tracking-[0.25em] text-text3">
                Overview
              </p>

              <h2 className="text-3xl font-semibold leading-tight text-text md:text-4xl">
                A complete VR space for practicing and creating music.
              </h2>
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

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <FadeIn delay={0.1} duration={0.6}>
          <div className="mb-10">
            <p className="mb-2 text-sm uppercase tracking-[0.25em] text-text3">
              Main Features
            </p>

            <h2 className="text-3xl font-semibold text-text md:text-4xl">
              What the application includes.
            </h2>
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
              <article className="h-full rounded-2xl border border-background3 bg-background2 p-6">
                <h3 className="mb-3 text-xl font-semibold text-text">
                  {feature.title}
                </h3>

                <p className="text-sm leading-relaxed text-text3">
                  {feature.text}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <FadeIn delay={0.1} duration={0.6}>
          <div className="mb-10">
            <p className="mb-2 text-sm uppercase tracking-[0.25em] text-text3">
              Technical Breakdown
            </p>

            <h2 className="text-3xl font-semibold text-text md:text-4xl">
              Engineering behind the experience.
            </h2>

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
              <article className="h-full rounded-2xl border border-background3 bg-background2 p-6">
                <h3 className="mb-3 text-xl font-semibold text-text">
                  {block.title}
                </h3>

                <p className="text-sm leading-relaxed text-text3">
                  {block.text}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <FadeIn delay={0.1} duration={0.6}>
          <div className="mb-8">
            <p className="mb-2 text-sm uppercase tracking-[0.25em] text-text3">
              Interactive Preview
            </p>

            <h2 className="text-3xl font-semibold text-text md:text-4xl">
              Virtual studio preview.
            </h2>

            <p className="mt-4 max-w-3xl leading-relaxed text-text2">
              This space is reserved for a future interactive 3D preview of the
              virtual drum room, allowing visitors to explore a simplified
              version of the VR environment directly from the browser.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} duration={0.6}>
          <div className="relative h-[60vh] min-h-[360px] w-full overflow-hidden rounded-2xl border border-background3 bg-background2">
            <div className="absolute inset-0 opacity-[0.04]">
              <div className="h-full w-full bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] bg-[size:48px_48px] text-text" />
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
              <p className="mb-2 text-xl font-semibold text-text">
                3D Web Preview Coming Soon
              </p>

              <p className="max-w-md text-sm leading-relaxed text-text3">
                Responsive canvas area prepared for a future Three.js or React
                Three Fiber implementation of the studio space.
              </p>
            </div>

            {/* Future interactive canvas:
            
            <Canvas className="h-full w-full">
              ...
            </Canvas>
            
            */}
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-10 lg:grid-cols-2">
          <FadeIn delay={0.1} duration={0.6}>
            <div className="rounded-2xl border border-background3 bg-background2 p-6">
              <p className="mb-2 text-sm uppercase tracking-[0.25em] text-text3">
                Tools
              </p>

              <h2 className="mb-5 text-3xl font-semibold text-text">
                Built with.
              </h2>

              <div className="flex flex-wrap gap-2">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-background3 bg-background px-3 py-1 text-sm text-text2"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.2} duration={0.6}>
            <div className="rounded-2xl border border-background3 bg-background2 p-6">
              <p className="mb-2 text-sm uppercase tracking-[0.25em] text-text3">
                Future Work
              </p>

              <h2 className="mb-5 text-3xl font-semibold text-text">
                Next steps.
              </h2>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {futureWork.map((item) => (
                  <div
                    key={item}
                    className="rounded-xl border border-background3 bg-background px-4 py-3 text-sm text-text2"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-28">
        <FadeIn delay={0.1} duration={0.6}>
          <div className="rounded-2xl border border-background3 bg-background2 p-8 md:p-10">
            <p className="mb-3 text-sm uppercase tracking-[0.25em] text-text3">
              Final Result
            </p>

            <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-text md:text-4xl">
              More than a drum simulator, a space to practice, learn and create
              music inside virtual reality.
            </h2>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="https://www.youtube.com/watch?v=YOUR_VIDEO_ID"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-background3 bg-background px-5 py-2 text-text2 transition-all duration-300 hover:border-text hover:text-text"
              >
                {/* <ExternalLink size={18} /> */}
                Open Demo Video
              </a>

              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-full border border-background3 bg-background px-5 py-2 text-text2 transition-all duration-300 hover:border-text hover:text-text"
              >
                Contact Me
              </a>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}