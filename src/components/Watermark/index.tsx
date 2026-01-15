"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/components/Theme";

export interface WatermarkProps {
  className?: string;
  style?: React.CSSProperties;
  content?: string | string[];
  rotate?: number;
  zIndex?: number;
  width?: number;
  height?: number;
  gap?: [number, number];
  offset?: [number, number];
  fontSize?: number;
  fontWeight?: "normal" | "light" | "weight" | number;
  fontFamily?: string;
  fontColor?: string;
}

const Watermark: React.FC<WatermarkProps> = (props) => {
  const {
    className,
    style,
    content,
    rotate = -22,
    zIndex = 1000,
    width = 120,
    height = 64,
    gap = [100, 100],
    offset,
    fontSize = 16,
    fontWeight = "normal",
    fontFamily = "sans-serif",
    fontColor,
  } = props;

  const { theme } = useTheme();
  const color = fontColor || (theme === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)");

  const [base64Url, setBase64Url] = useState("");

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const ratio = window.devicePixelRatio || 1;
    const [gapX, gapY] = gap;

    // Create a 2x2 pattern for staggering
    const patternWidth = (gapX + width) * 2;
    const patternHeight = (gapY + height) * 2;
    canvas.setAttribute("width", `${patternWidth * ratio}px`);
    canvas.setAttribute("height", `${patternHeight * ratio}px`);

    // Common styles
    ctx.font = `${fontWeight} ${fontSize * ratio}px ${fontFamily}`;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Function to draw a single rotated watermark at a specific center point
    const drawRotatedText = (x: number, y: number) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate((Math.PI / 180) * rotate);
      const contents = Array.isArray(content) ? content : content ? [content] : [];
      contents.forEach((item, index) => {
        const textY = (index - (contents.length - 1) / 2) * (fontSize * ratio + 4);
        ctx.fillText(item, 0, textY);
      });
      ctx.restore();
    };

    // Draw two watermarks in a staggered (diagonal) pattern
    const singleWidth = (gapX + width) * ratio;
    const singleHeight = (gapY + height) * ratio;
    drawRotatedText(singleWidth * 0.5, singleHeight * 1.5);
    drawRotatedText(singleWidth * 1.5, singleHeight * 0.5);

    setBase64Url(canvas.toDataURL());
  }, [width, height, rotate, color, fontSize, fontWeight, fontFamily, gap, offset, content]);

  if (!base64Url) {
    return null;
  }

  return (
    <div
      className={cn("pointer-events-none", className)}
      style={{
        position: "fixed",
        inset: 0,
        zIndex,
        backgroundSize: `${(gap[0] + width) * 2}px`, // Use the 2x pattern width
        backgroundImage: `url('${base64Url}')`,
        backgroundRepeat: "repeat",
        ...style,
      }}
    />
  );
};

Watermark.displayName = "Watermark";
export default Watermark;
