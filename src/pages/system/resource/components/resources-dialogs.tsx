import { Fragment } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { PaginatedQueryResult } from "@/hooks/use-paginated-query";
import { ResourcesActionDialog } from "./resources-action-dialog";
import { ResourcesDeleteDialog } from "./resources-delete-dialog";
import { useResourceTable } from "./resources-table-provider";

interface ResourcesDialogsProps {
  queryResult: UseQueryResult<PaginatedQueryResult<API.System.Resource>>;
}

export function ResourcesDialogs({ queryResult }: ResourcesDialogsProps) {
  const { open, setOpen, currentRow, setCurrentRow, parentRow, setParentRow } = useResourceTable();
  const className = "sm:max-w-3xl";

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setOpen(null);
      setCurrentRow(null);
      setParentRow(null);
    }
  };

  return (
    <Fragment>
      <ResourcesActionDialog
        className={className}
        key='resource-add'
        open={open === "add"}
        onOpenChange={handleOpenChange}
        queryResult={queryResult}
      />
      {parentRow && (
        <ResourcesActionDialog
          className={className}
          key={`resource-add-sub-${parentRow.id}`}
          open={open === "add-sub"}
          onOpenChange={handleOpenChange}
          parentRow={parentRow}
          queryResult={queryResult}
        />
      )}
      {currentRow && (
        <ResourcesActionDialog
          className={className}
          key={`resource-edit-${currentRow.id}`}
          open={open === "edit"}
          onOpenChange={handleOpenChange}
          currentRow={currentRow}
          queryResult={queryResult}
        />
      )}
      {currentRow && (
        <ResourcesDeleteDialog
          key={`resource-delete-${currentRow.id}`}
          open={open === "delete"}
          onOpenChange={handleOpenChange}
          currentRow={currentRow}
        />
      )}
    </Fragment>
  );
}
