import { useInfiniteRolesQuery } from "@/api/system/role";
import { useInviteUser } from "@/api/system/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconMailPlus, IconSend } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RoleMultiSelect } from "./role-multi-select";

const formSchema = z.object({
  email: z.string().min(1, { message: "Email is required." }).email({ message: "Email is invalid." }),
  role_ids: z.array(z.string()).min(1, { message: "At least one role is required." }),
});
type UserInviteForm = z.infer<typeof formSchema>;

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}

export function UsersInviteDialog({ open, onOpenChange, className }: Props) {
  const form = useForm<UserInviteForm>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", role_ids: [] },
  });

  const queryClient = useQueryClient();
  const { mutate: inviteUser, isPending } = useInviteUser(queryClient);

  // Fetch roles with infinite scrolling
  const {
    data: rolesData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteRolesQuery(
    {
      pageSize: 20, // Adjust page size as needed
    },
    {
      enabled: open, // Only fetch when dialog is open
    },
  );

  const roles = rolesData?.pages.flatMap((page) => page.roles || []) || [];

  const onSubmit = (values: UserInviteForm) => {
    inviteUser(values, {
      onSuccess: () => {
        toast({
          title: "Invitation Sent",
          description: `An invitation has been sent to ${values.email}.`,
        });
        onOpenChange(false);
        form.reset();
      },
      onError: (error: any) => {
        toast({
          title: "Failed to Send Invitation",
          description: error.message || "An unexpected error occurred.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        if (!state) {
          form.reset();
        }
        onOpenChange(state);
      }}
    >
      <DialogContent className={cn("sm:max-w-md", className)}>
        <DialogHeader className='text-left'>
          <DialogTitle className='flex items-center gap-2'>
            <IconMailPlus /> Invite User
          </DialogTitle>
          <DialogDescription>
            Invite a new user by sending them an email. They will be prompted to set their own password.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form id='user-invite-form' onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type='email' placeholder='eg: john.doe@gmail.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='role_ids'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Roles</FormLabel>
                  <FormControl>
                    <RoleMultiSelect
                      value={field.value}
                      onChange={field.onChange}
                      roles={roles}
                      fetchNextPage={fetchNextPage}
                      hasNextPage={hasNextPage}
                      isFetchingNextPage={isFetchingNextPage}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter className='gap-y-2'>
          <DialogClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DialogClose>
          <Button type='submit' form='user-invite-form' disabled={isPending}>
            {isPending ? "Sending..." : "Send Invitation"}
            <IconSend className='ml-2 h-4 w-4' />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
