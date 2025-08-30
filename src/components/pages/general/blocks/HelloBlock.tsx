"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion } from "motion/react";
import AnimatedButton from "@/components/ui/AnimatedButton";
import LineComponent from "@/components/ui/LineComponent";
import LightRays from "../components/light-rays";
import ParticlesBackground from "@/components/particles-backgroud";
import useTheme from "@/use/useTheme";
import { cn } from "@/lib/utils";
import { defBlur, defBorder } from "@/components";
import LiquidGlassEffect from "@/components/liquid-glass-effect";

const texts = [
  "Контролируйте, следите и управляйте потоков данных в компании — всё в одном месте. Простая настройка. Быстрый старт.",
  "Синхронизируйте, защищайте и резервируйте корпоративную информацию — в закрытой экосистеме. Полный контроль. Абсолютная надёжность.",
  "Автоматизируйте, ускоряйте и упрощайте рутинные операции — с помощью умных алгоритмов. Лёгкое внедрение. Мгновенная отдача.",
  "Визуализируйте, отслеживайте и демонстрируйте показатели эффективности — на единой интерактивной панели. Наглядность данных. Убедительная аналитика.",
  "Организуйте, фильтруйте и структурируйте большие массивы данных — с интеллектуальной системой. Чистота информации. Точечный доступ.",
  "Интегрируйте, объединяйте и централизуйте разрозненные источники — в универсальном хабе. Исчерпывающая картина. Единая точка правды.",
  "Тестируйте, экспериментируйте и внедряйте инновации — без риска для основной инфраструктуры. Безопасные изменения. Быстрые итерации.",
  "Масштабируйте, адаптируйте и кастомизируйте рабочие потоки — под уникальные задачи вашей команды. Гибкие сценарии. Бесшовная эволюция.",
  "Коллаборируйте, координируйте и согласовывайте действия сотрудников — в цифровом пространстве. Прозрачность процессов. Синхронная работа.",
];

export default function HelloBlock() {
  const { theme } = useTheme();
  const [current, setCurrent] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clear = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    let i = typing ? 0 : texts[current].length;

    intervalRef.current = setInterval(() => {
      setDisplayed(texts[current].slice(0, typing ? ++i : --i));

      if (typing && i === texts[current].length) {
        clear();
        setTimeout(() => setTyping(false), 3000);
      } else if (!typing && i === 0) {
        clear();
        setCurrent((prev) => (prev + 1) % texts.length);
        setTyping(true);
      }
    }, typing ? 35 : 18);

    return clear;
  }, [typing, current, clear]);


  return (
    <div className="flex flex-col w-screen h-screen items-center justify-center overflow-y-visible">
      {
        theme === "dark" ? (
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={1.0}
            lightSpread={1.8}
            rayLength={1.8}
            followMouse={false}
            mouseInfluence={0.1}
            noiseAmount={0.32}
            distortion={0.05}
            className="absolute top-0 left-0 w-full h-screen -z-20 overflow-visible"
          />
        ) : (
          <ParticlesBackground
            particleColors={["black"]}
            particleCount={200}
            particleSpread={-4}
            speed={0.1}
            particleBaseSize={350}
            moveParticlesOnHover={false}
            alphaParticles={false}
            disableRotation={false}
            className="absolute top-0 left-0 w-full h-screen -z-20 overflow-visible"
          />
        )
      }

      <motion.div
        className={cn(
          "relative flex flex-col items-center justify-center gap-8 px-8 w-2/3 h-3/5 rounded-4xl overflow-hidden z-20",
          defBlur,
          defBorder
        )}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.05 }}
      >
        <LiquidGlassEffect />

        {/* декоративные линии */}
        {["left-2/6", "left-1/6", "right-2/6", "right-1/6"].map((shift) => (
          <LineComponent key={shift} shift={shift} />
        ))}

        <h1
          id="hello-title"
          className={cn(
            "text-center font-bold tracking-tight transition-colors duration-200",
            // Градиентный акцент + адаптивный размер
            "bg-gradient-to-b from-[var(--foreground)] to-[var(--foreground)]/60 bg-clip-text text-transparent",
            "text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
          )}
        >
          Galaxy Arc
        </h1>

        <LineComponent variant="horizontal" />

        {/* блок с текстом */}
        <div
          className={cn(
            "relative flex w-[60%] h-[150px] px-2 py-6 items-center rounded-2xl overflow-hidden",
            defBlur,
            defBorder
          )}
        >
          <LiquidGlassEffect />
          <motion.span
            className="text-xl leading-snug text-[var(--foreground)]/80 font-medium text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            {displayed}
          </motion.span>
        </div>

        <LineComponent variant="horizontal" />

        <div className="flex gap-8">
          <AnimatedButton label="Войти" whileHover="reverse" />
          <AnimatedButton label="Подробнее" whileHover="base" border="dashed" />
        </div>
      </motion.div>
    </div >
  );
}