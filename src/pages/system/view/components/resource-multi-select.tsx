import { useMemo, useState, useRef, useCallback } from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { useInfiniteResourcesQuery } from "@/api/system/resource";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ResourceMultiSelectProps {
  value?: string[];
  onChange?: (ids: string[]) => void;
}

const DISPLAY_LIMIT = 3; // Set a display limit for selected items

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
  } = useInfiniteResourcesQuery({ keyword: searchTerm });

  const allResources = useMemo(() => {
    if (!data?.pages) {
      return [];
    }
    const flattenedResources = data.pages.flatMap((page) => page.resources || []);
    const uniqueResources = new Map<string, API.System.Resource>();
    for (const resource of flattenedResources) {
      if (resource?.id) {
        uniqueResources.set(resource.id, resource);
      }
    }
    return Array.from(uniqueResources.values());
  }, [data]);

  const selectedResources = useMemo(() => {
    return allResources.filter((r) => selectedIds.includes(r.id));
  }, [allResources, selectedIds]);

  const handleSelect = (resourceId: string) => {
    onChange?.([...selectedIds, resourceId]);
  };

  const handleRemove = (resourceId: string) => {
    onChange?.(selectedIds.filter((id) => id !== resourceId));
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.([]);
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop - clientHeight < 50 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <div className='relative w-full'>
        <PopoverTrigger asChild>
          <div
            className={cn(
              "flex w-full min-h-[2.5rem] items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              "cursor-pointer",
            )}
            onClick={() => setOpen(!open)}
          >
            <div className='flex flex-wrap gap-2 flex-grow'>
              {selectedResources.length > 0 ? (
                <>
                  {selectedResources.slice(0, DISPLAY_LIMIT).map((resource) => (
                    <Badge key={resource.id} variant='secondary'>
                      {resource.name}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemove(resource.id);
                        }}
                        className='ml-2 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2'
                      >
                        <X className='h-3 w-3 text-muted-foreground hover:text-foreground' />
                      </button>
                    </Badge>
                  ))}
                  {selectedResources.length > DISPLAY_LIMIT && (
                    <Badge variant='outline'>
                      +{selectedResources.length - DISPLAY_LIMIT} more
                    </Badge>
                  )}
                </>
              ) : (
                <span className='text-muted-foreground'>Select resources...</span>
              )}
            </div>
            <div className="flex items-center self-center ml-2">
              {selectedResources.length > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5"
                  onClick={handleClear}
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </Button>
              )}
              <ChevronsUpDown className='h-4 w-4 shrink-0 opacity-50' />
            </div>
          </div>
        </PopoverTrigger>
      </div>
      <PopoverContent className='w-[--radix-popover-trigger-width] p-0'>
        <Command>
          <CommandInput
            placeholder='Search by name or keyword...'
            value={searchTerm}
            onValueChange={setSearchTerm}
          />
          <CommandList
            ref={scrollRef}
            onScroll={handleScroll}
            className='max-h-48'
          >
            <CommandEmpty>No resources found.</CommandEmpty>
            <CommandGroup>
              {allResources.map((resource) => {
                const isSelected = selectedIds.includes(resource.id);
                return (
                  <CommandItem
                    key={resource.id}
                    value={`${resource.name} ${resource.keyword}`}
                    onSelect={() => {
                      if (!isSelected) {
                        handleSelect(resource.id);
                      }
                    }}
                    disabled={isSelected}
                    className={cn(isSelected && "text-muted-foreground cursor-not-allowed")}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        isSelected ? "opacity-100" : "opacity-0",
                      )}
                    />
                    <div className='flex flex-col'>
                      <span>{resource.name}</span>
                      <span className='text-xs text-muted-foreground'>
                        {resource.keyword}
                      </span>
                    </div>
                  </CommandItem>
                );
              })}
              {isFetchingNextPage && <CommandItem disabled>Loading more...</CommandItem>}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
