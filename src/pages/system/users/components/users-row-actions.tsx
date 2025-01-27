import { useUserTable } from "@/pages/system/users/components/users-table-provider";
import { RowActions, RowActionsProps } from "@/components/DataTable/row-actions";

export const UserRowActions = ({ row }: { row: RowActionsProps<API.User>["row"] }) => {
  const { setOpen, setCurrentRow } = useUserTable();
  return <RowActions<API.User> row={row} setOpen={setOpen} setCurrentRow={setCurrentRow} />;
};
