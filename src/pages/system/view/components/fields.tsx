import { useForm } from "react-hook-form";
import { FormType } from "../config";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import IconPicker from "@/components/IconPicker";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { IconArrowsSort } from "@tabler/icons-react";

export const renderFields = (
  form: ReturnType<typeof useForm<FormType>>,
  onSortClick: () => void
) => (
  <div className="space-y-4">
    {/* Base Info Section */}
    <div className='space-y-2'>
      <h3 className='text-lg font-medium'>Base Info</h3>
      <Separator />
      <div className='grid grid-cols-2 gap-4 pt-2'>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., User Management" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="keyword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Keyword</FormLabel>
              <FormControl>
                <Input placeholder="e.g., user_management" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="path"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Path</FormLabel>
              <FormControl>
                <Input placeholder="e.g., /system/user" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="scope"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Scope</FormLabel>
              <FormControl>
                <Input placeholder="e.g., system" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>

    {/* Details Section */}
    <div className='space-y-2 pt-4'>
      <h3 className='text-lg font-medium'>Details</h3>
      <Separator />
      <div className='grid grid-cols-2 gap-4 pt-2'>
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="MENU">Menu</SelectItem>
                  <SelectItem value="BUTTON">Button</SelectItem>
                  <SelectItem value="PAGE">Page</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sequence"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sequence</FormLabel>
              <div className='flex'>
                <FormControl>
                  <Input
                    className='rounded-r-none focus-visible:z-10'
                    placeholder='Click button to sort'
                    value={field.value || 0}
                    readOnly
                  />
                </FormControl>
                <Button
                  type='button'
                  variant='outline'
                  onClick={onSortClick}
                  className='h-9 w-12 gap-0 px-0 rounded-l-none -ml-px focus-visible:z-10'
                  size='icon'
                >
                  <IconArrowsSort className='h-5 w-5' />
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Icon</FormLabel>
              <FormControl>
                <IconPicker value={field.value} onValueChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="A brief description of the view."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="visible"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 col-span-2">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Visible in Menu</FormLabel>
                <FormDescription>
                  This menu will be displayed in the sidebar.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  </div>
);
