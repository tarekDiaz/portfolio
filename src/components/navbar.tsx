"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, Settings, Globe } from "./icons";

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
  const [settingsOpen, setSettingsOpen] = useState(false);
  const pathname = usePathname();
  const lastScrollY = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

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
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <nav className={`w-full border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50 transition-transform duration-500 ${
        visible ? "translate-y-0" : "-translate-y-full"
      } md:translate-y-0`}>
      <div className="max-w-6xl mx-auto h-16 px-6 flex items-center justify-between">

        <Link href="/" className="text-xl font-bold">
          Tárek.dev
        </Link>

        <div className="flex items-center gap-4">
          {/* Desktop Links */}
          <div className="hidden md:flex gap-6 text-sm">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Settings Button */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setSettingsOpen(!settingsOpen)}
              className="p-2 rounded border border-zinc-700 text-zinc-200 transition-colors duration-200 hover:text-white cursor-pointer"
              aria-label="Settings"
            >
              <Settings width={16} height={16} />
            </button>

            {settingsOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded border border-zinc-800 bg-zinc-950/95 p-3 shadow-xl shadow-black/40 z-50">
                {/* Theme Options */}
                <div className="mb-3 pb-3 border-b border-zinc-700">
                  <p className="text-xs font-semibold text-zinc-400 mb-2 uppercase">Tema</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setTheme("dark");
                      }}
                      className={`flex-1 flex items-center justify-center gap-2 px-2 py-2 rounded text-sm transition-colors duration-200 ${
                        theme === "dark"
                          ? "bg-zinc-700 text-white"
                          : "bg-zinc-800/50 text-zinc-400 hover:text-white"
                      }`}
                    >
                      <Moon width={14} height={14} />
                      Oscuro
                    </button>
                    <button
                      onClick={() => {
                        setTheme("light");
                      }}
                      className={`flex-1 flex items-center justify-center gap-2 px-2 py-2 rounded text-sm transition-colors duration-200 ${
                        theme === "light"
                          ? "bg-zinc-700 text-white"
                          : "bg-zinc-800/50 text-zinc-400 hover:text-white"
                      }`}
                    >
                      <Sun width={14} height={14} />
                      Claro
                    </button>
                  </div>
                </div>

                {/* Language Options */}
                <div>
                  <p className="text-xs font-semibold text-zinc-400 mb-2 uppercase">Idioma</p>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLang(lang.code);
                        setSettingsOpen(false);
                      }}
                      className={`block w-full text-left px-3 py-2 text-sm transition-colors duration-200 cursor-pointer rounded mb-1 ${
                        currentLang === lang.code
                          ? "bg-zinc-700 text-white"
                          : "text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            ref={buttonRef}
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="md:hidden relative flex h-10 w-10 items-center justify-center rounded border border-zinc-700 text-zinc-200 transition-colors duration-200 hover:text-white cursor-pointer group"
            aria-expanded={open}
            aria-label="Toggle navigation menu"
          >
            <span className={`absolute block h-[2px] rounded-full bg-current transition-all duration-400 ${
              open
                ? "w-5 rotate-45"
                : "w-5 -translate-y-2 group-hover:w-5"
            }`} />
            <span className={`absolute block h-[2px] rounded-full bg-current transition-all duration-300 ${
              open
                ? "opacity-0"
                : "w-4 group-hover:w-5"
            }`} />
            <span className={`absolute block h-[2px] rounded-full bg-current transition-all duration-300 ${
              open
                ? "w-5 -rotate-45"
                : "w-3 translate-y-2 group-hover:w-5"
            }`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`md:hidden absolute right-0 top-full z-50 w-64 max-w-full border border-zinc-800 bg-zinc-950/95 p-4 shadow-xl shadow-black/40 transition-transform duration-400 ease-in ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <div className="flex flex-col gap-3 text-sm text-zinc-400">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block transition-colors duration-200 ${
                pathname === link.href
                  ? "text-white"
                  : "hover:text-white"
              }`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile Controls Separator */}
          <div className="border-t border-zinc-700 pt-3 mt-2">
            <div className="flex items-center justify-between gap-2">
              {/* Theme Toggle */}
              <button
                onClick={() => {
                  toggleTheme();
                }}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded border border-zinc-700 text-zinc-200 transition-colors duration-200 hover:text-white cursor-pointer"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="5"></circle>
                    <path d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m6.08 0l4.24-4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m6.08 0l4.24 4.24"></path>
                  </svg>
                ) : (
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                )}
              </button>

              {/* Language Selector */}
              <div className="relative flex-1">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded border border-zinc-700 text-zinc-200 transition-colors duration-200 hover:text-white cursor-pointer"
                  aria-label="Select language"
                >
                  <Globe width={16} height={16} />
                  <span className="text-sm font-medium">{currentLang.toUpperCase()}</span>
                </button>

                {langOpen && (
                  <div className="absolute bottom-full right-0 mb-2 w-40 rounded border border-zinc-800 bg-zinc-950/95 p-2 shadow-xl shadow-black/40 z-60">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setCurrentLang(lang.code);
                          setLangOpen(false);
                        }}
                        className={`block w-full text-left px-3 py-2 text-sm transition-colors duration-200 cursor-pointer ${
                          currentLang === lang.code
                            ? "text-white"
                            : "text-zinc-400 hover:text-white"
                        }`}
                      >
                        {lang.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}