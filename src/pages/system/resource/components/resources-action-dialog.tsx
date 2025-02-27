import { useState, useEffect } from "react";
import { ResourcesSequenceDialog } from "@/pages/system/resource/components/resources-sequence-dialogs";
import { t } from "@/utils/locale";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconArrowsSort } from "@tabler/icons-react";
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
    resource: z.string().min(1, { message: "Resource is required." }),
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
  .superRefine(({ is_edit }) => {
    if (!is_edit) {
      //todo
    }
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
  // const is_sub = !!parentRow;
  const form = useForm<ResourceForm>({
    resolver: zodResolver(formSchema),
    mode: "onSubmit",
    defaultValues: is_edit
      ? {
          ...currentRow,
          endpoints: [],
          is_edit,
        }
      : {
          name: "",
          resource: "",
          description: "",
          sequence: 1,
          type: "M",
          parent_id: parentRow?.id,
          path: parentRow?.path,
          keyword: parentRow?.keyword,
          status: 1,
          stringProperties: "{}",
          endpoints: [],
          is_edit,
        },
  });
  const [isKeywordTouched, setIsKeywordTouched] = useState(false);

  const onSubmit = (values: ResourceForm) => {
    form.reset();
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
  // Listen for changes in the path field
  const pathValue = useWatch({ control: form.control, name: "path" });
  const [sortDialogOpen, setSortDialogOpen] = useState(false);

  const handleSortOpen = async () => {
    // const parentId = form.getValues("parent_id");
    // if (parentId) {
    setSortDialogOpen(true);
    // }
  };
  // const { fields, append, remove } = useFieldArray({
  //   control: form.control,
  //   name: "endpoints",
  // });

  useEffect(() => {
    if (!isKeywordTouched && pathValue) {
      // The logic that automatically generates keywords based on the path
      const generatedKeyword = pathValue
        .replace(/^\//, "") // Remove the beginning /
        .replace(/\//g, ":") // Replace the subsequent / as :
        .replace(/:+/g, ":"); // Merge multiple colons

      form.setValue("keyword", generatedKeyword);
    }
  }, [form, isKeywordTouched, pathValue]);

  const maxWClass = `sm:max-w-${columns * 500}px`; // Dynamically sets the maximum width based on the columns parameter
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
            <form id='resource-form' onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 p-1'>
              <div className='grid grid-cols-12 mb-4 border-b border-gray-200 dark:border-gray-700 pb-4'>
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
                          onCheckedChange={(status) => field.onChange(status ? 1 : 0)}
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
                      <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                        <FormControl>
                          <SelectTrigger className='col-span-4'>
                            <SelectValue placeholder='Select a type' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {["M", "A", "-"].map((value, index) => (
                            <SelectItem key={index} value={value.toString()}>
                              {resourceTypeValues.get(value.toString()) || "Emtpy"}
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
                            setIsKeywordTouched(true); // 标记用户已手动修改
                            field.onChange(e); // 保持默认的字段更新
                          }}
                        />
                      </FormControl>
                      <FormMessage className='col-span-4 col-start-3' />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem className='col-span-6 grid grid-cols-subgrid items-center md:p-2 gap-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-left'>Description</FormLabel>
                      <FormControl>
                        <Input placeholder='' className='col-span-4' {...field} />
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
                      <div className='col-span-4 flex'>
                        <FormControl>
                          <Input
                            className='rounded-r-none border-r-0 focus-visible:ring-0 focus-visible:ring-offset-0'
                            placeholder=''
                            {...field}
                          />
                        </FormControl>
                        <Button
                          type='button'
                          variant='outline'
                          onClick={handleSortOpen}
                          className='h-9 w-12 gap-0 px-0 rounded-l-none'
                          size='icon'
                        >
                          <IconArrowsSort className='h-5 w-5' />
                        </Button>
                      </div>
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
                {/*<Separator className='col-span-12' />*/}
                {/*<h2 className='col-span-12 text-lg font-medium mb-2 px-2 py-4 text-gray-900 dark:text-gray-100'>*/}
                {/*  Resource Properties*/}
                {/*</h2>*/}
                {/*<FormField*/}
                {/*  control={form.control}*/}
                {/*  name='endpoints'*/}
                {/*  render={() => (*/}
                {/*    <FormItem className='col-span-12 space-y-4'>*/}
                {/*      /!*<div className='flex items-center justify-between'>*!/*/}
                {/*      /!*  <FormLabel className='text-lg font-medium'></FormLabel>*!/*/}
                {/*      /!*</div>*!/*/}
                {/*      <div className='space-y-2'>*/}
                {/*        {fields.map((field, index) => (*/}
                {/*          <div key={field.id} className='flex gap-x-2 items-start'>*/}
                {/*            <FormField*/}
                {/*              control={form.control}*/}
                {/*              name={`endpoints.${index}.method`}*/}
                {/*              render={({ field }) => (*/}
                {/*                <FormItem className='space-y-2 flex-1'>*/}
                {/*                  <Select onValueChange={field.onChange} value={field.value}>*/}
                {/*                    <FormControl>*/}
                {/*                      <SelectTrigger className='h-8'>*/}
                {/*                        <SelectValue placeholder='Select method' />*/}
                {/*                      </SelectTrigger>*/}
                {/*                    </FormControl>*/}
                {/*                    <SelectContent>*/}
                {/*                      {["GET", "POST", "PUT", "DELETE", "PATCH"].map((method) => (*/}
                {/*                        <SelectItem key={method} value={method}>*/}
                {/*                          {method}*/}
                {/*                        </SelectItem>*/}
                {/*                      ))}*/}
                {/*                    </SelectContent>*/}
                {/*                  </Select>*/}
                {/*                </FormItem>*/}
                {/*              )}*/}
                {/*            />*/}
                {/*            <FormField*/}
                {/*              control={form.control}*/}
                {/*              name={`endpoints.${index}.path`}*/}
                {/*              render={({ field }) => (*/}
                {/*                <FormItem className='space-y-2 flex-[3]'>*/}
                {/*                  <FormControl>*/}
                {/*                    <Input className='h-8' placeholder='/api/v1/example' {...field} />*/}
                {/*                  </FormControl>*/}
                {/*                  <FormMessage />*/}
                {/*                </FormItem>*/}
                {/*              )}*/}
                {/*            />*/}
                {/*            <div className='flex h-8 items-center justify-center'>*/}
                {/*              <Button*/}
                {/*                type='button'*/}
                {/*                variant='ghost'*/}
                {/*                size='icon'*/}
                {/*                className='text-red-500 hover:bg-red-50 dark:hover:bg-red-600 dark:text-red-300'*/}
                {/*                onClick={() => remove(index)}*/}
                {/*              >*/}
                {/*                <IconTrash className='h-4 w-4 translate-y-[1px]' />*/}
                {/*              </Button>*/}
                {/*            </div>*/}
                {/*          </div>*/}
                {/*        ))}*/}
                {/*      </div>*/}
                {/*      <div className='flex items-center justify-between'>*/}
                {/*        <Button*/}
                {/*          type='button'*/}
                {/*          variant='outline'*/}
                {/*          size='sm'*/}
                {/*          className='h-8 border-dashed w-full text-muted-foreground/60 hover:text-primary/80 hover:border-primary/50'*/}
                {/*          onClick={() => append({ method: "GET", path: "" })}*/}
                {/*        >*/}
                {/*          <span className='flex items-center gap-2 mx-auto overflow-x-auto'>*/}
                {/*            <IconPlaylistAdd className='h-8 w-8' /> Add*/}
                {/*          </span>*/}
                {/*        </Button>*/}
                {/*      </div>*/}
                {/*    </FormItem>*/}
                {/*  )}*/}
                {/*/>*/}
              </div>
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          <Button type='submit' form='resource-form'>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
      <ResourcesSequenceDialog open={sortDialogOpen} onOpenChange={setSortDialogOpen} currentRow={currentRow} />
    </Dialog>
  );
}
