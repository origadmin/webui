import { useState, useMemo } from "react";
import { useResourcesQuery, buildTree } from "@/api/system/resource";
import { t } from "@/utils/locale";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconArrowsSort } from "@tabler/icons-react";
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
import { RolesResourceSelect } from "./roles-resource-select";
import { RolesSequenceDialog } from "./roles-sequence-dialogs";

const formSchema = z.object({
  name: z.string().min(1, {
    message: t("Name is required"),
  }),
  keyword: z.string().min(1, { message: "Keyword is required." }),
  type: z.number().min(1, { message: "Type is required." }),
  sequence: z.number().default(1),
  description: z.string().optional(),
  status: z.number().default(1),
  is_edit: z.boolean(),
  resource_ids: z.array(z.string()).default([]),
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
          resource_ids: currentRow.resources?.map((resource) => resource.id || "") || [],
        }
      : {
          name: "",
          keyword: "",
          type: 0,
          sequence: 1,
          description: "",
          status: 1,
          is_edit,
          resource_ids: [],
        },
  });

  const { data: resources = {} } = useResourcesQuery({ page_size: 1000 });
  const treeData = useMemo(() => buildTree(resources.data), [resources.data]);

  console.log("dialog resource", resources);
  const onSubmit = (values: RoleForm) => {
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
  const [sortDialogOpen, setSortDialogOpen] = useState(false);

  const handleSortOpen = async () => {
    setSortDialogOpen(true);
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
        <DialogHeader className='text-left'>
          <DialogTitle>{is_edit ? "Edit Role" : "Add New Role"}</DialogTitle>
          <DialogDescription>
            {is_edit ? "Update the role here. " : "Create new role here. "}
            Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className='h-[26.25rem] w-full pr-4 -mr-4 py-1'>
          <Form {...form}>
            <form id='role-form' onSubmit={form.handleSubmit(onSubmit)} className='space-y-4 p-1'>
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
                  name='keyword'
                  render={({ field }) => (
                    <FormItem className='col-span-6 grid grid-cols-subgrid items-center md:p-2 gap-4 gap-y-1 space-y-0'>
                      <FormLabel className='col-span-2 text-left'>Keyword</FormLabel>
                      <FormControl>
                        <Input placeholder='Please enter a keyword' className='col-span-4' {...field} />
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
                      <FormControl>
                        <Input className='col-span-4' {...field} disabled />
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
                        <Input placeholder='Please enter description' className='col-span-4' {...field} />
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
                <Separator className='col-span-12' />
                <h2 className='col-span-12 text-lg font-medium mb-2 px-2 pt-4 text-gray-900 dark:text-gray-100'>
                  Role Permissions
                </h2>
                <FormField
                  control={form.control}
                  name='resource_ids'
                  render={({ field }) => (
                    <FormItem className='col-span-12 grid grid-cols-subgrid items-start md:p-2 gap-4 gap-y-1 space-y-0 rounded-md border'>
                      <FormControl>
                        <RolesResourceSelect value={field.value} onChange={field.onChange} resources={treeData} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </ScrollArea>
        <DialogFooter>
          <Button type='submit' form='role-form'>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
      <RolesSequenceDialog open={sortDialogOpen} onOpenChange={setSortDialogOpen} currentRow={currentRow} />
    </Dialog>
  );
}
