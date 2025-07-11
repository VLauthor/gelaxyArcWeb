"use client";
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { FiHome, FiUser, FiSettings, FiCamera, FiHeart } from 'react-icons/fi';

interface Item {
  icon: React.ReactNode;
  label: string;
  description: string;
}

function modulo(n: number, m: number) {
  return ((n % m) + m) % m;
}

export default function RotatingHero() {
  const items: Item[] = [
    { icon: <FiHome />, label: 'Home', description: 'Go to homepage' },
    { icon: <FiUser />, label: 'Profile', description: 'View your profile' },
    { icon: <FiSettings />, label: 'Settings', description: 'Adjust settings' },
    { icon: <FiCamera />, label: 'Camera', description: 'Take photos' },
    { icon: <FiHeart />, label: 'Favorites', description: 'Your favorites' },
  ];

  const visibleNeighbors = 2;
  const visibleCount = visibleNeighbors * 2 + 1;

  const [width, setWidth] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const x = useMotionValue(0);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const safeWidth = width || 1;
  const step = safeWidth / visibleCount;
  const totalWidth = step * items.length;
  const moveDuration = 5;      // seconds
  const pauseDuration = 3000;  // ms

  // Анимационный цикл
  useEffect(() => {
    let cancelled = false;
    const loop = async () => {
      await new Promise(r => setTimeout(r, pauseDuration));
      while (!cancelled) {
        for (let i = 1; i <= items.length; i++) {
          await new Promise<void>(res =>
            animate(x, -step * i, {
              duration: moveDuration,
              ease: 'easeInOut',
              onComplete: () => {
                setCurrentIndex(i % items.length);
                setShowInfo(true);
                res();
              }
            })
          );
          if (cancelled) return;
          await new Promise(r => setTimeout(r, pauseDuration));
          setShowInfo(false);
        }
        x.set(0);
        setCurrentIndex(0);
        setShowInfo(false);
      }
    };
    loop();
    return () => { cancelled = true; };
  }, [x, step, items.length]);

  // Трансформы для элементов
  const modXs = items.map((_, i) =>
    useTransform(x, v => modulo(v + i * step, totalWidth) - step * visibleNeighbors)
  );
  const scales = modXs.map(mx =>
    useTransform(mx, [-step * visibleNeighbors, 0, step * visibleNeighbors], [0.5, 2, 0.5])
  );
  const opacities = modXs.map(mx =>
    useTransform(mx, [-step * visibleNeighbors, 0, step * visibleNeighbors], [0.3, 1, 0.3])
  )

  return (
    <div className="w-screen h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 overflow-hidden relative">

      {/* Карусель элементов */}
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
          style={{ x: modXs[i], scale: scales[i], opacity: opacities[i] }}
        >
          <div
            className="w-32 h-32 p-4 bg-gradient-to-tr from-blue-300 via-green-300 to-blue-500 flex items-center justify-center"
            style={{ scale: scales[i], opacity: opacities[i] }}
          >
            <div className="text-4xl text-white">{item.icon}</div>
          </div>
          <div className="mt-2 text-xl text-white" style={{ opacity: opacities[i] }}>
            {item.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
