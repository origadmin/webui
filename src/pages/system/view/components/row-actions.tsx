"use client";

import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { IconPencil, IconTrash, IconArrowUp, IconArrowDown } from "@tabler/icons-react";
import { useCrudTable } from "@/templates/crud-page/hooks/use-crud-table";

interface RowActionsProps<TData> {
  row: Row<TData>;
}

export function RowActions<TData>({ row }: RowActionsProps<TData>) {
  const { setOpen, setCurrentRow } = useCrudTable<TData>();

  const handleEdit = () => {
    setCurrentRow(row.original);
    setOpen("edit");
  };

  const handleDelete = () => {
    setCurrentRow(row.original);
    setOpen("delete");
  };

  const handleMoveUp = () => {
    console.log("Move up:", row.original);
    // TODO: Implement move up logic
  };

  const handleMoveDown = () => {
    console.log("Move down:", row.original);
    // TODO: Implement move down logic
  };

  return (
    <div className='flex items-center space-x-1'>
      <Button variant='ghost' size='icon' className="h-8 w-8" onClick={handleMoveUp} title="Move Up">
        <IconArrowUp size={16} />
      </Button>
      <Button variant='ghost' size='icon' className="h-8 w-8" onClick={handleMoveDown} title="Move Down">
        <IconArrowDown size={16} />
      </Button>
      <Button variant='ghost' size='icon' className="h-8 w-8" onClick={handleEdit} title="Edit">
        <IconPencil size={16} />
      </Button>
      <Button variant='ghost' size='icon' className="h-8 w-8" onClick={handleDelete} title="Delete">
        <IconTrash size={16} />
      </Button>
    </div>
  );
}
