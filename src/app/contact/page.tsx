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
    <div className="min-h-screen max-w-5xl mx-auto pt-35 md:pt-35 px-6 pb-20">
        <h2 className="mb-8">
          <span className="text-sm uppercase tracking-[0.25em] gradient-text">
            Contact
          </span>
        </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
        {/* Left: Contact Info */}
        <div className="space-y-12">

          <div className="space-y-8">
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-text/30 mb-4">Email</h3>
              <p className="text-xl text-text ">
                <button
                  onClick={handleCopyEmail}
                  className="p-2 text-text/70 hover:text-text transition-colors relative group flex items-center gap-3"
                >
                  {email}
                  <Copy width={20} height={20} />
                  {copied && (
                    <span className="absolute left-full ml-3 px-2 py-1 text-sm text-primary tracking-widest whitespace-nowrap">
                      Copied
                    </span>
                  )}
                </button>
              </p>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-text/30 mb-4">Social</h3>
              <div className="flex flex-col gap-3 pl-4">
                <a
                  href="https://www.linkedin.com/in/tarek-diaz-carissimi"
                  className="text-lg text-text/60 hover:text-text transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/tarekDiaz"
                  className="text-lg text-text/60 hover:text-text transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Simple Contact Form */}
        <div className="bg-text/[0.02] p-8 md:p-10 rounded-[2rem] border border-text/10">
          <form className="space-y-8">
            <div className="space-y-2">
              <label htmlFor="name" className="text-xs uppercase tracking-[0.2em] text-text/40 ml-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                required
                className="w-full bg-background border border-text/10 rounded-2xl px-6 py-4 text-text placeholder:text-text/20 focus:outline-none focus:border-text/30 transition-colors"
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-xs uppercase tracking-[0.2em] text-text/40 ml-1">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                className="w-full bg-background border border-text/10 rounded-2xl px-6 py-4 text-text placeholder:text-text/20 focus:outline-none focus:border-text/30 transition-colors"
                placeholder="name@example.com"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-xs uppercase tracking-[0.2em] text-text/40 ml-1">Message</label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                className="w-full bg-background border border-text/10 rounded-2xl px-6 py-4 text-text placeholder:text-text/20 focus:outline-none focus:border-text/30 transition-colors resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-text text-background rounded-full py-5 text-sm uppercase tracking-[0.3em] font-medium hover:opacity-90 transition-all active:scale-[0.98]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}