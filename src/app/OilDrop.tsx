"use client";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";

export default function OilDrop({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <motion.div className="relative w-64 h-64 flex items-center justify-center">
      {/* Dark core */}
      <motion.div className="absolute inset-0 bg-black rounded-full z-40" animate={{
        scale: [1.1, 1.05, 1, 0.98, 0.95, 0.98, 1, 1.05, 1.1],

      }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }} />

      {/* Deforming accretion disk */}
      {[1, 30, 60, 90, 120, 150].map((i) => (<motion.div
        key={i}
        className="absolute z-20 inset-0 bg-gradient-to-tr from-red-700 via-orange-500 to-yellow-300 rounded-full blur-3xl shadow-2xs shadow-amber-600 mix-blend-screen"
        animate={{
          borderRadius: [
            `${i * 2}% ${100 - i * 2}% ${100 - i * 2}% ${i * 2}%`,
            `${100 - i * 2}% ${i * 2}% ${i * 2}% ${100 - i * 2}%`,
            `${i * 2}% ${100 - i * 2}% ${100 - i * 2}% ${i * 2}%`,
            `${100 - i * 2}% ${i * 2}% ${i * 2}% ${100 - i * 2}%`,
            `${i * 2}% ${100 - i * 2}% ${100 - i * 2}% ${i * 2}%`,
            `${100 - i * 2}% ${i * 2}% ${i * 2}% ${100 - i * 2}%`,
          ],
          rotate: [0, 360]
        }}
        transition={{ duration: 100, repeat: Infinity, ease: "easeInOut" }}
      />))}


      {/* Inner glowing ring */}
      <motion.div
        className="absolute inset-0 z-20 rounded-full backdrop-blur-[1px] bg-transparent"
        animate={{
          scale: [2.8, 2.5, 2.9]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 z-20 rounded-full backdrop-blur-[2px] bg-transparent"
        animate={{
          scale: [2.5, 2.3, 2.8]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Outer glowing ring */}
      {[1, 30].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 border-8 rounded-full border-y-amber-300/100 border-x-yellow-300 blur-2xl z-60"
          animate={{
            scale: [1, 1.1, 0.95],
            opacity: [0.7, 0.5, 0.6]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </motion.div>
  );
}