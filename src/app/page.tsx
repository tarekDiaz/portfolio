import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex">
      <div className="max-w-4xl mx-auto px-6 py-10 w-full">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-6 text-customlime">Tárek Díaz Carissimi</h1>
          <p className="text-xl text-text mb-8">Multimedia Engineer | UX/UI Designer | VR Developer | Web Developer</p>
          <p className="text-lg text-text mb-12 max-w-2xl mx-auto">
            Ingeniero multimedia especializado en diseñar productos digitales y mundos virtuales.
            Mi enfoque combina un 60% de sensibilidad artística con un 40% de rigor técnico.
          </p>

          <div className="flex gap-6 justify-center">
            <Link
              href="/about"
              className="px-6 py-3 border border-zinc-700 text-zinc-300 font-semibold rounded hover:bg-zinc-800 transition-colors"
            >
              Sobre mí
            </Link>
            <Link
              href="/projects"
              className="px-6 py-3 border border-zinc-700 text-zinc-300 font-semibold rounded hover:bg-zinc-800 transition-colors"
            >
              Ver proyectos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}