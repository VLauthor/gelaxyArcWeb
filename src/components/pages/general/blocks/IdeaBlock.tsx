"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import LineComponent from "@/components/ui/LineComponent";
import LiquidGlassEffect from "@/components/liquid-glass-effect";

const banners = [
  {
    img: "https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=1600&auto=format&fit=crop",
    title: "Свободное общение",
    desc: "Личные и групповые чаты, обсуждения по интересам и быстрые реакции — общайся без ограничений.",
  },
  {
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1600&auto=format&fit=crop",
    title: "Контроль задач",
    desc: "Планируй, назначай и отслеживай прогресс. Дедлайны, чек-листы и напоминания — всё под рукой.",
  },
  {
    img: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?q=80&w=1600&auto=format&fit=crop",
    title: "Лента событий",
    desc: "Единая хроника действий друзей, команд и проектов. Важное — всегда наверху.",
  },
  {
    img: "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?q=80&w=1600&auto=format&fit=crop",
    title: "Друзья",
    desc: "Находи и добавляй людей, следи за активностью близких и развивай сообщество.",
  },
  {
    img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1600&auto=format&fit=crop",
    title: "Кастомизация интерфейса",
    desc: "Темы, виджеты и настройка навигации. Собери интерфейс под себя.",
  },
  {
    img: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1600&auto=format&fit=crop",
    title: "Личный рост",
    desc: "Цели, трекеры привычек и курсы. Прокачивай навыки и фиксируй прогресс.",
  },
  {
    img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1600&auto=format&fit=crop",
    title: "Управление бизнесом",
    desc: "Проекты, отчёты и финансы в одном месте. Сквозная аналитика и права доступа.",
  },
  {
    img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1600&auto=format&fit=crop",
    title: "Поиск работы",
    desc: "Вакансии, отклики и рекомендации. Создай профиль и находи предложения как в Headhunter.",
  },
];

