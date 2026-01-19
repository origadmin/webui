import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useForm, FieldValues, DefaultValues } from "react-hook-form";
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
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ApiHooks, PageConfig } from "../types";

interface Props<TData, TFormValues extends FieldValues> {
  currentRow?: TData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  pageConfig: PageConfig;
  formSchema: z.ZodType<TFormValues>;
  apiHooks: ApiHooks<TData, TFormValues>;
  renderFields: (form: ReturnType<typeof useForm<TFormValues>>) => React.ReactNode;
}

export function ActionDialog<TFormValues extends FieldValues, TData extends TFormValues & { id?: string }>({
  currentRow,
  open,
  onOpenChange,
  className,
  pageConfig,
  formSchema,
  apiHooks,
  renderFields,
}: Props<TData, TFormValues>) {
  const isEdit = !!currentRow;
  const title = isEdit ? `Edit ${pageConfig.title}` : `Add New ${pageConfig.title}`;
  const description = isEdit
    ? `Update the ${pageConfig.title.toLowerCase()} here.`
    : `Create new ${pageConfig.title.toLowerCase()} here.`;
  const formId = `${pageConfig.title.toLowerCase()}-form`;

  const form = useForm<TFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: (isEdit ? currentRow : undefined) as DefaultValues<TFormValues>,
  });

  const queryClient = useQueryClient();
  const { mutateAsync: createItem, status: createStatus } = apiHooks.useCreate();
  const { mutateAsync: updateItem, status: updateStatus } = apiHooks.useUpdate();
  const isPending = createStatus === "pending" || updateStatus === "pending";

  const onSubmit = async (values: TFormValues) => {
    try {
      if (!isEdit) {
        await createItem(values);
      } else {
        if (!currentRow?.id) {
          throw new Error("Cannot update item without an ID.");
        }
        await updateItem({ ...values, id: currentRow.id });
      }

      toast({
        title: "Success",
        description: `Successfully ${isEdit ? "updated" : "created"} ${pageConfig.title.toLowerCase()}.`,
      });

      await queryClient.invalidateQueries({ queryKey: [pageConfig.title.toLowerCase()] });
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to save:", error);
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      });
    }
  };

  React.useEffect(() => {
    if (open) {
      form.reset((isEdit ? currentRow : undefined) as DefaultValues<TFormValues>);
    }
  }, [open, isEdit, currentRow, form]);

  return (
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
          <form id={formId} onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <ScrollArea className='h-[26.25rem] w-full'>
              <div className='p-4'>{renderFields(form)}</div>
            </ScrollArea>
          </form>
        </Form>
        <DialogFooter>
          <Button type='submit' form={formId} disabled={isPending}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
