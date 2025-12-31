"use client";

import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { IconPencil, IconTrash, IconPlus } from "@tabler/icons-react";
import { useViewTable } from "./views-table-provider";

interface RowActionsProps<TData> {
  row: Row<TData>;
}

export function RowActions<TData>({ row }: RowActionsProps<TData>) {
  const { setOpen, setCurrentRow, setParentRow } = useViewTable();

  const handleAddSub = () => {
    setParentRow(row.original);
    setOpen("add-sub");
  };

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
      <Button variant='ghost' size='icon' className="h-8 w-8" onClick={handleAddSub} title="Add Sub-view">
        <IconPlus size={16} />
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
