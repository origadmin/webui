import { useState, useEffect } from "react";
import { ResourcesSequenceDialog } from "@/pages/system/resource/components/resources-sequence-dialogs";
import { t } from "@/utils/locale";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
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
import { Switch } from "@/components/ui/switch";

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
    status: z.number().default(1),
    resource: z.string().min(1, { message: "Resource is required." }),
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
                <FormField
                  control={form.control}
                  name='parent_id'
                  render={({ field }) => (
                    <FormItem className='col-span-6 grid grid-cols-subgrid items-center md:p-2 gap-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-left'>Parent</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className='col-span-4 disabled:bg-gray-100'
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
                          className='h-9 w-12 gap-0 px-0 rounded-l-none border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                        >
                          Sort
                        </Button>
                      </div>
                      <FormMessage className='col-span-4 col-start-3' />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='status'
                  render={({ field }) => (
                    <FormItem className='col-span-2 grid grid-cols-subgrid items-center md:p-2 gap-x-4 gap-y-1 space-y-0'>
                      <FormLabel className='w-24 text-left'>状态</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value === 1}
                          onCheckedChange={(status) => field.onChange(status ? 1 : 0)}
                        />
                      </FormControl>
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
