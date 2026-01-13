import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { FormType, formSchema, apiHooks, pageConfig } from "../config";
import { ViewScopes, ViewTypes } from "../constants";
import { renderFields } from "./fields";
import { ResourceMultiSelect } from "./resource-multi-select";
import { ViewsSequenceDialog } from "./views-sequence-dialog";
import { useViewContext } from "./views-table-provider";

interface Props {
  currentRow?: API.System.View;
  parentRow?: API.System.View;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}

export function ViewActionDialog({ currentRow, parentRow, open, onOpenChange, className }: Props) {
  const is_edit = !!currentRow;
  const is_sub = !!parentRow;
  const title = is_edit ? `Edit ${pageConfig.title}` : is_sub ? `Add Sub View` : `Add New View`;
  const description = is_edit
    ? `Update the ${pageConfig.title.toLowerCase()} here.`
    : `Create new ${pageConfig.title.toLowerCase()} here.`;
  const formId = `${pageConfig.title.toLowerCase()}-form`;

  const { sidebarRootId } = useViewContext();
  const isSidebarMissing = !sidebarRootId && !is_sub && !is_edit;

  const shape = (formSchema as any).shape;
  const generatedDefaults = shape
    ? Object.keys(shape).reduce((acc, key) => {
        acc[key] = "";
        return acc;
      }, {} as any)
    : {};

  // Safely get resource_ids and ensure they are strings
  const defaultResourceIds = (currentRow?.resource_ids || []).map(String);

  const defaultType = is_edit
    ? currentRow.type?.toUpperCase()
    : is_sub
      ? ViewTypes.MENU
      : isSidebarMissing
        ? ViewTypes.ROOT
        : ViewTypes.MENU;
  const defaultScope = is_edit ? currentRow.scope : is_sub ? parentRow.scope || ViewScopes.SIDEBAR : ViewScopes.SIDEBAR;
  const defaultParentId = is_edit
    ? currentRow.parent_id
    : is_sub
      ? parentRow.id
      : isSidebarMissing
        ? "0"
        : sidebarRootId;

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    shouldFocusError: true,
    defaultValues: is_edit
      ? { ...currentRow, type: defaultType, is_edit, resource_ids: defaultResourceIds }
      : {
          ...generatedDefaults,
          status: 1,
          is_edit: false,
          parent_id: String(defaultParentId),
          resource_ids: [],
          type: defaultType,
          scope: defaultScope,
          sequence: 0,
        },
  });

  const currentType = form.watch("type");
  useEffect(() => {
    if (!is_edit && !is_sub && open) {
      if (currentType === ViewTypes.ROOT) {
        form.setValue("parent_id", "0");
      } else {
        if (form.getValues("parent_id") === "0") {
          form.setValue("parent_id", String(sidebarRootId));
        }
      }
    }
  }, [currentType, is_edit, is_sub, open, form, sidebarRootId]);

  const queryClient = useQueryClient();
  const { mutateAsync: createItem, isPending: isCreatePending } = apiHooks.useCreate(queryClient);
  const { mutateAsync: updateItem, isPending: isUpdatePending } = apiHooks.useUpdate(queryClient, currentRow?.id || "");

  const [sortDialogOpen, setSortDialogOpen] = useState(false);

  const onSubmit = async (values: FormType) => {
    try {
      // Explicitly create the payload with the correct API type
      const payload: Partial<API.System.View> = {
        name: values.name,
        keyword: values.keyword,
        scope: values.scope,
        type: values.type,
        path: values.path,
        icon: values.icon,
        component: values.component,
        sequence: values.sequence,
        status: values.status,
        description: values.description,
        parent_id: values.parent_id ? String(values.parent_id) : undefined,
        resource_ids: values.resource_ids,
        properties: values.properties,
      };

      if (!is_edit) {
        await createItem(payload);
      } else {
        // For updates, merge with currentRow to ensure all fields are present
        const putPayload = { ...currentRow, ...payload };
        await updateItem(putPayload);
      }

      toast({
        title: "Success",
        description: `Successfully ${is_edit ? "updated" : "created"} ${pageConfig.title.toLowerCase()}.`,
      });
      await queryClient.invalidateQueries({ queryKey: ["/sys/views"] });
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

  const showResourceSelector = [ViewTypes.MENU, ViewTypes.PAGE, ViewTypes.BUTTON].includes(currentType);

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(state) => {
          if (!state) {
            form.reset();
          }
          onOpenChange(state);
        }}
      >
        <DialogContent className={cn("sm:max-w-2xl", className)}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description} Click save when you're done.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              id={formId}
              onSubmit={form.handleSubmit(onSubmit, (errors) => console.error("Validation failed:", errors))}
              className='relative space-y-6'
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
                <div className='p-4 space-y-6'>
                  {parentRow && (
                    <FormItem>
                      <FormLabel>Parent View</FormLabel>
                      <FormControl>
                        <Input readOnly disabled value={parentRow.name} />
                      </FormControl>
                    </FormItem>
                  )}

                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    {renderFields(form, () => setSortDialogOpen(true), is_sub, currentType, isSidebarMissing, [
                      "name",
                      "keyword",
                      "type",
                      "scope",
                      "path",
                      "component",
                    ])}
                  </div>

                  {showResourceSelector && (
                    <FormField
                      control={form.control}
                      name='resource_ids'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Associated Resources</FormLabel>
                          <FormControl>
                            <ResourceMultiSelect value={field.value} onChange={field.onChange} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <Accordion type='single' collapsible className='w-full' defaultValue='advanced-settings'>
                    <AccordionItem value='advanced-settings'>
                      <AccordionTrigger className='text-base font-medium hover:no-underline px-2 py-3'>
                        Advanced Settings
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className='space-y-4 pt-4 border-t'>
                          <div className='grid grid-cols-2 gap-4 px-2'>
                            {renderFields(form, () => setSortDialogOpen(true), is_sub, currentType, isSidebarMissing, [
                              "icon",
                              "sequence",
                            ])}
                          </div>
                          <div className='px-2'>
                            <FormField
                              control={form.control}
                              name='description'
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Description</FormLabel>
                                  <FormControl>
                                    <Textarea placeholder='A brief description of this view.' {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </ScrollArea>
            </form>
          </Form>
          <DialogFooter>
            <Button type='submit' form={formId} disabled={isCreatePending || isUpdatePending}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ViewsSequenceDialog
        parentId={form.getValues("parent_id") || undefined}
        open={sortDialogOpen}
        onOpenChange={setSortDialogOpen}
      />
    </>
  );
}
