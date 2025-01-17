import React from "react";
import { cn } from "@/lib/utils";

interface WatermarkProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  opacity?: number;
  rotate?: number;
}

const Watermark = React.forwardRef<HTMLDivElement, WatermarkProps>(
  ({ text, opacity = 0.5, rotate = -45, className, children, ...props }, ref) => {
    return (
      <div className='relative overflow-hidden' ref={ref} {...props}>
        {children}
        <div
          className={cn("absolute inset-0 flex items-center justify-center pointer-events-none select-none", className)}
          style={{
            opacity: opacity,
            transform: `rotate(${rotate}deg)`,
          }}
        >
          <div
            className='text-4xl font-bold text-gray-300 whitespace-nowrap'
            style={{
              transform: `scale(${Math.max(1, window.innerWidth / 300)})`,
            }}
          >
            {text.repeat(100)}
          </div>
        </div>
      </div>
    );
  },
);
Watermark.displayName = "Watermark";

export { Watermark };
