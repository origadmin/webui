import { useState } from "react";
import { useResourceCreate, useResourceUpdate } from "@/api/system/resource";
import { ResourcesSequenceDialog } from "./resources-sequence-dialogs";
import { t } from "@/utils/locale";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconArrowsSort } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { resourceTypeValues } from "@/types/system/resource";
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
import IconPicker from "@/components/IconPicker";

const formSchema = z
  .object({
    parent_id: z.string().optional(),
    type: z.string().default("MENU"),
    name: z.string().min(1, { message: t("name.required") }),
    keyword: z.string().min(1, { message: t("keyword.required") }),
    path: z.string().optional(),
    component: z.string().optional(),
    method: z.string().optional(),
    operation: z.string().optional(),
    description: z.string().optional(),
    sequence: z.number().default(1),
    icon: z.string().optional(),
    status: z.number().default(1),
    visible: z.boolean().default(true),
    properties: z.string().refine((val) => {
        try {
          JSON.parse(val);
          return true;
        } catch {
          return false;
        }
      }, { message: "Invalid JSON format." }).optional(),
    is_edit: z.boolean(),
  });

type ResourceForm = z.infer<typeof formSchema>;

interface Props<T> {
  currentRow?: T;
  parentRow?: T;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  columns?: number;
}

export function ResourcesActionDialog({
  currentRow,
  parentRow,
  open,
  onOpenChange,
  className,
  columns = 2,
}: Props<API.System.Resource>) {
  const is_edit = !!currentRow;
  const form = useForm<ResourceForm>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: is_edit
      ? {
          ...currentRow,
          properties: JSON.stringify(currentRow.properties || {}, null, 2),
          is_edit,
        }
      : {
          name: "",
          description: "",
          sequence: 1,
          type: "MENU",
          parent_id: parentRow?.id,
          path: parentRow?.path,
          keyword: parentRow?.keyword,
          status: 1,
          visible: true,
          properties: "{}",
          is_edit,
        },
  });

  const type = useWatch({ control: form.control, name: "type" });

  const id = currentRow?.id || "";
  const queryClient = useQueryClient();
  const { mutate: createResource, isPending: isCreatePending } = useResourceCreate(queryClient);
  const { mutate: updateResource, isPending: isUpdatePending } = useResourceUpdate(queryClient, id);

  const onSubmit = async (values: ResourceForm) => {
    try {
      const submissionData = {
        ...values,
        properties: values.properties ? JSON.parse(values.properties) : {},
      };

      if (!is_edit) {
        createResource(submissionData);
      } else {
        updateResource(submissionData);
      }
      toast({
        title: "Success",
        description: `Resource has been successfully ${is_edit ? "updated" : "created"}.`,
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

  const [sortDialogOpen, setSortDialogOpen] = useState(false);
  const handleSortOpen = () => setSortDialogOpen(true);

  const maxWClass = `sm:max-w-${columns * 500}px`;
  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset();
        onOpenChange(state);
      }}
    >
      <DialogContent className={cn(`${maxWClass}`, className)}>
        <DialogHeader>
          <DialogTitle>{is_edit ? "Edit Resource" : "Add New Resource"}</DialogTitle>
          <DialogDescription>
            {is_edit ? "Update the resource here. " : "Create new resource here. "}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id='resource-form'
            onSubmit={form.handleSubmit(onSubmit, (errors) => console.error("Validation failed:", errors))}
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
                      <Switch checked={field.value === 1} onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
              <div className="space-y-4">
                {/* Base Info */}
                <div className='space-y-2'>
                  <h3 className='text-lg font-medium'>Base Info</h3>
                  <Separator />
                  <div className='grid grid-cols-2 gap-4 pt-2'>
                    <FormField control={form.control} name='parent_id' render={({ field }) => (<FormItem><FormLabel>Parent</FormLabel><FormControl><Input {...field} disabled /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name='type' render={({ field }) => (<FormItem><FormLabel>Type</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder='Select a type' /></SelectTrigger></FormControl><SelectContent>{Array.from(resourceTypeValues).map(([key, value]) => (<SelectItem key={key} value={key}>{value?.trim() || `Unknown(${key})`}</SelectItem>))}</SelectContent></Select><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name='name' render={({ field }) => (<FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder='e.g., User Management' {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name='keyword' render={({ field }) => (<FormItem><FormLabel>Keyword</FormLabel><FormControl><Input placeholder='e.g., user_management' {...field} /></FormControl><FormMessage /></FormItem>)} />
                  </div>
                </div>

                {/* Route Info */}
                {(type === 'MENU' || type === 'CATALOG') && (
                  <div className='space-y-2 pt-4'>
                    <h3 className='text-lg font-medium'>Route Info</h3>
                    <Separator />
                    <div className='grid grid-cols-2 gap-4 pt-2'>
                      <FormField control={form.control} name='path' render={({ field }) => (<FormItem><FormLabel>Path</FormLabel><FormControl><Input placeholder='/system/user' {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name='component' render={({ field }) => (<FormItem><FormLabel>Component</FormLabel><FormControl><Input placeholder='@/pages/system/user' {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name='icon' render={({ field }) => (<FormItem className="col-span-2"><FormLabel>Icon</FormLabel><FormControl><IconPicker value={field.value} onValueChange={field.onChange} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name='visible' render={({ field }) => (<FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"><FormLabel>Visible</FormLabel><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem>)} />
                    </div>
                  </div>
                )}

                {/* API Info */}
                {type === 'API' && (
                  <div className='space-y-2 pt-4'>
                    <h3 className='text-lg font-medium'>API Info</h3>
                    <Separator />
                    <div className='grid grid-cols-2 gap-4 pt-2'>
                      <FormField control={form.control} name='path' render={({ field }) => (<FormItem><FormLabel>API Path</FormLabel><FormControl><Input placeholder='/api/v1/sys/users' {...field} /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name='method' render={({ field }) => (<FormItem><FormLabel>Method</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder='Select a method' /></SelectTrigger></FormControl><SelectContent><SelectItem value="GET">GET</SelectItem><SelectItem value="POST">POST</SelectItem><SelectItem value="PUT">PUT</SelectItem><SelectItem value="DELETE">DELETE</SelectItem><SelectItem value="PATCH">PATCH</SelectItem></SelectContent></Select><FormMessage /></FormItem>)} />
                      <FormField control={form.control} name='operation' render={({ field }) => (<FormItem className="col-span-2"><FormLabel>Operation</FormLabel><FormControl><Input placeholder='UserService_ListUsers' {...field} /></FormControl><FormMessage /></FormItem>)} />
                    </div>
                  </div>
                )}

                {/* General Settings */}
                <div className='space-y-2 pt-4'>
                  <h3 className='text-lg font-medium'>General Settings</h3>
                  <Separator />
                  <div className='grid grid-cols-2 gap-4 pt-2'>
                    <FormField control={form.control} name='sequence' render={({ field }) => (<FormItem><FormLabel>Sequence</FormLabel><div className='flex'><FormControl><Input type='number' {...field} /></FormControl><Button type='button' variant='outline' onClick={handleSortOpen} className='h-9 w-12 gap-0 px-0 rounded-l-none' size='icon'><IconArrowsSort className='h-5 w-5' /></Button></div><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name='description' render={({ field }) => (<FormItem className="col-span-2"><FormLabel>Description</FormLabel><FormControl><Textarea placeholder='A brief description of the resource.' {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name='properties' render={({ field }) => (<FormItem className="col-span-2"><FormLabel>Properties (JSON)</FormLabel><FormControl><Textarea placeholder='{ "key": "value" }' {...field} /></FormControl><FormMessage /></FormItem>)} />
                  </div>
                </div>
              </div>
            </ScrollArea>
          </form>
        </Form>
        <DialogFooter>
          <Button type='submit' form='resource-form' disabled={isCreatePending || isUpdatePending}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
      <ResourcesSequenceDialog
        open={sortDialogOpen}
        onOpenChange={setSortDialogOpen}
        currentRow={{
          id: currentRow?.id,
          sequence: currentRow?.sequence ?? 0,
          name: currentRow?.name ?? "",
        }}
      />
    </Dialog>
  );
}
