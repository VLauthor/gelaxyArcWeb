'use client';

import React, { useRef, useEffect } from 'react';
type smileType = 'neutral' | 'sad' | 'happy'
const HAPPY_SMILE_PIXELS = [
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
  [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1],
  [1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1],
  [1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
  [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
];
const SAD_SMILE_PIXELS = [
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
  [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1],
  [1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1],
  [1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1],
  [1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
  [1, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
];
const NEUTRAL_SMILE_PIXELS = [
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
  [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1],
  [1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1],
  [1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
  [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
];
const smileByType: Record<smileType, number[][]> = {
  happy: HAPPY_SMILE_PIXELS,
  sad: SAD_SMILE_PIXELS,
  neutral: NEUTRAL_SMILE_PIXELS
}

const NEBULA_COLORS = [
  'rgba(122,200,255,0.17)',
  'rgba(164,122,255,0.16)',
  'rgba(122,255,193,0.14)',
  'rgba(255,179,122,0.15)',
  'rgba(255,122,207,0.12)',
  'rgba(187,255,122,0.15)',
  'rgba(187,255,122,0.15)',
  'rgba(187,255,122,0.15)',
  'rgba(187,255,122,0.15)',
];

// === ПАРАМЕТРЫ ЗВЕЗД ===
const STAR_RADIUS: [number, number] = [4, 6]; // [min, max] — размер
const STAR_SPEED = 0.7;       // "дрожание" в px (амплитуда движения)
const STAR_LIGHT = 0.05;      // диапазон мерцания (амплитуда изменения яркости)
const LINE_DIST = 65;         // дистанция для линии между звездами

const BG_GRADIENT_START = '#0a1130';
const BG_GRADIENT_END = '#132040';

interface Star {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  opacity: number;
  twinkle: number;
  driftA: number;
  driftB: number;
}

export const GalaxySmile: React.FC<{
  className?: string;
  style?: React.CSSProperties;
  type: 'neutral' | 'sad' | 'happy'
}> = ({ className = '', style = {}, type }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  function makeStars(w: number, h: number, PIXEL: number[][]): Star[] {
    const GRID_W = PIXEL[0].length;
    const GRID_H = PIXEL.length;
    const size = Math.min(w, h) * 0.8;
    const cell = Math.min(size / GRID_W, size / GRID_H);
    const offX = (w - cell * GRID_W) / 2;
    const offY = (h - cell * GRID_H) / 2;
    const stars: Star[] = [];
    for (let gy = 0; gy < GRID_H; ++gy) {
      for (let gx = 0; gx < GRID_W; ++gx) {
        if (PIXEL[gy][gx]) {
          const baseX = offX + gx * cell + cell / 2;
          const baseY = offY + gy * cell + cell / 2;
          stars.push({
            baseX,
            baseY,
            x: baseX,
            y: baseY,
            radius: Math.random() * (STAR_RADIUS[1] - STAR_RADIUS[0]) + STAR_RADIUS[0],
            opacity: 0.84 + Math.random() * 0.14,
            twinkle: Math.random() * STAR_LIGHT + 0.007,
            driftA: Math.random() * 2 * Math.PI,
            driftB: Math.random() * 2 * Math.PI,
          });
        }
      }
    }
    return stars;
  }

  function drawNebula(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
    const cloudCount = 5;
    for (let i = 0; i < cloudCount; i++) {
      // "Случайная" позиция и размер, зависящая от времени
      const angle = t * (0.07 + i * 0.06) + i * 1.5;
      const cx = w / 2 + Math.cos(angle + i) * w * 0.26 + Math.sin(angle * 0.8 + i * 2) * w * 0.09;
      const cy = h / 2 + Math.sin(angle - i) * h * 0.24 + Math.cos(angle * 0.85 - i * 1.2) * h * 0.1;
      const r = Math.min(w, h) * (0.28 + 0.12 * Math.abs(Math.sin(angle + i * 0.2)));
      // Берем случайный цвет из набора (чередуем, чтобы каждый облако был разного оттенка)
      const color = NEBULA_COLORS[i % NEBULA_COLORS.length];
      const grad = ctx.createRadialGradient(cx, cy, r * 0.2, cx, cy, r);
      grad.addColorStop(0, color);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.save();
      ctx.globalAlpha = 0.6 + 0.25 * Math.sin(angle * 0.95);
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.restore();
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    canvas.width = w * window.devicePixelRatio;
    canvas.height = h * window.devicePixelRatio;
    const ctx = canvas.getContext('2d')!;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    let stars: Star[] = makeStars(w, h, smileByType[type]);
    let startTime = performance.now();

    function animate(now: number) {
      const t = (now - startTime) * 0.001;

      // Фон
      const gradient = ctx.createLinearGradient(0, 0, 0, h);
      gradient.addColorStop(0, BG_GRADIENT_START);
      gradient.addColorStop(1, BG_GRADIENT_END);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, w, h);

      // туманности
      drawNebula(ctx, w, h, t);

      // Анимация звезд: дрожание
      for (const star of stars) {
        star.x = star.baseX + Math.sin(t * 1.1 + star.driftA) * STAR_SPEED;
        star.y = star.baseY + Math.cos(t * 1.2 + star.driftB) * STAR_SPEED;
      }

      // Линии между близкими
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINE_DIST) {
            ctx.save();
            ctx.globalAlpha = (1 - dist / LINE_DIST) * 0.21;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = "#b8d7ff";
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      // Звезды с мерцанием
      for (const star of stars) {
        // Мерцание яркости
        star.opacity += (Math.random() - 0.5) * star.twinkle;
        star.opacity = Math.max(0.65, Math.min(1, star.opacity));
        ctx.save();
        ctx.globalAlpha = star.opacity;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = star.radius * 6.5;
        ctx.fill();
        ctx.restore();
      }

      animationRef.current = requestAnimationFrame(animate);
    }

    animationRef.current = requestAnimationFrame(animate);

    function handleResize() {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * window.devicePixelRatio;
      canvas.height = h * window.devicePixelRatio;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      stars = makeStars(w, h);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current!);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className={`relative w-full h-full aspect-square min-h-[220px] min-w-[220px] rounded-2xl overflow-hidden ${className}`}
      style={style}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block' }}
      />
    </div>
  );
};

export default GalaxySmile;