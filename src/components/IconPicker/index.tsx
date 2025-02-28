import * as React from "react";
import { useState, useMemo, useEffect } from "react";
import { iconsList } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import TablerIcon from "./tabler-icon";

type IconName = string;
type IconsList = { icon: IconName; alias?: string[] }[];

const ICON_BUTTONS: IconsList = iconsList.default.map((icon) => ({
  icon: icon as IconName,
  alias: [] as string[],
}));

interface IconPickerProps
  extends Omit<React.ComponentPropsWithoutRef<typeof PopoverTrigger>, "onSelect" | "onOpenChange"> {
  value?: IconName;
  defaultValue?: IconName;
  onValueChange?: (value: IconName) => void;
  open?: boolean;
  defaultOpen?: boolean;
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
      count = 15,
      searchPlaceholder = "Search for an icon...",
      triggerPlaceholder = "Select an icon",
      iconsList = ICON_BUTTONS,
      ...props
    },
    ref,
  ) => {
    // const [selectedIcon, setSelectedIcon] = useState<IconName | undefined>(defaultValue);
    const [isOpen, setIsOpen] = useState(open || false);
    const handleValueChange = (icon: IconName) => {
      // if (value === undefined) {
      //   setSelectedIcon(icon);
      // }
      onValueChange?.(icon);
    };

    const handleOpenChange = (newOpen: boolean) => {
      if (open === undefined) {
        setIsOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    };

    const [search, setSearch] = useState("");
    const [displayCount, setDisplayCount] = useState(count);

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

    return (
      <Popover open={isOpen} onOpenChange={handleOpenChange}>
        <PopoverTrigger ref={ref} asChild {...props}>
          {children ||
            (selectedIcon ? (
              <Button
                variant='outline'
                className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
              >
                <TablerIcon name={(selectedIcon || selectedIcon)!} />
                <span>{selectedIcon || selectedIcon}</span>
              </Button>
            ) : (
              <Button
                variant='outline'
                className='flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
              >
                <span>{triggerPlaceholder}</span>
                <TablerIcon name='chevron-down' />
              </Button>
            ))}
        </PopoverTrigger>
        <PopoverContent className='w-full p-2'>
          {searchable && (
            <Input
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='mb-2'
            />
          )}
          <div
            className='grid grid-cols-3 gap-2 max-h-60 overflow-y-auto'
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

export type { IconPickerProps, TablerIcon };
export default IconPicker;
