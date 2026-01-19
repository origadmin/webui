import { useEffect } from "react";
import { useAdminResetUserPassword } from "@/api/system/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconRefresh } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PasswordInput } from "@/components/password-input";

// Function to generate a random password
const generatePassword = (length = 12) => {
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=";
  let password = "";
  for (let i = 0, n = charset.length; i < n; ++i) {
    password += charset.charAt(Math.floor(Math.random() * n));
  }
  // Ensure the password meets some basic complexity, e.g., has a number
  if (!/\d/.test(password)) {
    password += Math.floor(Math.random() * 10);
  }
  return password.slice(0, length);
};

const formSchema = z.object({
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

type ResetPasswordForm = z.infer<typeof formSchema>;

interface Props {
  user?: API.System.User;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UsersResetPasswordDialog({ user, open, onOpenChange }: Props) {
  const queryClient = useQueryClient();
  const { mutate: resetPassword, isPending } = useAdminResetUserPassword(queryClient, user?.id || "");

  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
  });

  const handleGeneratePassword = () => {
    form.setValue("password", generatePassword());
  };

  useEffect(() => {
    if (open) {
      handleGeneratePassword(); // Generate a new password when the dialog opens
    }
  }, [open]);

  const onSubmit = async (values: ResetPasswordForm) => {
    if (!user) return;

    try {
      await resetPassword(values.password);
      toast({
        title: "Success",
        description: `Password for ${user.username} has been successfully reset.`,
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Operation Failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      form.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset Password for {user?.username}</DialogTitle>
          <DialogDescription>
            A new password will be set for the user. It's recommended to use the generated secure password.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form id='reset-password-form' onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <div className='flex items-center gap-2'>
                    <div className='flex-1'>
                      <FormControl>
                        <PasswordInput placeholder='Enter new password' {...field} />
                      </FormControl>
                    </div>
                    <Button type='button' variant='outline' size='icon' onClick={handleGeneratePassword}>
                      <IconRefresh className='h-4 w-4' />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button type='submit' form='reset-password-form' disabled={isPending}>
            {isPending ? "Resetting..." : "Confirm & Reset"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
