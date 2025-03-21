import { useState } from "react";
import { IconChevronsUp, IconChevronUp, IconChevronDown, IconChevronsDown } from "@tabler/icons-react";
import { createMoveHandlers, SequenceAble } from "@/lib/array";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface Props<T extends SequenceAble & { name: string }> {
  currentRow?: T;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ResourcesSequenceDialog<T extends SequenceAble & { name: string }>({
  currentRow,
  open,
  onOpenChange,
}: Props<T>) {
  const [sortableItems, setSortableItems] = useState<T[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const handlers = createMoveHandlers(setSortableItems, () => selectedItemId);

  // 获取资源列表（需替换为实际API）
  const fetchResourcesByParent = async (parentId: string) => {
    // const res = await api.getResources({ parent_id: parentId });
    // return res.data.sort((a, b) => a.sequence - b.sequence);
    return []; // 示例返回
  };

  // const handleSortOpen = async () => {
  //   const parentId = form.getValues("parent_id");
  //   if (parentId) {
  //     const items = await fetchResourcesByParent(parentId);
  //     setSortableItems(items);
  //     setSortDialogOpen(true);
  //   }
  // };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sort Resources</DialogTitle>
          <DialogDescription>Select an item and use buttons to adjust order</DialogDescription>
        </DialogHeader>

        <div className='space-y-2'>
          {sortableItems.map((item) => (
            <div
              key={item.id}
              className={`border p-3 rounded-md ${selectedItemId === item.id ? "bg-blue-50 border-blue-500" : ""}`}
              onClick={() => setSelectedItemId(item.id || null)}
            >
              <div className='flex justify-between items-center'>
                <span>
                  {item.name} (Current sequence: {item.sequence})
                </span>
                {selectedItemId === item.id && <span className='text-blue-500'>✓</span>}
              </div>
            </div>
          ))}
        </div>

        <div className='flex gap-2 justify-center'>
          <Button variant='ghost' size='icon' onClick={handlers.ToTop} disabled={!selectedItemId}>
            <IconChevronsUp className='h-4 w-4' />
          </Button>
          <Button variant='ghost' size='icon' onClick={handlers.Up} disabled={!selectedItemId}>
            <IconChevronUp className='h-4 w-4' />
          </Button>
          <Button variant='ghost' size='icon' onClick={handlers.Down} disabled={!selectedItemId}>
            <IconChevronDown className='h-4 w-4' />
          </Button>
          <Button variant='ghost' size='icon' onClick={handlers.ToBottom} disabled={!selectedItemId}>
            <IconChevronsDown className='h-4 w-4' />
          </Button>
        </div>

        <DialogFooter>
          <Button
            type='button'
            onClick={async () => {
              // 保存排序结果
              // await api.updateResourceSequence(
              //   sortableItems.map((item, index) => ({
              //     id: item.id,
              //     sequence: index + 1,
              //   })),
              // );
              // setSortDialogOpen(false);
            }}
          >
            Save Order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
