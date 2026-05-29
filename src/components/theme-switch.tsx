"use client"

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "./icons";

interface ThemeSwitchProps {
    size?: number;
}

export default function ThemeSwitch({ size = 32 }: ThemeSwitchProps) {
    const [mounted, setMounted] = useState(false)
    const { setTheme, resolvedTheme } = useTheme()

    useEffect(() => setMounted(true), [])

    const toggleTheme = () => {
        const root = document.documentElement;

        root.classList.add("theme-transitioning");
        window.setTimeout(() => {
            root.classList.remove("theme-transitioning");
        }, 350);

        setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }

    if (!mounted) return (
        <button
            style={{ width: size, height: size }}
            className="rounded-4xl bg-text/10 animate-pulse items-center justify-center flex">
        </button>
    )

    return (
        <button
            style={{ width: size, height: size }}
            type="button"
            onClick={toggleTheme}
            className="flex items-center justify-center transition-colors duration-400 text-text/50 hover:text-text cursor-pointer"
        >
            {resolvedTheme === "dark" ? (
                <Sun size={20 + (size-32)}/>
            ) : (
                <Moon size={16 + (size-32)}/>
            )}
        </button>
    );
}