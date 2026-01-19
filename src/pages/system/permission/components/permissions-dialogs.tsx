import { Fragment } from "react";
import { PermissionsActionDialog } from "./permissions-action-dialog";
import { PermissionsDeleteDialog } from "./permissions-delete-dialog";
import { usePermissionTable } from "./permissions-table-provider";

export function PermissionsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow, setParentRow } = usePermissionTable();
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
      <PermissionsActionDialog
        className={className}
        key='permission-add'
        open={open === "add"}
        onOpenChange={handleOpenChange}
      />
      {currentRow && (
        <PermissionsActionDialog
          className={className}
          key={`permission-edit-${currentRow.id}`}
          open={open === "edit"}
          onOpenChange={handleOpenChange}
          currentRow={currentRow}
        />
      )}
      {currentRow && (
        <PermissionsDeleteDialog
          key={`permission-delete-${currentRow.id}`}
          open={open === "delete"}
          onOpenChange={handleOpenChange}
          currentRow={currentRow}
        />
      )}
    </Fragment>
  );
}
