import { useState } from "react";
import { useResourceDelete } from "@/api/system/resource";
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

export function ResourcesDeleteDialog({ open, onOpenChange, currentRow }: Props<API.Resource>) {
  const [value, setValue] = useState("");
  const queryClient = useQueryClient();
  const { mutate: deleteResource, isPending: isDeletePending } = useResourceDelete(queryClient);

  const handleDelete = () => {
    if (!currentRow.id || value.trim() !== currentRow.keyword) return;

    deleteResource(currentRow.id, {
      onSuccess: () => {
        // 1. Invalidate the query to trigger a refetch.
        queryClient.invalidateQueries({ queryKey: ["/sys/resources"] });

        // 2. Close the dialog.
        onOpenChange(false);

        // 3. Show success toast.
        toast({
          title: "Resource Deleted",
          description: `The resource "${currentRow.keyword}" has been successfully deleted.`,
        });
      },
      onError: (error) => {
        toast({
          title: "Error Deleting Resource",
          description: error.message || "An unexpected error occurred.",
          variant: "destructive",
        });
      },
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
          <IconAlertTriangle className='mr-1 inline-block stroke-destructive' size={18} /> Delete Resource
        </span>
      }
      desc={
        <div className='space-y-4'>
          <p className='mb-2'>
            Are you sure you want to delete <span className='font-bold'>{currentRow.keyword}</span>?
            <br />
            This action will permanently remove the resource with the resource of{" "}
            <span className='font-bold'>{currentRow.keyword?.toUpperCase()}</span> from the system. This cannot be
            undone.
          </p>

          <Label className='my-2'>
            Resourcename:
            <Input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Enter resourcename to confirm deletion.'
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
