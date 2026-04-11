export default function About() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">About Me</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-lg text-zinc-300 mb-6">
            Hi, I'm Tárek! I'm a passionate developer focused on creating amazing web experiences.
          </p>
          <p className="text-zinc-400 mb-6">
            I specialize in modern web technologies including React, Next.js, and TypeScript.
            My goal is to build applications that are not only functional but also beautiful and user-friendly.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Skills</h2>
          <ul className="list-disc list-inside text-zinc-400 space-y-2">
            <li>Frontend Development (React, Next.js, TypeScript)</li>
            <li>Backend Development (Node.js, Python)</li>
            <li>UI/UX Design</li>
            <li>Database Management</li>
          </ul>
        </div>
      </div>
    </div>
  );
}