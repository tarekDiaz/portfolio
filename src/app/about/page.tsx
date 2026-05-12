export default function About() {
  return (
    <div className="min-h-screen max-w-4xl mx-auto pt-35 md:pt-30">
        <h1 className="text-4xl font-bold mb-8 text-text">About Me</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-xl text-text mb-6 leading-relaxed">
            I am <strong>Tárek Díaz Carissimi</strong>, a Multimedia Engineer. 
            I define my work as the intersection where logic meets aesthetics, maintaining a balance of 
            <strong> 60% artistic sensibility and 40% technical engineering</strong>.
          </p>

          <p className="text-text mb-6">
            My passion lies in <strong>exploring everywhere and creating anywhere</strong>. This curiosity led 
            me to develop a VR music application for my Bachelor's Thesis—awarded with 
            <strong> Honors (Matrícula de Honor)</strong>—where I integrated MIDI systems with real-time audio 
            interaction and a deep focus on UX/UI design.
          </p>

          <p className="text-text mb-8">
            Whether I'm building immersive environments in <strong>Unity</strong>, designing intuitive 
            interfaces in <strong>Figma</strong>, or writing clean code in <strong>C# or React</strong>, my 
            goal is always the same: creating digital experiences that truly connect with people.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-text border-b border-zinc-700 pb-2">Design & Art</h2>
              <ul className="list-none text-text/70 space-y-2">
                <li>• UX/UI Design & User Research</li>
                <li>• Interactive Product Design</li>
                <li>• 3D Modeling (3DS Max, Substance)</li>
                <li>• Audiovisual Production (Adobe Suite)</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4 text-text border-b border-zinc-700 pb-2">Engineering</h2>
              <ul className="list-none text-text/70 space-y-2">
                <li>• VR Development (Unity & C#)</li>
                <li>• Software Dev (C++, Java, Python)</li>
                <li>• Web Technologies (React, JavaScript, PHP)</li>
                <li>• Agile Methodologies (Scrum)</li>
              </ul>
            </div>
          </div>

          <p className="mt-12 italic text-text/70 text-center">
            "Exploring everywhere, creating anywhere."
          </p>
        </div>
    </div>
  );
}