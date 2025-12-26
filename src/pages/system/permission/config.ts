import { z } from "zod";
import { usePermissionsQuery, usePermissionCreate, usePermissionUpdate, usePermissionDelete } from "@/api/system/permission";
import { columns as permissionColumns } from "./components/permissions-columns";
import { DataTableProps } from "@/components/DataTable";
import { t } from "@/utils/locale";

export const formSchema = z.object({
  name: z.string().min(1, {
    message: t("name.required"),
  }),
  keyword: z.string().min(1, {
    message: t("keyword.required"),
  }),
  description: z.string().optional(),
  resource_ids: z.array(z.string()).optional(),
  data_scope: z.string().optional(),
});

export type FormType = z.infer<typeof formSchema>;

export const apiHooks = {
  useQuery: usePermissionsQuery,
  useCreate: usePermissionCreate,
  useUpdate: usePermissionUpdate,
  useDelete: usePermissionDelete,
};

export const columns: DataTableProps<API.System.Permission>["columns"] = permissionColumns;

export const pageConfig = {
  title: "Permission",
  description: "Manage your permissions here.",
};
