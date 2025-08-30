"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");

  // Загружаем тему из localStorage при монтировании
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    } else {
      // если темы нет — ставим дефолт
      document.documentElement.classList.add("light");
    }
  }, []);

  // Когда тема меняется — сохраняем в localStorage и обновляем class
  useEffect(() => {
    localStorage.setItem("theme", theme);

    // очищаем класс и ставим текущую тему
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement | null;
      const isTyping =
        !el ? false :
          el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          el.isContentEditable;

      if (isTyping) return;

      if (e.shiftKey && e.key.toLowerCase() === "t") {
        e.preventDefault();
        setTheme(prev => (prev === "light" ? "dark" : "light"));
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return { theme, setTheme };
}