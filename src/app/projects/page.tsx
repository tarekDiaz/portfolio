
export default function ProjectsPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Proyectos</h1>

        <div className="grid gap-8">
          <div className="border border-text/20 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">D.I.T.S (Drumming In The Studio)</h2>
            <p className="text-text mb-4">
              Design and development of a musical application in virtual reality and MIDI integration. Matricula de honor en el proyecto final de carrera. Desarrollado en Unity, con integración de MIDI para crear una experiencia interactiva y sensorial única.
            </p>
            <div className="flex gap-2">
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">Unity</span>
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">VR</span>
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">Music</span>
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">Drums</span>
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">MIDI</span>
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">Honors</span>
            </div>
          </div>

          <div className="border border-text/20 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Def a Mole</h2>
            <p className="text-text mb-4">
              Videojuego tower defense 3D desarrollado en Unity. Se parte de los insectos y defiende tu gardín de los topos invasores.
            </p>
            <div className="flex gap-2">
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">Unity</span>
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">3D</span>
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">Tower Defense</span>
            </div>
          </div>

          <div className="border border-zinc-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Animación 3D</h2>
            <p className="text-text mb-4">
                  Animación 3D del personaje chopper del anime One Piece. Modelado, texturizado y animación realizados en 3ds Max.
            </p>
            <div className="flex gap-2">
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">3ds Max</span>
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">Modeling</span>
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">Texturing</span>
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">Animation</span>
            </div>
          </div>
          <div className="border border-zinc-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Videojuegos con motor gráfico propio</h2>
            <p className="text-text mb-4">
              Videojuegos 2D y 3D desarrollados con motores gráficos propios, utilizando OpenGL, C++. Estos proyectos demuestran mi capacidad para crear experiencias de juego personalizadas y optimizadas desde cero.
            </p>
            <div className="flex gap-2">
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">OpenGL</span>
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">C++</span>
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">Game Engine</span>
            </div>
          </div>
          <div className="border border-zinc-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">The artistic puzzle</h2>
            <p className="text-text mb-4">
              Experiencia inmersiva en realidad virtual en el que el usuario debe resolver un puzzle artístico. Desarrollado en Unity con integración de MIDI para crear una experiencia interactiva y sensorial única.
            </p>
            <div className="flex gap-2">
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">Unity</span>
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">VR</span>
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">Puzzle</span>
            </div>
          </div>
          <div className="border border-zinc-800 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Esta propia web!</h2>
            <p className="text-text mb-4">
              Sitio web personal desarrollado con Next.js y Tailwind CSS. Muestra mi portfolio y experiencia en desarrollo de software.
            </p>
            <div className="flex gap-2">
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">Next.js</span>
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">Tailwind CSS</span>
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">TypeScript</span>
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">React</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}