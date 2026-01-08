import { z } from "zod";
import { columns as viewColumns } from "./components/columns";
import { useViewsQuery, useViewCreate, useViewUpdate, useViewDelete } from "@/api/system/view";
import { DataTableProps } from "@/components/DataTable";

// Zod Schema for form validation
export const formSchema = z.object({
  name: z.string().min(1, "Name is required."),
  keyword: z.string().min(1, "Keyword is required."),
  scope: z.string().nullable().optional(),
  type: z.string().default("MENU"),
  path: z.string().nullable().optional(),
  icon: z.string().nullable().optional(),
  component: z.string().nullable().optional(),
  sequence: z.number().optional().nullable().default(0).transform(val => val ?? 0),
  visible: z.boolean().default(true),
  status: z.number().default(1),
  description: z.string().nullable().optional(),
  parent_id: z.string().nullable().optional(),
  is_edit: z.boolean(),
  // Virtual field for Redirect type, will be stored in properties
  redirect_to: z.string().optional(),
  // Virtual field for Action Groups, will be stored in properties
  actions: z
    .array(
      z.object({
        name: z.string().min(1, "Action group name is required."),
        resource_ids: z.array(z.string()),
      }),
    )
    .optional(),
  // Actual backend field
  properties: z.string().optional(),
});
export type FormType = z.infer<typeof formSchema>;

export const apiHooks = {
  useQuery: useViewsQuery,
  useCreate: useViewCreate,
  useUpdate: useViewUpdate,
  useDelete: useViewDelete,
};

export const columns: DataTableProps<API.System.View>["columns"] = viewColumns;

export const pageConfig = {
  title: "View",
  description: "Manage your menu views here.",
};
