import { useRolesQuery } from "@/api/system/role";
import { useUpdateUserRoles, useUserCreate, useUserUpdate } from "@/api/system/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
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
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { MultiSelect } from "@/components/MultiSelect";
import { PasswordInput } from "@/components/password-input";

const formSchema = z
  .object({
    nickname: z.string().min(1, { message: "Nickname is required." }),
    username: z.string().min(1, { message: "Username is required." }),
    phone: z.string().min(1, { message: "Phone number is required." }),
    email: z.string().min(1, { message: "Email is required." }).email({ message: "Email is invalid." }),
    password: z.string().optional(),
    status: z.number().optional(),
    role_ids: z.string().array().optional(),
    allowed_ip: z.string().min(1, { message: "IP is required." }),
    is_edit: z.boolean(),
  })
  .superRefine(({ is_edit, password }, ctx) => {
    // In create mode, password is required
    if (!is_edit && (!password || password.trim() === "")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Initial password is required.",
        path: ["password"],
      });
    }
    // If a password is provided (in either mode), it must be at least 8 chars
    if (password && password.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must be at least 8 characters long.",
        path: ["password"],
      });
    }
  });
type UserForm = z.infer<typeof formSchema>;

interface Props<T> {
  currentRow?: T;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  columns?: number;
}

// Helper function to compare two string arrays
const areRolesEqual = (a?: string[], b?: string[]): boolean => {
  if (!a && !b) return true;
  if (!a || !b || a.length !== b.length) return false;
  const sortedA = [...a].sort();
  const sortedB = [...b].sort();
  return sortedA.every((value, index) => value === sortedB[index]);
};

export function UsersActionDialog({ currentRow, open, onOpenChange, className, columns = 2 }: Props<API.System.User>) {
  const is_edit = !!currentRow;

  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    shouldFocusError: false,
    defaultValues: is_edit
      ? {
          ...currentRow,
          role_ids: currentRow.role_ids || [],
          password: "", // Always start with an empty password field in edit mode
          is_edit,
        }
      : {
          nickname: "",
          username: "",
          email: "",
          phone: "",
          password: "",
          allowed_ip: "0.0.0.0",
          status: 1,
          role_ids: [],
          is_edit,
        },
  });
  const id = currentRow?.id || "";
  const queryClient = useQueryClient();
  const { mutateAsync: createUser, isPending: isCreatePending } = useUserCreate(queryClient);
  const { mutateAsync: updateUser, isPending: isUpdatePending } = useUserUpdate(queryClient, id);
  const { mutateAsync: updateUserRoles, isPending: isRolesUpdatePending } = useUpdateUserRoles(queryClient, id);

  const { data: roles = { data: [] } } = useRolesQuery({ page_size: 1000 });

  const onSubmit = async (values: UserForm) => {
    try {
      // Create a mutable copy of the form values.
      const payload = { ...values };
      // The 'is_edit' field is for frontend logic only and should never be sent.
      delete (payload as Partial<UserForm>).is_edit;

      if (!is_edit) {
        // For creation, the adapter layer will handle structuring the payload.
        await createUser(payload);
      } else {
        // For update, create the full object to ensure a proper PUT operation.
        const putPayload = {
          ...currentRow,
          ...payload,
        };

        // If password field is empty, don't include it in the update payload.
        if (!putPayload.password || putPayload.password.trim() === "") {
          delete putPayload.password;
        }

        const { role_ids, ...userBasicInfo } = putPayload;

        const updatePromises = [updateUser(userBasicInfo)];

        // Only call updateUserRoles if the roles have actually changed.
        if (!areRolesEqual(role_ids, currentRow?.role_ids)) {
          updatePromises.push(updateUserRoles(role_ids || []));
        }

        await Promise.all(updatePromises);
      }

      toast({
        title: "Success",
        description: `User has been successfully ${is_edit ? "updated" : "created"}.`,
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

  const isPending = isCreatePending || isUpdatePending || isRolesUpdatePending;

  const maxWClass = `sm:max-w-${columns * 500}px`;
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
      <DialogContent className={cn(`${maxWClass}`, className)}>
        <DialogHeader>
          <DialogTitle>{is_edit ? "Edit User" : "Add New User"}</DialogTitle>
          <DialogDescription>
            {is_edit ? "Update the user's information here." : "Create a new user account."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id='user-form'
            onSubmit={form.handleSubmit(onSubmit, (errors) => console.error("Validation failed:", errors))}
            className='relative space-y-4'
          >
            <div className='absolute top-0 right-12 z-10 bg-background p-2 rounded-lg'>
              <FormField
                control={form.control}
                name='status'
                render={({ field }) => (
                  <FormItem className='flex items-center space-x-2'>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value === 1}
                        onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <ScrollArea className='h-[26.25rem] w-full'>
              <div className='space-y-4 p-4'>
                {/* Base Info Section */}
                <div className='space-y-2'>
                  <h3 className='text-lg font-medium'>Base Info</h3>
                  <Separator />
                  <div className='grid grid-cols-2 gap-4 pt-2'>
                    <FormField
                      control={form.control}
                      name='username'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder='john_doe' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='nickname'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nickname</FormLabel>
                          <FormControl>
                            <Input placeholder='John' autoComplete='off' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='email'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder='john.doe@gmail.com' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='phone'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone</FormLabel>
                          <FormControl>
                            <Input placeholder='+123456789' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Security Settings Section */}
                <div className='space-y-2 pt-4'>
                  <h3 className='text-lg font-medium'>Security Settings</h3>
                  <Separator />
                  <div className='grid grid-cols-2 gap-4 pt-2 items-start'>
                    <FormField
                      control={form.control}
                      name='password'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{is_edit ? "New Password" : "Initial Password"}</FormLabel>
                          <FormControl>
                            <PasswordInput
                              placeholder={is_edit ? "Leave blank to keep unchanged" : "Enter password"}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='allowed_ip'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Allowed IP</FormLabel>
                          <FormControl>
                            <Input placeholder='0.0.0.0' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Role Management Section */}
                <div className='space-y-2 pt-4'>
                  <h3 className='text-lg font-medium'>Role Management</h3>
                  <Separator />
                  <div className='pt-2'>
                    <FormField
                      control={form.control}
                      name='role_ids'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Roles</FormLabel>
                          <FormControl>
                            <MultiSelect
                              defaultValue={field.value}
                              value={field.value}
                              onChange={field.onChange}
                              placeholder='Select roles'
                              options={
                                roles.data
                                  ? roles.data
                                      .filter(({ id, name }) => !!id && !!name)
                                      .map(({ id, name }) => ({
                                        value: id || "",
                                        label: name || "",
                                      }))
                                  : []
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </ScrollArea>
          </form>
        </Form>
        <DialogFooter>
          <Button type='submit' form='user-form' disabled={isPending}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
