import { z } from "zod";
import { formSchema as viewFormSchema, useViewsQuery, useViewCreate, useViewUpdate, useViewDelete } from "@/api/system/view";
import { columns as viewColumns } from "./components/columns";
import { DataTableProps } from "@/components/DataTable";

export const formSchema = viewFormSchema;
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
