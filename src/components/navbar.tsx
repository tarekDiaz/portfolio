"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, Icon } from "./icons";
import ThemeSwitch from "./theme-switch";

const links = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Proyectos" },
  { href: "/contact", label: "Contact" },
];

const languages = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
  { code: "ca", label: "Català" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("es");
  const pathname = usePathname();
  const lastScrollY = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const langButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const delta = currentScroll - lastScrollY.current;

      if (Math.abs(delta) < 10) {
        return;
      }

      if (currentScroll <= 0) {
        setVisible(true);
      } else if (delta > 0 && currentScroll > 50) {
        setVisible(false);
        setOpen(false);
      } else if (delta < 0) {
        setVisible(true);
      }

      lastScrollY.current = currentScroll;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }

      if (
        langMenuRef.current &&
        langButtonRef.current &&
        !langMenuRef.current.contains(event.target as Node) &&
        !langButtonRef.current.contains(event.target as Node)
      ) {
        setLangOpen(false);
      }
    };

    if (open || langOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open, langOpen]);

  return (
    <nav className={`w-full sticky top-0 z-50 transition-transform duration-500 ${visible ? "translate-y-0" : "-translate-y-full"
      } md:translate-y-0`}>
      {/* Header Bar Layer - Flex on mobile, Grid on desktop */}
      <div className="w-full h-20 px-5 flex justify-between md:grid md:grid-cols-3 items-center relative z-50 backdrop-blur-md border-b-2 border-text/10">

        {/* Column 1: Logo & Name (Left Aligned) */}
        <div className="flex justify-start">
          <Link href="/" className="flex items-center gap-1 group">
            <Icon
              width={40}
              height={40}
              className="transition-transform duration-300 group-hover:scale-110 pb-0.5"
              eyeColor="var(--theme-background)"
            />
            <span className= "hidden md:block text-2xl font-semibold tracking-tight">Carissimi</span>
          </Link>
        </div>

        {/* Column 2: Navigation Links*/}
        <div className="hidden md:flex justify-center items-center gap-[max(1.5rem,7vw)] text-sm whitespace-nowrap">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-all duration-300 ${pathname === link.href
                ? "font-medium text-customlime scale-120"
                : "text-text/50 hover:text-customlime font-light"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Language and Theme */}
        <div className="flex justify-end items-center">
          <div className="hidden md:flex items-center gap-5">
            <div className="flex items-center gap-1">
              {languages.map((lang, index) => (
                <div key={lang.code} className="flex items-center gap-3">
                  <button
                    onClick={() => setCurrentLang(lang.code)}
                    className={`text-sm font-medium uppercase duration-200 cursor-pointer ${currentLang === lang.code
                      ? "text-text scale-105"
                      : "text-text/30 hover:text-text/70"
                      }`}
                  >
                    {lang.code}
                  </button>
                  {index < languages.length - 1 && (
                    <span className="text-theme-text/10 text-[10px]">|</span>
                  )}
                </div>
              ))}
            </div>
            <ThemeSwitch/>
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="md:hidden relative flex h-10 w-10 items-center justify-center transition-all duration-200 text-text/60 hover:text-text cursor-pointer group"
            aria-expanded={open}
          >
            <span className={`absolute block h-0.5 rounded-full bg-current transition-all duration-400 ${open
              ? "w-8 rotate-45"
              : "w-8 -translate-y-3 group-hover:w-8"
              }`} />
            <span className={`absolute block h-0.5 rounded-full bg-current transition-all duration-300 ${open
              ? "opacity-0"
              : "w-6 group-hover:w-8"
              }`} />
            <span className={`absolute block h-0.5 rounded-full bg-current transition-all duration-300 ${open
              ? "w-8 -rotate-45"
              : "w-4 translate-y-3 group-hover:w-8"
              }`} />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Layer */}
      <div
        ref={menuRef}
        className={`md:hidden fixed inset-x-0 top-0 z-40 backdrop-blur-md px-10 pt-30 pb-4 border-b border-text/10 transition-all duration-500 ease-in-out [clip-path:inset(4rem_0_0_0)] ${open ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 invisible pointer-events-none"
          }`}
        aria-hidden={!open}
      >
        <div className="flex flex-col">
          <div className="flex flex-col gap-6 items-center justify-center">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block transition-all duration-200 ${pathname === link.href
                  ? "text-text font-medium scale-105"
                  : "text-text/70 hover:text-text font-light"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Controls Footer */}
          <div className="border-t border-text/20 mt-10 mb-5">
          </div>

          <div className="flex items-center justify-between pr-5 ml-5">
            <ThemeSwitch/>

            {/* Flat Language Selector (Right) */}
            <div className="flex items-center gap-3">
              {languages.map((lang, index) => (
                <div key={lang.code} className="flex items-center gap-3">
                  <button
                    onClick={() => setCurrentLang(lang.code)}
                    className={`text-sm uppercase transition-all duration-200 cursor-pointer ${currentLang === lang.code
                      ? "text-text scale-105 font-medium"
                      : "text-text/60 hover:text-text font-light"
                      }`}
                  >
                    {lang.code}
                  </button>
                  {index < languages.length - 1 && (
                    <span className="text-text/10 text-xs">|</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}