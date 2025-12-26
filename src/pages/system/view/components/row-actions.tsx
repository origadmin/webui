"use client";

import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { IconPencil, IconTrash } from "@tabler/icons-react";

interface RowActionsProps<TData> {
  row: Row<TData>;
}

export function RowActions<TData>({ row }: RowActionsProps<TData>) {
  // Here you can add logic for handling actions, e.g., opening dialogs
  const handleEdit = () => {
    console.log("Edit row:", row.original);
    // Example: setOpen("edit"); setCurrentRow(row.original);
  };

  const handleDelete = () => {
    console.log("Delete row:", row.original);
    // Example: setOpen("delete"); setCurrentRow(row.original);
  };

  return (
    <div className='flex items-center gap-2'>
      <Button variant='ghost' size='sm' onClick={handleEdit}>
        <IconPencil size={16} />
      </Button>
      <Button variant='ghost' size='sm' onClick={handleDelete}>
        <IconTrash size={16} />
      </Button>
    </div>
  );
}
