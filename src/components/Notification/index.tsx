import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { IconBell } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "absolute rounded-full text-white text-xs font-semibold",
  {
    variants: {
      position: {
        "top-right": "top-0 right-0 transform translate-x-1/2 -translate-y-1/2",
        "top-left": "top-0 left-0 transform -translate-x-1/2 -translate-y-1/2",
        "bottom-right": "bottom-0 right-0 transform translate-x-1/2 translate-y-1/2",
        "bottom-left": "bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2",
      },
      variant: {
        dot: "h-2 w-2 p-0",
        number: "h-4 min-w-[1rem] px-1 flex items-center justify-center", // Adjusted size
      },
    },
    defaultVariants: {
      position: "top-right",
      variant: "number",
    },
  }
);

export interface NotificationProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
  content?: number | "dot";
  show?: boolean;
  max?: number;
}

const Notification: React.FC<NotificationProps> = ({
  className,
  icon,
  content,
  show = true,
  max = 99,
  position,
  ...props
}) => {
  const showBadge = show && content !== undefined;

  const badgeContent = React.useMemo(() => {
    if (content === "dot") {
      return null;
    }
    if (typeof content === "number" && content > max) {
      return `${max}+`;
    }
    return content;
  }, [content, max]);

  const variant = content === "dot" ? "dot" : "number";

  return (
    <div className={cn("relative inline-flex items-center", className)} {...props}>
      {icon || <IconBell className="h-6 w-6" />}
      {showBadge && (
        <span
          className={cn(badgeVariants({ position, variant }), "bg-red-500")}
        >
          {badgeContent}
        </span>
      )}
    </div>
  );
};

Notification.displayName = "Notification";

export { Notification };
