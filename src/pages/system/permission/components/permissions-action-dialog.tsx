import { useMemo } from "react";
import { usePermissionCreate, usePermissionUpdate } from "@/api/system/permission";
import { useResourcesQuery } from "@/api/system/resource";
import { useViewsQuery } from "@/api/system/view";
import { t } from "@/utils/locale";
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
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ResourceTreeSelect } from "./resource-tree-select";
import { ViewTreeSelect } from "./view-tree-select";

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
    view_ids: z.array(z.string()).optional(),
    data_scope: z.string().optional(),
    data_rules: z.object({}).optional(),
    status: z.number().default(1),
    is_edit: z.boolean(),
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
  const form = useForm<PermissionForm>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: is_edit
      ? {
          ...currentRow,
          resource_ids: currentRow.resource_ids || [],
          view_ids: (currentRow as any).view_ids || [],
          data_rules: currentRow?.data_rules || {},
          status: currentRow?.status ?? 1,
          is_edit,
        }
      : {
          name: "",
          keyword: "",
          description: "",
          resource_ids: [],
          view_ids: [],
          data_rules: {},
          status: 1,
          is_edit,
        },
  });
  const id = currentRow?.id || "";
  const queryClient = useQueryClient();
  const { mutate: createPermission, isPending: isCreatePending } = usePermissionCreate(queryClient);
  const { mutate: updatePermission, isPending: isUpdatePending } = usePermissionUpdate(queryClient, id);
  
  const { data: resourcesData = {} } = useResourcesQuery({ page_size: 1000 });
  const { data: viewsData = {} } = useViewsQuery({ pageSize: 1000 });

  const onSubmit = (values: PermissionForm) => {
    const { view_ids, ...permissionData } = values;
    
    if (!is_edit) {
      createPermission(permissionData);
    } else {
      updatePermission(permissionData);
    }
    
    console.log("Submitted View IDs (to be implemented):", view_ids);

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
    onOpenChange(false);
    form.reset();
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
        <DialogHeader>
          <DialogTitle>{is_edit ? "Edit Permission" : "Add New Permission"}</DialogTitle>
          <DialogDescription>
            {is_edit ? "Update the permission here. " : "Create new permission here. "}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id='permission-form'
            onSubmit={form.handleSubmit(onSubmit, (errors) => console.error("Validation failed:", errors))}
            className='relative space-y-4'
          >
            <div className="absolute top-0 right-12 z-10 bg-background p-2 rounded-lg">
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
              <div className="space-y-4 p-4">
                {/* Base Info Section */}
                <div className='space-y-2'>
                  <h3 className='text-lg font-medium'>Base Info</h3>
                  <Separator />
                  <div className='grid grid-cols-2 gap-4 pt-2'>
                    <FormField control={form.control} name='name' render={({ field }) => (<FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder='e.g., View Users' {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name='keyword' render={({ field }) => (<FormItem><FormLabel>Keyword</FormLabel><FormControl><Input placeholder='e.g., user_view' {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name='data_scope' render={({ field }) => (<FormItem><FormLabel>Data Scope</FormLabel><Select value={field.value || "self"} onValueChange={field.onChange}><FormControl><SelectTrigger><SelectValue placeholder='Select data scope' /></SelectTrigger></FormControl><SelectContent><SelectItem value='self'>Self</SelectItem><SelectItem value='role'>Role</SelectItem><SelectItem value='dept'>Department</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                    <FormField
                      control={form.control}
                      name='description'
                      render={({ field }) => (
                        <FormItem className='col-span-2'>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea placeholder='A brief description for this permission.' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Resource Settings Section */}
                <div className='space-y-2 pt-4'>
                  <h3 className='text-lg font-medium'>Resource Settings</h3>
                  <Separator />
                  <div className='pt-2'>
                    <FormField
                      control={form.control}
                      name='resource_ids'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Associated Resources</FormLabel>
                          <FormControl>
                            <ResourceTreeSelect
                              resources={resourcesData.data}
                              value={field.value}
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* View Settings Section */}
                <div className='space-y-2 pt-4'>
                  <h3 className='text-lg font-medium'>View Settings</h3>
                  <Separator />
                  <div className='pt-2'>
                    <FormField
                      control={form.control}
                      name='view_ids'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Associated Views</FormLabel>
                          <FormControl>
                            <ViewTreeSelect
                              views={viewsData.data}
                              value={field.value}
                              onChange={field.onChange}
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
          <Button type='submit' form='permission-form' disabled={isCreatePending || isUpdatePending}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
