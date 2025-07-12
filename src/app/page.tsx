"use client";
import { useState, useEffect } from "react";
import VoiceWaveCard from "@/components/graph/ForceGraphSection";
import ProductFeaturesBlock from "./ProductFeaturesBlock";
import AnimatedCard from "./AnimatedCard";
import RotatingHero from "./RotatingHero";
import LazyRender from "@/components/LazyRender";
import FeaturesGrid from "./FeaturesGrid";
import CustomCursor from "@/components/CustomCursor";
import { motion, useSpring, useScroll } from "motion/react"


export default function Home() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorSize, setCursorSize] = useState(16);
  const [hoveredRect, setHoveredRect] = useState<DOMRect | null>(null);
  const [isFixed, setIsFixed] = useState(false);
  const [click, setClick] = useState(false);
  const [actionRegistered, setActionRegistered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isFixed) {
        setCursorSize(16);
      }
    };

    const handleRightMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        setClick(true);
      }
    };
    const handleRightMouseUp = (e: MouseEvent) => {
      if (e.button === 0) {
        setClick(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleRightMouseDown);
    window.addEventListener("mouseup", handleRightMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleRightMouseDown);
      window.removeEventListener("mouseup", handleRightMouseUp);
    };
  }, [isFixed]);

  return (
    <div className="flex flex-col items-center bg-[#080f1a] cursor-default">
      <motion.div
        id="scroll-indicator"
        className="z-50 bg-gradient-to-l via-blue-500 to-sky-400 opacity-100"
        style={{
          scaleX,
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: 10,
          originX: 0,
        }}
      />
      <CustomCursor
        mousePos={mousePos}
        click={click}
        cursorSize={cursorSize}
        hoveredRect={hoveredRect}
        isFixed={isFixed}
        actionRegistered={actionRegistered}
      />
      <header>

      </header>
      <main className="relative min-h-screen w-screen overflow-hidden flex flex-col items-center justify-center ">
        {/* Градиентный слой */}
        <div className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 80% 30%, #372fac60 20%, bg-[#03033120] 70%)',
            opacity: 0.55,
            mixBlendMode: 'screen',
          }}
        />
        {/* Сетка */}
        <div className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: `
        linear-gradient(0deg, rgba(255,255,255,0.08) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
      `,
            backgroundSize: '48px 48px',
            opacity: 0.45,
            transform: 'rotate(-0deg)',
          }}
        />
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute left-[-120px] top-[-120px] w-2/5 h-[300px] bg-indigo-500 opacity-40 blur-3xl rounded-full" />
        </div>

        {/* Контент */}
        <LazyRender>
          {(inView) => (
            <div className="flex w-screen h-screen flex-row items-center justify-center gap-3">
              <div className="w-1/2 flex items-center justify-center flex-col h-full text-white gap-2">
                <VoiceWaveCard
                  active={inView}
                  onHover={(rect: DOMRect, newContent?: boolean) => {
                    setHoveredRect(rect);
                    setIsFixed(true);
                    setCursorSize(Math.max(rect.width, rect.height) / 2);
                    setMousePos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
                    setActionRegistered(newContent || false);
                  }}
                  onLeave={() => {
                    setIsFixed(false);
                    setHoveredRect(null);
                    setActionRegistered(false);
                  }}
                />
              </div>
              <AnimatedCard
                active={inView}
                onHover={(rect: DOMRect, newContent?: boolean) => {
                  setHoveredRect(rect);
                  setIsFixed(true);
                  setCursorSize(Math.max(rect.width, rect.height) / 2);
                  setMousePos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
                  setActionRegistered(newContent || false);
                }}
                onLeave={() => {
                  setIsFixed(false);
                  setHoveredRect(null);
                  setActionRegistered(false);
                }} />
            </div>
          )}
        </LazyRender>
        <LazyRender>
          {(inView) => <RotatingHero
            active={inView}
            onHover={(rect: DOMRect, newContent?: boolean) => {
              setHoveredRect(rect);
              setIsFixed(true);
              setCursorSize(Math.max(rect.width, rect.height) / 2);
              setMousePos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
              setActionRegistered(newContent || false);
            }}
            onLeave={() => {
              setIsFixed(false);
              setHoveredRect(null);
              setActionRegistered(false);
            }} />}
        </LazyRender>
        <LazyRender>
          {(inView) => <ProductFeaturesBlock
            active={inView}
            onHover={(rect: DOMRect, newContent?: boolean) => {
              setHoveredRect(rect);
              setIsFixed(true);
              setCursorSize(Math.max(rect.width, rect.height) / 2);
              setMousePos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
              setActionRegistered(newContent || false);
            }}
            onLeave={() => {
              setIsFixed(false);
              setHoveredRect(null);
              setActionRegistered(false);
            }}
          />}
        </LazyRender>

        <LazyRender>
          {(inView) => (
            <FeaturesGrid
              active={inView}
              onHover={(rect: DOMRect, newContent?: boolean) => {
                setHoveredRect(rect);
                setIsFixed(true);
                setCursorSize(Math.max(rect.width, rect.height) / 2);
                setMousePos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
                setActionRegistered(newContent || false);
              }}
              onLeave={() => {
                setIsFixed(false);
                setHoveredRect(null);
                setActionRegistered(false);
              }}
            />
          )}
        </LazyRender>
      </main>



      <footer>
      </footer>
    </div >
  );
}
