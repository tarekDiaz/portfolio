import Link from "next/link";
import FadeIn from "@/components/fade-in";
import YouTubeVideo from "@/components/youtube-video";
import DefaMoleCanvas from "@/components/defamole-canvas";

const projectTags = [
  "Unity",
  "Tower Defense",
  "C#",
  "Game Design",
  "Level Design",
  "UI",
  "Programming",
  "3D Art",
];

const roleBlocks = [
  {
    title: "Design",
    text: "I took part in the overall game design, helping define the feel of the experience, the player flow and how the tower defense loop should read in a garden-based setting.",
  },
  {
    title: "Programming",
    text: "A large part of my contribution was in coding gameplay systems in Unity, supporting enemy behavior, interactions, UI logic and the core flow of the game.",
  },
  {
    title: "Team Collaboration",
    text: "The project was developed in a team, so I also participated in the broader pipeline, helping where needed across implementation, testing and iteration.",
  },
  {
    title: "3D Work",
    text: "Even though my focus was mainly design and programming, I also contributed a bit across the visual and production side to help the game feel consistent.",
  },
  {
    title: "Gameplay Loop",
    text: "The concept centers on the insects defending the garden from invading moles, combining placement, timing and strategy in a compact tower defense format.",
  },
  {
    title: "Unity Pipeline",
    text: "The final piece was assembled in Unity, where the interactive systems, level setup and presentation were brought together into a playable project.",
  },
];

const featureBlocks = [
  {
    title: "Insect Side",
    text: "The player's perspective is tied to the insect defenders, which gives the game a lighter visual identity and a distinct point of view for the tower defense mechanics.",
  },
  {
    title: "Invading Moles",
    text: "Enemy waves of moles create pressure on the garden, providing the main challenge and guiding the player's defensive choices.",
  },
  {
    title: "Strategy and Placement",
    text: "The experience relies on choosing where to place units or defenses and reacting to incoming threats while keeping the garden protected.",
  },
  {
    title: "Iteration",
    text: "As with most team projects, the design and code evolved through testing, balancing and refining the feel of the game.",
  },
];

export default function DefAMolePage() {

  return (
    <main className="min-h-screen max-w-5xl mx-auto pt-35 pb-20 text-text">
      <section className="pb-16">
        <FadeIn delay={0.1} duration={0.6} distance={30}>
          <span className="text-sm uppercase tracking-[0.25em] gradient-text">
            Unity Game Project
          </span>

          <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
            Def a Mole.
          </h1>

          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-text2">
            A 3D tower defense videogame developed in Unity as part of a team project, where I contributed mainly to design and programming while also helping across the rest of the production pipeline.
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
              href="#preview"
              className="inline-flex items-center justify-center rounded-full border border-background3 bg-background2 px-6 py-3 text-sm uppercase tracking-[0.22em] text-text2 transition-all duration-300 hover:scale-102 hover:border-text hover:text-text"
            >
              Characters preview
            </Link>
          </div>
        </FadeIn>
      </section>

      <section className="pb-24">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] items-start">
          <FadeIn delay={0.1} duration={0.6}>
            <div>
              <span className="text-sm uppercase tracking-[0.25em] gradient-text">
                Overview
              </span>

              <h2 className="text-3xl font-semibold leading-tight text-text md:text-4xl">
                A tower defense game about protecting the garden.
              </h2>
            </div>
          </FadeIn>

          <div className="space-y-6">
            <FadeIn delay={0.2} duration={0.6}>
              <p className="leading-relaxed text-text2">
                Def a Mole is a Unity-based tower defense videogame built by a team, where the player takes the side of the insects to protect a garden from invading moles.
              </p>
            </FadeIn>

            <FadeIn delay={0.3} duration={0.6}>
              <p className="leading-relaxed text-text2">
                My strongest contribution was on the design and programming side, although I also took part in the wider process so the game could come together as a coherent final result.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <FadeIn delay={0.1} duration={0.6}>
          <div className="mb-10">
            <span className="text-sm uppercase tracking-[0.25em] gradient-text">
              My Role
            </span>

            <h2 className="text-3xl font-semibold text-text md:text-4xl">
              What I contributed to the team project.
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {roleBlocks.map((block, index) => (
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

      <section className="pb-24">
        <FadeIn delay={0.1} duration={0.6}>
          <div className="mb-10">
            <span className="text-sm uppercase tracking-[0.25em] gradient-text">
              Gameplay Notes
            </span>

            <h2 className="text-3xl font-semibold text-text md:text-4xl">
              Design goals of the game.
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {featureBlocks.map((feature, index) => (
            <FadeIn key={feature.title} delay={0.15 + index * 0.05} duration={0.6} distance={20}>
              <article className="h-full rounded-2xl border border-background3 bg-background2 p-6 transition-transform duration-300 hover:scale-102">
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

      <section id="video" className="pb-24">
        <FadeIn delay={0.1} duration={0.6}>
          <div className="mb-8">
            <span className="text-sm uppercase tracking-[0.25em] gradient-text">
              Video
            </span>

            <h2 className="text-3xl font-semibold text-text md:text-4xl">
              Trailer showcase.
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} duration={0.6}>

            <YouTubeVideo videoId="zl9m7LViXJw" />

        </FadeIn>
      </section>

      <section id="preview" className="pb-24">
        <FadeIn delay={0.1} duration={0.6}>
          <div className="mb-8">
            <span className="text-sm uppercase tracking-[0.25em] gradient-text">
              Characters Preview
            </span>

            <h2 className="text-3xl font-semibold text-text md:text-4xl">
              Placeholder canvas for game characters.
            </h2>

            <p className="mt-4 max-w-3xl leading-relaxed text-text2">
              The canvas can load a model from <span className="font-medium text-text">/models/defamole.glb</span> if you add one, or it can stay as an animated placeholder for the characters of the game.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.2} duration={0.6}>
          <DefaMoleCanvas />
        </FadeIn>
      </section>

      <section className="pb-28">
        <FadeIn delay={0.1} duration={0.6}>
          <div className="rounded-2xl border border-background3 bg-background2 p-8 md:p-10">
            <span className="text-sm uppercase tracking-[0.25em] gradient-text">
              Final Note
            </span>

            <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-text md:text-4xl">
              A small but complete Unity project where I helped shape the design, code and overall presentation.
            </h2>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
