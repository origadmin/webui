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
      {/* Icon container: Use an <img> tag to display the project's own SVG logo. */}
      <div className='flex flex-none items-center justify-center'>
        <img src='/static/logo.svg' alt='OrigAdmin Logo' className='size-8' />
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
