import { useState } from "react";
import { useRolesQuery } from "@/api/system/role";
import { useUserCreate, useUserUpdate, useUpdateUserRoles } from "@/api/system/user";
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
import { Switch } from "@/components/ui/switch";
import { MultiSelect } from "@/components/MultiSelect";
import { PasswordInput } from "@/components/password-input";

const formSchema = z
  .object({
    nickname: z.string().min(1, { message: "Nickname is required." }),
    username: z.string().min(1, { message: "Username is required." }),
    phone: z.string().min(1, { message: "Phone number is required." }),
    email: z.string().min(1, { message: "Email is required." }).email({ message: "Email is invalid." }),
    password: z.string().transform((pwd) => pwd.trim()),
    status: z.number().optional(),
    role_ids: z.string().array().optional(),
    confirmPassword: z.string().transform((pwd) => pwd.trim()),
    allowed_ip: z.string().min(1, { message: "IP is required." }),
    random_password: z.boolean().default(false),
    is_edit: z.boolean(),
  })
  .superRefine(({ is_edit, password, confirmPassword }, ctx) => {
    if (!is_edit || (is_edit && password !== "")) {
      if (password === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password is required.",
          path: ["password"],
        });
      }
      // ... (rest of the password validation logic)
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
          password: "",
          confirmPassword: "",
          is_edit,
        }
      : {
          nickname: "",
          username: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          allowed_ip: "0.0.0.0",
          status: 1,
          role_ids: [],
          is_edit,
        },
  });
  const id = currentRow?.id || "";
  const queryClient = useQueryClient();
  const { mutate: createUser, isPending: isCreatePending } = useUserCreate(queryClient);
  const { mutate: updateUser, isPending: isUpdatePending } = useUserUpdate(queryClient, id);
  const { mutate: updateUserRoles, isPending: isRolesUpdatePending } = useUpdateUserRoles(queryClient, id);

  const [rolePages, setRolePages] = useState({
    current: 1,
    page_size: 1000,
  });
  const { data: roles = {}, isLoading: isRolesLoading } = useRolesQuery(rolePages);

  const onSubmit = async (values: UserForm) => {
    try {
      if (!is_edit) {
        createUser(values);
      } else {
        const { role_ids, ...userBasicInfo } = values;
        await Promise.all([
          updateUser(userBasicInfo),
          updateUserRoles(role_ids || []),
        ]);
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

  const isPasswordTouched = !!form.formState.dirtyFields.password;
  const isPending = isCreatePending || isUpdatePending || isRolesUpdatePending;

  const useRandomPassword = () => (
    <>
      {!form.watch("random_password") && (
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='col-span-6 grid grid-cols-subgrid items-center md:p-2 gap-x-4 gap-y-1 space-y-0'>
              <FormLabel className='col-span-2 text-left'>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='e.g., S3cur3P@ssw0rd' className='col-span-4' {...field} />
              </FormControl>
              <FormMessage className='col-span-4' />
            </FormItem>
          )}
        />
      )}
      {!form.watch("random_password") && (
        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem className='col-span-6 grid grid-cols-subgrid items-center md:p-2 gap-x-4 gap-y-1 space-y-0'>
              <FormLabel className='col-span-2 text-left'>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput
                  disabled={!isPasswordTouched}
                  placeholder='e.g., S3cur3P@ssw0rd'
                  className='col-span-4'
                  {...field}
                />
              </FormControl>
              <FormMessage className='col-span-4 col-start-2' />
            </FormItem>
          )}
        />
      )}
    </>
  );

  const maxWClass = `sm:max-w-${columns * 500}px`;
  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset();
        onOpenChange(state);
      }}
    >
      <DialogContent className={cn(`${maxWClass}`, className)}>
        <DialogHeader className='text-left'>
          <DialogTitle>{is_edit ? "Edit User" : "Add New User"}</DialogTitle>
          <DialogDescription>
            {is_edit ? "Update the user here. " : "Create new user here. "}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
          <Form {...form}>
            <form
              id='user-form'
              onSubmit={form.handleSubmit(onSubmit, (errors) => console.error("Validation failed:", errors))}
              className='space-y-0'
            >
              <div className='grid grid-cols-12 mb-4 border-b border-gray-200 dark:border-gray-700 pb-4'>
                <h2 className='col-span-12 text-lg font-medium text-gray-900 dark:text-gray-100 mb-2 px-2'>
                  Base Info
                </h2>
                <FormField
                  control={form.control}
                  name='username'
                  render={({ field }) => (
                    <FormItem className='col-span-6 grid grid-cols-subgrid items-center md:p-2 gap-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-left'>Username</FormLabel>
                      <FormControl>
                        <Input placeholder='john_doe' className='col-span-4' {...field} />
                      </FormControl>
                      <FormMessage className='col-span-4' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='nickname'
                  render={({ field }) => (
                    <FormItem className='col-span-6 grid grid-cols-subgrid items-center md:p-2 gap-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-left'>Nickname</FormLabel>
                      <FormControl>
                        <Input placeholder='John' className='col-span-4' autoComplete='off' {...field} />
                      </FormControl>
                      <FormMessage className='col-span-4' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem className='col-span-6 grid grid-cols-subgrid items-center md:p-2 gap-x-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-left'>Email</FormLabel>
                      <FormControl>
                        <Input placeholder='john.doe@gmail.com' className='col-span-4' {...field} />
                      </FormControl>
                      <FormMessage className='col-span-4' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='phone'
                  render={({ field }) => (
                    <FormItem className='col-span-6 grid grid-cols-subgrid items-center md:p-2 gap-x-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-left'>Phone</FormLabel>
                      <FormControl>
                        <Input placeholder='+123456789' className='col-span-4' {...field} />
                      </FormControl>
                      <FormMessage className='col-span-4' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='status'
                  render={({ field }) => (
                    <FormItem className='col-span-6 grid grid-cols-subgrid items-center md:p-2 gap-x-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-left'>Status</FormLabel>
                      <FormControl>
                        <Switch checked={field.value === 1} onCheckedChange={(checked) => field.onChange(checked ? 1 : 2)} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid grid-cols-12 mb-4 border-gray-200 dark:border-gray-700 pb-4'>
                <h2 className='col-span-10 text-lg font-medium text-gray-900 dark:text-gray-100 mb-2 px-2'>安全设置</h2>
                <FormField
                  control={form.control}
                  name='random_password'
                  render={({ field }) => (
                    <FormItem className='col-span-2 grid grid-cols-subgrid items-center md:p-2 gap-x-4 gap-y-1 space-y-0'>
                      <FormLabel className='w-24 text-left'>随机密码</FormLabel>
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                {useRandomPassword()}
                <FormField
                  control={form.control}
                  name='allowed_ip'
                  render={({ field }) => (
                    <FormItem className='col-span-6 grid grid-cols-subgrid items-center md:p-2 gap-x-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-left'>Allowed IP</FormLabel>
                      <FormControl>
                        <Input placeholder='0.0.0.0' className='col-span-4' {...field} />
                      </FormControl>
                      <FormMessage className='col-span-4' />
                    </FormItem>
                  )}
                />
              </div>
              <div className='grid grid-cols-12 mb-4 border-gray-200 dark:border-gray-700 pt-4'>
                <h2 className='col-span-12 text-lg font-medium text-gray-900 dark:text-gray-100 mb-2 px-2'>角色管理</h2>
                <FormField
                  control={form.control}
                  name='role_ids'
                  render={({ field }) => (
                    <FormItem className='col-span-12 grid grid-cols-subgrid items-center md:p-2 gap-x-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-left'>Role</FormLabel>
                      <FormControl>
                        <MultiSelect
                          defaultValue={field.value}
                          value={field.value}
                          onChange={field.onChange}
                          placeholder='Select a role'
                          className='col-span-10'
                          options={
                            !isRolesLoading && roles.data
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
                      <FormMessage className='col-span-4' />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          <Button type='submit' form='user-form' disabled={isPending}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
