import Link from "next/link";
import FadeIn from "@/components/fade-in";
import YouTubeVideo from "@/components/youtube-video";
import ChopperCanvas from "@/components/chopper-canvas";

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
    text: "I built the character from scratch in 3ds Max, shaping the main volumes, proportions and silhouette to keep Chopper recognizable while staying clean for animation.",
  },
  {
    title: "Rigging",
    text: "The rig was prepared to support facial expression and body movement, making the model ready for animation without breaking the topology.",
  },
  {
    title: "Texturing",
    text: "I applied the materials and textures needed to preserve the character's identity and make the render read well under different lighting conditions.",
  },
  {
    title: "Animation",
    text: "The final motion focuses on a smooth presentation loop, with controlled timing and clean movement to showcase the model from multiple angles.",
  },
  {
    title: "Editing & Rendering",
    text: "After rendering the shots, I edited the final sequence to present the model in a polished way suitable for portfolio viewing and sharing.",
  },
  {
    title: "Final Look",
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

          <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
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

        <FadeIn delay={0.3} duration={0.6}>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="#video"
              className="inline-flex items-center justify-center rounded-full border border-background3 bg-background2 px-6 py-3 text-sm uppercase tracking-[0.22em] text-text2 transition-all duration-300 hover:scale-102 hover:border-text hover:text-text"
            >
              Watch video
            </Link>

            <Link
              href="#overview"
              className="inline-flex items-center justify-center rounded-full border border-background3 bg-background2 px-6 py-3 text-sm uppercase tracking-[0.22em] text-text2 transition-all duration-300 hover:scale-102 hover:border-text hover:text-text"
            >
              3D preview
            </Link>
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

        <FadeIn delay={0.1} duration={0.6}>
        
            <h2 className="text-3xl font-semibold text-text md:text-4xl">
              Presentation and final animation.
            </h2>

            <p className="mt-4 max-w-3xl leading-relaxed text-text2">
              The YouTube embed is ready here. Add your final video ID in this file to display the actual presentation clip.
            </p>

        </FadeIn>

        <FadeIn delay={0.2} duration={0.6}>
            <YouTubeVideo videoId="syyTFcJQYGs" />
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
      <section className="pb-28">
        <FadeIn delay={0.1} duration={0.6}>
          <div className="rounded-2xl border border-background3 bg-background2 p-8 md:p-10">
            <span className="text-sm uppercase tracking-[0.25em] gradient-text">
              Final Note
            </span>

            <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-text md:text-4xl">
              A compact character piece that shows the full 3D pipeline from modeling to final render.
            </h2>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
