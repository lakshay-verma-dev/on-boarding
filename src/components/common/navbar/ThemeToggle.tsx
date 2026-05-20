"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <button
            onClick={() =>
                setTheme(
                    theme === "dark"
                        ? "light"
                        : "dark"
                )
            }
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-card transition-all hover:bg-muted"
        >
            {theme === "dark" ? (
                <Sun
                    size={18}
                    className="text-yellow-400"
                />
            ) : (
                <Moon
                    size={18}
                    className="text-muted-foreground"
                />
            )}
        </button>
    );
}