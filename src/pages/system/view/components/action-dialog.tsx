import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm, UseFormReturn, FieldErrors } from "react-hook-form";
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { debugToast } from "@/components/debug-toast";
import { FormType, formSchema, apiHooks, pageConfig } from "../config";
import { ViewScopes, ViewTypes } from "../constants";
import { renderFields } from "./fields";
import { ResourceMultiSelect } from "./resource-multi-select";
import { useViewContext } from "./views-table-provider";

interface Props {
  currentRow?: API.System.View;
  parentRow?: API.System.View;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}

// Type guard to check if a view type is one that should show the resource selector.
function isResourceSelectorType(type: string): type is "MENU" | "PAGE" | "BUTTON" {
  return (["MENU", "PAGE", "BUTTON"] as string[]).includes(type);
}

interface ViewFormProps {
  is_sub: boolean;
  form: UseFormReturn<FormType>;
  formId: string;
  onSubmit: (values: FormType) => Promise<void>;
  parentRow?: API.System.View;
  isSidebarMissing: boolean;
  currentType: FormType["type"];
}

function ViewForm({ is_sub, form, formId, onSubmit, parentRow, isSidebarMissing, currentType }: ViewFormProps) {
  const showResourceSelector = isResourceSelectorType(currentType);

  return (
    <Form {...form}>
      <form
        id={formId}
        onSubmit={form.handleSubmit(onSubmit, (errors: FieldErrors<FormType>) =>
          console.error("Validation failed:", errors),
        )}
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
                  <Switch checked={field.value === 1} onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)} />
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
              {renderFields(form, is_sub, currentType, isSidebarMissing, [
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
                      {renderFields(form, is_sub, currentType, isSidebarMissing, ["icon", "sequence"])}
                    </div>
                    <div className='px-2 space-y-4'>
                      <FormField
                        control={form.control}
                        name='properties'
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Properties</FormLabel>
                            <FormControl>
                              <Textarea placeholder='Enter properties as JSON' {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
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
  );
}

function FormSkeleton() {
  return (
    <div className='space-y-6 p-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-10 w-full' />
        <Skeleton className='h-10 w-full' />
      </div>
      <Skeleton className='h-24 w-full' />
    </div>
  );
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

  const { data: viewData, isLoading: isViewLoading } = apiHooks.useViewQuery(currentRow?.id || "", {
    enabled: is_edit && open, // Only fetch when the dialog is open for editing
  });

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    shouldFocusError: true,
  });

  useEffect(() => {
    if (open) {
      if (is_edit) {
        if (viewData) {
          const defaultResourceIds = (viewData.resources || []).map((resource) => String(resource.id));
          form.reset({
            ...viewData,
            type: viewData.type?.toUpperCase() as FormType["type"],
            is_edit: true,
            resource_ids: defaultResourceIds,
          });
        }
      } else {
        const defaultType = is_sub ? ViewTypes.MENU : isSidebarMissing ? ViewTypes.ROOT : ViewTypes.MENU;
        const defaultScope = is_sub ? parentRow?.scope || ViewScopes.SIDEBAR : ViewScopes.SIDEBAR;
        const defaultParentId = is_sub ? parentRow?.id : isSidebarMissing ? "0" : sidebarRootId;
        form.reset({
          name: "",
          keyword: "",
          scope: defaultScope,
          type: defaultType as FormType["type"],
          path: "",
          icon: "",
          component: "",
          sequence: 0,
          status: 1,
          description: "",
          parent_id: String(defaultParentId),
          is_edit: false,
          resource_ids: [],
          properties: "",
        });
      }
    }
  }, [open, is_edit, viewData, form, is_sub, parentRow, isSidebarMissing, sidebarRootId]);

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

  const onSubmit = async (values: FormType) => {
    try {
      const { is_edit, ...rest } = values;
      const payload = {
        ...rest,
        parent_id: values.parent_id ? String(values.parent_id) : undefined,
      };

      if (!is_edit) {
        await createItem(payload);
      } else {
        const putPayload = { ...currentRow, ...payload };
        await updateItem(putPayload);
      }

      toast({
        title: "Success",
        description: `Successfully ${is_edit ? "updated" : "created"} ${pageConfig.title.toLowerCase()}.`,
      });
      debugToast("You submitted the following values:", values);
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
          {is_edit && isViewLoading ? (
            <FormSkeleton />
          ) : (
            <ViewForm
              is_sub={is_sub}
              form={form}
              formId={formId}
              onSubmit={onSubmit}
              parentRow={parentRow}
              isSidebarMissing={isSidebarMissing}
              currentType={currentType}
            />
          )}
          <DialogFooter>
            <Button type='submit' form={formId} disabled={isCreatePending || isUpdatePending || isViewLoading}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
