import { useViewsQuery, useViewQuery, useViewCreate, useViewUpdate, useViewDelete } from "@/api/system/view";
import { z } from "zod";
import { DataTableProps } from "@/components/DataTable";
import { columns as viewColumns } from "./components/columns";
import { ViewTypes } from "./constants";

// Zod Schema for form validation
export const formSchema = z.object({
  name: z.string().min(1, "Name is required."),
  keyword: z.string().min(1, "Keyword is required."),
  scope: z.string().optional(),
  type: z.enum(Object.values(ViewTypes) as [string, ...string[]]).default(ViewTypes.MENU),
  path: z.string().optional(),
  icon: z.string().optional(),
  component: z.string().optional(),
  sequence: z.coerce.number().min(0, "Sequence cannot be negative.").default(0),
  status: z.number().default(1),
  description: z.string().optional(),
  parent_id: z.string().optional(),
  is_edit: z.boolean(),

  // This field is now a direct part of the view's data model
  resource_ids: z.array(z.string()).optional(),

  // Properties can still be used for other metadata
  properties: z.string().optional(),
});
export type FormType = z.infer<typeof formSchema>;

export const apiHooks = {
  useQuery: useViewsQuery,
  useViewQuery: useViewQuery, // Add the missing hook
  useCreate: useViewCreate,
  useUpdate: useViewUpdate,
  useDelete: useViewDelete,
};

export const columns: DataTableProps<API.System.View>["columns"] = viewColumns;

export const pageConfig = {
  title: "View",
  description: "Manage your menu views here.",
};
