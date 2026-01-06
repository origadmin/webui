import { usePermissionCreate, usePermissionUpdate } from "@/api/system/permission";
import { useResourcesQuery } from "@/api/system/resource";
import { useViewsQuery } from "@/api/system/view";
import { t } from "@/utils/locale";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconTemplate } from "@tabler/icons-react";
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
import { PRESET_TEMPLATES } from "./permission-templates";
import { ResourceTreeSelect } from "./resource-tree-select";
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
          name: currentRow.name || "",
          keyword: currentRow.keyword || "",
          description: currentRow.description || "",
          view_ids: (currentRow as any).view_ids || ((currentRow as any).view_id ? [(currentRow as any).view_id] : []),
          resource_ids: currentRow.resource_ids || [],
          data_scope: currentRow.data_scope || "self",
          data_rules: currentRow.data_rules || {},
          status: currentRow.status ?? 1,
        }
      : {
          name: "",
          keyword: "",
          description: "",
          view_ids: [],
          resource_ids: [],
          data_scope: "self",
          data_rules: {},
          status: 1,
        },
  });
  const id = currentRow?.id || "";
  const queryClient = useQueryClient();
  const { mutate: createPermission, isPending: isCreatePending } = usePermissionCreate(queryClient);
  const { mutate: updatePermission, isPending: isUpdatePending } = usePermissionUpdate(queryClient, id);

  const { data: resourcesData = {} } = useResourcesQuery({ page_size: 1000 });
  const { data: viewsData = {} } = useViewsQuery({ pageSize: 1000 });

  // --- Template Logic Start ---
  const applyTemplate = (templateValue: string) => {
    const template = PRESET_TEMPLATES.find((t) => t.value === templateValue);
    if (!template) return;

    const allViews = viewsData.data || [];
    const allResources = resourcesData.data || [];

    // Find View IDs by keywords
    const matchedViewIds = allViews
      .filter((v) => v.keyword && template.viewKeywords.includes(v.keyword))
      .map((v) => v.id)
      .filter((id): id is string => !!id);

    // Find Resource IDs by keywords
    const matchedResourceIds = allResources
      .filter((r) => r.keyword && template.resourceKeywords.includes(r.keyword))
      .map((r) => r.id)
      .filter((id): id is string => !!id);

    // Update Form
    form.setValue("view_ids", matchedViewIds);
    form.setValue("resource_ids", matchedResourceIds);

    // Optional: Auto-fill name/desc if empty
    if (!form.getValues("name")) form.setValue("name", template.label);
    if (!form.getValues("description")) form.setValue("description", template.description);

    toast({
      title: "Template Applied",
      description: `Applied template: ${template.label}. Views and Resources have been updated.`,
    });
  };
  // --- Template Logic End ---

  // --- Legacy Auto-Link Logic (Optional: Keep or Remove based on preference) ---
  // Keeping it allows "hybrid" mode: Template sets initial state, then user can tweak,
  // and this logic helps with manual tweaks.
  const getResourcesFromViews = (viewIds: string[], allViews: API.System.View[]) => {
    const resourceIds = new Set<string>();
    const viewMap = new Map(allViews.map((v) => [v.id, v]));

    viewIds.forEach((vid) => {
      const view = viewMap.get(vid);
      if (view && view.resources) {
        view.resources.forEach((r) => {
          if (r.id) resourceIds.add(r.id);
        });
      }
    });
    return resourceIds;
  };

  const handleViewChange = (newViewIds: string[], oldViewIds: string[]) => {
    const currentResourceIds = new Set(form.getValues("resource_ids") || []);
    const allViews = viewsData.data || [];

    const addedViews = newViewIds.filter((id) => !oldViewIds.includes(id));
    const removedViews = oldViewIds.filter((id) => !newViewIds.includes(id));

    if (addedViews.length === 0 && removedViews.length === 0) return;

    // Resources to add
    const resourcesToAdd = getResourcesFromViews(addedViews, allViews);

    // Resources to remove
    const resourcesFromRemovedViews = getResourcesFromViews(removedViews, allViews);
    const resourcesFromRemainingViews = getResourcesFromViews(newViewIds, allViews);

    const resourcesToRemove = new Set<string>();
    resourcesFromRemovedViews.forEach((rid) => {
      if (!resourcesFromRemainingViews.has(rid)) {
        resourcesToRemove.add(rid);
      }
    });

    // Update state
    const nextResourceIds = new Set(currentResourceIds);
    resourcesToAdd.forEach((rid) => nextResourceIds.add(rid));
    resourcesToRemove.forEach((rid) => nextResourceIds.delete(rid));

    form.setValue("resource_ids", Array.from(nextResourceIds));
  };

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

  const maxWClass = `sm:max-w-${columns * 500}px`;
  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal={false}>
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
                {/* Template Selection Area */}
                {!is_edit && (
                  <div className='bg-muted/50 p-4 rounded-lg border border-dashed'>
                    <div className='flex items-center gap-2 mb-2'>
                      <IconTemplate size={18} className='text-muted-foreground' />
                      <h4 className='text-sm font-medium'>Quick Start with Templates</h4>
                    </div>
                    <Select onValueChange={applyTemplate}>
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select a permission template...' />
                      </SelectTrigger>
                      <SelectContent>
                        {PRESET_TEMPLATES.map((tpl) => (
                          <SelectItem key={tpl.value} value={tpl.value}>
                            <div className='flex flex-col items-start'>
                              <span className='font-medium'>{tpl.label}</span>
                              <span className='text-xs text-muted-foreground'>{tpl.description}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Step 1: Define Core */}
                <div className='space-y-2'>
                  <h3 className='text-lg font-medium'>Step 1: Define Permission Core</h3>
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
                      name='view_ids'
                      render={({ field }) => (
                        <FormItem className='col-span-2'>
                          <FormLabel>Included Pages/Views</FormLabel>
                          <FormControl>
                            <ViewTreeSelect
                              views={viewsData.data}
                              value={field.value}
                              onChange={(newIds) => {
                                handleViewChange(newIds, field.value || []);
                                field.onChange(newIds);
                              }}
                            />
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

                {/* Step 2: Bind Resources */}
                <div className='space-y-2 pt-4'>
                  <h3 className='text-lg font-medium'>Step 2: Bind Required APIs</h3>
                  <Separator />
                  <div className='pt-2'>
                    <FormField
                      control={form.control}
                      name='resource_ids'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Associated APIs (Resources)</FormLabel>
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

                {/* Other Settings */}
                <div className='space-y-2 pt-4'>
                  <h3 className='text-lg font-medium'>Other Settings</h3>
                  <Separator />
                  <div className='grid grid-cols-1 gap-4 pt-2'>
                    <FormField
                      control={form.control}
                      name='data_scope'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Data Scope</FormLabel>
                          <Select value={field.value || "self"} onValueChange={field.onChange}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select data scope' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value='self'>Self</SelectItem>
                              <SelectItem value='role'>Role</SelectItem>
                              <SelectItem value='dept'>Department</SelectItem>
                            </SelectContent>
                          </Select>
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
