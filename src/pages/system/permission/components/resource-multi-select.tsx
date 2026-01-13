import React, { useMemo, useState } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface ResourceMultiSelectProps {
  allResources: API.System.Resource[];
  value?: string[];
  onChange?: (ids: string[]) => void;
}

export function ResourceMultiSelect({ allResources, value: selectedIds = [], onChange }: ResourceMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { selectedResources, unselectedResources } = useMemo(() => {
    const selected = allResources.filter((r) => selectedIds.includes(String(r.id)));
    const unselected = allResources.filter((r) => !selectedIds.includes(String(r.id)));
    return { selectedResources: selected, unselectedResources: unselected };
  }, [allResources, selectedIds]);

  const handleSelect = (resourceId: string) => {
    onChange?.([...selectedIds, resourceId]);
  };

  const handleRemove = (resourceId: string) => {
    onChange?.(selectedIds.filter((id) => id !== resourceId));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className='relative w-full'>
        <PopoverTrigger asChild>
          <div
            className={cn(
              "flex flex-wrap gap-2 w-full min-h-[2.5rem] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              "cursor-pointer",
            )}
            onClick={() => setOpen(!open)}
          >
            <div className='flex flex-wrap gap-2'>
              {selectedResources.length > 0 ? (
                selectedResources.map((resource) => (
                  <Badge key={resource.id} variant='secondary'>
                    {resource.name}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(String(resource.id));
                      }}
                      className='ml-2 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2'
                    >
                      <X className='h-3 w-3 text-muted-foreground hover:text-foreground' />
                    </button>
                  </Badge>
                ))
              ) : (
                <span className='text-muted-foreground'>Select resources...</span>
              )}
            </div>
            <ChevronsUpDown className='h-4 w-4 shrink-0 opacity-50' />
          </div>
        </PopoverTrigger>
      </div>
      <PopoverContent className='w-[--radix-popover-trigger-width] p-0'>
        <Command>
          <CommandInput placeholder='Search by name or keyword...' value={searchTerm} onValueChange={setSearchTerm} />
          <CommandList className='max-h-48'>
            <CommandEmpty>No resources found.</CommandEmpty>
            <CommandGroup>
              {unselectedResources
                .filter((r) => r.name?.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((resource) => (
                  <CommandItem
                    key={resource.id}
                    value={`${resource.name} ${resource.keyword}`}
                    onSelect={() => handleSelect(String(resource.id))}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedIds.includes(String(resource.id)) ? "opacity-100" : "opacity-0",
                      )}
                    />
                    <div className='flex flex-col'>
                      <span>{resource.name}</span>
                      <span className='text-xs text-muted-foreground'>{resource.path}</span>
                    </div>
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
