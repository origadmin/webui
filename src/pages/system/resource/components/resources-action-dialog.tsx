import { useEffect, useMemo } from "react";
import { useResourceCreate, useResourceUpdate, useResourcesQuery } from "@/api/system/resource";
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
import { Combobox } from "@/components/ui/combobox";

const formSchema = z.object({
  name: z.string().min(1, "Name is required."),
  service_name: z.string().min(1, "Service name is required."),
  keyword: z.string().min(1, "Keyword is required."),
  path: z.string().min(1, "Path is required."),
  method: z.string().min(1, "Method is required."),
  operation: z.string().optional(),
  policy: z.string().optional(),
  i18n: z.string().optional(),
  description: z.string().optional(),
  sequence: z.number().optional(),
  status: z.number().default(1),
  parent_id: z.string().nullable().optional(),
});

type ResourceForm = z.infer<typeof formSchema>;

interface Props {
  currentRow?: API.System.Resource;
  parentRow?: API.System.Resource;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}

export function ResourcesActionDialog({
  currentRow,
  parentRow,
  open,
  onOpenChange,
  className,
}: Props) {
  const isEditMode = !!currentRow;
  const isSubMode = !!parentRow;
  const title = isEditMode ? "Edit Resource" : isSubMode ? "Add Sub Resource" : "Add New Resource";
  const isSyncedResource = isEditMode && !!currentRow?.sync_status;

  // Fetch all resources to extract unique policy names
  const { data: resourcesData } = useResourcesQuery({ page_size: 1000 });
  const policies = useMemo(() => {
    if (!resourcesData?.data) return [];
    const allPolicies = resourcesData.data.map(res => res.policy).filter(Boolean) as string[];
    return Array.from(new Set(allPolicies));
  }, [resourcesData]);


  const form = useForm<ResourceForm>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: {
      name: "",
      service_name: "",
      keyword: "",
      path: "",
      method: "GET",
      operation: "",
      policy: "",
      i18n: "",
      description: "",
      sequence: 0,
      status: 1,
      parent_id: null,
    },
  });

  useEffect(() => {
    if (isEditMode && currentRow) {
      form.reset(currentRow);
    } else if (isSubMode && parentRow) {
      form.reset({
        ...form.getValues(), // Keep default empty values
        parent_id: parentRow.id,
      });
    } else {
      form.reset(); // Reset to default empty values for new resource
    }
  }, [currentRow, parentRow, isEditMode, isSubMode, form]);

  const queryClient = useQueryClient();
  const { mutateAsync: createResource, isPending: isCreatePending } = useResourceCreate(queryClient);
  const { mutateAsync: updateResource, isPending: isUpdatePending } = useResourceUpdate(
    queryClient,
    currentRow?.id || ""
  );

  const onSubmit = async (values: ResourceForm) => {
    try {
      if (isEditMode) {
        const putPayload = {
          ...currentRow,
          ...values,
        };
        await updateResource(putPayload);
      } else {
        await createResource(values);
      }

      toast({
        title: "Success",
        description: `Resource has been successfully ${isEditMode ? "updated" : "created"}.`,
      });
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

  const isPending = isCreatePending || isUpdatePending;

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
                {parentRow && (
                  <FormItem>
                    <FormLabel>Parent Resource</FormLabel>
                    <FormControl>
                      <Input readOnly disabled value={parentRow.keyword} />
                    </FormControl>
                  </FormItem>
                )}
                <div className='space-y-2'>
                  <h3 className='text-lg font-medium'>Resource Details</h3>
                  <Separator />
                  <div className='grid grid-cols-2 gap-4 pt-2'>
                    <FormField control={form.control} name='name' render={({ field }) => (<FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder='e.g., Get User Profile' {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField
                      control={form.control}
                      name='policy'
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Policy</FormLabel>
                          <FormControl>
                            <Combobox
                              creatable
                              value={field.value}
                              onChange={field.onChange}
                              options={policies.map((policy) => ({
                                value: policy,
                                label: policy,
                              }))}
                              placeholder="Select or create a policy..."
                              searchPlaceholder="Search policies..."
                              noResultsMessage="No policy found."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField control={form.control} name='i18n' render={({ field }) => (<FormItem><FormLabel>I18n Key</FormLabel><FormControl><Input placeholder='e.g., resource.user.get' {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name='sequence' render={({ field }) => (<FormItem><FormLabel>Sequence</FormLabel><FormControl><Input type="number" placeholder='0' {...field} /></FormControl><FormMessage /></FormItem>)} />
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
