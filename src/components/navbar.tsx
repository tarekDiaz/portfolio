"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, Hamsa } from "./icons";

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
  const [theme, setTheme] = useState("dark");
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
  }, [open]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <nav className={`w-full sticky top-0 z-50 transition-transform duration-500 ${visible ? "translate-y-0" : "-translate-y-full"
      } md:translate-y-0`}>
      {/* Header Bar Layer */}
      <div className="w-full h-16 px-4 flex items-center justify-between relative z-50 bg-zinc-950/10 backdrop-blur-md">

        <Link href="/" className="text-xl font-bold flex items-center gap-2.5">
          <Hamsa width={28} height={28} className="text-white" />
          <span>Carissimi</span>
        </Link>

        {/* Desktop Links - Centered */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-[max(1.5rem,6vw)] text-sm whitespace-nowrap">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors duration-200 ${pathname === link.href
                ? "text-white"
                : "text-zinc-400 hover:text-white"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">

          {/* Desktop Controls */}
          <div className="hidden md:flex items-center gap-1.5">
            {/* Flat Language Selector (Desktop) */}
            <div className="flex items-center gap-3 px-2">
              {languages.map((lang, index) => (
                <div key={lang.code} className="flex items-center gap-3">
                  <button
                    onClick={() => setCurrentLang(lang.code)}
                    className={`text-xs font-medium uppercase transition-colors duration-200 cursor-pointer ${currentLang === lang.code
                      ? "text-white"
                      : "text-zinc-500 hover:text-zinc-300"
                      }`}
                  >
                    {lang.code}
                  </button>
                  {index < languages.length - 1 && (
                    <span className="text-zinc-800 text-[10px]">|</span>
                  )}
                </div>
              ))}
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="h-9 w-9 flex items-center justify-center rounded-4xl text-zinc-400 transition-all duration-200 hover:text-white hover:bg-white/10 cursor-pointer"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              {theme === "dark" ? (
                <Sun width={18} height={18} />
              ) : (
                <Moon width={18} height={18} />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="md:hidden relative flex h-10 w-10 items-center justify-center text-zinc-200 transition-colors duration-200 hover:text-white cursor-pointer group"
            aria-expanded={open}
            aria-label="Toggle navigation menu"
          >
            <span className={`absolute block h-[2px] rounded-full bg-current transition-all duration-400 ${open
              ? "w-5 rotate-45"
              : "w-5 -translate-y-2 group-hover:w-5"
              }`} />
            <span className={`absolute block h-[2px] rounded-full bg-current transition-all duration-300 ${open
              ? "opacity-0"
              : "w-4 group-hover:w-5"
              }`} />
            <span className={`absolute block h-[2px] rounded-full bg-current transition-all duration-300 ${open
              ? "w-5 -rotate-45"
              : "w-3 translate-y-2 group-hover:w-5"
              }`} />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Layer */}
      <div
        ref={menuRef}
        className={`md:hidden fixed inset-x-0 top-0 z-40 bg-background/50 backdrop-blur-md p-8 pt-24 border-b border-zinc-600 transition-all duration-500 ease-in-out [clip-path:inset(4rem_0_0_0)] ${open ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 invisible pointer-events-none"
          }`}
        aria-hidden={!open}
      >
        <div className="flex flex-col gap-5 text-md text-zinc-400">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block transition-colors duration-200 ${pathname === link.href
                ? "text-white"
                : "hover:text-white"
                }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Controls Footer */}
          <div className="border-t border-zinc-700 pt-2 mt-4">
            <div className="flex items-center justify-between">
              {/* Theme Toggle (Left) */}
              <button
                onClick={toggleTheme}
                className="h-10 w-10 flex items-center justify-center rounded-4xl text-zinc-400 transition-all duration-200 hover:text-white bg-white/10"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              >
                {theme === "dark" ? (
                  <Sun width={20} height={20} />
                ) : (
                  <Moon width={20} height={20} />
                )}
              </button>

              {/* Flat Language Selector (Right) */}
              <div className="flex items-center gap-3">
                {languages.map((lang, index) => (
                  <div key={lang.code} className="flex items-center gap-3">
                    <button
                      onClick={() => setCurrentLang(lang.code)}
                      className={`text-sm font-medium uppercase transition-colors duration-200 cursor-pointer ${currentLang === lang.code
                        ? "text-lime-400"
                        : "text-zinc-500 hover:text-lime-400"
                        }`}
                    >
                      {lang.code}
                    </button>
                    {index < languages.length - 1 && (
                      <span className="text-zinc-800 text-xs">|</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}