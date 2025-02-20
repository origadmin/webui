import { useUserCreate, useUserUpdate } from "@/api/system/user";
import { userTypes } from "@/mocks/user/data";
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
import { PasswordInput } from "@/components/password-input";
import { SelectDropdown } from "@/components/select-dropdown";

const empty = (className?: string) => (
  <div className={cn("col-span-6 grid grid-cols-subgrid items-center md:p-2 gap-x-4 gap-y-1 space-y-0", className)}>
    <div className='col-span-6' />
  </div>
);

const formSchema = z
  .object({
    nickname: z.string().min(1, { message: "Nickname is required." }),
    username: z.string().min(1, { message: "Username is required." }),
    phone: z.string().min(1, { message: "Phone number is required." }),
    email: z.string().min(1, { message: "Email is required." }).email({ message: "Email is invalid." }),
    password: z.string().transform((pwd) => pwd.trim()),
    role: z.string().min(1, { message: "Role is required." }),
    confirmPassword: z.string().transform((pwd) => pwd.trim()),
    allow_ip: z.string().min(1, { message: "IP is required." }),
    isEdit: z.boolean(),
  })
  .superRefine(({ isEdit, password, confirmPassword }, ctx) => {
    if (!isEdit || (isEdit && password !== "")) {
      if (password === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password is required.",
          path: ["password"],
        });
      }

      if (password.length < 8) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must be at least 8 characters long.",
          path: ["password"],
        });
      }

      if (!password.match(/[a-z]/)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must contain at least one lowercase letter.",
          path: ["password"],
        });
      }

      if (!password.match(/\d/)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Password must contain at least one number.",
          path: ["password"],
        });
      }

      if (password !== confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Passwords don't match.",
          path: ["confirmPassword"],
        });
      }
    }
  });
type UserForm = z.infer<typeof formSchema>;

interface Props<T> {
  currentRow?: T;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  columns?: number; // 添加 columns 参数
}

export function UsersActionDialog({ currentRow, open, onOpenChange, className, columns = 2 }: Props<API.System.User>) {
  const isEdit = !!currentRow;
  const form = useForm<UserForm>({
    resolver: zodResolver(formSchema),
    defaultValues: isEdit
      ? {
          ...currentRow,
          password: "",
          confirmPassword: "",
          isEdit,
        }
      : {
          nickname: "",
          username: "",
          email: "",
          role: "",
          phone: "",
          password: "",
          confirmPassword: "",
          isEdit,
        },
  });
  const id = currentRow?.id || "";
  const queryClient = useQueryClient();
  const { mutate: createUser, isPending: isCreatePending } = useUserCreate(queryClient);
  const { mutate: updateUser, isPending: isUpdatePending } = useUserUpdate(queryClient, id);
  const onSubmit = (values: UserForm) => {
    form.reset();

    if (!isEdit) {
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
      <DialogContent className={cn(`${maxWClass}`, className)}>
        <DialogHeader className='text-left'>
          <DialogTitle>{isEdit ? "Edit User" : "Add New User"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update the user here. " : "Create new user here. "}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
          <Form {...form}>
            <form id='user-form' onSubmit={form.handleSubmit(onSubmit)} className='grid grid-cols-12 space-y-0'>
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
              <FormField
                control={form.control}
                name='allow_ip'
                render={({ field }) => (
                  <FormItem className='col-span-6 grid grid-cols-subgrid items-center md:p-2 gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-left'>Allow IP</FormLabel>
                    <FormControl>
                      <Input placeholder='0.0.0.0' className='col-span-4' {...field} />
                    </FormControl>
                    <FormMessage className='col-span-4' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='allow_ip'
                render={({ field }) => (
                  <FormItem className='col-span-6 grid grid-cols-subgrid items-center md:p-2 gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-left'>Allow IP</FormLabel>
                    <FormControl>
                      <Input placeholder='0.0.0.0' className='col-span-4' {...field} />
                    </FormControl>
                    <FormMessage className='col-span-4' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem className='col-span-6 grid grid-cols-subgrid items-center md:p-2 gap-x-4 gap-y-1 space-y-0'>
                    <FormLabel className='col-span-2 text-left'>Role</FormLabel>
                    <SelectDropdown
                      defaultValue={field.value}
                      onValueChange={field.onChange}
                      placeholder='Select a role'
                      className='col-span-4'
                      items={userTypes.map(({ label, value }) => ({
                        label,
                        value,
                      }))}
                    />
                    <FormMessage className='col-span-4' />
                  </FormItem>
                )}
              />
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
