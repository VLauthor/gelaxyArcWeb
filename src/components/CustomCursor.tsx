"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CustomLoader } from "./CustomLoader";

export default function CustomCursor({
  mousePos,
  click,
  cursorSize,
  hoveredRect,
  isFixed,
  actionRegistered,
}: {
  mousePos: { x: number; y: number };
  click: boolean;
  cursorSize: number;
  hoveredRect: DOMRect | null;
  isFixed: boolean;
  actionRegistered: boolean;
}) {

  const isLoading = isFixed && actionRegistered && click;

  return (
    <AnimatePresence>
      {(mousePos.x !== 0 || mousePos.y !== 0) && (
        <>
          {/* Fast-following circle */}
          <motion.div
            key="circle"
            initial={{ opacity: 0 }}
            animate={{
              opacity: isLoading ? 0 : 1,
              width: 15 * (click ? 1.4 : 1),
              height: 15 * (click ? 1.4 : 1),
              left: mousePos.x,
              top: mousePos.y,
            }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
            style={{
              position: "fixed",
              pointerEvents: "none",
              borderRadius: "50%",
              backgroundColor: "white",
              transform: "translate(-50%, -50%)",
              zIndex: 100,
            }}
          />
          {isLoading && (
            <div className="fixed pointer-events-none z-60 inset-0 flex items-center justify-center text-9xl text-white">
              <CustomLoader duration={1000} mousePos={mousePos} />
            </div>
          )}

          <motion.div
            key="square"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              width: hoveredRect ? hoveredRect.width + 24 + (click ? cursorSize * 1.5 : 0) : cursorSize * 3 * (click ? 1.4 : 1),
              height: hoveredRect ? hoveredRect.height + 24 + (click ? cursorSize * 1.5 : 0) : cursorSize * 3 * (click ? 1.4 : 1),
              left: isFixed && hoveredRect ? hoveredRect.left + hoveredRect.width / 2 : mousePos.x,
              top: isFixed && hoveredRect ? hoveredRect.top + hoveredRect.height / 2 : mousePos.y,
            }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
            className="pointer-events-none fixed z-50 flex items-center justify-center"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <motion.div
              animate={{ rotate: isFixed ? 0 : 360 }}
              transition={{ repeat: isFixed ? 0 : Infinity, duration: isFixed ? 0 : 2, ease: "linear" }}
              className="absolute inset-0 flex justify-center items-center"
              style={{ transformOrigin: 'center' }}
            >
              {['top-left', 'top-right', 'bottom-right', 'bottom-left'].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 border-t-2 border-l-2 border-white"
                  style={{
                    transform: `rotate(${i * 90}deg)`,
                    top: i < 2 ? '0' : 'calc(100% - 10px)',
                    left: i % 3 === 0 ? '0' : 'calc(100% - 10px)',
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}