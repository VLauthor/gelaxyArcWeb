"use client"
import React, { useRef, useState, useLayoutEffect } from "react";
import { BsPuzzle, BsChatDots, BsMouse } from "react-icons/bs";
import { MdOutlineAnalytics, MdDescription } from "react-icons/md";
import { FaRegMoneyBillAlt, FaUsers } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";
import { TbSettingsAutomation } from "react-icons/tb";

type Feature = {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
};

const leftFeatures: Feature[] = [
  { icon: <FaUsers size={22} />, label: "Удобство", value: "Прямое взаимодействие", color: "from-[#3e7afe] to-[#a166ff]" },
  { icon: <BsMouse size={22} />, label: "Связанность", value: "Централизованная система", color: "from-[#5dc7fe] to-[#8ecbfc]" },
  { icon: <BsPuzzle size={22} />, label: "Легкость", value: "Удобная интеграция", color: "from-[#6ee7b7] to-[#3b82f6]" },
  { icon: <HiOutlineUserGroup size={22} />, label: "Безопасность", value: "Шифрование на каждом шаге", color: "from-[#f7971e] to-[#ffd200]" },
];
const rightFeatures: Feature[] = [
  { icon: <MdDescription size={22} />, label: "Кроссплатформенность", value: "Web, iOS, Android", color: "from-[#a166ff] to-[#3e7afe]" },
  { icon: <MdOutlineAnalytics size={22} />, label: "Поддержка", value: "24/7", color: "from-[#f9a8d4] to-[#f472b6]" },
  { icon: <FaRegMoneyBillAlt size={22} />, label: "Обновляемость", value: "Автоматические апдейты", color: "from-[#ffd200] to-[#f7971e]" },
  { icon: <BsChatDots size={22} />, label: "Интерактивность", value: "Live-чат и боты", color: "from-[#ff5858] to-[#f09819]" },
];

export default function ProductFeaturesBlock() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const leftRefs = useRef<Array<HTMLDivElement | null>>(Array(leftFeatures.length).fill(null));
  const rightRefs = useRef<Array<HTMLDivElement | null>>(Array(rightFeatures.length).fill(null));
  const [lines, setLines] = useState<JSX.Element[]>([]);

  // Recalculate lines positions
  const updateLines = () => {
    if (!wrapperRef.current || !centerRef.current) return;
    const wrap = wrapperRef.current.getBoundingClientRect();
    const center = centerRef.current.getBoundingClientRect();
    const cx = center.left + center.width / 2 - wrap.left;
    const cy = center.top + center.height / 2 - wrap.top;
    const newLines: JSX.Element[] = [];

    leftRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x1 = r.right - wrap.left;
      const y1 = r.top + r.height / 2 - wrap.top;
      newLines.push(
        <path
          className="flow-line"
          key={`left-${i}`}
          d={`M ${x1} ${y1} C ${x1 + 40} ${y1}, ${cx - 40} ${cy}, ${cx} ${cy}`}
          stroke={`url(#grad-left-${i})`}
          strokeWidth={3}
          fill="none"
          filter="url(#glow)"
        />
      );
    });

    rightRefs.current.forEach((el, i) => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const x1 = r.left - wrap.left;
      const y1 = r.top + r.height / 2 - wrap.top;
      newLines.push(
        <path
          className="flow-line"
          key={`right-${i}`}
          d={`M ${x1} ${y1} C ${x1 - 40} ${y1}, ${cx + 40} ${cy}, ${cx} ${cy}`}
          stroke={`url(#grad-right-${i})`}
          strokeWidth={3}
          fill="none"
          filter="url(#glow)"
        />
      );
    });

    setLines(newLines);
  };

  useLayoutEffect(() => {
    updateLines();
    window.addEventListener('resize', updateLines);
    return () => window.removeEventListener('resize', updateLines);
  }, []);

  return (
    <div className="flex w-screen h-screen items-center justify-center relative overflow-visible">"+"
      <style jsx global>{`
        @keyframes flow {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -200; }
        }
        .flow-line {
          stroke-dasharray: 5 5;
          animation: flow 4s linear infinite;
        }
        .node {
          transition: transform 0.2s ease;
        }
        .node:hover {
          transform: scale(1.05);
        }
      `}</style>
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute left-[-120px] top-[-120px] w-[350px] h-[350px] bg-blue-500 opacity-20 blur-3xl rounded-full" />
        <div className="absolute right-[-120px] bottom-[-120px] w-[350px] h-[350px] bg-indigo-500 opacity-20 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-6xl rounded-2xl border border-white/10 p-10 shadow-2xl bg-gradient-to-b from-[#1a1b23ee] to-[#191a21ee]">
        <div className="absolute left-6 top-6 flex gap-2">
          <span className="w-3 h-3 rounded-full bg-[#FF5F56] shadow" />
          <span className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow" />
          <span className="w-3 h-3 rounded-full bg-[#27C93F] shadow" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center drop-shadow-lg mb-2 node">Всё, что нужно — под рукой</h2>
        <p className="text-base md:text-lg text-blue-100 text-center mb-10 node">Все функции для комфортной работы — в одном интерфейсе</p>

        <div ref={wrapperRef} className="relative flex items-center justify-center w-full h-[390px] max-w-[930px]">
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              {leftFeatures.map((_, i) => (
                <linearGradient key={`grad-left-${i}`} id={`grad-left-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#dbeafe" stopOpacity="0" />
                  <stop offset="60%" stopColor="#7ca5f8" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#7ca5f8" stopOpacity="0.2" />
                </linearGradient>
              ))}
              {rightFeatures.map((_, i) => (
                <linearGradient key={`grad-right-${i}`} id={`grad-right-${i}`} x1="100%" y1="0%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#b9e2ff" stopOpacity="0.2" />
                  <stop offset="40%" stopColor="#b9e2ff" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#b9e2ff" stopOpacity="0" />
                </linearGradient>
              ))}
              <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation={5} result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {lines}
          </svg>

          <div ref={centerRef} className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 node">
            <div className="relative w-[160px] h-[160px] flex items-center justify-center">
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-[#a77fff44] via-[#818cf8aa] to-[#432d92cc] blur-xl opacity-80" />
              <div className="relative z-10 w-[120px] h-[120px] flex flex-col items-center justify-center rounded-full bg-[#211f3c] shadow-lg border border-[#8a7aff66] node">
                <TbSettingsAutomation size={56} className="text-[#8a7aff]" />
                <span className="text-xs text-blue-100 font-semibold mt-2">GalaxyArc</span>
              </div>
            </div>
          </div>

          <div className="absolute left-0 top-0 h-full flex flex-col justify-between z-10">
            {leftFeatures.map((f, i) => (
              <div
                key={f.label}
                ref={el => (leftRefs.current[i] = el)}
                className={`node inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-br ${f.color} rounded-xl border border-white/10 shadow-md whitespace-nowrap transform transition-transform duration-200 `}
              >
                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#161a2aee] text-white/80 shadow">{f.icon}</div>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm text-white">{f.label}</span>
                  <span className="text-xs text-white/70">{f.value}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute right-0 top-0 h-full flex flex-col justify-between z-10">
            {rightFeatures.map((f, i) => (
              <div
                key={f.label}
                ref={el => (rightRefs.current[i] = el)}
                className={`node inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-br ${f.color} rounded-xl border border-white/10 shadow-md whitespace-nowrap transform transition-transform duration-200 justify-between`}
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-sm text-white">{f.label}</span>
                  <span className="text-xs text-white/70">{f.value}</span>
                </div>
                <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#161a2aee] text-white/80 shadow">{f.icon}</div>
              </div>

            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
