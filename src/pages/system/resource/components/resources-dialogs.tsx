import { Fragment } from "react";
import { useResourceTable } from "./resources-table-provider";
import { ResourcesActionDialog } from "./resources-action-dialog";
import { ResourcesDeleteDialog } from "./resources-delete-dialog";

export function ResourcesDialogs() {
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
      />
      {parentRow && (
        <ResourcesActionDialog
          className={className}
          key={`resource-add-sub-${parentRow.id}`}
          open={open === "add-sub"}
          onOpenChange={handleOpenChange}
          parentRow={parentRow}
        />
      )}
      {currentRow && (
        <ResourcesActionDialog
          className={className}
          key={`resource-edit-${currentRow.id}`}
          open={open === "edit"}
          onOpenChange={handleOpenChange}
          currentRow={currentRow}
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
