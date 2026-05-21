"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-card" />
        );
    }

    const isDark = resolvedTheme === "dark";

    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-2xl border border-border bg-card transition-all hover:bg-muted hover:border-primary/30 active:scale-95 duration-200"
            aria-label="Toggle theme"
        >
            {isDark ? (
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