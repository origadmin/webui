import * as React from "react";
import { useState, useMemo, useEffect } from "react";
import { iconsList as baseIconList } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import TablerIcon from "./tabler-icon";

type IconName = string;
type IconsList = { icon: IconName; alias?: string[] }[];

const ICON_BUTTONS: IconsList = baseIconList.default.map((icon) => ({
  icon: icon as IconName,
  alias: [] as string[],
}));

interface IconPickerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof PopoverTrigger>, "onSelect" | "onOpenChange"> {
  value?: IconName;
  defaultValue?: IconName;
  onValueChange?: (value: IconName | undefined) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  count?: number;
  searchable?: boolean;
  searchPlaceholder?: string;
  triggerPlaceholder?: string;
  iconsList?: IconsList;
}

const IconPicker = React.forwardRef<React.ComponentRef<typeof PopoverTrigger>, IconPickerProps>(
  (
    {
      value: selectedIcon,
      onValueChange,
      open,
      onOpenChange,
      children,
      searchable = true,
      count = 24,
      searchPlaceholder = "Search for an icon...",
      triggerPlaceholder = "Select an icon",
      iconsList = ICON_BUTTONS,
      ...props
    },
    ref,
  ) => {
    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(open || false);
    const [displayCount, setDisplayCount] = useState(count);
    const handleValueChange = (icon: IconName | undefined) => {
      if (!onValueChange) {
        return;
      }
      onValueChange(icon);
    };

    const handleOpenChange = (newOpen: boolean) => {
      if (open === undefined) {
        setIsOpen(newOpen);
      }
      if (!onOpenChange) {
        return;
      }
      onOpenChange(newOpen);
    };

    const filteredIcons = useMemo(
      () =>
        search.trim() === ""
          ? iconsList
          : iconsList.filter(
              ({ icon, alias }) =>
                icon.toLowerCase().includes(search.toLowerCase().trim()) ||
                (alias || []).some((alias) => alias.toLowerCase().includes(search.toLowerCase().trim())),
            ),
      [search, iconsList],
    );

    useEffect(() => {
      setDisplayCount(count);
    }, [count]);

    const displayedIcons = useMemo(() => filteredIcons.slice(0, displayCount), [filteredIcons, displayCount]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      if (scrollHeight - scrollTop - clientHeight < count) {
        setDisplayCount((prev) => Math.min(prev + count, filteredIcons.length));
      }
    };

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
      e.currentTarget.scrollTop += e.deltaY;
      e.stopPropagation();
    };

    const commonButtonClasses =
      "flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1";

    return (
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger ref={ref} asChild {...props}>
          {children ||
            (selectedIcon ? (
              <Button variant='outline' className={cn("group", commonButtonClasses)}>
                <div className='flex items-center gap-2'>
                  <TablerIcon name={selectedIcon} />
                  <span>{selectedIcon}</span>
                </div>
                <div
                  className='opacity-50 group-hover:opacity-100 cursor-pointer p-0.5 hover:bg-muted rounded-sm transition-opacity z-10 relative'
                  onClick={(e) => {
                    e.stopPropagation();
                    handleValueChange(undefined);
                  }}
                >
                  <TablerIcon name='x' className='h-4 w-4 text-muted-foreground' />
                </div>
              </Button>
            ) : (
              <Button variant='outline' className={commonButtonClasses}>
                <span>{triggerPlaceholder}</span>
                <TablerIcon name='chevron-down' />
              </Button>
            ))}
        </PopoverTrigger>
        <PopoverContent
          className='w-full p-2'
          style={{ width: "var(--radix-popover-trigger-width)" }}
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <div className='flex items-center gap-2 mb-2'>
            {searchable && (
              <Input
                placeholder={searchPlaceholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className='flex-1'
              />
            )}
            <Button
              variant='ghost'
              size='icon'
              onClick={() => {
                handleValueChange(undefined);
                setIsOpen(false);
              }}
              title='Clear selection'
            >
              <TablerIcon name='x' />
            </Button>
          </div>
          <div
            className='grid grid-cols-4 gap-2 max-h-60 overflow-y-auto'
            onWheel={handleWheel}
            onScroll={handleScroll}
          >
            {displayedIcons.map(({ icon }) => (
              <TooltipProvider key={icon}>
                <Tooltip>
                  <TooltipTrigger
                    className={cn(
                      "p-2 rounded-md border hover:bg-foreground/10 transition",
                      "flex items-center justify-center",
                    )}
                    onClick={() => {
                      handleValueChange(icon);
                      setIsOpen(false);
                      setDisplayCount(count);
                      setSearch("");
                    }}
                  >
                    <TablerIcon name={icon} />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{icon}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
            {filteredIcons.length === 0 && (
              <div className='text-center text-gray-500 dark:text-gray-400 col-span-3'>No icons found</div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    );
  },
);
IconPicker.displayName = "IconPicker";

export type { IconName, IconPickerProps };
export default IconPicker;
export { ICON_BUTTONS, TablerIcon };
