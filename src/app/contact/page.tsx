"use client";

import { useState } from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { Copy } from "@/components/icons/Copy";
import FadeIn from "@/components/fade-in";

const email = "tdiazcar@gmail.com";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen max-w-5xl mx-auto pt-35 pb-20">
      
      <FadeIn direction="up" duration={0.7}>
        <h2 className="mb-8">
          <span className="text-sm uppercase tracking-[0.25em] gradient-text">
            Contact
          </span>
        </h2>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 px-6">

      <FadeIn direction="up" delay={0.2} duration={0.8}>
          <div className="bg-text/2 p-8 md:p-10 rounded-4xl border border-text/10">
            <form className="space-y-8">
              <div className="space-y-2">
                <label htmlFor="name" className="text-xs uppercase tracking-[0.2em] text-text4 ml-1">Name</label>
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
                <label htmlFor="email" className="text-xs uppercase tracking-[0.2em] text-text4 ml-1">Email Address</label>
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
                <label htmlFor="message" className="text-xs uppercase tracking-[0.2em] text-text4 ml-1">Message</label>
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
                className="w-full border text-text2 border-text4 rounded-full py-4 text-sm uppercase tracking-[0.25em] hover:border-text2 hover:text-text transition-all active:scale-[0.98]"
              >
                Send message
              </button>
            </form>
          </div>
        </FadeIn>

        {/* Left: Contact Info */}
          <div className="space-y-8 order-1">            
            <FadeIn direction="up" delay={0.4} duration={0.8}>
              <div>
                <h3 className="text-sm uppercase tracking-[0.2em] gradient-text mb-4 inline-block">Email</h3>
                <p className="text-xl text-text ml-4">
                  <button
                    onClick={handleCopyEmail}
                    className="text-text/70 hover:text-text transition-colors relative group flex items-center gap-3"
                  >
                    <IoIosMail className="text-xl shrink-0" aria-hidden="true" />
                    {email}
                    <Copy width={20} height={20} />
                    {copied && (
                      <span className="absolute left-full ml-3 px-2 py-1 text-sm text-primary tracking-widest whitespace-nowrap">
                        Copied!
                      </span>
                    )}
                  </button>
                </p>
              </div>
            </FadeIn>

            <FadeIn direction="up" delay={0.6} duration={0.8}>
                <h3 className="text-sm uppercase tracking-[0.2em] gradient-text mb-4 inline-block">Social</h3>
                <div className="flex flex-col gap-3 mx-4">
                  <a
                    href="https://www.linkedin.com/in/tarek-diaz-carissimi"
                    className="inline-flex items-center gap-3 text-lg text-text/60 hover:text-text transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaLinkedinIn className="text-xl shrink-0" aria-hidden="true" />
                    LinkedIn
                  </a>
                </div>
              </FadeIn>

            </div>
          </div>
        </div>
  );
}