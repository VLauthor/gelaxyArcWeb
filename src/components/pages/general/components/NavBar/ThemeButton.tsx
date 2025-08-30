"use client";

import { cn } from "@/lib/utils";
import useTheme from "@/use/useTheme";
import { Moon, Sun } from "lucide-react";
import { useState } from "react";

export default function ThemeButton() {
  const { theme, setTheme } = useTheme();
  const [hover, setHover] = useState<boolean>(false);
  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-label="Toggle theme"
      className={cn(
        "relative group inline-flex items-center justify-center overflow-hidden",
        "h-10 w-10 rounded-2xl border shadow-2xl transition-all duration-200 ease-out active:brightness-90",
        "hover:scale-[1.03]",
        "hover:justify-start hover:pl-2",
        "hover:w-25 sm:hover:w-25",
        "text-foreground",
        theme === "light"
          ? "bg-background hover:bg-foreground"
          : "bg-background hover:bg-foreground"
      )}
    >
      {/* иконка */}
      <span className="flex items-center justify-center">
        {theme === "light" ? (
          <Sun width={24} height={24} color={hover ? "white" : "black"} />
        ) : (
          <Moon width={24} height={24} color={hover ? "black" : "white"} />
        )}
      </span>

      {/* подсказка: «выезжает» справа внутрь кнопки */}
      <div
        className="
        pointer-events-none absolute right-2 inset-y-0
        hidden sm:flex items-center gap-1
        opacity-0 translate-x-2
        group-hover:opacity-100 group-hover:translate-x-0
        transition-all duration-200
        whitespace-nowrap
      "
      >
        <kbd className="px-1.5 py-0.5 text-xs rounded-md border border-[var(--background)]/20 text-[var(--background)]/70 bg-[var(--background)]/5 backdrop-blur-sm">
          ⌥
        </kbd>
        <kbd className="px-1.5 py-0.5 text-xs rounded-md border border-[var(--background)]/20 text-[var(--background)]/70 bg-[var(--background)]/5 backdrop-blur-sm">
          T
        </kbd>
      </div>
    </button>
  );
}