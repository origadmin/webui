import { useMemo } from "react";
import { usePermissionCreate, usePermissionUpdate } from "@/api/system/permission";
import { useResourcesQuery, buildTree } from "@/api/system/resource";
import { t } from "@/utils/locale";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { resourceTypeValues } from "@/types/system/resource";
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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { MultiSelect } from "@/components/MultiSelect";

const formSchema = z
  .object({
    name: z.string().min(1, {
      message: t("name.required"),
    }),
    keyword: z.string().min(1, {
      message: t("keyword.required"),
    }),
    description: z.string().optional(),
    resource_ids: z.array(z.string()).optional(),
    // resources: z.array(z.object({})).optional(),
    data_scope: z.string().optional(),
    data_rules: z.object({}).optional(),
    is_edit: z.boolean(),
  })
  .superRefine((v) => {
    console.log("superRefine", v);
  });
type PermissionForm = z.infer<typeof formSchema>;

interface Props<T> {
  currentRow?: T;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  columns?: number;
}

export function PermissionsActionDialog({
  currentRow,
  open,
  onOpenChange,
  className,
  columns = 2,
}: Props<API.System.Permission>) {
  const is_edit = !!currentRow;
  // const is_sub = !!parentRow;
  console.log("action", is_edit, currentRow);
  const form = useForm<PermissionForm>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: is_edit
      ? {
          ...currentRow,
          data_rules: currentRow?.data_rules || {},
          is_edit,
        }
      : {
          name: "",
          keyword: "",
          description: "",
          resource_ids: [],
          data_rules: {},
          is_edit,
        },
  });
  const id = currentRow?.id || "";
  const queryClient = useQueryClient();
  const { mutate: createPermission, isPending: isCreatePending } = usePermissionCreate(queryClient);
  const { mutate: updatePermission, isPending: isUpdatePending } = usePermissionUpdate(queryClient, id);
  const { data: resources = {}, isLoading } = useResourcesQuery({ page_size: 1000 });
  const resourcesOptions =
    resources?.data
      ?.filter((r) => r && r.id != undefined)
      .map((r) => {
        const value = r.id || "";
        const type = resourceTypeValues.get(r.type || "U") || "U";
        const label = `${r.name || ""}(${type})`;
        return {
          value: value,
          label: label,
        };
      }) || [];
  const treeData = useMemo(() => buildTree(resources.data), [resources.data]);

  const onSubmit = (values: PermissionForm) => {
    form.reset();
    console.log("values", values);
    // values.resources = [];
    if (!is_edit) {
      createPermission({ ...values });
    } else {
      updatePermission({ ...values });
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
          <DialogTitle>{is_edit ? "Edit Permission" : "Add New Permission"}</DialogTitle>
          <DialogDescription>
            {is_edit ? "Update the permission here. " : "Create new permission here. "}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
          <Form {...form}>
            <form
              id='permission-form'
              onSubmit={form.handleSubmit(onSubmit, (errors) => console.error("验证失败:", errors))}
              className='space-y-4 p-1'
            >
              <div className='grid grid-cols-12 mb-4 border-gray-200 dark:border-gray-700 pb-4'>
                <h2 className='col-span-10 text-lg font-medium mb-2 px-2 text-gray-900 dark:text-gray-100'>
                  Base Info
                </h2>
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
                        <Input placeholder='Empty if use auto generate' className='col-span-4' {...field} />
                      </FormControl>
                      <FormMessage className='col-span-4 col-start-3' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='data_scope'
                  render={({ field }) => (
                    <FormItem className='col-span-6 grid grid-cols-subgrid items-center md:p-2 gap-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-left'>Data Scope</FormLabel>
                      <FormControl>
                        <Select value={field.value || "self"} onValueChange={(value) => field.onChange(value)}>
                          <SelectTrigger id='data_scope' className='col-span-3'>
                            <SelectValue placeholder='Select data scope' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='self'>Self</SelectItem>
                            <SelectItem value='role'>Role</SelectItem>
                            <SelectItem value='dept'>Department</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
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
                        <Input placeholder='' className='col-span-10' {...field} />
                      </FormControl>
                      <FormMessage className='col-span-10 col-start-3' />
                    </FormItem>
                  )}
                />
                <div className='col-span-12 pt-4'>
                  <Separator />
                </div>
                <div className='col-span-12 items-center grid grid-cols-subgrid pt-4 overflow-x-hidden'>
                  <h2 className='col-span-12 items-center text-lg font-medium mb-2 px-2 text-gray-900 dark:text-gray-100'>
                    Permission Resources
                  </h2>
                </div>
                <FormField
                  control={form.control}
                  name='resource_ids'
                  render={({ field }) => (
                    <FormItem className='col-span-12 grid grid-cols-subgrid items-center md:p-2 gap-4 gap-y-1 space-y-0 overflow-y-hidden'>
                      <FormLabel className='col-span-2 text-left'>Resources</FormLabel>
                      <FormControl>
                        <MultiSelect
                          className='col-span-10'
                          defaultValue={field.value}
                          value={field.value}
                          onChange={field.onChange}
                          options={resourcesOptions}
                        />
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
          <Button type='submit' form='permission-form' disabled={isCreatePending || isUpdatePending}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
