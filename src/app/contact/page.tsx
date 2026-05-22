"use client";

import { useState } from "react";
import { Copy } from "@/components/icons/Copy";

const email = "tdiazcar@gmail.com";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen max-w-4xl mx-auto pt-45 md:pt-45">
        <h1 className="text-4xl font-bold mb-2">Contact Me</h1>
        <div className="max-w-2xl">
          <p className="text-lg text-text mb-8 pl-2">
            Work toghether! 
          </p>

          <div className="space-y-6 pl-4">
            <div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-text/80 hover:text-text pl-4">
                {email}
                <Copy width={24} height={24} className="inline-block ml-2 text-text hover:text-text transition-colors cursor-pointer" onClick={handleCopyEmail} />
                {copied && <span className="ml-2 text-sm text-primary">Copied!</span>}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">LinkedIn</h3>
              <a
                href="https://www.linkedin.com/in/tarek-diaz-carissimi"
                className="text-text/80 hover:text-text transition-colors pl-4"
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
                className="text-text/80 hover:text-text transition-colors pl-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/tarekDiaz
              </a>
            </div>
          </div>
        </div>
      </div>
  );
}