import * as React from "react";
import { badgeColorPalette, semanticColorKeyMap } from "@/types/system";
import { cn } from "@/lib/utils";
import { Badge, BadgeProps } from "@/components/ui/badge";

interface ColorBadgeProps extends BadgeProps {
  colorKey?: string | number | null;
}

const ColorBadge: React.FC<ColorBadgeProps> = ({ className, colorKey, children, ...props }) => {
  let colorId: number;

  if (!colorKey) {
    // If colorKey is undefined, null, or empty string, default to gray (ID 3).
    colorId = 3;
  } else if (typeof colorKey === "string") {
    // If the key is a string, look it up in the semantic map to get the color ID.
    // Default to gray (ID 3) if not found.
    colorId = semanticColorKeyMap.get(colorKey) ?? 3;
  } else {
    // If the key is already a number, use it directly.
    colorId = colorKey;
  }

  // Get the actual color class from the palette using the resolved ID.
  // Default to gray (ID 3) if the ID is somehow invalid.
  const colorClass = badgeColorPalette.get(colorId) ?? badgeColorPalette.get(3);

  return (
    <Badge variant='outline' className={cn("capitalize", colorClass, className)} {...props}>
      {children}
    </Badge>
  );
};

ColorBadge.displayName = "ColorBadge";

export { ColorBadge };
