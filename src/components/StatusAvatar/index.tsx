import { type ReactNode } from "react";
import { Bell, Check, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export type StatusType = "online" | "notification" | "new" | "verified" | "alert" | "none";
export type StatusPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";
export type RingWidth = "none" | "extra-thin" | "thin" | "medium" | "thick" | "extra-thick";
export type Size = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarShape = "circle" | "square" | "rounded-square";

interface StatusAvatarProps {
  src?: string;
  alt?: string;
  children?: ReactNode;
  status?: StatusType;
  statusContent?: string | number;
  size?: Size;
  shape?: AvatarShape;
  fallback?: string;
  borderStyle?: {
    width?: RingWidth;
    color?: string;
  };
  statusBorderStyle?: {
    width?: RingWidth;
    color?: string;
  };
  statusPosition?: StatusPosition;
  statusOffsetX?: string;
  statusOffsetY?: string;
  className?: string;
}

const positions: Record<StatusPosition, string> = {
  "top-left": "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
  "top-right": "top-0 right-0 translate-x-1/2 -translate-y-1/2",
  "bottom-left": "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
  "bottom-right": "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
};

const sizeClasses: Record<Size, string> = {
  xs: "h-6 w-6",
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
  xl: "h-20 w-20",
};

const shapeClasses: Record<AvatarShape, string> = {
  circle: "rounded-full",
  square: "rounded-lg",
  "rounded-square": "rounded-2xl",
};

const statusSizeClasses: Record<Size, string> = {
  xs: "h-2 w-2",
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-5 w-5",
  xl: "h-6 w-6",
};

const ringWidthClasses: Record<RingWidth, string> = {
  none: "",
  "extra-thin": "ring-[1px]",
  thin: "ring-[2px]",
  medium: "ring-[3px]",
  thick: "ring-[4px]",
  "extra-thick": "ring-[5px]",
};

export default function StatusAvatar({
  src,
  alt = "Avatar",
  children,
  status = "none",
  statusContent,
  size = "md",
  shape = "circle",
  fallback,
  borderStyle,
  statusBorderStyle,
  statusPosition = "top-right",
  statusOffsetX,
  statusOffsetY,
  className,
}: StatusAvatarProps) {
  const getRingClass = (style?: { width?: RingWidth; color?: string }) => {
    if (!style?.width || style.width === "none") return "";
    return cn(ringWidthClasses[style.width], style.color || "ring-white");
  };

  const borderRingClass = getRingClass(borderStyle);
  const statusRingClass = getRingClass(statusBorderStyle) || borderRingClass;

  const renderMainAvatar = () => {
    const avatarClass = cn(
      sizeClasses[size],
      shapeClasses[shape],
      "flex items-center justify-center bg-secondary border border-border",
      borderRingClass,
      className,
    );

    return (
      <Avatar className={avatarClass}>
        {children ? (
          <div className='w-2/3 h-2/3 flex items-center justify-center'>{children}</div>
        ) : src ? (
          <>
            <AvatarImage src={src} alt={alt} />
            <AvatarFallback>{fallback || alt.charAt(0).toUpperCase()}</AvatarFallback>
          </>
        ) : (
          <div className='w-2/3 h-2/3 flex items-center justify-center text-muted-foreground'>
            <User className='w-full h-full' />
          </div>
        )}
      </Avatar>
    );
  };

  const renderStatusBadge = () => {
    if (status === "none") return null;

    const baseClasses = cn("absolute", positions[statusPosition]);
    const statusSizeClass = statusSizeClasses[size];

    const customStyle = {
      transform: `translate(${statusOffsetX || "0"}, ${statusOffsetY || "0"})`,
    };
    const styleProp = statusOffsetX || statusOffsetY ? { style: customStyle } : {};

    const statusShapeClass = "rounded-full"; // 所有角标都使用圆形

    switch (status) {
      case "online":
        return (
          <span
            className={cn(baseClasses, statusSizeClass, statusShapeClass, "bg-green-500", statusRingClass)}
            {...styleProp}
          />
        );

      case "notification": {
        const notificationCount = statusContent || 0;
        const displayCount = notificationCount > 99 ? "99+" : notificationCount.toString();

        return (
          <Badge
            variant='destructive'
            className={cn(
              baseClasses,
              statusSizeClass,
              "flex items-center justify-center p-0 font-medium hover:bg-destructive",
              statusShapeClass,
              statusRingClass,
            )}
            {...styleProp}
          >
            {displayCount}
          </Badge>
        );
      }
      case "new":
        return (
          <Badge
            className={cn(
              baseClasses,
              statusSizeClass,
              "flex items-center justify-center bg-pink-500 text-white font-medium hover:bg-pink-500 p-0 text-[8px]",
              statusShapeClass,
              statusRingClass,
            )}
            {...styleProp}
          >
            N
          </Badge>
        );

      case "verified":
        return (
          <span
            className={cn(
              baseClasses,
              statusSizeClass,
              "flex items-center justify-center bg-green-500 text-white",
              statusShapeClass,
              statusRingClass,
            )}
            {...styleProp}
          >
            <Check className='h-3/4 w-3/4' />
          </span>
        );

      case "alert":
        return (
          <Badge
            variant='destructive'
            className={cn(
              baseClasses,
              statusSizeClass,
              "flex items-center justify-center p-0 hover:bg-destructive",
              statusShapeClass,
              statusRingClass,
            )}
            {...styleProp}
          >
            <Bell className='h-3/4 w-3/4' />
          </Badge>
        );

      default:
        return null;
    }
  };

  return (
    <div className='relative inline-block'>
      {renderMainAvatar()}
      {renderStatusBadge()}
    </div>
  );
}
