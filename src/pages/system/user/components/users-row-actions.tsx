"use client";

import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { IconPencil, IconTrash, IconKey } from "@tabler/icons-react";
import { useUserTable } from "./users-table-provider"; // Corrected import
import { useResetUserPassword } from "@/api/system/user";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "@/hooks/use-toast";

interface RowActionsProps<TData extends { id?: string; email?: string }> {
  row: Row<TData>;
}

export function UserIconRowActions<TData extends { id?: string; email?: string }>({ row }: RowActionsProps<TData>) {
  const { setOpen, setCurrentRow } = useUserTable(); // Corrected hook
  const queryClient = useQueryClient();
  const { mutate: resetPassword, isPending: isResetting } = useResetUserPassword(queryClient, row.original.id || "");

  const handleEdit = () => {
    setCurrentRow(row.original);
    setOpen("edit");
  };

  const handleDelete = () => {
    setCurrentRow(row.original);
    setOpen("delete");
  };

  const handleResetPassword = () => {
    resetPassword(undefined, {
      onSuccess: () => {
        toast({
          title: "Password Reset Email Sent",
          description: `An email has been sent to ${row.original.email} with instructions to reset the password.`,
        });
      },
      onError: (error: any) => {
        toast({
          title: "Failed to Reset Password",
          description: error.message || "An unexpected error occurred.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className='flex items-center space-x-1'>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant='ghost' size='icon' className="h-8 w-8" title="Reset Password">
            <IconKey size={16} />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will send a password reset link to <span className="font-semibold">{row.original.email}</span>. The user will be prompted to create a new password.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleResetPassword} disabled={isResetting}>
              {isResetting ? "Sending..." : "Confirm & Send Email"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Button variant='ghost' size='icon' className="h-8 w-8" onClick={handleEdit} title="Edit">
        <IconPencil size={16} />
      </Button>
      <Button variant='ghost' size='icon' className="h-8 w-8" onClick={handleDelete} title="Delete">
        <IconTrash size={16} />
      </Button>
    </div>
  );
}
