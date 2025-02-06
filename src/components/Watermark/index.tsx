import React, { useMemo } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "../Theme";

interface WatermarkProps {
  content: string | string[];
  width?: number;
  height?: number;
  gapX?: number;
  gapY?: number;
  rotate?: number;
  fontSize?: number;
  fontColor?: string;
  fontFamily?: string;
  opacity?: number;
  antiTamperLayers?: number;
  fontWeight?: number | string;
  zIndex?: number;
  fullscreen?: boolean;
  className?: string;
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
  fontFamily = "sans-serif",
  opacity = 1,
  antiTamperLayers = 2,
  fontWeight = 400,
  zIndex = 9,
  fullscreen = false,
  className,
  children,
}) => {
  const { theme } = useTheme();

  const svgContent = useMemo(() => {
    const contents = Array.isArray(content) ? content : [content];
    const color = theme === "dark" ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)";
    const texts = contents
      .map((text, index) => {
        const y = height / 2 + (index - (contents.length - 1) / 2) * fontSize * 1.5;
        return `<text 
                x="50%"
                y="${y}"
                dy=".5em"
                text-anchor="middle"
                fill="${color}"
                style="font-size: ${fontSize}px; font-family: ${fontFamily}, Arial, sans-serif; font-weight: ${fontWeight}"
              >${text}</text>`;
      })
      .join("");

    return `
      <svg  viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        <g transform="rotate(${rotate}, ${width / 2}, ${height / 2})">
          ${texts}
        </g>
      </svg>
    `;
  }, [theme, content, width, height, rotate, fontSize, fontFamily, fontWeight]);

  // useEffect(() => {
  //   const observer = new MutationObserver((mutations) => {
  //     mutations.forEach((mutation) => {
  //       if (mutation.type === "attributes" || mutation.type === "childList") {
  //         mutation.target.dispatchEvent(new Event("watermark-changed"));
  //       }
  //     });
  //   });
  //
  //   const watermarkContainer = document.querySelector(".watermark-container");
  //   if (watermarkContainer) {
  //     observer.observe(watermarkContainer, {
  //       attributes: true,
  //       childList: true,
  //       subtree: true,
  //     });
  //   } else {
  //     console.warn(".watermark-container not found");
  //   }
  //
  //   return () => {
  //     observer.disconnect();
  //   };
  // }, []);

  return (
    <div className={cn("relative w-full h-full", className)}>
      <div className='relative'>{children}</div>
      <div
        className={`pointer-events-none select-none ${fullscreen ? "fixed" : "absolute"} inset-0`}
        style={{ opacity, zIndex: zIndex - 1 }}
        aria-hidden={true}
      >
        <div
          className='absolute inset-0'
          style={{
            backgroundImage: `url('data:image/svg+xml,${encodeURIComponent(svgContent)}')`,
            backgroundRepeat: "repeat",
            backgroundSize: `${gapX + width}px ${gapY + height}px`,
          }}
        />
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
export default Watermark;
