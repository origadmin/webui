import { useResourceCreate, useResourceUpdate } from "@/api/system/resource";
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

const formSchema = z.object({
  service_name: z.string().min(1, "Service name is required."),
  keyword: z.string().min(1, "Keyword is required."),
  path: z.string().min(1, "Path is required."),
  method: z.string().min(1, "Method is required."),
  operation: z.string().optional(),
  description: z.string().optional(),
  status: z.number().default(1),
});

type ResourceForm = z.infer<typeof formSchema>;

interface Props {
  currentRow?: API.System.Resource;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}

export function ResourcesActionDialog({
  currentRow,
  open,
  onOpenChange,
  className,
}: Props) {
  const isEditMode = !!currentRow;
  // A resource is considered "synced" if it has a sync_status. Manually added resources won't have this.
  const isSyncedResource = isEditMode && !!currentRow?.sync_status;

  const form = useForm<ResourceForm>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: isEditMode
      ? {
          service_name: currentRow?.service_name || "",
          keyword: currentRow?.keyword || "",
          path: currentRow?.path || "",
          method: currentRow?.method || "",
          operation: currentRow?.operation || "",
          description: currentRow?.description || "",
          status: currentRow?.status || 1,
        }
      : {
          service_name: "",
          keyword: "",
          path: "",
          method: "GET",
          operation: "",
          description: "",
          status: 1,
        },
  });

  const queryClient = useQueryClient();
  const { mutate: createResource, isPending: isCreatePending } = useResourceCreate(queryClient);
  const { mutate: updateResource, isPending: isUpdatePending } = useResourceUpdate(
    queryClient,
    currentRow?.id || ""
  );

  const onSubmit = (values: ResourceForm) => {
    if (isEditMode) {
      // For synced resources, we likely only want to update status/description.
      // For manually added ones, we update everything.
      const payload = isSyncedResource
        ? { status: values.status, description: values.description }
        : values;
      updateResource(payload);
    } else {
      createResource(values);
    }

    toast({
      title: "Success",
      description: `Resource has been successfully ${isEditMode ? "updated" : "created"}.`,
    });
    onOpenChange(false);
    form.reset();
  };

  const isPending = isCreatePending || isUpdatePending;

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
          <DialogTitle>{isEditMode ? "Edit Resource" : "Add New Resource"}</DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Edit the details of this backend resource. Core fields of synced resources are read-only."
              : "Manually add a new backend resource to the system."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id='resource-form'
            onSubmit={form.handleSubmit(onSubmit)}
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
                <div className='space-y-2'>
                  <h3 className='text-lg font-medium'>Resource Details</h3>
                  <Separator />
                  <div className='grid grid-cols-2 gap-4 pt-2'>
                    <FormField control={form.control} name='service_name' render={({ field }) => (<FormItem><FormLabel>Service Name</FormLabel><FormControl><Input placeholder='e.g., user-service' {...field} disabled={isSyncedResource} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name='keyword' render={({ field }) => (<FormItem><FormLabel>Keyword</FormLabel><FormControl><Input placeholder='e.g., user:create' {...field} disabled={isSyncedResource} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name='path' render={({ field }) => (<FormItem className="col-span-2"><FormLabel>Path</FormLabel><FormControl><Input placeholder='/api/v1/users' {...field} disabled={isSyncedResource} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name='method' render={({ field }) => (<FormItem><FormLabel>Method</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value} disabled={isSyncedResource}><FormControl><SelectTrigger><SelectValue placeholder='Select a method' /></SelectTrigger></FormControl><SelectContent><SelectItem value="GET">GET</SelectItem><SelectItem value="POST">POST</SelectItem><SelectItem value="PUT">PUT</SelectItem><SelectItem value="DELETE">DELETE</SelectItem><SelectItem value="PATCH">PATCH</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name='operation' render={({ field }) => (<FormItem><FormLabel>Operation</FormLabel><FormControl><Input placeholder='UserService_CreateUser' {...field} disabled={isSyncedResource} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name='description' render={({ field }) => (<FormItem className="col-span-2"><FormLabel>Description</FormLabel><FormControl><Textarea placeholder='A brief description of the resource.' {...field} /></FormControl><FormMessage /></FormItem>)} />
                  </div>
                </div>
              </div>
            </ScrollArea>
          </form>
        </Form>
        <DialogFooter>
          <Button type='submit' form='resource-form' disabled={isPending}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
