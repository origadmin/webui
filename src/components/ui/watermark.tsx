import React, { useEffect, useMemo } from "react";
import { cn } from "@/lib/utils";

interface WatermarkProps {
  // Watermark text content
  content: string | string[];
  // Width
  width?: number;
  // Height
  height?: number;
  // Horizontal gap between watermarks
  gapX?: number;
  // Vertical gap between watermarks
  gapY?: number;
  // Rotation angle
  rotate?: number;
  // Font size
  fontSize?: number;
  // Font color
  fontColor?: string;
  // Font family
  fontFamily?: string;
  // Opacity
  opacity?: number;
  // Number of anti-tamper layers
  antiTamperLayers?: number;
  // Font weight
  fontWeight?: number | string;
  // z-index
  zIndex?: number;
  // Enable fullscreen mode
  fullscreen?: boolean;
  // Custom class name
  className?: string;
  // Children
  children: React.ReactNode;
}

const Watermark: React.FC<WatermarkProps> = ({
  content = "Watermark",
  width = 120,
  height = 64,
  gapX = 100,
  gapY = 100,
  rotate = -22,
  fontSize = 8,
  fontColor = "rgba(0, 0, 0, 0.15)",
  fontFamily = "sans-serif",
  opacity = 1,
  antiTamperLayers = 2,
  fontWeight = 400,
  zIndex = 9,
  fullscreen = false,
  className,
  children,
}) => {
  const svgContent = useMemo(() => {
    const contents = Array.isArray(content) ? content : [content];
    const texts = contents
      .map((text, index) => {
        const y = height / 2 + (index - (contents.length - 1) / 2) * fontSize * 1.5;
        return `<text x="50%"
                y="${y}"
                dy=".5em"
                text-anchor="middle"
                fill="${fontColor}"
                style="font-size: ${fontSize}px; font-family: ${fontFamily}; font-weight: ${fontWeight}"
              >${text}</text>`;
      })
      .join("");

    return `
      <svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <g transform="rotate(${rotate}, ${width / 2}, ${height / 2})">
          ${texts}
        </g>
      </svg>
    `;
  }, [content, width, height, rotate, fontSize, fontColor, fontFamily, fontWeight]);

  useEffect(() => {
    // Create a MutationObserver to monitor DOM changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList" || mutation.type === "attributes") {
          // If a modified watermark layer is detected, a re-render is forced
          mutation.target.dispatchEvent(new Event("watermark-changed"));
        }
      });
    });

    // Observe the changes in the watermark container
    const watermarkContainer = document.querySelector(".watermark-container");
    if (watermarkContainer) {
      observer.observe(watermarkContainer, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }

    // Clean up observer when component is unmounted
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div className={cn("relative w-full h-full", className)}>
      <div className='relative z-10'>{children}</div>
      <div
        className={`pointer-events-none select-none ${fullscreen ? "fixed" : "absolute"} inset-0`}
        style={{ opacity, zIndex: zIndex - 1 }} // Ensure watermark is behind content
        aria-hidden={true}
      >
        {/* Base Layer */}
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(svgContent)}')`,
            backgroundRepeat: "repeat",
            backgroundSize: `${gapX + width}px ${gapY + height}px`,
          }}
        />
        {/* Anti-Tamper Layers */}
        {[...Array(antiTamperLayers)].map((_, index) => (
          <div
            key={index}
            className='absolute inset-0'
            style={{
              backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(svgContent)}')`,
              backgroundRepeat: "repeat",
              backgroundSize: `${gapX + width}px ${gapY + height}px`,
              transform: `translate(${index * 0.1}px, ${index * 0.1}px)`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
Watermark.displayName = "Watermark";
export { Watermark };
