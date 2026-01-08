import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { FormType, formSchema, apiHooks, pageConfig } from "../config";
import { renderFields } from "./fields";
import { ViewsSequenceDialog } from "./views-sequence-dialog";
import { ResourceActionManager } from "./resource-selector";
import { useViewContext } from "./views-table-provider";
import { ViewScopes, ViewTypes } from "../constants";

interface Props {
  currentRow?: API.System.View;
  parentRow?: API.System.View;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}

export function ViewActionDialog({
  currentRow,
  parentRow,
  open,
  onOpenChange,
  className,
}: Props) {
  const is_edit = !!currentRow;
  const is_sub = !!parentRow;
  const title = is_edit ? `Edit ${pageConfig.title}` : is_sub ? `Add Sub View` : `Add New View`;
  const description = is_edit ? `Update the ${pageConfig.title.toLowerCase()} here.` : `Create new ${pageConfig.title.toLowerCase()} here.`;
  const formId = `${pageConfig.title.toLowerCase()}-form`;

  const { sidebarRootId } = useViewContext();
  const isSidebarMissing = !sidebarRootId && !is_sub && !is_edit;

  const shape = (formSchema as any).shape;
  const generatedDefaults = shape ? Object.keys(shape).reduce((acc, key) => { acc[key] = ""; return acc; }, {} as any) : {};

  let parsedActions = [];
  let parsedRedirectTo = "";
  if (currentRow?.properties) {
    try {
      const props = JSON.parse(currentRow.properties);
      if (props.actions) parsedActions = props.actions;
      if (props.redirect_to) parsedRedirectTo = props.redirect_to;
    } catch (e) { console.error("Failed to parse view properties:", e); }
  }

  const defaultType = is_edit ? currentRow.type?.toUpperCase() : is_sub ? ViewTypes.MENU : isSidebarMissing ? ViewTypes.ROOT : ViewTypes.MENU;
  const defaultScope = is_edit ? currentRow.scope : is_sub ? parentRow.scope || ViewScopes.SIDEBAR : ViewScopes.SIDEBAR;
  const defaultParentId = is_edit ? currentRow.parent_id : is_sub ? parentRow.id : (isSidebarMissing ? "0" : sidebarRootId);

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    shouldFocusError: true,
    defaultValues: is_edit
      ? { ...currentRow, type: defaultType, is_edit, actions: parsedActions, redirect_to: parsedRedirectTo }
      : { ...generatedDefaults, status: 1, visible: true, is_edit: false, parent_id: String(defaultParentId), actions: [], type: defaultType, scope: defaultScope, sequence: 0 },
  });

  const currentType = form.watch("type");
  useEffect(() => {
    if (!is_edit && !is_sub && open) { // Only for top-level add
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
      const payload = { ...values };
      delete (payload as Partial<FormType>).is_edit;

      const propertiesObj: any = {};
      if (payload.properties) {
        try {
          const existingProps = JSON.parse(payload.properties);
          Object.assign(propertiesObj, existingProps);
        } catch (e) {}
      }
      if (payload.actions && payload.actions.length > 0) {
        propertiesObj.actions = payload.actions;
      }
      if (payload.redirect_to) {
        propertiesObj.redirect_to = payload.redirect_to;
      }
      payload.properties = JSON.stringify(propertiesObj);

      delete payload.actions;
      delete payload.redirect_to;

      if (payload.parent_id) {
        payload.parent_id = String(payload.parent_id);
      }

      if (!is_edit) {
        await createItem(payload);
      } else {
        const putPayload = { ...currentRow, ...payload };
        await updateItem(putPayload);
      }

      toast({ title: "Success", description: `Successfully ${is_edit ? "updated" : "created"} ${pageConfig.title.toLowerCase()}.` });
      await queryClient.invalidateQueries({ queryKey: ["/sys/views"] });
      onOpenChange(false);
    } catch (error) {
      toast({ title: "Operation Failed", description: error instanceof Error ? error.message : "An unexpected error occurred.", variant: "destructive" });
    } finally {
      form.reset();
    }
  };

  const hasStatus = "status" in form.getValues();
  const showResourceSelector = [ViewTypes.MENU, ViewTypes.PAGE, ViewTypes.BUTTON].includes(currentType);
  const showRedirectTo = currentType === ViewTypes.REDIRECT;

  return (
    <>
      <Dialog open={open} onOpenChange={(state) => { if (!state) { form.reset(); } onOpenChange(state); }}>
        <DialogContent className={cn("sm:max-w-2xl", className)}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description} Click save when you're done.</DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form id={formId} onSubmit={form.handleSubmit(onSubmit, (errors) => console.error("Validation failed:", errors))} className='relative space-y-4'>
              {hasStatus && (
                <div className='absolute top-0 right-12 z-10 bg-background p-2 rounded-lg'>
                  <FormField control={form.control} name='status' render={({ field }) => (
                      <FormItem className='flex items-center space-x-2'>
                        <FormLabel>Status</FormLabel>
                        <FormControl>
                          <Switch checked={field.value === 1} onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              )}
              <ScrollArea className='h-[32rem] w-full'>
                <div className='p-4 space-y-8'>
                  {parentRow && (
                    <FormItem>
                      <FormLabel>Parent View</FormLabel>
                      <FormControl>
                        <Input readOnly disabled value={parentRow.name} />
                      </FormControl>
                    </FormItem>
                  )}
                  {renderFields(form, () => setSortDialogOpen(true), is_sub, currentType, isSidebarMissing)}
                  {showRedirectTo && (
                    <FormField control={form.control} name="redirect_to" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Redirect To</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., /system/user" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  {showResourceSelector && <ResourceActionManager />}
                </div>
              </ScrollArea>
            </form>
          </Form>
          <DialogFooter>
            <Button type='submit' form={formId} disabled={isCreatePending || isUpdatePending}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <ViewsSequenceDialog parentId={form.getValues("parent_id") || undefined} open={sortDialogOpen} onOpenChange={setSortDialogOpen} />
    </>
  );
}
