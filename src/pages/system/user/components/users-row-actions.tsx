import { Fragment } from "react";
import { useUserTable } from "@/pages/system/user/components/users-table-provider";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { IconEdit, IconEye, IconTrash } from "@tabler/icons-react";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const UserRowActions = ({ row }: { row: RowActionsProps<API.System.User>["row"] }) => {
  const { setOpen, setCurrentRow } = useUserTable();
  return <RowActions<API.System.User> row={row} setOpen={setOpen} setCurrentRow={setCurrentRow} />;
};

export const UserIconRowActions = ({ row }: { row: RowActionsProps<API.System.User>["row"] }) => {
  const { setOpen, setCurrentRow } = useUserTable();
  return <IconRowActions<API.System.User> row={row} setOpen={setOpen} setCurrentRow={setCurrentRow} />;
};

export type OpenStateType = "preview" | "invite" | "add" | "add-sub" | "edit" | "delete";

export interface RowActionsProps<TData> {
  row: Row<TData>;
  setOpen: (state: OpenStateType) => void;
  setCurrentRow: (row: TData) => void;
  setParentRow?: (row: TData) => void;
}

export function RowActions<TData>({ row, setOpen, setCurrentRow }: RowActionsProps<TData>) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'>
          <DotsHorizontalIcon className='h-4 w-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[160px]'>
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow?.(row.original);
            setOpen?.("edit");
          }}
        >
          Edit
          <DropdownMenuShortcut>
            <IconEdit size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setCurrentRow?.(row.original);
            setOpen?.("delete");
          }}
          className='!text-red-500'
        >
          Delete
          <DropdownMenuShortcut>
            <IconTrash size={16} />
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function IconRowActions<TData>({ row, setOpen, setCurrentRow, setParentRow }: RowActionsProps<TData>) {
  const onClick = (open: OpenStateType) => {
    if (setCurrentRow && open !== "add") {
      setCurrentRow(row.original);
    }
    if (setParentRow && open !== "edit") {
      setParentRow(row.original);
    }
    if (setOpen) {
      setOpen(open);
    }
  };

  return (
    <Fragment>
      {/*<Button className='h-8 w-8' variant='ghost' size='icon' onClick={() => onClick("preview")} title='Preview'>*/}
      {/*  <IconEye size={16} />*/}
      {/*</Button>*/}
      <Button className='h-8 w-8' variant='ghost' size='icon' onClick={() => onClick("edit")} title='Edit'>
        <IconEdit size={16} />
      </Button>
      <Button
        className='h-8 w-8 !text-red-500'
        variant='ghost'
        size='icon'
        onClick={() => onClick("delete")}
        title='Delete'
      >
        <IconTrash size={16} />
      </Button>
    </Fragment>
  );
}
