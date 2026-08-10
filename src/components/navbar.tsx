"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitch from "./theme-switch";
import EyeLogo from "./icons/EyeLogo";
import { motion } from "framer-motion";

import { useLocale } from "./locale-provider";

const links = [
  { href: "/about", key: "navbar.about" },
  { href: "/projects", key: "navbar.projects" },
  { href: "/contact", key: "navbar.contact" },
];

const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "ca", label: "Català" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [langOpen, setLangOpen] = useState(false);

  const pathname = usePathname();
  const lastScrollY = useRef(0);

  const { locale, setLocale, t } = useLocale();

  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const langMenuRef = useRef<HTMLDivElement>(null);
  const langButtonRef = useRef<HTMLButtonElement>(null);

  const getLinkClassName = (isActive: boolean) =>
    `transition-all duration-300 ${
      isActive ? "gradient-text font-bold" : "text-text/50 hover:text-text"
    }`;

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const delta = currentScroll - lastScrollY.current;

      if (Math.abs(delta) < 10) return;

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
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, langOpen]);

  return (
    <>
      <nav
        className={`
          fixed inset-x-0 top-10 z-50 
          w-60 h-14 
          md:h-10 md:w-125 
          left-1/2 -translate-x-1/2 
          transition-all duration-500
        `}
      >
        <motion.div
          className="
            absolute left-1/2 top-0 h-full -translate-x-1/2
            grid grid-cols-3 items-center justify-center overflow-visible
            md:grid-cols-5
            bg-background md:bg-text/10 rounded-full
            hover:bg-background border-2 border-text/0 hover:border-text/10 
            transition-all duration-300
          "
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Desktop Links */}
          {links.map((link, index) => {
            const columnClass =
              index === 0
                ? "md:col-start-1"
                : index === 1
                  ? "md:col-start-2"
                  : "md:col-start-4";

            return (
              <div key={link.href} className={`justify-self-center hidden md:block ${columnClass}`}>
                <Link href={link.href} className={getLinkClassName(pathname === link.href)}>
                  {t(link.key)}
                </Link>
              </div>
            );
          })}

          {/* Language + Theme */}
          <div className="justify-self-center hidden md:block md:col-start-5 relative">
            <div className="grid grid-cols-2 items-center w-23 h-8 px-2 bg-background/50 rounded-full transition-colors duration-1000">
              <button
                ref={langButtonRef}
                onClick={() => setLangOpen((prev) => !prev)}
                className="text-text/55 justify-self-center px-2 py-1 rounded hover:text-text transition-colors"
              >
                {locale}
              </button>

              <div className="justify-self-center items-center">
                <ThemeSwitch />
              </div>
            </div>

            {langOpen && (
              <div
                ref={langMenuRef}
                className="
                  absolute top-full mt-3 left-1/2 -translate-x-1/2
                  w-full overflow-hidden
                  rounded-xl
                  bg-background/95
                  backdrop-blur-xl
                  shadow-2xl
                  z-50
                "
              >
                {languages.map((lang) => {
                  return (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLocale(lang.code as any);
                        setLangOpen(false);
                      }}
                      className={`
                        w-full text-left px-4 py-3 text-sm transition-all duration-150 flex items-center justify-between
                        ${locale === lang.code ? "text-text bg-text/10 font-medium" : "text-text/70 hover:text-text hover:bg-text/5"}
                      `}
                    >
                      <span>{lang.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Mobile Burger */}
          <div className="justify-self-center md:hidden">
            <button
              ref={buttonRef}
              type="button"
              onClick={() => setOpen((current) => !current)}
              className="
                relative ml-auto flex h-10 w-10 items-center justify-center
                text-text/60 transition-all duration-200
                hover:text-text cursor-pointer group
              "
              aria-expanded={open}
              aria-label="Open navigation menu"
            >
              <span
                className={`
                  absolute block h-0.5 rounded-full bg-text transition-all duration-400
                  ${
                    open
                      ? "w-7 rotate-45"
                      : "w-7 -translate-y-1.5 group-hover:w-7"
                  }
                `}
              />

              <span
                className={`
                  absolute block h-0.5 rounded-full bg-text transition-all duration-300
                  ${
                    open
                      ? "w-7 -rotate-45"
                      : "w-4 translate-y-1.5 group-hover:w-7"
                  }
                `}
              />
            </button>
          </div>

          <div className="justify-self-center md:hidden"></div>

          <div className="justify-self-center md:hidden">
            <div className="text-text justify-self-center text-xl uppercase">
              {locale.toUpperCase()}
            </div>
          </div>
        </motion.div>

        {/* Logo */}
        <div className="
          absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 
          flex items-center justify-center 
          bg-background rounded-full w-22.5 h-22.5 
          transition-color duration-1000
          border-3 border-text/10
          scale-120 md:scale-100">
          <Link href="/" aria-label="Go to home" className="block">
            <EyeLogo
              width={75}
              height={75}
              eyeColor={pathname === "/" ? "var(--primary)" : "var(--background)"}
              color="var(--text)"
              className="hover:scale-98 transition-all duration-300"
            />
          </Link>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={menuRef}
        className={`
          md:hidden fixed inset-0 z-40
          bg-background/55 backdrop-blur-2xl
          transition-all duration-500 ease-in-out
          ${
            open
              ? "opacity-100 visible pointer-events-auto"
              : "opacity-0 invisible pointer-events-none"
          }
        `}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col items-center pt-40 pb-10 px-10">
          <div className="flex flex-col items-center justify-center gap-15">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`
                  block transition-all duration-200 text-4xl
                  ${
                    pathname === link.href
                      ? "gradient-text font-medium scale-105"
                      : "text-text hover:text-text font-light"
                  }
                `}
              >
                {t(link.key)}
              </Link>
            ))}
          </div>

          <div className="mt-auto w-full">
            <div className="border-t border-text/20 mb-5 w-full"></div>

            <div className="flex w-full items-center gap-4 px-4">
              <ThemeSwitch size={45} />

              <div className="ml-auto flex items-center gap-3 justify-end">
                {languages.map((lang, index) => (
                  <div
                    key={lang.code}
                    className="flex items-center gap-3 leading-none"
                  >
                    {(() => {
                      return (
                        <button
                          onClick={() => setLocale(lang.code as any)}
                          className={`
                            text-xl uppercase transition-all duration-200
                            ${
                              locale === lang.code
                                ? "gradient-text scale-105 font-medium"
                                : "text-text hover:text-text font-light cursor-pointer"
                            }
                          `}
                        >
                          {lang.code}
                        </button>
                      );
                    })()}

                    {index < languages.length - 1 && (
                      <span className="text-text/10 text-xs">|</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}