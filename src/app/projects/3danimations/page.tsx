import FadeIn from "@/components/fade-in";
import YouTubeVideo from "@/components/youtube-video";
import ChopperCanvas from "@/components/chopper-canvas";
import HomeButton from "@/components/home-button";
import { FaProjectDiagram } from "react-icons/fa";
import { FaCubes, FaPalette, FaPersonRunning, FaStar, FaVideo } from "react-icons/fa6";

const projectTags = [
  "3ds Max",
  "Modeling",
  "Rigging",
  "Animation",
  "Texturing",
  "Rendering",
  "Editing",
  "Chopper",
];

const processBlocks = [
  {
    title: "Modeling",
    icon: FaCubes,
    text: "I built the character from scratch in 3ds Max, shaping the main volumes, proportions and silhouette to keep Chopper recognizable while staying clean for animation.",
  },
  {
    title: "Rigging",
    icon: FaProjectDiagram,
    text: "The rig was prepared to support facial expression and body movement, making the model ready for animation without breaking the topology.",
  },
  {
    title: "Texturing",
    icon: FaPalette,
    text: "I applied the materials and textures needed to preserve the character's identity and make the render read well under different lighting conditions.",
  },
  {
    title: "Animation",
    icon: FaPersonRunning,
    text: "The final motion focuses on a smooth presentation loop, with controlled timing and clean movement to showcase the model from multiple angles.",
  },
  {
    title: "Editing & Rendering",
    icon: FaVideo,
    text: "After rendering the shots, I edited the final sequence to present the model in a polished way suitable for portfolio viewing and sharing.",
  },
  {
    title: "Final Look",
    icon: FaStar,
    text: "The goal was to create a compact 3D piece that communicates character, technique and finish through a clear animation showcase.",
  },
];


export default function ThreeDAnimationsPage() {

  return (
    <main className="min-h-screen max-w-5xl mx-auto pt-35 pb-20 text-text">
      <section className="pb-16">
        <FadeIn delay={0.1} duration={0.6} distance={30}>
          <span className="text-sm uppercase tracking-[0.25em] gradient-text">
            3D Animation Project
          </span>

          <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-tight md:text-6xl">
            Tony Tony Chopper, animated in 3ds Max.
          </h1>

          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-text2">
            A 3D animation piece focused on modeling, rigging, texturing, editing and rendering of Chopper from One Piece, built as a portfolio showcase of character workflow and presentation.
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
      </section>

      <section id="video" className="pb-24">
        <FadeIn delay={0.1} duration={0.6}>
          <div className="mb-8">
            <span className="text-sm uppercase tracking-[0.25em] gradient-text">
              Video
            </span>
          </div>
        </FadeIn>  

        <FadeIn delay={0.2} duration={0.6}>
            <YouTubeVideo videoId="syyTFcJQYGs" className="mx-auto max-w-4xl" />
        </FadeIn>
      </section>

      <section id="overview" className="pb-24">
        <FadeIn delay={0.1} duration={0.6}>
          <div className="mb-10">
            <span className="text-sm uppercase tracking-[0.25em] gradient-text">
              Overview
            </span>
          </div>
        </FadeIn>

        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-start">
          <div className="space-y-6">
            <FadeIn delay={0.25} duration={0.6}>

              <h2 className="text-3xl font-semibold leading-tight text-text md:text-4xl mb-4">
                A character study built to show the full 3D workflow.
              </h2>

              <p className="leading-relaxed text-text2">
                This project is a 3D animation exercise centered on Chopper from One Piece. The piece was created in 3ds Max and covers the complete production flow, from the initial model to the final render.
              </p>
            </FadeIn>

            <FadeIn delay={0.35} duration={0.6}>
              <p className="leading-relaxed text-text2">
                I wanted the result to feel like a compact portfolio piece that shows the technical process clearly: modeling, rigging, texturing, animation, editing and rendering all working together in a single presentation.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.2} duration={0.6}>
            <ChopperCanvas />
          </FadeIn>
        </div>
      </section>

      <section className="pb-24">
        <FadeIn delay={0.1} duration={0.6}>
          <div className="mb-10">
            <span className="text-sm uppercase tracking-[0.25em] gradient-text">
              Process
            </span>

            <h2 className="text-3xl font-semibold text-text md:text-4xl">
              How was it made
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {processBlocks.map((block, index) => (
            <FadeIn key={block.title} delay={0.15 + index * 0.05} duration={0.6} distance={20}>
              <article className="h-full rounded-2xl border border-background3 bg-background2 p-6 transition-transform duration-300 hover:scale-102">
                <h3 className="mb-3 flex items-center gap-3 text-xl font-semibold text-text">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center text-text2">
                    <block.icon className="h-5 w-5" aria-hidden="true" />
                  </span>

                  <span>{block.title}</span>
                </h3>

                <p className="text-sm leading-relaxed text-text3">
                  {block.text}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="pb-28">
        <FadeIn delay={0.1} duration={0.6}>
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
            <HomeButton href="/contact">Contact</HomeButton>

            <HomeButton href="/projects">See more</HomeButton>
          </div>
        </FadeIn>
      </section>
      
    </main>
  );
}
