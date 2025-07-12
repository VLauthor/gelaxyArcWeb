"use client";
import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring, animate } from 'framer-motion';
import { FiHome, FiUser, FiSettings, FiCamera, FiHeart } from 'react-icons/fi';

interface Item {
  icon: React.ReactNode;
  label: string;
  description: string;
}

function modulo(n: number, m: number) {
  return ((n % m) + m) % m;
}

export default function RotatingHero({
  active,
  onHover,
  onLeave,
}: {
  active: boolean;
  onHover: (rect: DOMRect) => void;
  onLeave: () => void;
}) {
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
  const moveDuration = 0.8;      // seconds
  const pauseDuration = 2500;  // ms

  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    const animateLoop = async () => {
      await new Promise(r => setTimeout(r, pauseDuration));
      while (!cancelled) {
        for (let i = 1; i <= items.length; i++) {
          await new Promise<void>(res =>
            animate(x, -step * i, { duration: moveDuration, ease: 'easeInOut', onComplete: res })
          );
          if (cancelled) return;
          const newIndex = i % items.length;
          setCurrentIndex(newIndex);
          setShowInfo(true);
          await new Promise(r => setTimeout(r, pauseDuration));
          setShowInfo(false);
        }
        setShowInfo(false);
        x.set(0);
        setCurrentIndex(0);
      }
    };
    animateLoop();
    return () => { cancelled = true; };
  }, [x, step, items.length, active]);

  const modXs = items.map((_, i) =>
    useTransform(x, v => modulo(v + i * step, totalWidth) - step * visibleNeighbors)
  );
  const scales = modXs.map(mx =>
    useTransform(mx, [-step * visibleNeighbors, 0, step * visibleNeighbors], [0.6, 1.6, 0.6])
  );
  const opacities = modXs.map(mx =>
    useTransform(mx, [-step * visibleNeighbors, 0, step * visibleNeighbors], [0.3, 1, 0.3])
  );
  const filters = modXs.map(mx =>
    useTransform(
      mx,
      [-step * visibleNeighbors, 0, step * visibleNeighbors],
      ['blur(0.5px)', 'blur(0px)', 'blur(0.5px)']
    )
  );

  // hover scaling with spring smoothing
  const hoverFactors = items.map(() => useMotionValue(1));
  const smoothHoverFactors = hoverFactors.map(hf =>
    useSpring(hf, { stiffness: 300, damping: 20 })
  );
  const combinedScales = scales.map((sc, i) =>
    useTransform([sc, smoothHoverFactors[i]], ([s, hf]) => s * hf)
  );
  // dynamic orange glow
  const boxShadows = modXs.map(mx =>
    useTransform(
      mx,
      [-step * visibleNeighbors, 0, step * visibleNeighbors],
      [
        '0px 0px 0px rgba(255,165,0,0.1)',
        '0px 0px 20px rgba(255,165,0,0.2)',
        '0px 0px 0px rgba(255,165,0,0.1)'
      ]
    )
  );

  // tilt and drop for carousel items
  const skews = modXs.map(mx =>
    useTransform(
      mx,
      [-step * visibleNeighbors, 0, step * visibleNeighbors],
      ['15deg', '0deg', '-15deg']
    )
  );
  const yOffsets = modXs.map(mx =>
    useTransform(
      mx,
      [-step * visibleNeighbors, 0, step * visibleNeighbors],
      [10, 0, 10]
    )
  );


  return (
    <div className="w-screen h-screen overflow-visible relative will-change-transform">
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute right-[-120px] top-[-120px] w-2/6 h-[250px] bg-indigo-500 opacity-20 blur-3xl rounded-full" />
      </div>

      {/* Карусель элементов */}
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center will-change-transform"
          style={{ x: modXs[i], opacity: opacities[i] }}
        >
          <motion.div
            className="w-28 h-28 p-4 bg-gradient-to-br from-[#ff5858] to-[#f09819] rounded-2xl flex items-center justify-center will-change-transform"
            onHoverStart={() => hoverFactors[i].set(1.1)}
            onHoverEnd={() => hoverFactors[i].set(1)}
            style={{
              scale: combinedScales[i],
              opacity: opacities[i],
              filter: filters[i],
              boxShadow: boxShadows[i],
              skewY: skews[i],
              y: yOffsets[i]
            }}
            animate={active ? "visible" : "hidden"}
            whileHover="hover"
            initial={{ opacity: 0, y: 0, scale: 1.0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
            onMouseEnter={e => onHover(e.currentTarget.getBoundingClientRect())}
            onMouseLeave={onLeave}
          >
            <div className="text-3xl text-purple-100 drop-shadow-md" style={{ scale: scales[i] * 5, opacity: opacities[i] }}>{item.icon}</div>
          </motion.div>
          <motion.div
            className="mt-2 text-sm text-purple-200 drop-shadow-md will-change-transform"
            style={{ opacity: opacities[i], skewY: skews[i] }}
          >
            {item.label}
          </motion.div>
        </motion.div>
      ))}

      {/* Left panel */}
      <motion.div
        style={{ transformOrigin: 'right center', perspective: 800 }}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-1/5 h-2/5 p-6 py-12 bg-gradient-to-b from-[#1a1b23ee] to-[#191a21ee] shadow-2xl backdrop-blur-3xl rounded-2xl text-white will-change-transform"
        initial={{ x: -150, opacity: 0, skewY: '-15deg' }}
        animate={{
          x: showInfo ? 50 : -150,
          opacity: showInfo ? 1 : 0,
          skewY: showInfo ? '0deg' : '-15deg',
          rotate: showInfo ? '-3deg' : '15deg',
        }}

        whileHover={{ scale: 1.10, boxShadow: '0px 0px 100px rgba(0,0,0,0.3)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="fixed left-6 top-6 flex gap-2">
          {['#FF5F56', '#FFBD2E', '#27C93F'].map((color, i) => (
            <span
              key={i}
              className="w-3 h-3 rounded-full shadow"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <h4 className="font-semibold text-base">{items[modulo(currentIndex - 1, items.length)].label}</h4>
        <p className="mt-1 text-xs opacity-80">{items[modulo(currentIndex - 1, items.length)].description}</p>
      </motion.div>

      {/* Right panel */}
      <motion.div
        style={{ transformOrigin: 'left center', perspective: 800 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-1/5 h-2/5 p-6 py-12 bg-gradient-to-b from-[#1a1b23ee] to-[#191a21ee] shadow-2xl backdrop-blur-3xl rounded-2xl text-white will-change-transform"
        initial={{ x: 150, opacity: 0, skewY: '15deg' }}
        animate={{
          x: showInfo ? -50 : 150,
          opacity: showInfo ? 1 : 0,
          skewY: showInfo ? '0deg' : '15deg',
          rotate: showInfo ? '3deg' : '15deg',
        }}
        whileHover={{ scale: 1.10, boxShadow: '0px 0px 100px rgba(0,0,0,0.3)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <div className="fixed left-6 top-6 flex gap-2">
          {['#FF5F56', '#FFBD2E', '#27C93F'].map((color, i) => (
            <span
              key={i}
              className="w-3 h-3 rounded-full shadow"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
        <h4 className="font-semibold text-base">{items[modulo(currentIndex + 1, items.length)].label}</h4>
        <p className="mt-1 text-xs opacity-80">{items[modulo(currentIndex + 1, items.length)].description}</p>
      </motion.div>
    </div>
  );
}
