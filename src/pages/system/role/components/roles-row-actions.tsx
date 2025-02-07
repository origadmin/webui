import { useRoleTable } from "@/pages/system/role/components/roles-table-provider";
import { DataTableIconRowActions, DataTableRowActions, DataTableRowActionsProps } from "@/components/DataTable";

export const RoleRowActions = ({ row }: { row: DataTableRowActionsProps<API.Role>["row"] }) => {
  const { setOpen, setCurrentRow } = useRoleTable();
  return <DataTableRowActions<API.Role> row={row} setOpen={setOpen} setCurrentRow={setCurrentRow} />;
};

export const RoleIconRowActions = ({ row }: { row: DataTableRowActionsProps<API.Role>["row"] }) => {
  const { setOpen, setCurrentRow } = useRoleTable();
  return <DataTableIconRowActions<API.Role> row={row} setOpen={setOpen} setCurrentRow={setCurrentRow} />;
};
