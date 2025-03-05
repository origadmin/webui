import { useState } from "react";
import { usePermissionDelete } from "@/api/system/permission";
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

export function PermissionsDeleteDialog({ open, onOpenChange, currentRow }: Props<API.Permission>) {
  const [value, setValue] = useState("");
  const queryClient = useQueryClient();
  const { mutate: deletePermission, isPending: isDeletePending } = usePermissionDelete(queryClient);
  const handleDelete = () => {
    if (!currentRow.id || value.trim() !== currentRow.keyword) return;
    deletePermission(currentRow.id);
    onOpenChange(false);
    toast({
      title: "The following permission has been deleted:",
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
      disabled={value.trim() !== currentRow.keyword || isDeletePending}
      title={
        <span className='text-destructive'>
          <IconAlertTriangle className='mr-1 inline-block stroke-destructive' size={18} /> Delete Permission
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Are you sure you want to delete <span className='font-bold'>{currentRow.keyword}</span>?
            <br />
            This action will permanently remove the permission with the permission of{" "}
            <span className='font-bold'>{currentRow.keyword?.toUpperCase()}</span> from the system. This cannot be
            undone.
          </p>

          <Label className='my-2'>
            Permissionname:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Enter permissionname to confirm deletion.'
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
