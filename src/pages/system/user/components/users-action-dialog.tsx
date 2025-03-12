import { useRolesQuery } from "@/api/system/role";
import { useUserCreate, useUserUpdate, formSchema, UserForm } from "@/api/system/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
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

interface Props<T> {
  currentRow?: T;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  columns?: number; // add columns
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
          is_edit,
        },
  });
  const id = currentRow?.id || "";
  const queryClient = useQueryClient();
  const { mutate: createUser, isPending: isCreatePending } = useUserCreate(queryClient);
  const { mutate: updateUser, isPending: isUpdatePending } = useUserUpdate(queryClient, id);

  const { data: roles = {}, isLoading: isRolesLoading } = useRolesQuery();

  const onSubmit = (values: UserForm) => {
    form.reset();

    if (!is_edit) {
      createUser({
        ...values,
      });
    } else {
      updateUser({
        ...values,
      });
    }

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
    onOpenChange(false);
  };

  const isPasswordTouched = !!form.formState.dirtyFields.password;

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

  // 计算 sm:max-w-lg 类
  const maxWClass = `sm:max-w-${columns * 500}px`; // 根据 columns 参数动态设置最大宽度
  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset();
        onOpenChange(state);
      }}
    >
      <DialogContent
        className={cn(`${maxWClass}`, className)}
        // tabIndex={undefined}
        // onFocus={(e) => console.log("当前焦点元素:", e.target)}
        // onFocusCapture={(e) => {
        //   console.log("onFocusCapture:", e.target, e.currentTarget);
        //   if (e.target === e.currentTarget) {
        //     e.stopPropagation();
        //     const firstFocusable = document.querySelector("[data-autofocus]");
        //     (firstFocusable as HTMLElement)?.focus();
        //   }
        // }}
        // onOpenAutoFocus={(e) => e.preventDefault()}
      >
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
              onSubmit={form.handleSubmit(onSubmit, (errors) => console.error("验证失败:", errors))}
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
                          defaultValue={
                            !isRolesLoading && roles.data
                              ? roles.data
                                  .map(({ id }) => id)
                                  .filter((id): id is string => !!id)
                                  .filter((id) => Array.isArray(field.value) && field.value.includes(id))
                              : []
                          }
                          onValueChange={field.onChange}
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
          <Button type='submit' form='user-form' disabled={isCreatePending || isUpdatePending}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