export default function IdeaBlock() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const isHoveringRef = useRef(false);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const wheelTimeoutRef = useRef<number | null>(null);
  const isPointerDownRef = useRef(false);
  const pointerStartXRef = useRef(0);
  const resumeTimeoutRef = useRef<number | null>(null);

  const clearResume = useCallback(() => {
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }
  }, []);

  const scheduleResume = useCallback((ms: number) => {
    clearResume();
    resumeTimeoutRef.current = window.setTimeout(() => {
      isHoveringRef.current = false;
    }, ms);
  }, [clearResume]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const speed = 40;
    let last = performance.now();

    const step = (t: number) => {
      if (!scrollerRef.current) return;
      const dt = Math.min(100, t - last);
      last = t;

      if (!isHoveringRef.current) {
        const el2 = scrollerRef.current;
        if (el2) {
          const max = el2.scrollWidth;
          const view = el2.clientWidth;
          if (max > view + 1) {
            el2.scrollLeft += (speed * dt) / 1000;
            if (el2.scrollLeft >= max - view - 1) {
              el2.scrollLeft = 0;
            }
          }
        }
      }
      rafRef.current = requestAnimationFrame(step);
    };

    const onVisibility = () => {
      if (document.hidden && rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      } else if (!document.hidden && !rafRef.current) {
        last = performance.now();
        rafRef.current = requestAnimationFrame(step);
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    rafRef.current = requestAnimationFrame(step);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      const horizontalIntent = Math.abs(e.deltaY) > Math.abs(e.deltaX);
      if (horizontalIntent && !e.ctrlKey) {
        e.preventDefault();
        isHoveringRef.current = true;
        el.scrollLeft += e.deltaY;
        if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
        wheelTimeoutRef.current = window.setTimeout(() => {
          isHoveringRef.current = false;
        }, 400);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    draggingRef.current = true;
    isHoveringRef.current = true;
    startXRef.current = e.clientX;
    startScrollLeftRef.current = el.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el || !draggingRef.current) return;
    const dx = e.clientX - startXRef.current;
    el.scrollLeft = startScrollLeftRef.current - dx;
  };

  const handleMouseUpOrLeave = () => {
    draggingRef.current = false;
    scheduleResume(600);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    isPointerDownRef.current = true;
    isHoveringRef.current = true;
    pointerStartXRef.current = e.clientX;
    startScrollLeftRef.current = el.scrollLeft;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el || !isPointerDownRef.current) return;
    const dx = e.clientX - pointerStartXRef.current;
    el.scrollLeft = startScrollLeftRef.current - dx;
  };

  const handlePointerUpOrCancel = () => {
    isPointerDownRef.current = false;
    scheduleResume(600);
  };

  return (
    <div className="relative flex flex-col w-screen h-screen items-center justify-center gap-4 overflow-visible">
      {["left-2/6", "left-1/6", "right-2/6", "right-1/6"].map((shift) => (
        <LineComponent key={shift} shift={shift} />
      ))}

      <motion.h1
        id="hello-title"
        className="text-center font-extrabold tracking-tight mb-6 bg-gradient-to-b from-[var(--foreground)] to-[var(--foreground)]/60 bg-clip-text text-transparent text-4xl sm:text-5xl md:text-6xl lg:text-7xl flex flex-col gap-4"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        role="heading"
        aria-level={1}
      >
        Наши цели
      </motion.h1>

      <LineComponent variant="horizontal" />

      <div className="relative z-10 overflow-visible">
        <div
          ref={scrollerRef}
          onMouseEnter={() => {
            isHoveringRef.current = true;
            clearResume();
          }}
          onMouseLeave={handleMouseUpOrLeave}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUpOrCancel}
          onPointerCancel={handlePointerUpOrCancel}
          className="relative z-20 w-11/12 max-w-7xl overflow-x-auto overflow-y-visible will-change-transform scrollbar-none hide-scrollbar"
          role="region"
          aria-label="Лента идей"
        >
          <div className="flex gap-8 w-max py-6">
            {[...banners, ...banners].map((b, idx) => (
              <motion.div
                key={idx}
                className="group relative w-[340px] h-[400px] rounded-2xl overflow-hidden bg-gradient-to-b from-[var(--background)]/30 to-[var(--background)]/10 shadow-lg border border-[var(--foreground)]/10 hover:border-[var(--foreground)]/40 transition-all duration-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.04, rotate: 0.2 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={b.img}
                  alt={b.title}
                  className="h-[400px] w-full object-cover pointer-events-none select-none group-hover:scale-110 transition-transform duration-700"
                  draggable={false}
                />
                <motion.div
                  className="absolute inset-0 z-10 rounded-2xl overflow-hidden"
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                  variants={{
                    rest: { y: "calc(100% - 130px)" },
                    hover: { y: "0px" },
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <LiquidGlassEffect />
                  <div className="h-full px-5 py-5 bg-[var(--background)]/80 backdrop-blur-md flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{b.title}</h3>
                      <p className="text-[var(--foreground)]/80 text-sm leading-relaxed mb-3 line-clamp-3">
                        {b.desc}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.2, rotate: -2 }}
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                      className="relative z-10 mb-3 px-2 py-2 text-white text-md font-bold overflow-hidden bg-black rounded-[0.625em] hover:text-black before:content-[''] before:absolute before:inset-0 before:-left-[20%] before:-right-[20%] before:top-0 before:bottom-0 before:bg-white before:-skew-x-[45deg] before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-500 before:z-[-1] border-dashed border-1 hover:border-white/50 border-white/50 hover:border-dashed cursor-none cursor-target"
                    >Подробнее</motion.button>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <LineComponent variant="horizontal" />
      <p className="text-lg text-[var(--foreground)]/80 mb-12 text-center max-w-3xl">
        Мы стремимся к созданию инновационных решений, которые помогут компаниям
        оптимизировать процессы, повысить безопасность и ускорить рост.
      </p>
    </div>
  );
}
