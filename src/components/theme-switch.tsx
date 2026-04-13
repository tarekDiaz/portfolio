"use client"

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "./icons";

interface ThemeSwitchProps {
    size?: number;
}

export default function ThemeSwitch({ size = 32 }: ThemeSwitchProps) {
    const [mounted, setMounted] = useState(false);
    const { setTheme, resolvedTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted) return (
        <button
            style={{ width: size, height: size }}
            className="rounded-4xl bg-text/80 cursor-pointer">
        </button>
    )

    return (
        <button
            style={{ width: size, height: size }}
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="flex items-center justify-center p-1.5 rounded-full text-text/40 transition-all duration-500 hover:text-text hover:bg-text/10 cursor-pointer"
            aria-label="Cambiar tema"
        >
            {resolvedTheme === "dark" ? (
                <Sun className="w-full h-full" />
            ) : (
                <Moon className="w-full h-full" />
            )}
        </button>
    );
}