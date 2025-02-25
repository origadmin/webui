import { useState, useEffect, useMemo } from "react";
import { ResourcesSequenceDialog } from "@/pages/system/resource/components/resources-sequence-dialogs";
import { t } from "@/utils/locale";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconArrowsSort, IconPlaylistAdd, icons, IconTrash } from "@tabler/icons-react";
import { useForm, useWatch, useFieldArray } from "react-hook-form";
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

const types = ["menu", "api", "resource"] as const;
const formSchema = z
  .object({
    parent_id: z.string().optional(),
    type: z.enum(types).default("menu"),
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
    properties: z.record(z.string()).optional(),
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
  .superRefine(({ is_edit }, ctx) => {
    if (!is_edit) {
      //todo
    }
  });
type ResourceForm = z.infer<typeof formSchema>;

interface Props<T> {
  currentRow?: T;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  columns?: number;
}

export function ResourcesActionDialog({
  currentRow,
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
          type: currentRow.type as "menu" | "api" | "resource",
          endpoints: [],
          is_edit,
        }
      : {
          name: "",
          resource: "",
          path: "",
          description: "",
          sequence: 1,
          type: "menu" as "menu" | "api" | "resource",
          keyword: "",
          parent_id: "",
          status: 1,
          properties: {},
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
  // 监听 path 字段变化
  const pathValue = useWatch({ control: form.control, name: "path" });
  const [sortDialogOpen, setSortDialogOpen] = useState(false);
  // const [sortableItems, setSortableItems] = useState<API.System.Resource[]>([]);
  // const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const handleSortOpen = async () => {
    // const parentId = form.getValues("parent_id");
    // if (parentId) {
    setSortDialogOpen(true);
    // }
  };
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "endpoints",
  });

  useEffect(() => {
    if (!isKeywordTouched && pathValue) {
      // 自动生成 keyword 的逻辑
      const generatedKeyword = pathValue
        .replace(/^\//, "") // 去除开头的 /
        .replace(/\//g, ":") // 替换后续的 / 为 :
        .replace(/:+/g, ":"); // 合并多个冒号

      form.setValue("keyword", generatedKeyword);
    }
  }, [form, isKeywordTouched, pathValue]);
  const [searchQuery, setSearchQuery] = useState(""); // 添加状态管理
  const iconOptions = useMemo(() => {
    return (
      Object.keys(icons)
        // .slice(1, 25)
        .map((key) => ({
          value: key,
          Icon: icons[key as keyof typeof icons],
        }))
    );
  }, []);
  const filteredIcons = iconOptions.filter((opt) => opt.value.includes(searchQuery));
  const maxWClass = `sm:max-w-${columns * 500}px`; // 根据 columns 参数动态设置最大宽度
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
              <div className='grid grid-cols-12 mb-4 border-b border-gray-200 pb-4'>
                <h2 className='col-span-10 text-lg font-medium text-gray-900 mb-2 px-2'>Base Info</h2>
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className='col-span-4'>
                            <SelectValue placeholder='Select a type' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='menu'>Menu</SelectItem>
                          <SelectItem value='api'>API</SelectItem>
                          <SelectItem value='resource'>Resource</SelectItem>
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
                          <Select value={field.value} onValueChange={field.onChange}>
                            <SelectTrigger className='col-span-4 h-9 w-full'>
                              <div className='flex items-center gap-2'>
                                {field.value && field.value !== "" ? (
                                  <>
                                    {/*<icons[field.value] className='h-5 w-5 shrink-0' />*/}
                                    <span className='ml-2'>{field.value}</span>
                                  </>
                                ) : (
                                  <span>Select icon</span>
                                )}
                              </div>
                            </SelectTrigger>
                            <SelectContent>
                              <div className='p-2 flex flex-col h-full'>
                                <Input
                                  placeholder='Search icon...'
                                  className='p-2 mb-2'
                                  value={searchQuery}
                                  onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <div className='min-w-0 w-full space-y-2'>
                                  {filteredIcons.slice(0, 5).map(({ value, Icon }) => (
                                    <SelectItem key={value} value={value} className='items-center gap-1 h-10 px-3'>
                                      <div className='flex flex-nowarp items-center'>
                                        <Icon className='h-8 w-8 shrink-0' />
                                        <span className='px-2'>{value}</span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </div>
                                {filteredIcons.length > 5 && (
                                  <div className='text-center items-center justify-between gap-1 h-10 py-4 text-gray-300 dark:text-gray-700 no-select'>
                                    Hide More Icons
                                  </div>
                                )}
                              </div>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name='properties'
                  render={({ field }) => (
                    <FormItem className='col-span-12 items-center md:p-2 gap-x-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-12 w-24 text-left'>Properties</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder='Enter properties...'
                          className='w-full'
                          {...field}
                          value={JSON.stringify(field.value)}
                          onChange={(e) => field.onChange(JSON.parse(e.target.value))}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Separator className='col-span-12' />
                <h2 className='col-span-12 text-lg font-medium text-gray-900 mb-2 px-2 py-4'>Resource Properties</h2>
                <FormField
                  control={form.control}
                  name='endpoints'
                  render={() => (
                    <FormItem className='col-span-12 space-y-4'>
                      <div className='flex items-center justify-between'>
                        <FormLabel className='text-lg font-medium'>API Endpoints</FormLabel>
                      </div>
                      <div className='space-y-2'>
                        {fields.map((field, index) => (
                          <div key={field.id} className='flex gap-x-2 items-start'>
                            <FormField
                              control={form.control}
                              name={`endpoints.${index}.method`}
                              render={({ field }) => (
                                <FormItem className='space-y-2 flex-1'>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger className='h-8'>
                                        <SelectValue placeholder='Select method' />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {["GET", "POST", "PUT", "DELETE", "PATCH"].map((method) => (
                                        <SelectItem key={method} value={method}>
                                          {method}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={form.control}
                              name={`endpoints.${index}.path`}
                              render={({ field }) => (
                                <FormItem className='space-y-2 flex-[3]'>
                                  <FormControl>
                                    <Input className='h-8' placeholder='/api/v1/example' {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <div className='flex h-8 items-center justify-center'>
                              <Button
                                type='button'
                                variant='ghost'
                                size='icon'
                                className='text-red-500 hover:bg-red-50 dark:hover:bg-red-600 dark:text-red-300'
                                onClick={() => remove(index)}
                              >
                                <IconTrash className='h-4 w-4 translate-y-[1px]' />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className='flex items-center justify-between'>
                        <Button
                          type='button'
                          variant='outline'
                          size='sm'
                          className='h-8 border-dashed w-full text-muted-foreground/60 hover:text-primary/80 hover:border-primary/50'
                          onClick={() => append({ method: "GET", path: "" })}
                        >
                          <span className='flex items-center gap-2 mx-auto overflow-x-auto'>
                            <IconPlaylistAdd className='h-8 w-8' /> Add
                          </span>
                        </Button>
                      </div>
                    </FormItem>
                  )}
                />
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
