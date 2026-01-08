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
import { ScopeCombobox } from "./scope-combobox";

// Define ViewType options based on backend enums/view.go
const viewTypeOptions = [
  { value: "T", label: "T - Root (Virtual Node)" },
  { value: "G", label: "G - Group (Visual Grouping)" },
  { value: "M", label: "M - Menu (Navigation Item)" },
  { value: "L", label: "L - Link (External Link)" },
  { value: "P", label: "P - Page (Content Container)" },
  { value: "B", label: "B - Button (Action Trigger)" },
  { value: "E", label: "E - Element (UI Element)" },
  { value: "R", label: "R - Redirect (Route Redirect)" },
  { value: "U", label: "U - Unknown (Undefined Type)" },
];

export const renderFields = (
  form: ReturnType<typeof useForm<FormType>>,
  onSortClick: () => void,
  isSub: boolean = false,
  currentType: string = "M", // Added currentType parameter
) => {
  // Filter options based on isSub
  const filteredOptions = isSub
    ? viewTypeOptions.filter((opt) => opt.value !== "T") // Sub-view cannot be Root
    : viewTypeOptions; // Root-view can be anything (default to M)

  // Determine field visibility based on Type
  const showPath = !["T", "G", "B"].includes(currentType);
  const showComponent = ["M", "P"].includes(currentType);
  const showIcon = !["T", "R"].includes(currentType);
  const showScope = true; // Scope is always relevant for layout

  return (
    <div className='space-y-4'>
      {/* Type Selection - Moved to Top */}
      <div className='space-y-2'>
        <h3 className='text-lg font-medium'>Type & Identity</h3>
        <Separator />
        <div className='grid grid-cols-2 gap-4 pt-2'>
          <FormField
            control={form.control}
            name='type'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a type' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {filteredOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
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
                  <Input placeholder='e.g., user_management' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {showScope && (
            <FormField
              control={form.control}
              name='scope'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scope</FormLabel>
                  <FormControl>
                    <ScopeCombobox value={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
      </div>

      {/* Configuration Section */}
      {(showPath || showComponent || showIcon) && (
        <div className='space-y-2 pt-4'>
          <h3 className='text-lg font-medium'>Configuration</h3>
          <Separator />
          <div className='grid grid-cols-2 gap-4 pt-2'>
            {showPath && (
              <FormField
                control={form.control}
                name='path'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{currentType === "L" ? "External URL" : "Path"}</FormLabel>
                    <FormControl>
                      <Input placeholder={currentType === "L" ? "https://..." : "/system/user"} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {showComponent && (
              <FormField
                control={form.control}
                name='component'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Component</FormLabel>
                    <FormControl>
                      <Input placeholder='e.g., /system/user' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {showIcon && (
              <FormField
                control={form.control}
                name='icon'
                render={({ field }) => (
                  <FormItem className='col-span-2'>
                    <FormLabel>Icon</FormLabel>
                    <FormControl>
                      <IconPicker value={field.value} onValueChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>
      )}

      {/* Details Section */}
      <div className='space-y-2 pt-4'>
        <h3 className='text-lg font-medium'>Details</h3>
        <Separator />
        <div className='grid grid-cols-2 gap-4 pt-2'>
          <FormField
            control={form.control}
            name='sequence'
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
            name='description'
            render={({ field }) => (
              <FormItem className='col-span-2'>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='A brief description of the view.'
                    className='resize-none'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='visible'
            render={({ field }) => (
              <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4 col-span-2'>
                <div className='space-y-0.5'>
                  <FormLabel className='text-base'>Visible in Menu</FormLabel>
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
};
