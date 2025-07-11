import React, { useEffect, useState } from "react";

const POINTS = 42;
const WIDTH = 400;
const HEIGHT = 290;
const SMOOTH = 0.24;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function getSmoothRandomAmps(old: number[], delta: number, base: number) {
  return old.map((amp, i) =>
    lerp(amp, Math.sin(i / 7 + Date.now() / 1100) * delta + base, 0.13)
  );
}

function catmullRom2bezier(points: { x: number, y: number }[]) {
  let d = `M${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? i : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 < points.length ? i + 2 : i + 1];

    const c1x = p1.x + (p2.x - p0.x) * SMOOTH;
    const c1y = p1.y + (p2.y - p0.y) * SMOOTH;

    const c2x = p2.x - (p3.x - p1.x) * SMOOTH;
    const c2y = p2.y - (p3.y - p1.y) * SMOOTH;

    d += ` C${c1x},${c1y},${c2x},${c2y},${p2.x},${p2.y}`;
  }
  return d;
}

export default function VoiceWaves() {
  // Увеличиваем амплитуду: main=36, top=22, bottom=25
  const [amps, setAmps] = useState({
    main: Array(POINTS).fill(0),
    top: Array(POINTS).fill(0),
    bottom: Array(POINTS).fill(0),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setAmps((prev) => ({
        main: getSmoothRandomAmps(prev.main, 66, 0),
        top: getSmoothRandomAmps(prev.top, 22, -15),
        bottom: getSmoothRandomAmps(prev.bottom, 25, 16),
      }));
    }, 44);
    return () => clearInterval(interval);
  }, []);

  const step = WIDTH / (POINTS - 1);
  const midY = HEIGHT / 2;

  // Центральная волна
  const mainPoints = amps.main.map((amp, i) => ({
    x: i * step,
    y: midY + Math.sin(i / 2.5 + amps.main[0] / 6) * amp,
  }));
  const mainPath = catmullRom2bezier(mainPoints);

  // Верхняя
  const topPoints = amps.top.map((amp, i) => ({
    x: i * step,
    y: midY - 22 + Math.sin(i / 2.2 + amps.top[0] / 7) * amp,
  }));
  const topPath = catmullRom2bezier(topPoints);

  // Нижняя
  const bottomPoints = amps.bottom.map((amp, i) => ({
    x: i * step,
    y: midY + 22 + Math.sin(i / 2.7 + amps.bottom[0] / 8) * amp,
  }));
  const bottomPath = catmullRom2bezier(bottomPoints);

  return (
    <div className="w-[420px] h-[90px] flex items-center justify-center select-none">
      <svg width={WIDTH} height={HEIGHT}>
        <defs>
          {/* Градиент для плавного исчезновения концов */}
          <linearGradient id="fadeStrokeMain" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fff" stopOpacity="0" />
            <stop offset="15%" stopColor="#fff" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#54d4ff" stopOpacity="1" />
            <stop offset="85%" stopColor="#fff" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="fadeStrokeSide" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#B7E2FF" stopOpacity="0" />
            <stop offset="20%" stopColor="#4FD1FF" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#397BFF" stopOpacity="0.55" />
            <stop offset="80%" stopColor="#4FD1FF" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#B7E2FF" stopOpacity="0" />
          </linearGradient>
          {/* Глоу для главной волны */}
          <filter id="glow" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Верхняя волна */}
        <path
          d={topPath}
          fill="none"
          stroke="url(#fadeStrokeSide)"
          strokeWidth={2.3}
          opacity={0.77}
        />
        {/* Нижняя волна */}
        <path
          d={bottomPath}
          fill="none"
          stroke="url(#fadeStrokeSide)"
          strokeWidth={2.3}
          opacity={0.77}
        />
        {/* Главная волна */}
        <path
          d={mainPath}
          fill="none"
          stroke="url(#fadeStrokeMain)"
          strokeWidth={5.2}
          opacity={0.96}
          filter="url(#glow)"
        />
      </svg>
    </div>
  );
}
