"use client";

import { cn } from "@/lib/utils";
import useTheme from "@/use/useTheme";
import { motion, TargetAndTransition, VariantLabels } from "framer-motion";

interface AnimatedButtonProps {
  label: string;
  onClick?: () => void;
  whileHover?: VariantLabels | TargetAndTransition | "base" | "reverse" | undefined;
  border?: "solid" | "dashed";
  className?: string;
  colorReverce?: boolean | undefined;
  backgroundView?: boolean
}

export default function AnimatedButton({
  label,
  onClick,
  whileHover = { scale: 1, rotate: 0 },
  border = "solid",
  className,
  colorReverce = false,
  backgroundView = true
}: AnimatedButtonProps) {
  const { theme } = useTheme();

  // если включен colorReverce — инвертируем текущую тему
  const appliedTheme = colorReverce
    ? theme === "dark"
      ? "light"
      : "dark"
    : theme;

  return (
    <motion.button
      whileHover={
        whileHover === "base"
          ? { scale: 1.2, rotate: 2 }
          : whileHover === "reverse"
            ? { scale: 1.2, rotate: -2 }
            : whileHover
      }
      onClick={onClick}
      className={cn(
        "cursor-target relative px-8 py-2 text-[20px] font-bold overflow-hidden rounded-[0.625em] before:content-[''] before:absolute before:inset-0 before:-left-[20%] before:-right-[20%] before:top-0 before:bottom-0 before:-skew-x-[45deg] before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-500 before:z-[-1] backdrop-blur-sm",
        appliedTheme === "dark"
          ? `text-black hover:text-white ${backgroundView ? "bg-white" : "bg-transparent"} before:bg-black border-2 hover:border-white border-black/50`
          : `text-white hover:text-black ${backgroundView ? "bg-black" : "bg-transparent"} before:bg-white border-2 hover:border-black border-white/50`,
        `border-${border} hover:border-${border}`,
        className
      )}
    >
      {label}
    </motion.button>
  );
}