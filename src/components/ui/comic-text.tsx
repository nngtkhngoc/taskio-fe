"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { CSSProperties } from "react";

type ComicTextProps = {
  children: string;
  className?: string;
  style?: CSSProperties;
  fontSize?: number;
  backgroundColor?: string;
  dotColor?: string;
};

export function ComicText({
  children,
  className,
  style,
  fontSize = 5,
  backgroundColor = "white",
  dotColor = "#93C5FD",
}: ComicTextProps) {
  if (typeof children !== "string") {
    throw new Error("children must be a string");
  }

  return (
    <motion.div
      className={cn("select-none text-center", className)}
      style={{
        fontSize: `${fontSize}rem`,
        fontFamily: "'Outfit', BlinkMacSystemFont, 'Segoe UI', sans-serif",
        fontWeight: "900",
        WebkitTextStroke: `${fontSize * 0.35}px #000000`,
        transform: "skewX(-10deg)",
        filter: `
          drop-shadow(5px 5px 0px #000000) 
          drop-shadow(3px 3px 0px #2563EB)
        `,
        backgroundColor: backgroundColor,
        backgroundImage: `radial-gradient(circle at 1.5px 1.5px, ${dotColor} 1.5px, transparent 0)`,
        backgroundSize: "8px 8px",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        ...style,
      }}
      initial={{ opacity: 1, scale: 0.5, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: -2 }}
      whileHover={{ scale: 1.5, rotate: -3 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        duration: 1.2,
        ease: [0.175, 0.885, 0.32, 1.275],
        type: "spring",
      }}
    >
      {children}
    </motion.div>
  );
}
