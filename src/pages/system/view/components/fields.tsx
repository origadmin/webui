import React from "react";
import { useForm } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import IconPicker from "@/components/IconPicker";
import { FormType } from "../config";
import { ViewTypes } from "../constants";
import { ScopeCombobox } from "./scope-combobox";

const viewTypeOptions = [
  { value: ViewTypes.ROOT, label: "Root (Virtual Node)" },
  { value: ViewTypes.GROUP, label: "Group (Visual Grouping)" },
  { value: ViewTypes.MENU, label: "Menu (Navigation Item)" },
  { value: ViewTypes.LINK, label: "Link (External Link)" },
  { value: ViewTypes.PAGE, label: "Page (Content Container)" },
  { value: ViewTypes.BUTTON, label: "Button (Action Trigger)" },
  { value: ViewTypes.ELEMENT, label: "Element (UI Element)" },
  { value: ViewTypes.REDIRECT, label: "Redirect (Route Redirect)" },
  { value: ViewTypes.UNKNOWN, label: "Unknown (Undefined Type)" },
];

type FieldName = keyof FormType;

export const renderFields = (
  form: ReturnType<typeof useForm<FormType>>,
  isSub: boolean = false,
  currentType: FormType["type"] = ViewTypes.MENU,
  isSidebarMissing: boolean = false,
  fieldsToRender: FieldName[],
) => {
  let filteredOptions = viewTypeOptions;
  if (isSub) {
    filteredOptions = viewTypeOptions.filter((opt) => opt.value !== ViewTypes.ROOT);
  } else if (isSidebarMissing) {
    filteredOptions = viewTypeOptions.filter((opt) => opt.value === ViewTypes.ROOT);
  }

  // Explicitly type arrays as string[] to satisfy the .includes() method.
  const pathExclusionTypes: string[] = [ViewTypes.ROOT, ViewTypes.GROUP, ViewTypes.BUTTON];
  const componentInclusionTypes: string[] = [ViewTypes.MENU, ViewTypes.PAGE];
  const iconExclusionTypes: string[] = [ViewTypes.ROOT, ViewTypes.REDIRECT];

  const showPath = !pathExclusionTypes.includes(currentType);
  const showComponent = componentInclusionTypes.includes(currentType);
  const showIcon = !iconExclusionTypes.includes(currentType);
  const isScopeDisabled = currentType !== ViewTypes.ROOT && currentType !== ViewTypes.BUTTON;

  // Use Partial<Record<...>> to indicate that not all keys of FormType are present.
  const allFields: Partial<Record<FieldName, React.ReactNode>> = {
    name: (
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
    ),
    keyword: (
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
    ),
    type: (
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
              <SelectContent usePortal={false}>
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
    ),
    scope: (
      <FormField
        control={form.control}
        name='scope'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Scope</FormLabel>
            <FormControl>
              <ScopeCombobox value={field.value} onChange={field.onChange} disabled={isScopeDisabled} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    path: (
      <FormField
        control={form.control}
        name='path'
        render={({ field }) => (
          <FormItem className={`col-span-2 ${!showPath ? "hidden" : ""}`}>
            <FormLabel>{currentType === ViewTypes.LINK ? "External URL" : "Path"}</FormLabel>
            <FormControl>
              <Input placeholder={currentType === ViewTypes.LINK ? "https://..." : "/system/user"} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    component: (
      <FormField
        control={form.control}
        name='component'
        render={({ field }) => (
          <FormItem className={!showComponent ? "hidden" : ""}>
            <FormLabel>Component</FormLabel>
            <FormControl>
              <Input placeholder='e.g., /system/user' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
    icon: showIcon ? (
      <FormField
        control={form.control}
        name='icon'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Icon</FormLabel>
            <FormControl>
              <IconPicker value={field.value} onValueChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ) : null,
    sequence: (
      <FormField
        control={form.control}
        name='sequence'
        render={({ field }) => (
          <FormItem>
            <FormLabel>Sequence</FormLabel>
            <FormControl>
              <Input
                type='number'
                placeholder='0'
                min='0'
                {...field}
                onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    ),
  };

  return fieldsToRender.map((fieldName) =>
    allFields[fieldName as FieldName] ? <div key={fieldName}>{allFields[fieldName as FieldName]}</div> : null,
  );
};
