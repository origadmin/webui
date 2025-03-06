import type React from "react";
import { usePermissionCreate, usePermissionUpdate } from "@/api/system/permission";
import { useResourcesQuery } from "@/api/system/resource";
import { t } from "@/utils/locale";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { resourceTypeValues } from "@/types/system/resource";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, Dialog } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z
  .object({
    name: z.string().min(1, {
      message: t("name.required"),
    }),
    keyword: z.string().min(1, {
      message: t("keyword.required"),
    }),
    description: z.string().optional(),
    resource_ids: z.array(z.string()).optional(),
    resources: z.array(z.object({})).optional(),
    data_scope: z.string().optional(),
    data_rules: z.object({}).optional(),
    is_edit: z.boolean(),
  })
  .superRefine((v) => {
    console.log("superRefine", v);
  });
type PermissionForm = z.infer<typeof formSchema>;

interface Props<T> {
  currentRow?: T;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  columns?: number;
}

const PermissionsActionDialog = ({
  currentRow,
  open,
  onOpenChange,
  className,
  columns = 2,
}: Props<API.System.Permission>) => {
  const isEdit = !!currentRow;
  const form = useForm<PermissionForm>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: isEdit
      ? {
          ...currentRow,
          data_rules: currentRow?.data_rules || [],
          is_edit: isEdit,
        }
      : {
          name: "",
          keyword: "",
          description: "",
          resource_ids: [],
          data_rules: [],
          is_edit: isEdit,
        },
  });

  const id = currentRow?.id || "";
  const queryClient = useQueryClient();
  const { mutate: createPermission, isPending: isCreatePending } = usePermissionCreate(queryClient);
  const { mutate: updatePermission, isPending: isUpdatePending } = usePermissionUpdate(queryClient, id);

  const onSubmit = (values: PermissionForm) => {
    form.reset();
    console.log("values", values);
    if (!isEdit) {
      createPermission({ ...values });
    } else {
      updatePermission({ ...values });
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
  };
  const { data: resources, isLoading } = useResourcesQuery({ page_size: 1000 });
  const resourcesOptions =
    resources?.data
      ?.filter((r) => r && r.id != undefined)
      .map((r) => {
        const value = r.id || "";
        const type = resourceTypeValues.get(r.type || "U") || "U";
        const label = `${r.name || ""}(${type})`;
        return {
          value: value,
          label: label,
        };
      }) || [];

  const maxWClass = `sm:max-w-${columns * 500}px`;
  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        form.reset();
        onOpenChange(state);
      }}
    >
      <DialogContent className='sm:max-w-[650px]'>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Permission" : "Add Permission"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Update the permission details below." : "Fill in the permission details below."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit, (errors) => console.error("验证失败:", errors))}>
            <Tabs defaultValue='basic' className='w-full'>
              <TabsList className='grid w-full grid-cols-3'>
                <TabsTrigger value='basic'>Basic Info</TabsTrigger>
                <TabsTrigger value='resources'>Resources</TabsTrigger>
                <TabsTrigger value='rules'>Data Rules</TabsTrigger>
              </TabsList>

              <TabsContent value='basic' className='space-y-4 py-4'>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='name' className='text-right'>
                    Name
                  </Label>
                  <Input
                    id='name'
                    name='name'
                    value={currentRow?.name || ""}
                    onChange={handleInputChange}
                    className='col-span-3'
                    required
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='keyword' className='text-right'>
                    Keyword
                  </Label>
                  <Input
                    id='keyword'
                    name='keyword'
                    value={currentRow?.keyword || ""}
                    onChange={handleInputChange}
                    className='col-span-3'
                    required
                  />
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='data_scope' className='text-right'>
                    Data Scope
                  </Label>
                  <Select
                    value={currentRow?.data_scope || "self"}
                    onValueChange={(value) => handleSelectChange("data_scope", value)}
                  >
                    <SelectTrigger id='data_scope' className='col-span-3'>
                      <SelectValue placeholder='Select data_scope' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='self'>Self</SelectItem>
                      <SelectItem value='role'>Role</SelectItem>
                      <SelectItem value='dept'>Department</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='description' className='text-right'>
                    Description
                  </Label>
                  <Textarea
                    id='description'
                    name='description'
                    value={currentRow?.description || ""}
                    onChange={handleInputChange}
                    className='col-span-3'
                    rows={3}
                  />
                </div>
              </TabsContent>

              <TabsContent value='resources' className='py-4'>
                <div className='space-y-4'>
                  <div className='flex justify-between items-center'>
                    <h3 className='text-sm font-medium'>Available Resources</h3>
                    <Badge variant='outline'>{selectedResources.length} selected</Badge>
                  </div>
                  <div className='border rounded-md p-4 h-[300px] overflow-y-auto'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                      {resources?.data?.map((resource) => (
                        <div key={resource.id} className='flex items-start space-x-2'>
                          <Checkbox
                            id={`resource-${resource.id}`}
                            checked={!!resource.id && selectedResources.includes(resource.id)}
                            onCheckedChange={(checked) => handleResourceSelection(resource.id || "", checked === true)}
                          />
                          <div className='grid gap-1.5'>
                            <Label
                              htmlFor={`resource-${resource.id}`}
                              className='font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                            >
                              {resource.name}
                            </Label>
                            {resource.description && (
                              <p className='text-sm text-muted-foreground'>{resource.description}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value='rules' className='py-4'>
                <div className='space-y-4'>
                  <h3 className='text-sm font-medium'>Data Rules</h3>
                  <div className='space-y-2'>
                    {Object.entries(currentRow.data_rules || {}).map(([key, value], index) => (
                      <div key={index} className='flex gap-2'>
                        <Input
                          value={key}
                          onChange={(e) => {
                            const newRules = { ...currentRow.data_rules } as { [key: string]: string };
                            const oldValue = newRules[key];
                            delete newRules[key];
                            newRules[e.target.value] = oldValue;
                            setCurrentPermission({ ...currentRow, data_rules: newRules });
                          }}
                          placeholder='Key'
                          className='flex-1'
                        />
                        <Input
                          value={value}
                          onChange={(e) => handleDataRuleChange(key, e.target.value)}
                          placeholder='Value'
                          className='flex-1'
                        />
                        <Button
                          type='button'
                          variant='ghost'
                          size='icon'
                          onClick={() => {
                            const newRules = { ...currentRow.data_rules } as { [key: string]: string };
                            delete newRules[key];
                            setCurrentPermission({ ...currentRow, data_rules: newRules });
                          }}
                        >
                          <Trash2 className='h-4 w-4' />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type='button'
                      variant='outline'
                      size='sm'
                      onClick={() => {
                        const newRules = { ...currentRow.data_rules } as { [key: string]: string };
                        newRules[`key${Object.keys(newRules).length + 1}`] = "";
                        setCurrentPermission({ ...currentRow, data_rules: newRules });
                      }}
                    >
                      <Plus className='h-4 w-4 mr-2' /> Add Rule
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className='mt-6 flex justify-end gap-2'>
              <Button type='button' variant='outline' onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type='submit' disabled={isSaving}>
                {isSaving ? "Saving..." :  ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
