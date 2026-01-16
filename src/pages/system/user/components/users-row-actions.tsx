"use client";

import { IconPencil, IconTrash, IconKey } from "@tabler/icons-react";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { useUserTable } from "./users-table-provider";

interface RowActionsProps<TData extends { id?: string; email?: string }> {
  row: Row<TData>;
}

export function UserIconRowActions<TData extends { id?: string; email?: string }>({ row }: RowActionsProps<TData>) {
  const { setOpen, setCurrentRow } = useUserTable();

  const handleEdit = () => {
    setCurrentRow(row.original);
    setOpen("edit");
  };

  const handleDelete = () => {
    setCurrentRow(row.original);
    setOpen("delete");
  };

  const handleResetPassword = () => {
    setCurrentRow(row.original);
    setOpen("resetPassword");
  };

  return (
    <div className='flex items-center space-x-1'>
      <Button variant='ghost' size='icon' className='h-8 w-8' onClick={handleResetPassword} title='Reset Password'>
        <IconKey size={16} />
      </Button>
      <Button variant='ghost' size='icon' className='h-8 w-8' onClick={handleEdit} title='Edit'>
        <IconPencil size={16} />
      </Button>
      <Button variant='ghost' size='icon' className='h-8 w-8' onClick={handleDelete} title='Delete'>
        <IconTrash size={16} />
      </Button>
    </div>
  );
}
