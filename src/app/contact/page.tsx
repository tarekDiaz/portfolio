export default function Contact() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-8">Contact Me</h1>
        <div className="max-w-2xl">
          <p className="text-lg text-text mb-8">
            I'd love to hear from you! Feel free to reach out for collaborations, opportunities, or just to say hello.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-text/80 hover:text-text ">tdiazcar@gmail.com</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">LinkedIn</h3>
              <a
                href="https://www.linkedin.com/in/tarek-diaz-carissimi"
                className="text-text/80 hover:text-text transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/tarek-diaz-carissimi
              </a>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">GitHub</h3>
              <a
                href="https://github.com/tarekDiaz"
                className="text-text/80 hover:text-text transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/tarekDiaz
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}