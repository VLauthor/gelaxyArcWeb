"use client";
import React, { useEffect, useEffect as useEffectReact, useState } from "react";
import { motion, animate } from "framer-motion";

export const CustomLoader = ({
  duration,
  mousePos,
  onComplete,
}: {
  duration: number;
  mousePos: { x: number; y: number } | null;
  onComplete?: () => void;
}) => {
  const [progress, setProgress] = useState(0);
  const [seccses, setSeccses] = useState(false);

  useEffectReact(() => {
    const controls = animate(0, 100, {
      duration: duration / 1000,
      ease: "linear",
      onUpdate(v) {
        setProgress(v);
      },
    });
    return () => controls.stop();
  }, [duration]);

  useEffect(() => {
    if (progress === 100 && onComplete) {
      const timer = setTimeout(() => {
        onComplete()
        setSeccses(true)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [progress, onComplete])

  return (
    <div>
      {seccses == false ?
        <motion.div
          className="fixed pointer-events-none z-[9999] p-2 border-0 shadow-2xl rounded-2xl w-fit h-fit bg-white/15 backdrop-blur-sm"
          style={{
            transform: "translate(-50%, -50%)",
            left: mousePos ? mousePos.x : "50%",
            top: mousePos ? mousePos.y : "50%",
            backdropFilter: "blur(8px)",
          }}
        >
          <motion.div
            className="absolute inset-0 flex justify-center items-center"
            style={{ transformOrigin: 'center' }}
          >
            {['top-left', 'top-right', 'bottom-right', 'bottom-left'].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 border-t-2 border-l-2 border-white"
                style={{
                  transform: `rotate(${i * 90}deg)`,
                  top: i < 2 ? '-5px' : 'calc(100%)',
                  left: i % 3 === 0 ? '-5px' : 'calc(100%)',
                  borderRadius: '2px',
                }}
              />
            ))}
          </motion.div>
          <svg
            width="70"
            height="70"
            viewBox="0 0 100 100"
            fill="none"
            style={{ transform: "rotate(90deg)" }}
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke={progress < 30 ? "#e81c60" : progress < 60 ? "#f5f556" : progress < 80 ? "#9df582" : progress < 90 ? "#84e33b" : "#3be346"}
              strokeWidth="10"
              strokeDasharray={2 * Math.PI * 45}
              strokeDashoffset={
                2 * Math.PI * 45 * (1 - progress / 100)
              }
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.25s linear, stroke 0.5s ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-2xl font-bold" style={
            { color: progress < 30 ? "#e81c60" : progress < 60 ? "#f5f556" : progress < 80 ? "#9df582" : progress < 90 ? "#84e33b" : "#3be346", transition: "color 0.5s ease" }
          }>
            {Math.floor(progress)}
          </div>
        </motion.div>
        : <></>
      }
    </div>
  );
};