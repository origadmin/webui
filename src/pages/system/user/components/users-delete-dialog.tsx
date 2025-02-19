import { useState } from "react";
import { useUserDelete } from "@/api/system/user";
import { IconAlertTriangle } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ConfirmDialog } from "@/components/confirm-dialog";

interface Props<T> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentRow: T;
}

export function UsersDeleteDialog({ open, onOpenChange, currentRow }: Props<API.System.User>) {
  const [value, setValue] = useState("");
  const id = currentRow?.id || "";
  const queryClient = useQueryClient();
  const { mutate: deleteUser, isPending: isDeletePending } = useUserDelete(queryClient);
  const handleDelete = () => {
    if (value.trim() !== currentRow.username) return;

    if (id !== "") {
      deleteUser(id);
    }

    onOpenChange(false);
    toast({
      title: "The following user has been deleted:",
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(currentRow, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      handleConfirm={handleDelete}
      disabled={value.trim() !== currentRow.username}
      isLoading={isDeletePending}
      title={
        <span className='text-destructive'>
          <IconAlertTriangle className='mr-1 inline-block stroke-destructive' size={18} /> Delete User
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Are you sure you want to delete <span className='font-bold'>{currentRow.username}</span>?
            <br />
            This action will permanently remove the user with the role of{" "}
            <span className='font-bold'>{currentRow.username?.toUpperCase()}</span> from the system. This cannot be
            undone.
          </p>

          <Label className='my-2'>
            Username:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Enter username to confirm deletion.'
            />
          </Label>

          <Alert variant='destructive'>
            <AlertTitle>Warning!</AlertTitle>
            <AlertDescription>Please be carefull, this operation can not be rolled back.</AlertDescription>
          </Alert>
        </div>
      }
      confirmText='Delete'
      destructive
    />
  );
}
