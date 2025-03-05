import { Fragment } from "react";
import { PermissionDialog } from "@/pages/system/components/permission-dialog";
import { PermissionsActionDialog } from "./permissions-action-dialog";
import { PermissionsDeleteDialog } from "./permissions-delete-dialog";
import { usePermissionTable } from "./permissions-table-provider";

export function PermissionsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow, parentRow, setParentRow } = usePermissionTable();
  const className = "sm:max-w-3xl";
  console.log("currentRow", currentRow, "parentRow", parentRow);

  return (
    <Fragment>
      <PermissionsActionDialog
        className={className}
        key='permission-add'
        open={open === "add"}
        onOpenChange={() => {
          setOpen("add");
          setTimeout(() => {
            setCurrentRow(null);
            setParentRow(null);
          }, 500);
        }}
      />
      <PermissionDialog open={open === "edit-permission"} onOpenChange={() => setOpen("edit-permission")} />
      {parentRow && (
        <PermissionsActionDialog
          className={className}
          key={`permission-add-${parentRow.id}`}
          open={open === "add-sub"}
          onOpenChange={() => {
            setOpen("add-sub");
            setTimeout(() => {
              setCurrentRow(null);
              setParentRow(null);
            }, 500);
          }}
          parentRow={parentRow}
        />
      )}
      {currentRow && (
        <PermissionsActionDialog
          className={className}
          key={`permission-edit-${currentRow.id}`}
          open={open === "edit"}
          onOpenChange={() => {
            setOpen("edit");
            setTimeout(() => {
              setCurrentRow(null);
              setParentRow(null);
            }, 500);
          }}
          currentRow={currentRow}
        />
      )}
      {currentRow && (
        <PermissionsDeleteDialog
          key={`permission-delete-${currentRow.id}`}
          open={open === "delete"}
          onOpenChange={() => {
            setOpen("delete");
            setTimeout(() => {
              setCurrentRow(null);
              setParentRow(null);
            }, 500);
          }}
          currentRow={currentRow}
        />
      )}
    </Fragment>
  );
}
