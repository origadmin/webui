import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ResourceMultiSelect } from "./resource-multi-select";
import { Trash2 } from "lucide-react";
import { FormType } from "../config";

export function ResourceActionManager() {
  const form = useFormContext<FormType>();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "actions",
  });

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h3 className='text-lg font-medium'>Action Groups</h3>
        <Button
          type='button'
          variant='outline'
          size='sm'
          onClick={() => append({ name: "", resource_ids: [] })}
        >
          Add Action Group
        </Button>
      </div>
      <Separator />

      {fields.map((field, index) => (
        <div
          key={field.id}
          className='space-y-4 rounded-md border p-4 relative'
        >
          <Button
            type='button'
            variant='ghost'
            size='icon'
            className='absolute top-2 right-2 h-6 w-6'
            onClick={() => remove(index)}
          >
            <Trash2 className='h-4 w-4 text-destructive' />
          </Button>
          <div className='grid grid-cols-1 gap-4'>
            <FormField
              control={form.control}
              name={`actions.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group Name</FormLabel>
                  <FormControl>
                    <Input placeholder='e.g., Read, Write, Delete' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`actions.${index}.resource_ids`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Associated Resources</FormLabel>
                  <FormControl>
                    <ResourceMultiSelect
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      ))}
      {fields.length === 0 && (
        <p className='text-sm text-muted-foreground text-center py-4'>
          No action groups defined. Click "Add Action Group" to get started.
        </p>
      )}
    </div>
  );
}
