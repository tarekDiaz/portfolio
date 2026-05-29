import Link from "next/link";
import FadeIn from "@/components/fade-in";
import EyeLogo from "@/components/icons/EyeLogo";

const projectTags = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Responsive Design",
  "UI/UX",
  "Motion",
  "Portfolio",
];

const processBlocks = [
  {
    title: "Structure and content",
    text:
      "The website was planned as a portfolio that could present my profile, projects and contact information in a clear and visual way, with each page working like a small case study.",
  },
  {
    title: "Design direction",
    text:
      "I chose a minimalist visual language with soft cards, rounded shapes, subtle motion and strong typography so the content could feel clean, readable and focused on the work itself.",
  },
  {
    title: "Component system",
    text:
      "Reusable sections, navigation elements, buttons and animated blocks were built as components to keep the project organized and easy to extend as the portfolio grows.",
  },
  {
    title: "Responsive behavior",
    text:
      "The layout adapts to desktop and mobile so the content stays readable and balanced across screen sizes, keeping the same identity without feeling compressed.",
  },
  {
    title: "Motion and transitions",
    text:
      "Small transitions, hover states and scroll-based reveals were used to make the site feel more alive without making it feel heavy or distracting.",
  },
  {
    title: "Final presentation",
    text:
      "The result is a portfolio website that works both as a personal presentation and as a showcase of development, design and visual refinement.",
  },
];

const toolBlocks = [
  {
    title: "Next.js",
    text:
      "Used as the main framework to structure the site with page routing, server components and a clean project architecture.",
  },
  {
    title: "React",
    text:
      "Used for interactive pieces such as animated sections, reusable cards and stateful components like the navigation and hover effects.",
  },
  {
    title: "TypeScript",
    text:
      "Helped keep the codebase more predictable and easier to scale, especially when building reusable components and typed project data.",
  },
  {
    title: "Tailwind CSS",
    text:
      "Used to build the visual system quickly and consistently, with utility classes for spacing, layout, responsive behavior and subtle styling.",
  },
  {
    title: "Framer Motion",
    text:
      "Used for fades, reveals and smooth motion so the site feels polished and dynamic while keeping the interactions light.",
  },
  {
    title: "Three.js / R3F",
    text:
      "Used in the portfolio to render interactive 3D previews and show the technical side of the site in a more visual way.",
  },
];

const designBlocks = [
  {
    title: "Typography",
    text:
      "Large titles, light supporting text and clear contrast were used to make the site feel structured and easy to scan.",
  },
  {
    title: "Cards and spacing",
    text:
      "Rounded cards, consistent padding and wide gaps help the pages breathe and keep each section visually separated.",
  },
  {
    title: "Motion language",
    text:
      "The motion is subtle and functional, used mainly to guide attention and make navigation feel more natural.",
  },
  {
    title: "Color system",
    text:
      "The palette is based on the portfolio theme, with gradients and muted surfaces supporting the content instead of competing with it.",
  },
];

