import { forwardRef, useState, KeyboardEvent, useEffect, useMemo } from "react";
import { IconCheck, IconChevronDown, IconCircleX, IconWand } from "@tabler/icons-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

/**
 * Variants for the multi-select component to handle different styles.
 * Uses class-variance-authority (cva) to define different styles based on "variant" prop.
 */
const multiSelectVariants = cva(
  "m-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300",
  {
    variants: {
      variant: {
        default: "border-foreground/10 text-foreground bg-card hover:bg-card/80",
        secondary: "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        inverted: "inverted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface MultiSelectOption {
  /** The text to display for the option. */
  label: string;
  /** The unique value associated with the option. */
  value: string;
  /** Optional icon component to display alongside the option. */
  icon?: React.ComponentType<{ className?: string }>;
}

/**
 * Props for MultiSelect component
 */
export interface MultiSelectProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange">,
    VariantProps<typeof multiSelectVariants> {
  /**
   * An array of option objects to be displayed in the multi-select component.
   * Each option object has a label, value, and an optional icon.
   */
  options: MultiSelectOption[];

  /**
   * Callback function triggered when the selected values change.
   * Receives an array of the new selected values.
   */
  onChange: (value: string[]) => void;

  /** The default selected values when the component mounts. */
  defaultValue?: string[];

  /**
   * Placeholder text to be displayed when no values are selected.
   * Optional, defaults to "Select options".
   */
  placeholder?: string;

  /**
   * Animation duration in seconds for the visual effects (e.g., bouncing badges).
   * Optional, defaults to 0 (no animation).
   */
  animation?: number;

  /**
   * Maximum number of items to display. Extra selected items will be summarized.
   * Optional, defaults to 3.
   */
  maxCount?: number;

  /**
   * The modality of the popover. When set to true, interaction with outside elements
   * will be disabled and only popover content will be visible to screen readers.
   * Optional, defaults to false.
   */
  modalPopover?: boolean;

  /**
   * If true, renders the multi-select component as a child of another component.
   * Optional, defaults to false.
   */
  asChild?: boolean;

  /**
   * Additional class names to apply custom styles to the multi-select component.
   * Optional, can be used to add custom styles.
   */
  className?: string;
  /**
   * Additional class names to apply custom styles to the badge component.
   * Optional, can be used to add custom styles.
   */
  badgeClassName?: string;
  /**
   * The number of options to display in the multi-select component.
   * Optional, defaults to 1000.
   */
  count?: number;
}

export const MultiSelect = forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options,
      onChange,
      variant,
      defaultValue = [],
      placeholder = "Select options",
      animation = 0,
      maxCount = 2,
      modalPopover = false,
      count = 1000,
      className,
      badgeClassName,
      ...props
    },
    ref,
  ) => {
    const [selectedValues, setSelectedValues] = useState<string[]>(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [displayCount, setDisplayCount] = useState(count);

    useEffect(() => {
      setDisplayCount(count);
    }, [count]);

    const displayedOptions = useMemo(() => options.slice(0, displayCount), [options, displayCount]);

    const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      console.log("event", event);
      event.stopPropagation();
      if (event.key === "Enter") {
        setIsPopoverOpen(true);
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        setSelectedValues(newSelectedValues);
        onChange(newSelectedValues);
      }
    };

    const toggleOption = (option: string) => {
      console.log("option", option);
      const newSelectedValues = selectedValues.includes(option)
        ? selectedValues.filter((value) => value !== option)
        : [...selectedValues, option];
      setSelectedValues(newSelectedValues);
      onChange(newSelectedValues);
    };

    const handleClear = () => {
      console.log("handleClear");
      setSelectedValues([]);
      onChange([]);
    };

    const handleTogglePopover = (e: React.MouseEvent) => {
      console.log("handleTogglePopover");
      e.stopPropagation();
      setIsPopoverOpen((prev) => !prev);
    };

    const clearExtraOptions = () => {
      console.log("clearExtraOptions");
      const newSelectedValues = selectedValues.slice(0, maxCount);
      setSelectedValues(newSelectedValues);
      onChange(newSelectedValues);
    };

    const toggleAll = () => {
      console.log("toggleAll");
      if (selectedValues.length === options.length) {
        handleClear();
      } else {
        const allValues = options.map((option) => option.value);
        setSelectedValues(allValues);
        onChange(allValues);
      }
    };

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
      if (scrollHeight - scrollTop - clientHeight < count) {
        setDisplayCount((prev) => Math.min(prev + count, displayedOptions.length));
      }
    };

    const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
      console.log("handleWheel");
      e.currentTarget.scrollTop += e.deltaY;
      e.stopPropagation();
    };

    return (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} modal={modalPopover}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            role='combobox'
            {...props}
            aria-expanded={isPopoverOpen}
            onClick={handleTogglePopover}
            className={cn(
              "flex w-full p-1 rounded-md border min-h-10 h-auto items-center justify-between bg-inherit hover:bg-inherit [&_svg]:pointer-events-auto",
              className,
            )}
          >
            {selectedValues.length === 0 && (
              <div className='flex items-center justify-between w-full mx-auto'>
                <span className='text-sm text-muted-foreground mx-3'>{placeholder}</span>
                <IconChevronDown className='h-4 text-muted-foreground mx-2' />
              </div>
            )}
            {selectedValues.length > 0 && (
              <div className='flex justify-between items-center w-full'>
                <div className='flex items-center'>
                  {selectedValues.slice(0, maxCount).map((value) => {
                    const option = options.find((o) => o.value === value);
                    const IconComponent = option?.icon;
                    return (
                      <Badge
                        key={value}
                        className={cn(
                          isAnimating ? "animate-bounce" : "",
                          multiSelectVariants({ variant }),
                          badgeClassName,
                        )}
                        style={{ animationDuration: `${animation}s` }}
                      >
                        {IconComponent && <IconComponent className='h-4 w-4 mr-2' />}
                        {option?.label}
                        <IconCircleX
                          className='ml-2 h-4 w-4'
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            toggleOption(value);
                          }}
                        />
                      </Badge>
                    );
                  })}
                  {selectedValues.length > maxCount && (
                    <Badge
                      className={cn(
                        "bg-transparent text-foreground border-foreground/1 hover:bg-transparent",
                        isAnimating ? "animate-bounce" : "",
                        multiSelectVariants({ variant }),
                      )}
                      style={{ animationDuration: `${animation}s` }}
                    >
                      {`+ ${selectedValues.length - maxCount} more`}
                      <IconCircleX
                        className='ml-2 h-4 w-4'
                        onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();
                          clearExtraOptions();
                        }}
                      />
                    </Badge>
                  )}
                </div>
                <div className='flex items-center justify-between'>
                  <IconCircleX
                    className='h-4 mx-2 text-muted-foreground'
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      handleClear();
                    }}
                  />
                  <Separator orientation='vertical' className='flex min-h-6 h-full' />
                  <IconChevronDown className='h-4 mx-2 text-muted-foreground' />
                </div>
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='w-[--radix-popover-trigger-width] p-0'
          align='start'
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
          onOpenAutoFocus={(e) => {
            console.log("onOpenAutoFocus", e.target, e.currentTarget);
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Command className='h-full'>
            <CommandInput
              placeholder='Search...'
              onClick={(e) => {
                console.log("handleMouseClick", e.target, e.currentTarget);
              }}
              onFocus={(e) => {
                console.log("handleFocus", e.target);
                e.target.select();
              }}
              onKeyDown={handleInputKeyDown}
            />
            <CommandList onWheel={handleWheel} onScroll={(e) => handleScroll(e)}>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                <CommandItem key='all' onSelect={toggleAll}>
                  <div
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                      selectedValues.length === options.length
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50 [&_svg]:invisible",
                    )}
                  >
                    <IconCheck className='h-4 w-4' />
                  </div>
                  <span>(Select All)</span>
                </CommandItem>
                {displayedOptions.map((option) => {
                  const isSelected = selectedValues.includes(option.value);
                  return (
                    <CommandItem key={option.value} onSelect={() => toggleOption(option.value)}>
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          isSelected ? "bg-primary text-primary-foreground" : "opacity-50 [&_svg]:invisible",
                        )}
                      >
                        <IconCheck className='h-4 w-4' />
                      </div>
                      {option.icon && <option.icon className='mr-2 h-4 w-4 text-muted-foreground' />}
                      <span>{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <div className='flex items-center justify-between'>
                  {selectedValues.length > 0 && (
                    <>
                      <CommandItem onSelect={handleClear} className='flex-1 justify-center'>
                        Clear
                      </CommandItem>
                      <Separator orientation='vertical' className='flex min-h-6 h-full' />
                    </>
                  )}
                  <CommandItem onSelect={() => setIsPopoverOpen(false)} className='flex-1 justify-center max-w-full'>
                    Close
                  </CommandItem>
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
        {animation > 0 && selectedValues.length > 0 && (
          <IconWand
            className={cn("my-2 text-foreground bg-background w-3 h-3", isAnimating ? "" : "text-muted-foreground")}
            onClick={() => setIsAnimating(!isAnimating)}
          />
        )}
      </Popover>
    );
  },
);

MultiSelect.displayName = "MultiSelect";
