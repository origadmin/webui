import { useForm } from "react-hook-form";
import { FormType } from "../config";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export const renderViewFields = (form: ReturnType<typeof useForm<FormType>>) => {
  return (
    <div className='grid grid-cols-2 gap-4'>
      <FormField
        control={form.control}
        name='name'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder='e.g., User Management' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='keyword'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Keyword</FormLabel>
            <FormControl>
              <Input placeholder='e.g., system:user' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='path'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Path</FormLabel>
            <FormControl>
              <Input placeholder='e.g., /system/user' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='component'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Component Path</FormLabel>
            <FormControl>
              <Input placeholder='e.g., @/pages/system/user' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name='status'
        render={({ field }) => (
          <FormItem className='flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm'>
            <FormLabel>Status</FormLabel>
            <FormControl>
              <Switch checked={field.value === 1} onCheckedChange={(checked) => field.onChange(checked ? 1 : 2)} />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
};
