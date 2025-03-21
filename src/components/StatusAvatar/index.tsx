"use client";

import type { ReactNode } from "react";
import { Check, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type StatusType = "online" | "notification" | "new" | "verified" | "alert" | "none" | "custom";
type StatusPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "custom";
type RingWidth = "none" | "thin" | "medium" | "thick";

interface StatusAvatarProps {
  src: string;
  alt: string;
  status?: StatusType;
  statusContent?: string | number | ReactNode;
  size?: "sm" | "md" | "lg";
  shape?: "circle" | "square";
  fallback?: string;
  statusRingWidth?: RingWidth;
  statusRingColor?: string;
  statusPosition?: StatusPosition;
  // Customize the offset of the position
  statusOffsetX?: string;
  statusOffsetY?: string;
  // Customize the status style
  statusClassName?: string;
}

export function getPositionClasses(
  statusPosition: StatusPosition,
  size: "sm" | "md" | "lg",
  statusOffsetX?: string,
  statusOffsetY?: string,
): string {
  if (statusPosition === "custom" && statusOffsetX && statusOffsetY) {
    return `top-[${statusOffsetY}] left-[${statusOffsetX}]`;
  }

  const positions: Record<Exclude<StatusPosition, "custom">, { sm: string; md: string; lg: string }> = {
    "top-left": {
      sm: "-top-1 -left-1",
      md: "-top-1.5 -left-1.5",
      lg: "-top-2 -left-2",
    },
    "top-right": {
      sm: "-top-1 -right-1",
      md: "-top-1.5 -right-1.5",
      lg: "-top-2 -right-2",
    },
    "bottom-left": {
      sm: "-bottom-1 -left-1",
      md: "-bottom-1.5 -left-1.5",
      lg: "-bottom-2 -left-2",
    },
    "bottom-right": {
      sm: "-bottom-1 -right-1",
      md: "-bottom-1.5 -right-1.5",
      lg: "-bottom-2 -right-2",
    },
  };

  // 确保 statusPosition 不为 "custom"
  if (!positions[statusPosition as Exclude<StatusPosition, "custom">]) {
    return ""; // 返回空字符串以避免错误
  }

  return positions[statusPosition as Exclude<StatusPosition, "custom">][size];
}

export default function StatusAvatar({
  src,
  alt,
  status = "none",
  statusContent,
  size = "md",
  shape = "circle",
  fallback,
  statusRingWidth = "medium",
  statusRingColor = "white",
  statusPosition = "top-right",
  statusOffsetX,
  statusOffsetY,
  statusClassName,
}: StatusAvatarProps) {
  // Set the size according to size
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16",
  };

  // Set the shape according to the shape
  const shapeClasses = {
    circle: "rounded-full",
    square: "rounded-lg",
  };

  // The size of the status indicator
  const statusSizeClasses = {
    sm: "h-4 w-4 text-[10px]",
    md: "h-5 w-5 text-xs",
    lg: "h-6 w-6 text-sm",
  };

  // Border width
  const ringWidthClasses = {
    none: "",
    thin: "ring-[1px]",
    medium: "ring-[2px]",
    thick: "ring-[3px]", // Fixed the issue of thick borders and used exact pixel values
  };

  // Render status indicator
  const renderStatus = () => {
    if (status === "none") return null;

    // Whether to display a border
    const ringClass = statusRingWidth !== "none" ? `${ringWidthClasses[statusRingWidth]} ring-${statusRingColor}` : "";

    // Location class
    const positionClass =
      statusPosition === "custom"
        ? `top-[${statusOffsetY}] left-[${statusOffsetX}]`
        : getPositionClasses(statusPosition, size, statusOffsetX, statusOffsetY);

    switch (status) {
      case "online":
        return (
          <span
            className={cn(
              "absolute block rounded-full bg-green-500",
              ringClass,
              statusPosition === "bottom-right" ? "bottom-0 right-0 translate-y-1/4 translate-x-1/4" : positionClass,
              statusSizeClasses[size],
            )}
          />
        );
      case "notification":
        return (
          <Badge
            variant='destructive'
            className={cn(
              "absolute flex items-center justify-center rounded-full p-0 font-medium",
              ringClass,
              positionClass,
              statusSizeClasses[size],
            )}
          >
            {statusContent || 0}
          </Badge>
        );
      case "new":
        return (
          <Badge
            className={cn(
              "absolute bg-pink-500 text-white rounded-full px-1 py-0.5 text-[10px] font-medium",
              ringClass,
              positionClass,
            )}
          >
            new
          </Badge>
        );
      case "verified":
        return (
          <span
            className={cn(
              "absolute flex items-center justify-center rounded-full bg-green-500 text-white",
              ringClass,
              statusPosition === "bottom-right" ? "bottom-0 right-0 translate-y-1/3 translate-x-1/3" : positionClass,
              statusSizeClasses[size],
            )}
          >
            <Check className='h-3 w-3' />
          </span>
        );
      case "alert":
        return (
          <Badge
            variant='destructive'
            className={cn(
              "absolute flex items-center justify-center rounded-full p-0",
              ringClass,
              positionClass,
              statusSizeClasses[size],
            )}
          >
            <Bell className='h-3 w-3' />
          </Badge>
        );
      case "custom":
        return <div className={cn("absolute", ringClass, positionClass, statusClassName)}>{statusContent}</div>;
      default:
        return null;
    }
  };

  return (
    <div className='relative inline-block'>
      <Avatar className={cn(sizeClasses[size], shapeClasses[shape], shape === "square" && "overflow-hidden")}>
        <AvatarImage src={src} alt={alt} />
        <AvatarFallback>{fallback || alt.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      {renderStatus()}
    </div>
  );
}
