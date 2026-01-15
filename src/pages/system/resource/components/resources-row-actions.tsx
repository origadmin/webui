"use client";

import { IconPencil, IconTrash } from "@tabler/icons-react";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { useResourceTable } from "./resources-table-provider";

interface RowActionsProps<TData> {
  row: Row<TData>;
}

export function ResourceIconRowActions<TData>({ row }: RowActionsProps<TData>) {
  const { setOpen, setCurrentRow } = useResourceTable();

  const handleEdit = () => {
    setCurrentRow(row.original);
    setOpen("edit");
  };

  const handleDelete = () => {
    setCurrentRow(row.original);
    setOpen("delete");
  };

  return (
    <div className='flex items-center space-x-1'>
      <Button variant='ghost' size='icon' className='h-8 w-8' onClick={handleEdit} title='Edit'>
        <IconPencil size={16} />
      </Button>
      <Button variant='ghost' size='icon' className='h-8 w-8' onClick={handleDelete} title='Delete'>
        <IconTrash size={16} />
      </Button>
    </div>
  );
}
