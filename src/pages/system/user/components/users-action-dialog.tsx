import { useEffect } from "react";
import { useInfiniteRolesQuery } from "@/api/system/role";
import { getUser, useUserCreate, useUserUpdate } from "@/api/system/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { RoleMultiSelect } from "./role-multi-select";

const formSchema = z.object({
  nickname: z.string().min(1, { message: "Nickname is required." }),
  username: z.string().min(1, { message: "Username is required." }),
  phone: z.string().min(1, { message: "Phone number is required." }),
  email: z.string().min(1, { message: "Email is required." }).email({ message: "Email is invalid." }),
  status: z.number().optional(),
  role_ids: z.string().array().optional(),
  allowed_ip: z.string().min(1, { message: "IP is required." }),
  gender: z.string().optional(),
  remark: z.string().optional(),
  avatar: z.string().optional(),
  is_edit: z.boolean(),
});

type UserForm = z.infer<typeof formSchema>;

interface Props<T> {
  currentRow?: T;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  columns?: number;
}

export function UsersActionDialog({ currentRow, open, onOpenChange, className, columns = 2 }: Props<API.System.User>) {
  const is_edit = !!currentRow;
  const id = currentRow?.id || "";

  // Fetch full user data only when editing and dialog is open
  const { data: fullUserData, isFetching: isUserDataFetching } = useQuery(
    queryOptions({
      queryKey: ["/sys/users", id],
      queryFn: () => getUser(id),
      enabled: is_edit && open && !!id,
    }),
  );

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

  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    shouldFocusError: false,
    defaultValues: {
      nickname: "",
      username: "",
      email: "",
      phone: "",
      allowed_ip: "0.0.0.0",
      status: 1,
      role_ids: [],
      gender: "unknown",
      remark: "",
      avatar: "",
      is_edit,
    },
  });

  useEffect(() => {
    if (is_edit && fullUserData) {
      const roleIds = Array.isArray(fullUserData.roles)
        ? fullUserData.roles.map((role) => role.id).filter((id): id is string => !!id)
        : [];

      form.reset({
        ...fullUserData,
        role_ids: roleIds,
        is_edit: true,
      });
    } else if (!is_edit) {
      form.reset({
        nickname: "",
        username: "",
        email: "",
        phone: "",
        allowed_ip: "0.0.0.0",
        status: 1,
        role_ids: [],
        gender: "unknown",
        remark: "",
        avatar: "",
        is_edit: false,
      });
    }
  }, [is_edit, fullUserData, form]);

  const queryClient = useQueryClient();
  const { mutateAsync: createUser, isPending: isCreatePending } = useUserCreate(queryClient);
  const { mutateAsync: updateUser, isPending: isUpdatePending } = useUserUpdate(queryClient, id);

  const onSubmit = async (values: UserForm) => {
    try {
      // Create a mutable copy and delete the `is_edit` property to avoid the `no-unused-vars` ESLint error.
      const payload = { ...values };
      delete (payload as Partial<UserForm>).is_edit;

      if (!is_edit) {
        await createUser(payload);
      } else {
        // Directly update user with all fields including role_ids
        await updateUser(payload);
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

  const isPending = isCreatePending || isUpdatePending || (is_edit && isUserDataFetching);
  const maxWClass = `sm:max-w-${columns * 500}px`;

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        if (!state) form.reset();
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
            {isPending && <div className='absolute inset-0 bg-background/50 z-10' />}
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
                    <FormField
                      control={form.control}
                      name='gender'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select a gender' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='male'>Male</SelectItem>
                              <SelectItem value='female'>Female</SelectItem>
                              <SelectItem value='unknown'>Unknown</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='avatar'
                      render={({ field }) => (
                        <FormItem className='col-span-2'>
                          <FormLabel>Avatar URL</FormLabel>
                          <FormControl>
                            <Input placeholder='https://example.com/avatar.png' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='remark'
                      render={({ field }) => (
                        <FormItem className='col-span-2'>
                          <FormLabel>Remark</FormLabel>
                          <FormControl>
                            <Textarea placeholder='Add a remark for this user...' {...field} />
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
