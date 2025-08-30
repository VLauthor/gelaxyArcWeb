"use client"

import { defBlur, defBorder } from "@/components";
import LiquidGlassEffect from "@/components/liquid-glass-effect";
import LineComponent from "@/components/ui/LineComponent";
import { cn } from "@/lib/utils";
import Image from "next/image";
import type React from "react";

export default function ProductBlock() {
  return (
    <div className="relative flex w-screen min-h-screen items-center justify-center overflow-hidden pb-12">
      <section className="relative w-full max-w-6xl mx-auto mt-16 px-6 flex flex-col items-center gap-12">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-8 bottom-0 mx-auto w-[110%] max-w-7xl opacity-60"
        >
          <div className="absolute inset-0 [mask-image:radial-gradient(100%_60%_at_50%_40%,black,transparent)]">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 120px), repeating-linear-gradient(0deg, rgba(255,255,255,0.06) 0, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 90px)",
              }}
            />
          </div>
        </div>
        <LineComponent shift="left-[33.6%]" />
        <LineComponent shift="left-0" />
        <LineComponent shift="right-[33.6%]" />
        <LineComponent shift="right-0" />
        {/* Обложка проекта */}
        <div className="flex flex-row items-center gap-6 w-full justify-between">
          <h3 className="text-5xl font-bold font-stretch-125% text-end">Наш проект</h3>
          <div className="group relative rounded-2xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/[0.03] backdrop-blur-3xl p-6 shadow-xl w-full py-9 cursor-target overflow-hidden">
            <LiquidGlassEffect />
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-b from-[var(--foreground)]/10 to-transparent pointer-events-none" />
            <h1 className="text-6xl font-bold font-stretch-125% text-center -500 w-full">Gelaxy Arc</h1>
          </div>
          <h3 className="text-5xl font-bold font-stretch-125%">Единая система</h3>
        </div>
        <div className="relative gap-8 flex flex-col">
          <LineComponent variant="horizontal" />
          {/* Верхние карты */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Искусственный интеллект */}
            <div className={cn("group relative rounded-2xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/[0.03] p-6 shadow-xl transform transition-transform duration-300 hover:scale-[1.02] cursor-target overflow-hidden", defBlur, defBorder)}>
              <LiquidGlassEffect />
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
              <Image
                src={"/images/1.jpg"}
                alt="Абстракция искусственного интеллекта в чёрно-белых тонах"
                className="w-full h-36 object-cover rounded-2xl filter grayscale mb-4"
                width={"100"}
                height={"100"}
                loading="lazy"
              />
              <div className="flex items-center gap-2">
                <h3 className=" text-lg font-semibold">Искусственный интеллект</h3>

              </div>
              <p className="/70 text-sm mt-2">
                Регулярные обновления ядра и модулей без простоя, с сохранением совместимости и автоматизацией через CI/CD.
              </p>
            </div>

            {/* Мгновенная интеграция */}
            <div className={cn("group relative rounded-2xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/[0.03] p-6 shadow-xl transform transition-transform duration-300 hover:scale-[1.02] cursor-target overflow-hidden", defBlur, defBorder)}>
              <LiquidGlassEffect />
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
              <img
                src={"/images/2.jpg"}
                alt="Чёрно-белая абстракция соединений и линий, символ интеграции"
                className="w-full h-36 object-cover rounded-2xl filter grayscale mb-4"
                loading="lazy"
              />
              <div className="flex items-center gap-2">
                <h3 className=" text-lg font-semibold">Мгновенная интеграция</h3>

              </div>
              <p className="/70 text-sm mt-2">
                Интерфейс с едиными паттернами, тёмной темой и шорткатами для быстрой и удобной работы.
              </p>
            </div>

            {/* За пределами экрана */}
            <div className={cn("group relative rounded-2xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/[0.03] p-6 shadow-xl transform transition-transform duration-300 hover:scale-[1.02] cursor-target overflow-hidden", defBlur, defBorder)}>
              <LiquidGlassEffect />
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
              <img
                src={"/images/3.jpg"}
                alt="Футуристичный интерфейс в чёрно-белых тонах"
                className="w-full h-36 object-cover rounded-2xl filter grayscale mb-4"
                loading="lazy"
              />
              <div className="flex items-center gap-2">
                <h3 className=" text-lg font-semibold">За пределами экрана</h3>

              </div>
              <p className="/70 text-sm mt-2">
                Единая кодовая база для веба и мобильных клиентов, с автоматической сборкой и тестированием.
              </p>
            </div>
          </div>
          <LineComponent variant="horizontal" />
          {/* Средние карты */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Обновляемость */}
            <div className={cn("group relative rounded-2xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/[0.03] p-6 shadow-xl transform transition-transform duration-300 hover:scale-[1.02] cursor-target overflow-hidden", defBlur, defBorder)}>
              <LiquidGlassEffect />
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
              <div className="mb-4">
                <svg width="36" height="36" viewBox="0 0 48 48" fill="none" aria-hidden>
                  <path d="M24 8a16 16 0 1 1-11.314 27.314" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400" />
                  <path d="M10 14v10h10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400" />
                </svg>
              </div>
              <div className="flex items-center gap-2">
                <h3 className=" text-lg font-semibold">Обновляемость</h3>

              </div>
              <p className="/70 text-sm mt-2">
                Регулярные обновления ядра и модулей без простоя, с сохранением совместимости и автоматизацией через CI/CD.
              </p>
            </div>

            {/* Удобство */}
            <div className={cn("group relative rounded-2xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/[0.03] p-6 shadow-xl transform transition-transform duration-300 hover:scale-[1.02] cursor-target overflow-hidden", defBlur, defBorder)}>
              <LiquidGlassEffect />
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
              <div className="mb-4">
                <svg width="36" height="36" viewBox="0 0 48 48" fill="none" aria-hidden>
                  <rect x="6" y="10" width="36" height="28" rx="6" stroke="currentColor" strokeWidth="3" className="text-emerald-400" />
                  <circle cx="16" cy="24" r="4" fill="currentColor" className="text-emerald-400" />
                  <rect x="24" y="18" width="14" height="4" rx="2" fill="currentColor" className="text-emerald-400" />
                  <rect x="24" y="26" width="10" height="4" rx="2" fill="currentColor" className="text-emerald-400" />
                </svg>
              </div>
              <div className="flex items-center gap-2">
                <h3 className=" text-lg font-semibold">Удобство</h3>

              </div>
              <p className="/70 text-sm mt-2">
                Интерфейс с едиными паттернами, тёмной темой и шорткатами для быстрой и удобной работы.
              </p>
            </div>

            {/* Кроссплатформенность */}
            <div className={cn("group relative rounded-2xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/[0.03] p-6 shadow-xl transform transition-transform duration-300 hover:scale-[1.02] cursor-target overflow-hidden", defBlur, defBorder)}>
              <LiquidGlassEffect />
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
              <div className="mb-4">
                <svg width="36" height="36" viewBox="0 0 64 48" fill="none" aria-hidden>
                  <rect x="4" y="8" width="36" height="26" rx="3" stroke="currentColor" strokeWidth="3" className="text-indigo-400" />
                  <rect x="46" y="14" width="14" height="20" rx="3" stroke="currentColor" strokeWidth="3" className="text-indigo-400" />
                  <rect x="14" y="36" width="16" height="4" rx="2" fill="currentColor" className="text-indigo-400" />
                </svg>
              </div>
              <div className="flex items-center gap-2">
                <h3 className=" text-lg font-semibold">Кроссплатформенность</h3>

              </div>
              <p className="/70 text-sm mt-2">
                Единая кодовая база для веба и мобильных клиентов, с автоматической сборкой и тестированием.
              </p>
            </div>
          </div>
          <LineComponent variant="horizontal" />
          {/* Нижние карты */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Легкость */}
            <div className={cn("group relative rounded-2xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/[0.03] p-6 shadow-xl transform transition-transform duration-300 hover:scale-[1.02] cursor-target overflow-hidden", defBlur, defBorder)}>
              <LiquidGlassEffect />
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
              <div className="mb-4">
                <svg width="36" height="36" viewBox="0 0 48 48" fill="none" aria-hidden>
                  <path d="M8 30c8-10 12 10 20 0s12 10 20 0" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-sky-300" />
                </svg>
              </div>
              <div className="flex items-center gap-2">
                <h3 className=" text-lg font-semibold">Легкость</h3>

              </div>
              <p className="/70 text-sm mt-2">
                Лёгкий интерфейс с lazy‑загрузкой, CDN‑кешированием и стримингом.
              </p>
            </div>

            {/* Безопасность */}
            <div className={cn("group relative rounded-2xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/[0.03] p-6 shadow-xl transform transition-transform duration-300 hover:scale-[1.02] cursor-target overflow-hidden", defBlur, defBorder)}>
              <LiquidGlassEffect />
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
              <div className="mb-4">
                <svg width="36" height="36" viewBox="0 0 48 48" fill="none" aria-hidden>
                  <path d="M24 6l14 6v10c0 10-7 16-14 20C17 38 10 32 10 22V12l14-6z" stroke="currentColor" strokeWidth="3" className="text-rose-400" fill="none" />
                  <path d="M18 22a6 6 0 1 0 12 0 6 6 0 1 0-12 0z" stroke="currentColor" strokeWidth="3" className="text-rose-400" />
                </svg>
              </div>
              <div className="flex items-center gap-2">
                <h3 className=" text-lg font-semibold">Безопасность</h3>

              </div>
              <p className="/70 text-sm mt-2">
                Шифрование, изоляция данных и проверка зависимостей для защиты пользователей.
              </p>
            </div>

            {/* Поддержка */}
            <div className={cn("group relative rounded-2xl border border-[var(--foreground)]/10 bg-[var(--foreground)]/[0.03] p-6 shadow-xl transform transition-transform duration-300 hover:scale-[1.02] cursor-target overflow-hidden", defBlur, defBorder)}>
              <LiquidGlassEffect />
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
              <div className="mb-4">
                <svg width="36" height="36" viewBox="0 0 48 48" fill="none" aria-hidden>
                  <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="3" className="text-amber-300" />
                  <path d="M18 28c0-3 3-4 6-4s6-1 6-4" stroke="currentColor" strokeWidth="3" className="text-amber-300" strokeLinecap="round" />
                  <circle cx="18" cy="20" r="2" fill="currentColor" className="text-amber-300" />
                  <circle cx="30" cy="20" r="2" fill="currentColor" className="text-amber-300" />
                </svg>
              </div>
              <div className="flex items-center gap-2">
                <h3 className=" text-lg font-semibold">Поддержка</h3>

              </div>
              <p className="/70 text-sm mt-2">
                Документация, обратная связь и SLA для быстрого решения вопросов.
              </p>
            </div>
          </div>
        </div>
      </section >
    </div >
  );
}