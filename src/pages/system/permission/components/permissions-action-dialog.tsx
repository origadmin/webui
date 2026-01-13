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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ResourceMultiSelect } from "./resource-multi-select";
import { ViewTreeSelect } from "./view-tree-select";

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
          view_ids: (currentRow.view_ids || []).map(String),
          resource_ids: (currentRow.resource_ids || []).map(String),
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
  const { data: resourcesData, isLoading: isLoadingResources } = useResourcesQuery({ pagingMode: "none" });

  const allViews = viewsData?.items || [];
  const allResources = resourcesData?.items || [];

  const selectedViewIds = form.watch("view_ids");

  const displayedResources = useMemo(() => {
    if (!selectedViewIds || selectedViewIds.length === 0) {
      return allResources;
    }
    const resourceIdSet = new Set<string>();
    const selectedViews = allViews.filter(view => selectedViewIds.includes(String(view.id)));
    for (const view of selectedViews) {
      if (view.resource_ids) {
        for (const resourceId of view.resource_ids) {
          resourceIdSet.add(String(resourceId));
        }
      }
    }
    return allResources.filter(resource => resourceIdSet.has(String(resource.id)));
  }, [selectedViewIds, allViews, allResources]);

  const onSubmit = (values: PermissionForm) => {
    if (!is_edit) {
      createPermission(values as any);
    } else {
      updatePermission(values as any);
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
    form.reset();
  };

  const isLoading = isLoadingViews || isLoadingResources;

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

                <div className='space-y-4 pt-4'>
                  <FormField
                    control={form.control}
                    name='view_ids'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Included Pages/Views</FormLabel>
                        <FormControl>
                          {isLoading ? <div>Loading Views...</div> : <ViewTreeSelect allViews={allViews} {...field} />}
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
                          {isLoading ? (
                            <div>Loading Resources...</div>
                          ) : (
                            <ResourceMultiSelect allResources={displayedResources} {...field} />
                          )}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
