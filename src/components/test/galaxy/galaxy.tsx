'use client';

import React, { useRef, useEffect, ReactNode } from 'react';

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  twinkle: number;
}

const STAR_COUNT = 120;        // Количество звёзд
const STAR_RADIUS = [0.8, 3]; // Размеры звёзд
const LINE_DIST = 160;       // Максимальная длина линии
const STAR_SPEED = 0.15;     // Скорость движения

interface GalaxyProps {
  children?: ReactNode;
}

export const Galaxy: React.FC<GalaxyProps> = ({ children }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  // Инициализация звёзд
  const initStars = (w: number, h: number): Star[] =>
    Array.from({ length: STAR_COUNT }, () => {
      const r = Math.random() * (STAR_RADIUS[1] - STAR_RADIUS[0]) + STAR_RADIUS[0];
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * STAR_SPEED,
        vy: (Math.random() - 0.5) * STAR_SPEED,
        radius: r,
        opacity: Math.random() * 0.5 + 0.5,
        twinkle: Math.random() * 0.02 + 0.005,
      };
    });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    canvas.width = w * window.devicePixelRatio;
    canvas.height = h * window.devicePixelRatio;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    let stars: Star[] = initStars(w, h);

    function animate() {
      ctx.clearRect(0, 0, w, h);

      // Движение и мерцание
      stars.forEach(star => {
        // движение
        star.x += star.vx;
        star.y += star.vy;

        // возврат за пределы экрана
        if (star.x < 0 || star.x > w) star.vx *= -1;
        if (star.y < 0 || star.y > h) star.vy *= -1;

        // мерцание
        star.opacity += (Math.random() - 0.5) * star.twinkle;
        star.opacity = Math.min(Math.max(star.opacity, 0.5), 1);

        // звезда
        ctx.save();
        ctx.globalAlpha = star.opacity;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.shadowColor = '#bae6fd'; // голубой glow
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.restore();
      });

      // Соединяем близкие звёзды линиями
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINE_DIST) {
            ctx.save();
            ctx.globalAlpha = (1 - dist / LINE_DIST) * 0.14; // слабая линия
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = '#38bdf8'; // cyan-400
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.restore();
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    // ресайз canvas под tailwind-стили
    function handleResize() {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * window.devicePixelRatio;
      canvas.height = h * window.devicePixelRatio;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      stars = initStars(w, h);
    }
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current!);
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="relative w-full h-full shadow-xl overflow-hidden bg-gradient-to-b from-[#010018] via-[#041635] to-[#062447]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ display: 'block' }}
      />
      {/* Ваш кастомный контент можно вставить сюда поверх звёзд */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        {children}
      </div>
    </div>
  );
};

export default Galaxy;