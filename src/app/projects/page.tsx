
export default function ProjectsPage() {
  return (
    <div className="min-h-screen max-w-4xl mx-auto pt-35 md:pt-30">
        <h1 className="text-4xl font-bold mb-8 inline-block">Projects</h1>
        <div className="grid gap-8">
          <div className="border border-text/20 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">D.I.T.S (Drumming In The Studio)</h2>
            <p className="text-text mb-4">
              Design and development of a musical application in virtual reality and MIDI integration. Final project honored.
            </p>
            <div className="flex gap-2 flex-wrap">
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
              3D Tower defense videogame developed in Unity. Be part of the insects and defend your garden from invading moles.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">Unity</span>
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">3D</span>
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">Tower Defense</span>
            </div>
          </div>

          <div className="border border-text/20 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Animación 3D</h2>
            <p className="text-text mb-4">
                  3D animation of the character chopper from the anime One Piece. Modeling, texturing and animation done in 3ds Max.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">3ds Max</span>
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">Modeling</span>
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">Texturing</span>
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">Animation</span>
            </div>
          </div>
          <div className="border border-text/20 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Videojuegos con motor gráfico propio. Videogames made from scratch, game engine</h2>
            <p className="text-text mb-4">
              2D and 3D videogames developed with custom game engines, using OpenGL, C++. These projects demonstrate my ability to create custom and optimized gaming experiences from scratch.            
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">OpenGL</span>
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">C++</span>
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">Game Engine</span>
            </div>
          </div>
          <div className="border border-text/20 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">The artistic puzzle</h2>
            <p className="text-text mb-4">
              Immersive experience in virtual reality where the user must solve an artistic puzzle. Developed in Unity with MIDI integration to create a unique interactive and sensory experience.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">Unity</span>
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">VR</span>
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">Puzzle</span>
            </div>
          </div>
          <div className="border border-text/20 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">This website!</h2>
            <p className="text-text mb-4">
              Personal website developed with Next.js and Tailwind CSS. Showcases my portfolio and experience in software development.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">Next.js</span>
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">Tailwind CSS</span>
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">TypeScript</span>
              <span className="px-3 py-1 border border-text/20 hover:bg-text/50 rounded text-sm">React</span>
            </div>
          </div>
        </div>
    </div>
  );
}