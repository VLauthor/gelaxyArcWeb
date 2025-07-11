import React, { useState, useEffect, useRef } from 'react';
import { useSpring, animated, config } from '@react-spring/web';

type MoodType = 'neutral' | 'sad' | 'happy';

interface MoodGridProps {
  mood: MoodType;
  cellSize?: number;
}

// Улучшенные пиксельные паттерны с выделенными областями для анимации
const MOOD_PATTERNS: Record<MoodType, number[][]> = {
  neutral: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  sad: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ],
  happy: [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]
};

const MoodGrid: React.FC<MoodGridProps> = ({ mood = 'neutral', cellSize = 30 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
    cols: 0,
    rows: 0
  });

  // Анимация моргания глаз
  const [blink, setBlink] = useState(false);
  const eyeAnimation = useSpring({
    height: blink ? 2 : cellSize * 0.15,
    config: { tension: 300, friction: 10 }
  });

  // Анимация губ
  const mouthAnimation = useSpring({
    y: mood === 'happy' ? -cellSize * 0.2 : mood === 'sad' ? cellSize * 0.2 : 0,
    config: config.wobbly
  });

  // Запускаем моргание каждые 3-5 секунд
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 200);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(blinkInterval);
  }, []);

  // Обновление размеров при изменении контейнера
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        const cols = Math.floor(width / cellSize);
        const rows = Math.floor(height / cellSize);

        setDimensions({
          width,
          height,
          cols,
          rows
        });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [cellSize]);

  // Рендер сетки с анимациями
  const renderGrid = () => {
    const { cols, rows } = dimensions;
    const pattern = MOOD_PATTERNS[mood];
    const patternCols = pattern[0].length;
    const patternRows = pattern.length;

    const scale = Math.min(
      1,
      Math.floor(cols / patternCols),
      Math.floor(rows / patternRows)
    );

    const offsetX = Math.floor((cols - patternCols * scale) / 2);
    const offsetY = Math.floor((rows - patternRows * scale) / 2);

    const grid = [];

    // Линии сетки
    for (let i = 0; i <= cols; i++) {
      grid.push(
        <div
          key={`v-${i}`}
          className="absolute top-0 bottom-0 bg-blue-300 opacity-30"
          style={{
            left: i * cellSize,
            width: 1,
            height: '100%'
          }}
        />
      );
    }

    for (let i = 0; i <= rows; i++) {
      grid.push(
        <div
          key={`h-${i}`}
          className="absolute left-0 right-0 bg-blue-300 opacity-30"
          style={{
            top: i * cellSize,
            height: 1,
            width: '100%'
          }}
        />
      );
    }

    // Рендер смайла с анимациями
    for (let y = 0; y < patternRows; y++) {
      for (let x = 0; x < patternCols; x++) {
        if (pattern[y][x]) {
          const isEye = (y >= 8 && y <= 10) && (x >= 6 && x <= 13);
          const isMouth = y >= 13 && y <= 15 && x >= 5 && x <= 13;

          for (let sy = 0; sy < scale; sy++) {
            for (let sx = 0; sx < scale; sx++) {
              const posX = (offsetX + x * scale + sx) * cellSize + 1;
              const posY = (offsetY + y * scale + sy) * cellSize + 1;

              if (isEye && blink) {
                // Анимация моргания глаз
                grid.push(
                  <animated.div
                    key={`eye-${x}-${y}-${sx}-${sy}`}
                    className="absolute bg-yellow-400 rounded-sm"
                    style={{
                      width: cellSize - 3,
                      height: eyeAnimation.height,
                      left: posX,
                      top: posY + (cellSize - 2) / 2 - eyeAnimation.height.get() / 2,
                      boxShadow: 'inset 0 0 4px rgba(0,0,0,0.2)'
                    }}
                  />
                );
              } else if (isMouth) {
                // Анимация движения губ
                grid.push(
                  <animated.div
                    key={`mouth-${x}-${y}-${sx}-${sy}`}
                    className="absolute bg-yellow-400 rounded-sm"
                    style={{
                      width: cellSize - 2,
                      height: cellSize - 2,
                      left: posX,
                      top: mouthAnimation.y.to(y => Math.round(posY + y)),
                      boxShadow: 'inset 0 0 4px rgba(0,0,0,0.2)'
                    }}
                  />
                );
              } else {
                // Обычные пиксели
                grid.push(
                  <div
                    key={`pixel-${x}-${y}-${sx}-${sy}`}
                    className="absolute bg-yellow-400 rounded-sm"
                    style={{
                      width: cellSize - 2,
                      height: cellSize - 2,
                      left: posX,
                      top: posY,
                      boxShadow: 'inset 0 0 4px rgba(0,0,0,0.2)'
                    }}
                  />
                );
              }
            }
          }
        }
      }
    }

    return grid;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full bg-blue-500 overflow-hidden rounded-3xl"
    >
      {dimensions.width > 0 && renderGrid()}
    </div>
  );
};

export default MoodGrid;