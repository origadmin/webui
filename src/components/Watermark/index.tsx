"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "@/components/Theme";
import { cn } from "@/lib/utils";

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
    const canvasWidth = (gapX + width) * ratio;
    const canvasHeight = (gapY + height) * ratio;
    const offsetLeft = (offset?.[0] ?? gapX / 2) * ratio;
    const offsetTop = (offset?.[1] ?? gapY / 2) * ratio;

    canvas.setAttribute("width", `${canvasWidth}px`);
    canvas.setAttribute("height", `${canvasHeight}px`);

    ctx.translate(offsetLeft, offsetTop);
    ctx.rotate((Math.PI / 180) * rotate);
    const markWidth = width * ratio;
    const markHeight = height * ratio;

    ctx.fillStyle = color;
    ctx.font = `${fontWeight} ${fontSize * ratio}px ${fontFamily}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const contents = Array.isArray(content) ? content : content ? [content] : [];
    contents.forEach((item, index) => {
      ctx.fillText(item, markWidth / 2, markHeight / 2 + index * (fontSize * ratio + 4));
    });

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
        backgroundSize: `${gap[0] + width}px`,
        backgroundImage: `url('${base64Url}')`,
        backgroundRepeat: "repeat",
        ...style,
      }}
    />
  );
};

Watermark.displayName = "Watermark";
export default Watermark;
