import { useMemo } from "react";
import { usePermissionsQuery } from "@/api/system/permission";
import { useRoleCreate, useRoleUpdate } from "@/api/system/role";
import { t } from "@/utils/locale";
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
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { RolesPermissionSelect } from "./roles-permission-select";

const formSchema = z.object({
  name: z.string().min(1, {
    message: t("validation.name.required"),
  }),
  keyword: z.string().min(1, { message: t("validation.keyword.required") }),
  type: z.number().optional(),
  description: z.string().optional(),
  status: z.number().default(1),
  is_edit: z.boolean(),
  permission_ids: z.array(z.string()).optional(),
});

type RoleForm = z.infer<typeof formSchema>;

interface Props {
  currentRow?: API.System.Role;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  columns?: number;
}

export function RolesActionDialog({ currentRow, open, onOpenChange, className, columns = 2 }: Props) {
  const is_edit = !!currentRow;
  const form = useForm<RoleForm>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: is_edit
      ? {
          ...currentRow,
          is_edit,
          permission_ids: currentRow.permission_ids || [],
        }
      : {
          name: "",
          keyword: "",
          type: 1,
          description: "",
          status: 1,
          is_edit,
          permission_ids: [],
        },
  });

  const { data: permissions = { data: [] } } = usePermissionsQuery({ page_size: 1000 });
  const treeData = useMemo(() => permissions.data, [permissions.data]);

  const id = currentRow?.id || "";
  const queryClient = useQueryClient();
  const { mutateAsync: createRole, isPending: isCreatePending } = useRoleCreate(queryClient);
  const { mutateAsync: updateRole, isPending: isUpdatePending } = useRoleUpdate(queryClient, id);

  const onSubmit = async (values: RoleForm) => {
    try {
      const payload = { ...values };
      delete (payload as Partial<RoleForm>).is_edit;

      if (!is_edit) {
        await createRole(payload);
      } else {
        const putPayload = {
          ...currentRow,
          ...payload,
        };
        await updateRole(putPayload);
      }

      toast({
        title: "Success",
        description: `Role has been successfully ${is_edit ? "updated" : "created"}.`,
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
          <DialogTitle>{is_edit ? "Edit Role" : "Add New Role"}</DialogTitle>
          <DialogDescription>
            {is_edit ? "Update the role here. " : "Create new role here. "}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id='role-form'
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
                {/* Base Info Section */}
                <div className='space-y-2'>
                  <h3 className='text-lg font-medium'>Base Info</h3>
                  <Separator />
                  <div className='grid grid-cols-2 gap-4 pt-2'>
                    <FormField control={form.control} name='name' render={({ field }) => (<FormItem><FormLabel>Name</FormLabel><FormControl><Input placeholder='Please enter a name' {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name='keyword' render={({ field }) => (<FormItem><FormLabel>Keyword</FormLabel><FormControl><Input placeholder='Please enter a keyword' {...field} /></FormControl><FormMessage /></FormItem>)} />
                    <FormField control={form.control} name='type' render={({ field }) => (<FormItem><FormLabel>Type</FormLabel><FormControl><Input {...field} disabled /></FormControl><FormMessage /></FormItem>)} />
                  </div>
                  <div className='grid grid-cols-1 gap-4 pt-2'>
                    <FormField
                      control={form.control}
                      name='description'
                      render={({ field }) => (
                        <FormItem className='col-span-1'>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea placeholder='A brief description for this role.' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Permission Settings Section */}
                <div className='space-y-2 pt-4'>
                  <h3 className='text-lg font-medium'>Permission Settings</h3>
                  <Separator />
                  <div className='pt-2'>
                    <FormField
                      control={form.control}
                      name='permission_ids'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RolesPermissionSelect value={field.value} onChange={field.onChange} permissions={treeData} />
                          </FormControl>
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
          <Button type='submit' form='role-form' disabled={isCreatePending || isUpdatePending}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
