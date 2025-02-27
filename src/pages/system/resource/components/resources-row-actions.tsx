import { useResourceTable } from "@/pages/system/resource/components/resources-table-provider";
import { DataTableIconRowActions, DataTableRowActions, DataTableRowActionsProps } from "@/components/DataTable";

export const ResourceRowActions = ({ row }: { row: DataTableRowActionsProps<API.Resource>["row"] }) => {
  const { setOpen, setCurrentRow } = useResourceTable();
  return <DataTableRowActions<API.Resource> row={row} setOpen={setOpen} setCurrentRow={setCurrentRow} />;
};

export const ResourceIconRowActions = ({ row }: { row: DataTableRowActionsProps<API.Resource>["row"] }) => {
  const { setOpen, setCurrentRow, setParentRow } = useResourceTable();
  return (
    <DataTableIconRowActions<API.Resource>
      row={row}
      setOpen={setOpen}
      setCurrentRow={setCurrentRow}
      setParentRow={setParentRow}
    />
  );
};
