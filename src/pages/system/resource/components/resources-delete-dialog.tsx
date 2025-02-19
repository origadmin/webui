import { useState } from "react";
import { IconAlertTriangle } from "@tabler/icons-react";
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

  const handleDelete = () => {
    if (value.trim() !== currentRow.keyword) return;

    onOpenChange(false);
    toast({
      title: "The following resource has been deleted:",
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
      disabled={value.trim() !== currentRow.keyword}
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
