import { useForm } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { FormType } from "../config";

// This function renders the specific form fields for the User module.
// It can be replaced with a different function for other modules.
export const renderUserFields = (form: ReturnType<typeof useForm<FormType>>) => {
  return (
    <>
      <div className='grid grid-cols-12 mb-4 border-b border-gray-200 dark:border-gray-700 pb-4'>
        <h2 className='col-span-12 text-lg font-medium text-gray-900 dark:text-gray-100 mb-2 px-2'>Base Info</h2>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem className='col-span-6 grid grid-cols-subgrid items-center md:p-2 gap-4 gap-y-1 space-y-0'>
              <FormLabel className='col-span-2 text-left'>Name</FormLabel>
              <FormControl>
                <Input placeholder='Item Name' className='col-span-4' {...field} />
              </FormControl>
              <FormMessage className='col-span-4' />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='status'
          render={({ field }) => (
            <FormItem className='col-span-6 grid grid-cols-subgrid items-center md:p-2 gap-x-4 gap-y-1 space-y-0'>
              <FormLabel className='col-span-2 text-left'>Status</FormLabel>
              <FormControl>
                <Switch checked={field.value === 1} onCheckedChange={(checked) => field.onChange(checked ? 1 : 2)} />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </>
  );
};
