import { z } from "zod";
import { useViewsQuery, useViewCreate, useViewUpdate, useViewDelete } from "@/api/system/view";
import { columns as viewColumns } from "./components/columns";
import { DataTableProps } from "@/components/DataTable";

// Zod Schema for form validation, aligned with openapi.yaml
export const formSchema = z.object({
  name: z.string().min(1, "Name is required."),
  keyword: z.string().min(1, "Keyword is required."),
  scope: z.string().nullable().optional(),
  type: z.string().default("MENU"),
  path: z.string().nullable().optional(),
  icon: z.string().nullable().optional(),
  sequence: z.number().default(0),
  visible: z.boolean().default(true),
  status: z.number().default(1),
  description: z.string().nullable().optional(),
  parent_id: z.string().nullable().optional(),
  // 'component' is not in the openapi spec for View, so it's removed.
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
