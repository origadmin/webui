"use client";

import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { IconPencil, IconTrash, IconPlus } from "@tabler/icons-react";
import { useResourceTable } from "./resources-table-provider";

interface RowActionsProps<TData> {
  row: Row<TData>;
}

export function ResourceIconRowActions<TData>({ row }: RowActionsProps<TData>) {
  const { setOpen, setCurrentRow, setParentRow } = useResourceTable();

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
    <div className='flex items-center gap-1'>
      <Button variant='ghost' size='sm' onClick={handleAddSub} title="Add Sub-resource">
        <IconPlus size={16} />
      </Button>
      <Button variant='ghost' size='sm' onClick={handleEdit} title="Edit">
        <IconPencil size={16} />
      </Button>
      <Button variant='ghost' size='sm' onClick={handleDelete} title="Delete">
        <IconTrash size={16} />
      </Button>
    </div>
  );
}
