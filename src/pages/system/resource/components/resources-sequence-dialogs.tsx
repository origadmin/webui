import { useState } from "react";
import { createMoveHandlers } from "@/utils/array";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface Props<T> {
  currentRow?: T;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ResourcesSequenceDialog({ currentRow, open, onOpenChange }: Props<API.System.Resource>) {
  const [sortableItems, setSortableItems] = useState<API.System.Resource[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const moveHandlers = createMoveHandlers(setSortableItems, () => selectedItemId);

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

  // // 2. 添加移动操作方法
  // const moveToTop = () => {
  //   if (!selectedItemId) return;
  //   setSortableItems((items) => {
  //     const index = items.findIndex((i) => i.id === selectedItemId);
  //     if (index <= 0) return items;
  //     return [items[index], ...items.filter((_, i) => i !== index)];
  //   });
  // };
  //
  // const moveUp = () => {
  //   if (!selectedItemId) return;
  //   setSortableItems((items) => {
  //     const index = items.findIndex((i) => i.id === selectedItemId);
  //     if (index <= 0) return items;
  //     return arrayMove(items, index, index - 1);
  //   });
  // };
  //
  // const moveDown = () => {
  //   if (!selectedItemId) return;
  //   setSortableItems((items) => {
  //     const index = items.findIndex((i) => i.id === selectedItemId);
  //     if (index === -1 || index >= items.length - 1) return items;
  //     return arrayMove(items, index, index + 1);
  //   });
  // };
  //
  // const moveToBottom = () => {
  //   if (!selectedItemId) return;
  //   setSortableItems((items) => {
  //     const index = items.findIndex((i) => i.id === selectedItemId);
  //     if (index === -1 || index >= items.length - 1) return items;
  //     const newItems = [...items.filter((_, i) => i !== index), items[index]];
  //     return newItems;
  //   });
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
              className={`border p-3 rounded-md cursor-pointer ${
                selectedItemId === item.id ? "bg-blue-50 border-blue-500" : ""
              }`}
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
          <Button variant='outline' onClick={moveHandlers.ToTop} disabled={!selectedItemId}>
            ↑ Top
          </Button>
          <Button variant='outline' onClick={moveHandlers.Up} disabled={!selectedItemId}>
            ↑ Up
          </Button>
          <Button variant='outline' onClick={moveHandlers.Down} disabled={!selectedItemId}>
            ↓ Down
          </Button>
          <Button variant='outline' onClick={moveHandlers.ToBottom} disabled={!selectedItemId}>
            ↓ Bottom
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
