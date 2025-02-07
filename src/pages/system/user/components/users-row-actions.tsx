import { useUserTable } from "@/pages/system/user/components/users-table-provider";
import { DataTableIconRowActions, DataTableRowActions, DataTableRowActionsProps } from "@/components/DataTable";

export const UserRowActions = ({ row }: { row: DataTableRowActionsProps<API.System.User>["row"] }) => {
  const { setOpen, setCurrentRow } = useUserTable();
  return <DataTableRowActions<API.System.User> row={row} setOpen={setOpen} setCurrentRow={setCurrentRow} />;
};

export const UserIconRowActions = ({ row }: { row: DataTableRowActionsProps<API.System.User>["row"] }) => {
  const { setOpen, setCurrentRow } = useUserTable();
  return <DataTableIconRowActions<API.System.User> row={row} setOpen={setOpen} setCurrentRow={setCurrentRow} />;
};
