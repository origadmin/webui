import { useMemo, useEffect, useRef, useCallback } from "react";
import { usePermissionCreate, usePermissionUpdate } from "@/api/system/permission";
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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { debugToast } from "@/components/debug-toast";
import { ResourceMultiSelect } from "./resource-multi-select";
import { ViewTreeSelect, ViewTreeSelectRef } from "./view-tree-select";


const formSchema = z.object({
  name: z.string().min(1, { message: t("validation.name.required") }),
  keyword: z.string().min(1, { message: t("validation.keyword.required") }),
  description: z.string().optional(),
  view_ids: z.array(z.string()).optional(),
  resource_ids: z.array(z.string()).optional(),
  data_scope: z.string().optional(),
  data_rules: z.object({}).optional(),
  status: z.number().default(1),
});
type PermissionForm = z.infer<typeof formSchema>;

interface Props<T> {
  currentRow?: T;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}

export function PermissionsActionDialog({ currentRow, open, onOpenChange, className }: Props<API.System.Permission>) {
  const is_edit = !!currentRow;
  const form = useForm<PermissionForm>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: is_edit
      ? {
          name: currentRow.name || "",
          keyword: currentRow.keyword || "",
          description: currentRow.description || "",
          view_ids: (currentRow.views || []).map((view) => String(view.id)),
          resource_ids: (currentRow.resources || []).map((resource) => String(resource.id)),
          data_scope: currentRow.data_scope || "self",
          status: currentRow.status ?? 1,
        }
      : {
          name: "",
          keyword: "",
          description: "",
          view_ids: [],
          resource_ids: [],
          data_scope: "self",
          status: 1,
        },
  });
  const id = currentRow?.id || "";
  const queryClient = useQueryClient();
  const { mutate: createPermission, isPending: isCreatePending } = usePermissionCreate(queryClient);
  const { mutate: updatePermission, isPending: isUpdatePending } = usePermissionUpdate(queryClient, id);

  const { data: viewsData, isLoading: isLoadingViews } = useViewsQuery({ pagingMode: "none", with_resources: true });

  const allViews = viewsData?.items || [];

  const selectedViewIds = form.watch("view_ids");

  useEffect(() => {
    if (!selectedViewIds) return;

    const resourceIdsFromViews = new Set<string>();
    const selectedViews = allViews.filter((view) => selectedViewIds.includes(String(view.id)));
    for (const view of selectedViews) {
      if (view.resources) {
        for (const resource of view.resources) {
          resourceIdsFromViews.add(String(resource.id));
        }
      }
    }

    const currentResourceIds = new Set(form.getValues("resource_ids") || []);
    const newResourceIds = Array.from(new Set([...currentResourceIds, ...resourceIdsFromViews]));

    if (JSON.stringify(newResourceIds.sort()) !== JSON.stringify((form.getValues("resource_ids") || []).sort())) {
      form.setValue("resource_ids", newResourceIds);
    }
  }, [selectedViewIds, allViews, form]);

  const viewTreeRef = useRef<ViewTreeSelectRef>(null);

  const onSubmit = (values: PermissionForm) => {
    const action = is_edit ? "updated" : "created";
    const mutation = is_edit ? updatePermission : createPermission;

    mutation(values, {
      onSuccess: () => {
        toast({
          title: "Success",
          description: `Permission successfully ${action}.`,
        });
        debugToast("You submitted the following values:", values);
        onOpenChange(false);
        form.reset();
      },
      onError: (error) => {
        toast({
          title: "Operation Failed",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  };

  const isLoading = isLoadingViews;

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
      <DialogContent className={cn("sm:max-w-2xl", className)}>
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
            <ScrollArea className='h-[32rem] w-full'>
              <div className='space-y-4 p-4'>
                <div className='space-y-2'>
                  <h3 className='text-lg font-medium'>Core Details</h3>
                  <Separator />
                  <div className='grid grid-cols-2 gap-4 pt-2'>
                    <FormField
                      control={form.control}
                      name='name'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder='e.g., View Users' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name='keyword'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Keyword</FormLabel>
                          <FormControl>
                            <Input placeholder='e.g., user:view' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className='space-y-4 pt-4'>
                  <FormField
                    control={form.control}
                    name='view_ids'
                    render={({ field }) => (
                      <FormItem>
                        <div className='flex justify-between items-center mb-2'>
                          <FormLabel>Included Pages/Views</FormLabel>
                          <div className='flex space-x-2'>
                            <Button
                              type='button'
                              variant='outline'
                              size='sm'
                              onClick={() => viewTreeRef.current?.expandAll()}
                            >
                              Expand All
                            </Button>
                            <Button
                              type='button'
                              variant='outline'
                              size='sm'
                              onClick={() => viewTreeRef.current?.collapseAll()}
                            >
                              Collapse All
                            </Button>
                          </div>
                        </div>
                        <FormControl>
                          {isLoading ? (
                            <div>Loading Views...</div>
                          ) : (
                            <ViewTreeSelect
                              {...field}
                              ref={(node) => {
                                field.ref(node);
                                viewTreeRef.current = node;
                              }}
                              allViews={allViews}
                            />
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='resource_ids'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Associated APIs (Resources)</FormLabel>
                        <FormControl>
                          <ResourceMultiSelect {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
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
