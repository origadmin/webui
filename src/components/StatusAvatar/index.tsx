import { type ReactNode } from "react";
import { Check, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export type StatusType = "online" | "notification" | "new" | "verified" | "alert" | "none";
export type StatusPosition = "top-left" | "top-right" | "bottom-left" | "bottom-right";
export type RingWidth = "none" | "extra-thin" | "thin" | "medium" | "thick" | "extra-thick";
export type Size = "xs" | "sm" | "md" | "lg" | "xl";

interface StatusAvatarProps {
  src?: string;
  alt?: string;
  children?: ReactNode;
  status?: StatusType;
  statusContent?: string | number;
  size?: Size;
  shape?: "circle" | "square";
  fallback?: string;
  statusRingWidth?: RingWidth;
  statusRingColor?: string;
  statusPosition?: StatusPosition;
  statusOffsetX?: string;
  statusOffsetY?: string;
}

const positions: Record<StatusPosition, string> = {
  "top-left": "top-0 left-0 -translate-x-1/4 -translate-y-1/4",
  "top-right": "top-0 right-0 translate-x-1/4 -translate-y-1/4",
  "bottom-left": "bottom-0 left-0 -translate-x-1/4 translate-y-1/4",
  "bottom-right": "bottom-0 right-0 translate-x-1/4 translate-y-1/4",
};

const sizeClasses: Record<Size, string> = {
  xs: "h-6 w-6",
  sm: "h-8 w-8",
  md: "h-12 w-12",
  lg: "h-16 w-16",
  xl: "h-20 w-20",
};

const shapeClasses = {
  circle: "rounded-full",
  square: "rounded-lg",
};

const statusSizeClasses: Record<Size, string> = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-8 w-8",
};

const newBadgeSizeClasses: Record<Size, string> = {
  xs: "text-[8px] px-1",
  sm: "text-[10px] px-1.5",
  md: "text-xs px-1.5",
  lg: "text-sm px-2",
  xl: "text-base px-2",
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
  statusRingWidth = "medium",
  statusRingColor = "ring-white",
  statusPosition = "top-right",
  statusOffsetX,
  statusOffsetY,
}: StatusAvatarProps) {

  const ringClass = statusRingWidth !== "none" ? cn(ringWidthClasses[statusRingWidth], statusRingColor) : "";

  const renderStatusContent = () => {
    const baseClasses = cn("absolute", positions[statusPosition]);
    const customStyle = {
      transform: `translate(${statusOffsetX || '0'}, ${statusOffsetY || '0'})`,
    };
    const styleProp = (statusOffsetX || statusOffsetY) ? { style: customStyle } : {};

    switch (status) {
      case "online":
        return <span className={cn(baseClasses, statusSizeClasses[size], "rounded-full bg-green-500", ringClass)} {...styleProp} />;
      case "notification":
        return (
          <Badge variant='destructive' className={cn(baseClasses, statusSizeClasses[size], "flex items-center justify-center rounded-full p-0 font-medium hover:bg-destructive", ringClass)} {...styleProp}>
            {statusContent || 0}
          </Badge>
        );
      case "new":
        return <Badge className={cn(baseClasses, newBadgeSizeClasses[size], "bg-pink-500 text-white rounded-full font-medium hover:bg-pink-500", ringClass)} {...styleProp}>new</Badge>;
      case "verified":
        return (
          <span className={cn(baseClasses, statusSizeClasses[size], "flex items-center justify-center rounded-full bg-green-500 text-white", ringClass)} {...styleProp}>
            <Check className='h-3/4 w-3/4' />
          </span>
        );
      case "alert":
        return (
          <Badge variant='destructive' className={cn(baseClasses, statusSizeClasses[size], "flex items-center justify-center rounded-full p-0 hover:bg-destructive", ringClass)} {...styleProp}>
            <Bell className='h-3/4 w-3/4' />
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className='relative inline-block'>
      <Avatar className={cn(sizeClasses[size], shapeClasses[shape], "flex items-center justify-center border bg-secondary", ringClass)}>
        {children ? (
          <div className="w-2/3 h-2/3">{children}</div>
        ) : (
          <>
            <AvatarImage src={src} alt={alt} />
            <AvatarFallback>{fallback || alt.charAt(0).toUpperCase()}</AvatarFallback>
          </>
        )}
      </Avatar>
      {renderStatusContent()}
    </div>
  );
}
