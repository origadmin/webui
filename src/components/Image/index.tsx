import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { LoadingSpinner } from "@/components/Loading";

const imageVariants = cva("bg-background flex flex-1 items-center justify-center", {
  variants: {
    variant: {
      default: "hover:bg-primary/90",
      destructive: "bg-destructive hover:bg-destructive/90",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "underline-offset-4 hover:underline",
    },
    size: {
      default: "h-10",
      sm: "h-9 rounded-md",
      lg: "h-11 rounded-md",
      icon: "h-10 w-10",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement>, VariantProps<typeof imageVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  spinner?: React.ElementType | React.ComponentType;
  label?: string;
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, variant, size, asChild = false, isLoading = false, label, onClick, ...props }, ref) => {
    const Comp = asChild ? Slot : "img";
    const Spinner = props.spinner || LoadingSpinner;

    if (isLoading) {
      return (
        <Skeleton className={cn(imageVariants({ variant, size, className }))}>
          <Spinner />
        </Skeleton>
      );
    }

    return (
      <Comp
        ref={ref}
        className={cn("alert-box cursor-pointer", imageVariants({ variant, size, className }))}
        onClick={onClick}
        aria-label={label}
        {...props}
      />
    );
  },
);
Image.displayName = "Image";

export { Image, imageVariants };
