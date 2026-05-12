export default function Home() {
  return (
    <div className="min-h-screen max-w-4xl mx-auto pt-35 md:pt-30">
        <div className="text-center">
          <h1 className="text-6xl fon mb-6 text-customlime">TAREK DIAZ CARISSIMI</h1>
          <p className="text-[19px] text-text mb-8">Multimedia Engineer | UX/UI Designer | VR Developer | Web Developer</p>
          <div className="flex justify-center">
            <a
              href="/assets/CV - Tarek Diaz Carisismi.pdf"
              download
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-text/50 text-text/70 rounded-full transition-colors duration-300 hover:text-text hover:border-text"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
                className="shrink-0"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download CV
            </a>
          </div>
        </div>
      </div>
  );
}