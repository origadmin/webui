import { useUserTable } from "@/pages/system/users/components/users-table-provider";
import { DataTableIconRowActions, DataTableRowActions, DataTableRowActionsProps } from "@/components/DataTable";

export const UserRowActions = ({ row }: { row: DataTableRowActionsProps<API.User>["row"] }) => {
  const { setOpen, setCurrentRow } = useUserTable();
  return <DataTableRowActions<API.User> row={row} setOpen={setOpen} setCurrentRow={setCurrentRow} />;
};

export const UserIconRowActions = ({ row }: { row: DataTableRowActionsProps<API.User>["row"] }) => {
  const { setOpen, setCurrentRow } = useUserTable();
  return <DataTableIconRowActions<API.User> row={row} setOpen={setOpen} setCurrentRow={setCurrentRow} />;
};
