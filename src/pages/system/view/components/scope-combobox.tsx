import * as React from "react";
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { scopeOptions } from "../constants";

interface ScopeComboboxProps {
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

export function ScopeCombobox({ value, onChange, disabled }: ScopeComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");

  const handleSelect = (currentValue: string) => {
    onChange?.(currentValue);
    setOpen(false);
  };

  const currentLabel =
    scopeOptions.find((option) => option.value === value)?.label || value;

  return (
    <Popover open={open && !disabled} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn(
            "w-full justify-between",
            disabled && "opacity-50 cursor-not-allowed text-muted-foreground"
          )}
          disabled={disabled}
        >
          {value ? currentLabel : "Select or create scope..."}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[--radix-popover-trigger-width] p-0'>
        <Command filter={(value, search) => (value.includes(search) ? 1 : 0)}>
          <CommandInput
            placeholder='Search or create scope...'
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList>
            <CommandEmpty>
              <Button
                variant='ghost'
                className='w-full justify-start'
                onClick={() => handleSelect(inputValue)}
              >
                <PlusCircle className='mr-2 h-4 w-4' />
                Create "{inputValue}"
              </Button>
            </CommandEmpty>
            <CommandGroup>
              {scopeOptions.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={handleSelect}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
