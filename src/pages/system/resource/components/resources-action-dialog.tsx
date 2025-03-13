import { useState } from "react";
import { usePermissionCreate } from "@/api/system/permission";
import { useResourceCreate, useResourceUpdate } from "@/api/system/resource";
import { ResourcesSequenceDialog } from "@/pages/system/resource/components/resources-sequence-dialogs";
import { t } from "@/utils/locale";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconArrowsSort } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
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
    type: z.string().default("M"),
    name: z.string().min(1, {
      message: t("name.required"),
    }),
    keyword: z.string().min(1, {
      message: t("keyword.required"),
    }),
    path: z.string().optional(),
    description: z.string().optional(),
    sequence: z.number().default(1),
    icon: z.string().optional(),
    status: z.number().default(1),
    permissions: z
      .array(
        z.object({
          id: z.string().optional(),
        }),
      )
      .optional(),
    stringProperties: z.string().optional(),
    endpoints: z
      .array(
        z.object({
          method: z.string(),
          path: z.string(),
        }),
      )
      .optional(),
    is_edit: z.boolean(),
  })
  .superRefine((v) => {
    console.log("superRefine", v);
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
  console.log("action", is_edit, currentRow, parentRow);
  const form = useForm<ResourceForm>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: is_edit
      ? {
          ...currentRow,
          endpoints: [],
          permissions: currentRow?.permissions || [],
          is_edit,
        }
      : {
          name: "",
          description: "",
          sequence: 1,
          type: "M",
          parent_id: parentRow?.id,
          path: parentRow?.path,
          keyword: parentRow?.keyword,
          status: 1,
          stringProperties: "{}",
          endpoints: [],
          permissions: [],
          is_edit,
        },
  });

  const id = currentRow?.id || "";
  const queryClient = useQueryClient();
  const { mutate: createResource, isPending: isCreatePending } = useResourceCreate(queryClient);
  const { mutate: updateResource, isPending: isUpdatePending } = useResourceUpdate(queryClient, id);
  const { mutateAsync: createPermissionAsync } = usePermissionCreate(queryClient);

  const handleAddPermission = async (values: ResourceForm) => {
    try {
      // await createPermissionAsync({
      //   name: values.name,
      //   keyword: values.keyword,
      //   description: values.description,
      //   data_scope: "self",
      //   data_rules: {},
      // });
      const response = await createPermissionAsync({
        name: values.name,
        keyword: values.keyword,
        description: values.description,
        data_scope: "self",
        data_rules: {},
      });
      return response.data;
    } catch (error) {
      console.error("Error adding todo:", error);
      throw error;
    }
  };
  const onSubmit = async (values: ResourceForm) => {
    try {
      form.reset();

      if (!is_edit) {
        const permission = await handleAddPermission(values);
        if (!permission || !permission.id) {
          toast({
            title: "权限创建失败",
            description: "无法创建关联权限，请检查权限数据",
            variant: "destructive",
          });
          return;
        }
        console.log("values", values, "data", permission);
        if (values.permissions && values.permissions.length > 0) {
          values.permissions.push(permission);
        } else {
          values.permissions = [permission];
        }
        createResource({ ...values });
      } else {
        console.log("update values", values);
        updateResource({ ...values });
      }
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(values, null, 2)}</code>
          </pre>
        ),
      });
    } catch (error) {
      console.error("提交失败:", error);
      toast({
        title: "操作失败",
        description: error instanceof Error ? error.message : "未知错误",
        variant: "destructive",
      });
    } finally {
      onOpenChange(false);
    }
  };
  // Listen for changes in the path field
  // const pathValue = useWatch({ control: form.control, name: "path" });
  // const [isAutoGenerate, setIsAutoGenerate] = useState(true);
  const [sortDialogOpen, setSortDialogOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const handleSortOpen = async () => {
    setSortDialogOpen(true);
  };

  // todo(auto generate keyword)
  // useEffect(() => {
  //   if (!isAutoGenerate) return;
  //   const keyword = form.getValues("keyword");
  //   // The logic that automatically generates keywords based on the path
  //   const value = Strings.autoGenKeyword(pathValue || "");
  //   console.log("pathValue", value, keyword, isAutoGenerate);
  //   if (keyword === value) {
  //     const generatedKeyword = Strings.autoGenKeyword(value);
  //     form.setValue("keyword", generatedKeyword);
  //   }
  // }, [form, isAutoGenerate, pathValue]);

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
        <DialogHeader className='text-left'>
          <DialogTitle>{is_edit ? "Edit Resource" : "Add New Resource"}</DialogTitle>
          <DialogDescription>
            {is_edit ? "Update the resource here. " : "Create new resource here. "}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
          <Form {...form}>
            <form
              id='resource-form'
              onSubmit={form.handleSubmit(onSubmit, (errors) => console.error("验证失败:", errors))}
              className='space-y-4 p-1'
            >
              <div className='grid grid-cols-12 mb-4 border-gray-200 dark:border-gray-700 pb-4'>
                <h2 className='col-span-10 text-lg font-medium mb-2 px-2 text-gray-900 dark:text-gray-100'>
                  Base Info
                </h2>
                <FormField
                  control={form.control}
                  name='status'
                  render={({ field }) => (
                    <FormItem className='col-span-2 grid grid-cols-subgrid items-center justify-end md:p-2 gap-x-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-1 w-24 text-left'>Status</FormLabel>
                      <FormControl>
                        <Switch
                          className='col-span-1'
                          checked={field.value === 1}
                          onCheckedChange={(status) => field.onChange(status ? 1 : 2)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='parent_id'
                  render={({ field }) => (
                    <FormItem className='col-span-6 grid grid-cols-subgrid items-center md:p-2 gap-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-left'>Parent</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className='col-span-4 disabled:bg-gray-100 dark:disabled:bg-gray-700'
                          autoComplete='off'
                          disabled={true}
                        />
                      </FormControl>
                      <FormMessage className='col-span-4 col-start-3' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='type'
                  render={({ field }) => (
                    <FormItem className='col-span-6 grid grid-cols-subgrid items-center md:p-2 gap-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-left'>Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className='col-span-4'>
                            <SelectValue placeholder='Select a type' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Array.from(resourceTypeValues).map(([key, value]) => (
                            <SelectItem key={key} value={key}>
                              {value?.trim() || `Unknown(${key})`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem className='col-span-6 grid grid-cols-subgrid items-center md:p-2 gap-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-left'>Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Please enter a name' className='col-span-4' {...field} />
                      </FormControl>
                      <FormMessage className='col-span-4 col-start-3' />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='path'
                  render={({ field }) => (
                    <FormItem className='col-span-6 grid grid-cols-subgrid items-center md:p-2 gap-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-left'>Path</FormLabel>
                      <FormControl>
                        <Input placeholder='' className='col-span-4' {...field} />
                      </FormControl>
                      <FormMessage className='col-span-4 col-start-3' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='keyword'
                  render={({ field }) => (
                    <FormItem className='col-span-6 grid grid-cols-subgrid items-center md:p-2 gap-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-left'>Keyword</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Empty if use auto generate'
                          className='col-span-4'
                          {...field}
                          onChange={(e) => {
                            // if (pathValue) {
                            //   setIsAutoGenerate(field.value === Strings.autoGenKeyword(pathValue));
                            // }
                            field.onChange(e);
                          }}
                        />
                      </FormControl>
                      <FormMessage className='col-span-4 col-start-3' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='sequence'
                  render={({ field }) => (
                    <FormItem className='col-span-6 grid grid-cols-subgrid items-center md:p-2 gap-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-left'>Sequence</FormLabel>
                      <FormControl>
                        <div className='col-span-4 flex'>
                          <Input
                            {...field}
                            className='rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0'
                            placeholder='Please enter a sequence'
                            type='number'
                            value={field.value}
                            onChange={(e) => {
                              const value = e.target.value;
                              const parsedValue = Number(value);
                              if (!isNaN(parsedValue)) {
                                field.onChange(parsedValue);
                              }
                            }}
                          />
                          <Button
                            type='button'
                            variant='outline'
                            onClick={handleSortOpen}
                            className='rounded-l-none h-9 w-12 gap-0 px-0'
                            size='icon'
                          >
                            <IconArrowsSort className='h-5 w-5' />
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage className='col-span-4 col-start-3' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='icon'
                  render={({ field }) => {
                    return (
                      <FormItem className='col-span-6 grid grid-cols-subgrid items-center md:p-2 gap-x-4 gap-y-1 space-y-0'>
                        <FormLabel className='col-span-2 w-24 text-left'>Icon</FormLabel>
                        <FormControl>
                          <div className='col-span-4'>
                            <IconPicker value={field.value} onValueChange={field.onChange} />
                          </div>
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem className='col-span-12 grid grid-cols-subgrid items-center md:p-2 gap-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-left'>Description</FormLabel>
                      <FormControl>
                        <Input placeholder='' className='col-span-10' {...field} />
                      </FormControl>
                      <FormMessage className='col-span-10 col-start-3' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='stringProperties'
                  render={({ field }) => (
                    <FormItem className='col-span-12 items-center md:p-2 gap-x-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-12 w-24 text-left'>Properties</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Enter properties...'
                          className='w-full'
                          {...field}
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className='col-span-12 pt-4'>
                  <Separator />
                </div>
                <div className='col-span-12 items-center grid grid-cols-subgrid pt-4 overflow-x-hidden'>
                  <h2 className='col-span-11 items-center text-lg font-medium mb-2 px-2 text-gray-900 dark:text-gray-100'>
                    Permission Settings
                  </h2>
                  <div className='col-span-1 items-center justify-end md:p-2 gap-x-4 gap-y-1 space-y-0'>
                    <Switch checked={expanded} onCheckedChange={setExpanded} />
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </ScrollArea>
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
