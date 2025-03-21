import { useEffect, useState, type ReactNode } from "react";
import { Check, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export type StatusType = "online" | "notification" | "new" | "verified" | "alert" | "none" | "custom";
export type StatusPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "custom";
export type RingWidth = "none" | "thin" | "medium" | "thick";
export type Size = "xs" | "sm" | "md" | "lg" | "xl";

interface StatusAvatarProps {
  src: string;
  alt: string;
  status?: StatusType;
  statusContent?: string | number | ReactNode;
  size?: Size;
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

const positions: Record<StatusPosition, Record<Size, string> | undefined> = {
  "top-left": {
    xs: "-top-0.5 -left-0.5",
    sm: "-top-1 -left-1",
    md: "-top-1.5 -left-1.5",
    lg: "-top-2 -left-2",
    xl: "-top-2.5 -left-2.5",
  },
  "top-right": {
    xs: "-top-0.5 -right-0.5",
    sm: "-top-1 -right-1",
    md: "-top-1.5 -right-1.5",
    lg: "-top-2 -right-2",
    xl: "-top-2.5 -right-2.5",
  },
  "bottom-left": {
    xs: "-bottom-0.5 -left-0.5",
    sm: "-bottom-1 -left-1",
    md: "-bottom-1.5 -left-1.5",
    lg: "-bottom-2 -left-2",
    xl: "-bottom-2.5 -left-2.5",
  },
  "bottom-right": {
    xs: "-bottom-0.5 -right-0.5",
    sm: "-bottom-1 -right-1",
    md: "-bottom-1.5 -right-1.5",
    lg: "-bottom-2 -right-2",
    xl: "-bottom-2.5 -right-2.5",
  },
  custom: undefined,
};

export function getPositionClasses(
  statusPosition: StatusPosition,
  size: Size,
  statusOffsetX?: string,
  statusOffsetY?: string,
): string {
  const position = positions[statusPosition];
  if (!position) {
    // Handle custom position based on offsets
    const offsetX = statusOffsetX ? parseFloat(statusOffsetX) : 0;
    const offsetY = statusOffsetY ? parseFloat(statusOffsetY) : 0;

    let topBottom = "";
    let leftRight = "";

    if (offsetY < 0) {
      topBottom = `-bottom-${Math.abs(offsetY)}`;
    } else if (offsetY > 0) {
      topBottom = `-top-${offsetY}`;
    }

    if (offsetX < 0) {
      leftRight = `-right-${Math.abs(offsetX)}`;
    } else if (offsetX > 0) {
      leftRight = `-left-${offsetX}`;
    }

    return `${topBottom} ${leftRight}`;
  }
  return position[size];
}

// Set the size according to size
const sizeClasses = {
  xs: "h-6 w-6",
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
  xl: "h-20 w-20",
};

// Set the shape according to the shape
const shapeClasses = {
  circle: "rounded-full",
  square: "rounded-lg",
};

// The size of the status indicator
const statusSizeClasses = {
  xs: "h-3 w-3 text-[8px]",
  sm: "h-4 w-4 text-[10px]",
  md: "h-5 w-5 text-xs",
  lg: "h-6 w-6 text-sm",
  xl: "h-8 w-8 text-base",
};

// Border width
const ringWidthClasses = {
  none: "",
  "extra-thin": "ring-[1px]",
  thin: "ring-[2px]",
  medium: "ring-[3px]",
  thick: "ring-[4px]",
  "extra-thick": "ring-[5px]",
};

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
  // Location class
  const [positionClass, setPositionClass] = useState(
    getPositionClasses(statusPosition, size, statusOffsetX, statusOffsetY),
  );

  // Render status indicator
  const renderStatus = () => {
    if (status === "none") return null;

    // Whether to display a border
    const ringClass = statusRingWidth !== "none" ? `${ringWidthClasses[statusRingWidth]} ring-${statusRingColor}` : "";

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
              "hover:bg-destructive",
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
              "hover:bg-pink-500",
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
              "hover:bg-green-500",
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
              "hover:bg-destructive",
              statusSizeClasses[size],
            )}
          >
            <Bell className='h-3 w-3' />
          </Badge>
        );
      case "custom":
        return (
          <div className={cn("absolute", ringClass, positionClass, "hover:bg-gray-500", statusClassName)}>
            {statusContent}
          </div>
        );
      default:
        return null;
    }
  };

  // Debugging: Log changes to positionClass
  useEffect(() => {
    console.log("positionClass:", getPositionClasses(statusPosition, size, statusOffsetX, statusOffsetY));
    setPositionClass(getPositionClasses(statusPosition, size, statusOffsetX, statusOffsetY));
  }, [statusPosition, size, statusOffsetX, statusOffsetY]);

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
