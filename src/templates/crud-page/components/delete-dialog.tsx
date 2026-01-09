import { useQueryClient } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import { PageConfig, ApiHooks } from "../types";

interface Props<T> {
  currentRow?: T;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pageConfig: PageConfig;
  apiHooks: ApiHooks<T, any>;
  onSuccess?: () => void; // Add the onSuccess callback prop
}

export function DeleteDialog<T extends { id?: string }>({
  currentRow,
  open,
  onOpenChange,
  pageConfig,
  apiHooks,
  onSuccess, // Destructure the new prop
}: Props<T>) {
  const queryClient = useQueryClient();
  const { mutate: deleteItem, isPending } = apiHooks.useDelete(queryClient);

  const handleDelete = () => {
    if (!currentRow?.id) return;
    deleteItem(currentRow.id, {
      onSuccess: () => {
        toast({
          title: `${pageConfig.title} Deleted`,
          description: `The ${pageConfig.title.toLowerCase()} has been successfully deleted.`,
        });
        // If a custom onSuccess callback is provided, call it.
        // Otherwise, just close the dialog.
        if (onSuccess) {
          onSuccess();
        } else {
          onOpenChange(false);
        }
      },
      onError: (error: any) => {
        toast({
          title: `Error Deleting ${pageConfig.title}`,
          description: error.message || "An unexpected error occurred.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            selected {pageConfig.title.toLowerCase()}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isPending}>
            {isPending ? "Deleting..." : "Continue"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
