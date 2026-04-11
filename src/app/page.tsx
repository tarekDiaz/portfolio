import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto px-6 py-32 w-full">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-6">Tárek.dev</h1>
          <p className="text-xl text-zinc-400 mb-8">Ingeniero Multimedia</p>
          <p className="text-lg text-zinc-300 mb-12 max-w-2xl mx-auto">
            Desarrollador apasionado por crear experiencias web excepcionales.
            Especializado en tecnologías modernas como React, Next.js y TypeScript.
          </p>

          <div className="flex gap-6 justify-center">
            <Link
              href="/about"
              className="px-6 py-3 bg-white text-zinc-950 font-semibold rounded hover:bg-zinc-200 transition-colors"
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