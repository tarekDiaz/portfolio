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

    if (!mounted) return (
        <button
            style={{ width: size, height: size }}
            className="rounded-4xl bg-text/10 animate-pulse">
        </button>
    )

    return (
        <button
            style={{ width: size, height: size }}
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="flex items-center justify-center rounded-full transition-color duration-500 text-text/50 hover:text-text hover:bg-text/10 cursor-pointer"
        >
            {resolvedTheme === "dark" ? (
                <Sun/>
            ) : (
                <Moon/>
            )}
        </button>
    );
}