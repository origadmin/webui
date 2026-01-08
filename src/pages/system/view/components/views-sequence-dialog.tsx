import { useEffect, useState } from "react";
import { useViewsQuery } from "@/api/system/view";
import { IconChevronDown, IconChevronsDown, IconChevronsUp, IconChevronUp } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { createMoveHandlers } from "@/lib/array";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Props {
  parentId?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewsSequenceDialog({ parentId, open, onOpenChange }: Props) {
  const [sortableItems, setSortableItems] = useState<API.System.View[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const { data: viewsData, isLoading } = useViewsQuery(
    { parent_id: parentId, no_paging: true },
    { enabled: open }, // Only fetch when the dialog is open
  );

  useEffect(() => {
    if (viewsData?.items) {
      const sortedViews = [...viewsData.items].sort((a, b) => (a.sequence || 0) - (b.sequence || 0));
      setSortableItems(sortedViews);
      if (sortedViews.length > 0 && !selectedItemId) {
        setSelectedItemId(sortedViews[0].id || null);
      }
    }
  }, [viewsData, selectedItemId]);

  const moveHandlers = createMoveHandlers(setSortableItems, () => selectedItemId);
  const queryClient = useQueryClient();
  // const { mutate: updateSequence, isPending: isUpdating } = useViewSequenceUpdate(queryClient);

  const handleSave = () => {
    const sequenceUpdates = sortableItems.map((item, index) => ({
      id: item.id!,
      sequence: index + 1,
    }));

    // updateSequence(sequenceUpdates, {
    //   onSuccess: () => {
    //     toast({ title: "Success", description: "View sequence updated successfully." });
    //     onOpenChange(false);
    //   },
    //   onError: (error: any) => {
    //     toast({
    //       title: "Error",
    //       description: error.message || "Failed to update sequence.",
    //       variant: "destructive",
    //     });
    //   },
    // });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sort Views</DialogTitle>
          <DialogDescription>Select an item and use the buttons to adjust its order.</DialogDescription>
        </DialogHeader>

        <div className='space-y-2 h-96 overflow-y-auto'>
          {isLoading && <p>Loading...</p>}
          {sortableItems.map((item) => (
            <div
              key={item.id}
              className={`border p-3 rounded-md cursor-pointer ${
                selectedItemId === item.id ? "bg-blue-50 border-blue-500" : ""
              }`}
              onClick={() => setSelectedItemId(item.id || null)}
            >
              <div className='flex justify-between items-center'>
                <span>{item.name}</span>
                {selectedItemId === item.id && <span className='text-blue-500'>✓</span>}
              </div>
            </div>
          ))}
        </div>

        <div className='flex gap-2 justify-center'>
          <Button variant='ghost' size='icon' onClick={moveHandlers.ToTop} disabled={!selectedItemId}>
            <IconChevronsUp className='h-4 w-4' />
          </Button>
          <Button variant='ghost' size='icon' onClick={moveHandlers.Up} disabled={!selectedItemId}>
            <IconChevronUp className='h-4 w-4' />
          </Button>
          <Button variant='ghost' size='icon' onClick={moveHandlers.Down} disabled={!selectedItemId}>
            <IconChevronDown className='h-4 w-4' />
          </Button>
          <Button variant='ghost' size='icon' onClick={moveHandlers.ToBottom} disabled={!selectedItemId}>
            <IconChevronsDown className='h-4 w-4' />
          </Button>
        </div>

        <DialogFooter>
          <Button type='button' onClick={handleSave} >
            Save Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
