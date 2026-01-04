import { Command } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";

interface BrandProps {
  className?: string;
}

export function Brand({ className }: BrandProps) {
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  return (
    // The main container. We dynamically change padding and justification.
    <div
      className={cn("flex h-12 items-center gap-2 rounded-lg", isCollapsed ? "justify-center px-0" : "px-2", className)}
    >
      {/* Icon container: Fixed size, does not shrink. */}
      <div className='flex flex-none aspect-square size-8 items-center justify-center rounded-lg bg-foreground text-background'>
        <Command className='size-5' />
      </div>

      {/* Text container: The key is to hide it when collapsed. */}
      {!isCollapsed && (
        <div className='flex-1 overflow-hidden whitespace-nowrap'>
          <span className='text-lg font-bold'>OrigAdmin</span>
        </div>
      )}
    </div>
  );
}