export default function ThisWebsitePage() {
  return (
    <main className="min-h-screen max-w-5xl mx-auto pt-35 pb-20 text-text">
      <section className="pb-16">
        <FadeIn delay={0.1} duration={0.6} distance={30}>
          <span className="text-sm uppercase tracking-[0.25em] gradient-text">
            Personal Portfolio Website
          </span>

          <h1 className="mt-4 max-w-4xl text-5xl font-bold leading-tight md:text-7xl">
            This website!
          </h1>

          <p className="mt-6 max-w-3xl text-xl leading-relaxed text-text2">
            My personal portfolio built to present projects, experience and design work through a clean, responsive and animated web experience.
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
              href="#process"
              className="inline-flex items-center justify-center rounded-full border border-background3 bg-background2 px-6 py-3 text-sm uppercase tracking-[0.22em] text-text2 transition-all duration-300 hover:scale-102 hover:border-text hover:text-text"
            >
              View process
            </Link>

            <Link
              href="#logo"
              className="inline-flex items-center justify-center rounded-full border border-background3 bg-background2 px-6 py-3 text-sm uppercase tracking-[0.22em] text-text2 transition-all duration-300 hover:scale-102 hover:border-text hover:text-text"
            >
              Logo meaning
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
                A personal site designed to show both projects and identity.
              </h2>
            </div>
          </FadeIn>

          <div className="space-y-6">
            <FadeIn delay={0.2} duration={0.6}>
              <p className="leading-relaxed text-text2">
                This website was created to work as a central hub for my portfolio. It brings together my projects, my background and a more visual explanation of how I work as a developer and multimedia engineer.
              </p>
            </FadeIn>

            <FadeIn delay={0.3} duration={0.6}>
              <p className="leading-relaxed text-text2">
                I wanted the site to feel personal but professional, balancing clarity and style while still leaving room for animated details, 3D elements and visual storytelling.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section id="process" className="pb-24">
        <FadeIn delay={0.1} duration={0.6}>
          <div className="mb-10">
            <span className="text-sm uppercase tracking-[0.25em] gradient-text">
              Process
            </span>

            <h2 className="text-3xl font-semibold text-text md:text-4xl">
              How the portfolio was built.
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

      <section className="pb-24">
        <FadeIn delay={0.1} duration={0.6}>
          <div className="mb-10">
            <span className="text-sm uppercase tracking-[0.25em] gradient-text">
              Tools
            </span>

            <h2 className="text-3xl font-semibold text-text md:text-4xl">
              Main technologies used.
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {toolBlocks.map((tool, index) => (
            <FadeIn key={tool.title} delay={0.15 + index * 0.05} duration={0.6} distance={20}>
              <article className="h-full rounded-2xl border border-background3 bg-background2 p-6 transition-transform duration-300 hover:scale-102">
                <h3 className="mb-3 text-xl font-semibold text-text">
                  {tool.title}
                </h3>

                <p className="text-sm leading-relaxed text-text3">
                  {tool.text}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      <section id="logo" className="pb-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-start">
          <FadeIn delay={0.1} duration={0.6}>
            <div>
              <span className="text-sm uppercase tracking-[0.25em] gradient-text">
                Logo
              </span>

              <h2 className="text-3xl font-semibold text-text md:text-4xl">
                The logo represents vision, attention and identity.
              </h2>
            </div>
          </FadeIn>

          <div className="space-y-6">
            <FadeIn delay={0.2} duration={0.6}>
              <p className="leading-relaxed text-text2">
                The eye logo is a visual way to represent observation, perspective and the idea of looking closely at details. For a portfolio, that meaning fits well because the website is built to show how I see and build projects.
              </p>
            </FadeIn>

            <FadeIn delay={0.3} duration={0.6}>
              <p className="leading-relaxed text-text2">
                The symbol also works as a simple identity mark: it is clean, memorable and easy to use across the navbar, footer and other parts of the site without needing extra decoration.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <FadeIn delay={0.1} duration={0.6}>
          <div className="rounded-2xl border border-background3 bg-background2 p-8 md:p-10">
            <div className="grid gap-10 lg:grid-cols-[280px_1fr] items-center">
              <div className="flex justify-center lg:justify-start">
                <div className="rounded-full border border-background3 bg-background px-6 py-6 shadow-sm">
                  <EyeLogo
                    width={130}
                    height={130}
                    eyeColor="var(--background)"
                    color="var(--text)"
                  />
                </div>
              </div>

              <div>
                <span className="text-sm uppercase tracking-[0.25em] gradient-text">
                  Identity Detail
                </span>

                <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-text md:text-4xl">
                  A logo that keeps the site recognizable across every page and section.
                </h2>

                <p className="mt-5 max-w-3xl leading-relaxed text-text2">
                  The logo helps connect the whole portfolio visually. It appears in the navbar and footer, and it gives the site a stronger identity while still staying minimal and flexible.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="pb-28">
        <FadeIn delay={0.1} duration={0.6}>
          <div className="rounded-2xl border border-background3 bg-background2 p-8 md:p-10">
            <span className="text-sm uppercase tracking-[0.25em] gradient-text">
              Final Note
            </span>

            <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-text md:text-4xl">
              The result is a portfolio built to present my work, my tools and my design identity in one place.
            </h2>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
