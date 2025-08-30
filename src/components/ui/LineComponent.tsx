import { cn } from "@/lib/utils";
import { CSSProperties } from "react";

interface LineComponentProps {
  variant?: "horizontal" | "vertical";
  shift?: string
  className?: string,
  style?: CSSProperties | undefined | false
}

export default function LineComponent(
  {
    variant = "vertical",
    shift,
    className,
    style = {
      maskImage: "linear-gradient(to bottom, transparent, white 10%, white 90%, transparent)",
      WebkitMaskImage: "linear-gradient(to bottom, transparent, white 10%, white 90%, transparent)"
    }
  }: LineComponentProps) {

  return (
    variant === "vertical" ? (
      <div aria-hidden className={cn("absolute top-0 bottom-0 border-l border-dashed border-[var(--foreground)]/25", shift, className)} style={style === false ? {} : style} />
    ) : (
      <div aria-hidden className={cn("w-full border-t border-dashed border-[var(--foreground)]/25", className)} style={style === false ? {} : style} />
    )

  );
}