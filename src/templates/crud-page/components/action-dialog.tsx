import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { PageConfig, ApiHooks } from "../types";

interface Props<T, TForm extends z.ZodType<any, any>> {
  currentRow?: T;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  pageConfig: PageConfig;
  formSchema: TForm;
  apiHooks: ApiHooks<T, TForm>;
  renderFields: (form: ReturnType<typeof useForm<z.infer<TForm>>>) => React.ReactNode;
}

export function ActionDialog<T extends { id?: string; status?: number; visible?: boolean }, TForm extends z.ZodType<any, any>>({
  currentRow,
  open,
  onOpenChange,
  className,
  pageConfig,
  formSchema,
  apiHooks,
  renderFields,
}: Props<T, TForm>) {
  const is_edit = !!currentRow;
  const title = is_edit ? `Edit ${pageConfig.title}` : `Add New ${pageConfig.title}`;
  const description = is_edit
    ? `Update the ${pageConfig.title.toLowerCase()} here.`
    : `Create new ${pageConfig.title.toLowerCase()} here.`;
  const formId = `${pageConfig.title.toLowerCase()}-form`;

  // Generate default values from schema shape to ensure controlled inputs
  const shape = (formSchema as any).shape;
  const generatedDefaults = shape
    ? Object.keys(shape).reduce((acc, key) => {
        // Default to empty string for all fields. 
        // This might need adjustment for specific types (number, boolean), 
        // but empty string works well for Input/Textarea/Select initial states.
        acc[key] = ""; 
        return acc;
      }, {} as any)
    : {};

  const form = useForm<z.infer<TForm>>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    shouldFocusError: false,
    defaultValues: is_edit
      ? { ...currentRow, is_edit }
      : { ...generatedDefaults, status: 1, visible: true, is_edit: false },
  });

  const queryClient = useQueryClient();
  const { mutate: createItem, isPending: isCreatePending } = apiHooks.useCreate(queryClient);
  const { mutate: updateItem, isPending: isUpdatePending } = apiHooks.useUpdate(queryClient, currentRow?.id || "");

  const onSubmit = (values: z.infer<TForm>) => {
    if (!is_edit) {
      createItem(values);
    } else {
      updateItem(values);
    }

    toast({
      title: "Success",
      description: `Successfully ${is_edit ? "updated" : "created"} ${pageConfig.title.toLowerCase()}.`,
    });
    onOpenChange(false);
    form.reset();
  };

  const hasStatus = "status" in form.getValues();

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset();
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
            className='relative space-y-4'
          >
            {hasStatus && (
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
            )}
            <ScrollArea className='h-[26.25rem] w-full'>
              <div className="p-4">
                {renderFields(form)}
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
  );
}
