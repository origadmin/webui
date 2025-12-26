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
import { Form } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { pageConfig, formSchema, FormType, apiHooks } from "../config"; // Import from config

interface Props<T> {
  currentRow?: T;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  // A function that renders the form fields, receiving the form control.
  renderFields: (form: ReturnType<typeof useForm<FormType>>) => React.ReactNode;
}

export function ActionDialog<T extends { id?: string }>({
  currentRow,
  open,
  onOpenChange,
  className,
  renderFields,
}: Props<T>) {
  const is_edit = !!currentRow;
  const title = is_edit ? `Edit ${pageConfig.title}` : `Add New ${pageConfig.title}`;
  const description = is_edit
    ? `Update the ${pageConfig.title.toLowerCase()} here.`
    : `Create new ${pageConfig.title.toLowerCase()} here.`;
  const formId = `${pageConfig.title.toLowerCase()}-form`;

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    shouldFocusError: false,
    defaultValues: is_edit
      ? { ...currentRow, is_edit }
      : {
          // This needs to be generic. We can pass defaultValues from outside.
          // For now, let's assume the schema handles defaults.
          is_edit,
        },
  });

  const queryClient = useQueryClient();
  const { mutate: createItem, isPending: isCreatePending } = apiHooks.useCreate(queryClient);
  const { mutate: updateItem, isPending: isUpdatePending } = apiHooks.useUpdate(queryClient, currentRow?.id || "");

  const onSubmit = (values: FormType) => {
    if (!is_edit) {
      createItem(values);
    } else {
      updateItem(values);
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

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset();
        onOpenChange(state);
      }}
    >
      <DialogContent className={cn("sm:max-w-2xl", className)}>
        <DialogHeader className='text-left'>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description} Click save when you're done.</DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
          <Form {...form}>
            <form
              id={formId}
              onSubmit={form.handleSubmit(onSubmit, (errors) => console.error("Validation failed:", errors))}
              className='space-y-4'
            >
              {renderFields(form)}
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          <Button type='submit' form={formId} disabled={isCreatePending || isUpdatePending}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
