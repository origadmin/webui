import { useState, useMemo } from "react";
import { usePermissionsQuery } from "@/api/system/permission";
import { useRoleCreate, useRoleUpdate } from "@/api/system/role";
import { t } from "@/utils/locale";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconArrowsSort } from "@tabler/icons-react";
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
import { RolesPermissionSelect } from "./roles-permission-select";
import { RolesSequenceDialog } from "./roles-sequence-dialogs";

const formSchema = z.object({
  name: z.string().min(1, {
    message: t("Name is required"),
  }),
  keyword: z.string().min(1, { message: "Keyword is required." }),
  type: z.number().optional(),
  sequence: z.number().default(1),
  description: z.string().optional(),
  status: z.number().default(1),
  is_edit: z.boolean(),
  permission_ids: z.array(z.string()).optional(),
});

type RoleForm = z.infer<typeof formSchema>;

interface Props {
  currentRow?: API.System.Role;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  columns?: number;
}

export function RolesActionDialog({ currentRow, open, onOpenChange, className, columns = 2 }: Props) {
  const is_edit = !!currentRow;
  const form = useForm<RoleForm>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: is_edit
      ? {
          ...currentRow,
          is_edit,
          // permission_ids: currentRow.permission_ids || [],
        }
      : {
          name: "",
          keyword: "",
          type: 1,
          sequence: 1,
          description: "",
          status: 1,
          is_edit,
          permission_ids: [],
        },
  });

  const { data: permissions = {} } = usePermissionsQuery({ page_size: 1000 });
  const treeData = useMemo(() => permissions.data, [permissions.data]);

  console.log("dialog permissions", permissions);
  const id = currentRow?.id || "";
  const queryClient = useQueryClient();
  const { mutate: createRole, isPending: isCreatePending } = useRoleCreate(queryClient);
  const { mutate: updateRole, isPending: isUpdatePending } = useRoleUpdate(queryClient, id);
  const onSubmit = (values: RoleForm) => {
    form.reset();
    if (!is_edit) {
      createRole({
        ...values,
      });
    } else {
      updateRole({
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
  const [sortDialogOpen, setSortDialogOpen] = useState(false);
  // const [expanded, setExpanded] = useState(false);
  // const [selected, setSelected] = useState(false);
  const handleSortOpen = async () => {
    setSortDialogOpen(true);
  };
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
          <DialogTitle>{is_edit ? "Edit Role" : "Add New Role"}</DialogTitle>
          <DialogDescription>
            {is_edit ? "Update the role here. " : "Create new role here. "}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
          <Form {...form}>
            <form
              id='role-form'
              onSubmit={form.handleSubmit(onSubmit, (errors) => console.error("验证失败:", errors))}
              className='space-y-4 p-1'
            >
              <div className='grid grid-cols-12 mb-4 border-gray-200 dark:border-gray-700 pb-4'>
                <h2 className='col-span-10 items-center text-lg font-medium mb-2 px-2 text-gray-900 dark:text-gray-100'>
                  Base Info
                </h2>
                <FormField
                  control={form.control}
                  name='status'
                  render={({ field }) => (
                    <FormItem className='col-span-2 grid grid-cols-subgrid items-center justify-end md:p-2 gap-x-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-1 w-24 text-left'>Status</FormLabel>
                      <FormControl>
                        <Switch
                          className='col-span-1'
                          checked={field.value === 1}
                          onCheckedChange={(status) => field.onChange(status ? 1 : 0)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem className='col-span-6 grid grid-cols-subgrid items-center md:p-2 gap-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-left'>Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Please enter a name' className='col-span-4' {...field} />
                      </FormControl>
                      <FormMessage className='col-span-4 col-start-3' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='keyword'
                  render={({ field }) => (
                    <FormItem className='col-span-6 grid grid-cols-subgrid items-center md:p-2 gap-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-left'>Keyword</FormLabel>
                      <FormControl>
                        <Input placeholder='Please enter a keyword' className='col-span-4' {...field} />
                      </FormControl>
                      <FormMessage className='col-span-4 col-start-3' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='type'
                  render={({ field }) => (
                    <FormItem className='col-span-6 grid grid-cols-subgrid items-center md:p-2 gap-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-left'>Type</FormLabel>
                      <FormControl>
                        <Input className='col-span-4' {...field} disabled />
                      </FormControl>
                      <FormMessage className='col-span-4 col-start-3' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='sequence'
                  render={({ field }) => (
                    <FormItem className='col-span-6 grid grid-cols-subgrid items-center md:p-2 gap-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-left'>Sequence</FormLabel>
                      <div className='col-span-4 flex'>
                        <FormControl>
                          <Input
                            className='rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0'
                            placeholder=''
                            {...field}
                          />
                        </FormControl>
                        <Button
                          type='button'
                          variant='outline'
                          onClick={handleSortOpen}
                          className='h-9 w-12 gap-0 px-0 rounded-l-none'
                          size='icon'
                        >
                          <IconArrowsSort className='h-5 w-5' />
                        </Button>
                      </div>
                      <FormMessage className='col-span-4 col-start-3' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem className='col-span-12 grid grid-cols-subgrid items-center md:p-2 gap-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-left'>Description</FormLabel>
                      <FormControl>
                        <Input placeholder='Please enter description' className='col-span-10 w-full' {...field} />
                      </FormControl>
                      <FormMessage className='col-span-10 col-start-3' />
                    </FormItem>
                  )}
                />
                <div className='col-span-12 pt-4'>
                  <Separator />
                </div>
                <div className='col-span-12 items-center grid grid-cols-subgrid pt-4 overflow-x-hidden'>
                  <h2 className='col-span-11 items-center text-lg font-medium mb-2 px-2 text-gray-900 dark:text-gray-100'>
                    Role Permissions
                  </h2>
                  {/*<div className='col-span-1 items-center justify-end md:p-2 gap-x-4 gap-y-1 space-y-0'>*/}
                  {/*  <Switch checked={expanded} onCheckedChange={setExpanded} />*/}
                  {/*</div>*/}
                </div>
                <FormField
                  control={form.control}
                  name='permission_ids'
                  render={({ field }) => (
                    <FormItem className='col-span-12 grid grid-cols-subgrid items-start w-full overflow-x-hidden'>
                      <FormControl>
                        <RolesPermissionSelect value={field.value} onChange={field.onChange} permissions={treeData} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          <Button type='submit' form='role-form' disabled={isCreatePending || isUpdatePending}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
      <RolesSequenceDialog
        open={sortDialogOpen}
        onOpenChange={setSortDialogOpen}
        currentRow={{
          id: currentRow?.id,
          sequence: currentRow?.sequence ?? 0,
          name: currentRow?.name ?? "",
        }}
      />
    </Dialog>
  );
}
