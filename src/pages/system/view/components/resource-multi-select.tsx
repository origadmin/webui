import { useMemo, useState, useRef, useCallback } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { useInfiniteResourcesQuery } from "@/api/system/resource";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ResourceMultiSelectProps {
  value?: string[];
  onChange?: (ids: string[]) => void;
}

export function ResourceMultiSelect({
  value: selectedIds = [],
  onChange,
}: ResourceMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteResourcesQuery({ keyword: searchTerm });

  const allResources = useMemo(() => data?.pages.flatMap((page) => page.resources) || [], [data]);

  const { selectedResources, unselectedResources } = useMemo(() => {
    const selected = allResources.filter((r) => selectedIds.includes(r.id));
    const unselected = allResources.filter((r) => !selectedIds.includes(r.id));
    return { selectedResources: selected, unselectedResources: unselected };
  }, [allResources, selectedIds]);

  const handleSelect = (resourceId: string) => {
    onChange?.([...selectedIds, resourceId]);
  };

  const handleRemove = (resourceId: string) => {
    onChange?.(selectedIds.filter((id) => id !== resourceId));
  };

  // Infinite scroll logic
  const scrollRef = useRef<HTMLDivElement>(null);
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop - clientHeight < 50 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className='space-y-2'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            role='combobox'
            aria-expanded={open}
            className='w-full justify-between'
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Select resources..."}
            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[--radix-popover-trigger-width] p-0'>
          <Command>
            <CommandInput
              placeholder='Search by name or keyword...'
              value={searchTerm}
              onValueChange={setSearchTerm}
            />
            <ScrollArea className='h-48'>
              <CommandList ref={scrollRef} onScroll={handleScroll}>
                <CommandEmpty>No resources found.</CommandEmpty>
                <CommandGroup>
                  {unselectedResources.map((resource) => (
                    <CommandItem
                      key={resource.id}
                      value={`${resource.name} ${resource.keyword}`}
                      onSelect={() => handleSelect(resource.id)}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedIds.includes(resource.id)
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      <div className='flex flex-col'>
                        <span>{resource.name}</span>
                        <span className='text-xs text-muted-foreground'>
                          {resource.keyword}
                        </span>
                      </div>
                    </CommandItem>
                  ))}
                  {isFetchingNextPage && <CommandItem disabled>Loading more...</CommandItem>}
                </CommandGroup>
              </CommandList>
            </ScrollArea>
          </Command>
        </PopoverContent>
      </Popover>
      <div className='space-y-2'>
        {selectedResources.length > 0 && (
          <div className='flex flex-wrap gap-2 rounded-md border p-2 min-h-[2.5rem]'>
            {selectedResources.map((resource) => (
              <Badge key={resource.id} variant='secondary'>
                {resource.name}
                <button
                  onClick={() => handleRemove(resource.id)}
                  className='ml-2 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2'
                >
                  <X className='h-3 w-3 text-muted-foreground hover:text-foreground' />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
