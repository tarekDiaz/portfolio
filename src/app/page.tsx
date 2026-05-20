import HeroCanvasSuspense from "@/components/hero-canvas-suspense";
import { Download } from "@/components/icons/Download";

export default function Home() {
  const featuredProjects = [
    {
      title: "D.I.T.S (Drumming In The Studio)",
      description:
        "Design and development of a musical application in virtual reality with MIDI integration. Final project honored.",
      tags: ["Unity", "VR", "Music", "Drums", "MIDI", "Honors"],
    },
  ];

  return (
    <main className="w-full  overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative h-dvh w-full flex items-center justify-center overflow-hidden">
  
        {/* Hero Content */}
        <div className="relative z-20 w-full max-w-5xl mx-auto h-full flex flex-col items-center text-center px-4 pt-35 md:pt-30">

          {/* Top content */}
          <div className="space-y-1">
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight gradient-text leading-none pt-5">
              TAREK DIAZ CARISSIMI
            </h1>

            <p className="max-w-3xl mx-auto text-lg md:text-xl text-text/75 leading-relaxed">
              Multimedia Engineer | UX/UI Designer | VR Developer | Web Developer
            </p>
          </div>

          {/* Canvas adaptativo */}
          <div className="flex-1 w-full flex items-center justify-center min-h-0 m-2">
            <HeroCanvasSuspense />
          </div>

          {/* Botón */}
          <a
            href="/assets/CV - Tarek Diaz Carisismi.pdf"
            download
            className="
              mb-20
              inline-flex items-center justify-center gap-2
              px-5 h-10
              border border-text/40
              rounded-full
              text-text/75
              transition-all duration-300
              hover:text-text
              hover:border-text
              hover:bg-text/5
            "
          >
          <Download width={18} height={18} />
            Download CV
          </a>
        </div>

        {/* Scroll Indicator fijo abajo */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-30">
          <div className="w-px h-5 bg-text/20" />

          <span className="text-xs uppercase tracking-[0.3em] text-text/35">
            Scroll
          </span>
        </div>

      </section>

      {/* ABOUT / SUMMARY */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-sm uppercase tracking-[0.25em] text-text/35">
              About
            </span>

            <h2 className="text-4xl md:text-5xl mt-4 mb-8 leading-tight">
              Building immersive and interactive digital experiences.
            </h2>
          </div>

          <div className="space-y-6 text-text/70 text-lg leading-relaxed">
            <p>
              I am a Multimedia Engineering student specialized in creative
              technology, UX/UI design and real-time interactive systems.
            </p>

            <p>
              My work combines development, audiovisual design and immersive
              technologies to create experiences that connect visuals, sound and
              interaction.
            </p>

            <p>
              I enjoy experimenting with Unity, Web Development, Creative
              Coding, VR and physical computing to build projects with both
              technical depth and artistic direction.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECT */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20">
            <span className="text-sm uppercase tracking-[0.25em] text-text/35">
              Selected Work
            </span>

            <h2 className="text-4xl md:text-5xl mt-4">
              Featured Project
            </h2>
          </div>

          <div className="grid gap-8">
            {featuredProjects.map((project) => (
              <div
                key={project.title}
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
            ))}
          </div>

          <div className="flex justify-center mt-16">
            <a
              href="/projects"
              className="
                inline-flex items-center justify-center
                px-6 py-3
                rounded-full
                border border-text/20
                text-text/70
                transition-all duration-300
                hover:text-text
                hover:border-text/40
              "
            >
              Ver todos los proyectos
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-32 px-6 border-t border-text/10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-sm uppercase tracking-[0.25em] text-text/35">
            Contact
          </span>

          <h2 className="text-4xl md:text-6xl mt-6 mb-8 leading-tight">
            Let’s build something immersive together.
          </h2>

          <p className="text-lg text-text/65 max-w-2xl mx-auto leading-relaxed mb-12">
            Interested in creative development, immersive systems, VR,
            multimedia experiences or collaborations?
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
            <a
              href="mailto:tarek@example.com"
              className="
                inline-flex items-center justify-center
                px-7 py-3
                rounded-full
                bg-customlime
                text-black
                transition-all duration-300
                hover:scale-[1.02]
              "
            >
              Get In Touch
            </a>

            <a
              href="/contact"
              className="
                inline-flex items-center justify-center
                px-7 py-3
                rounded-full
                border border-text/20
                text-text/70
                transition-all duration-300
                hover:text-text
                hover:border-text/40
              "
            >
              Contact Page
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}