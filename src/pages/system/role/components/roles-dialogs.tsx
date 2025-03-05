import { Fragment } from "react";
import { PermissionDialog } from "@/pages/system/components/permission-dialog";
import { RolesActionDialog } from "./roles-action-dialog";
import { RolesDeleteDialog } from "./roles-delete-dialog";
import { useRoleTable } from "./roles-table-provider";

export function RolesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useRoleTable();
  const className = "sm:max-w-3xl";
  return (
    <Fragment>
      <RolesActionDialog
        className={className}
        key='role-add'
        open={open === "add"}
        onOpenChange={() => setOpen("add")}
      />
      <PermissionDialog open={open === "edit-permission"} onOpenChange={() => setOpen("edit-permission")} />
      {currentRow && (
        <RolesActionDialog
          key={`role-edit-${currentRow.id}`}
          className={className}
          open={open === "edit"}
          onOpenChange={() => {
            setOpen("edit");
            setTimeout(() => {
              setCurrentRow(null);
            }, 500);
          }}
          currentRow={currentRow}
        />
      )}
      {currentRow && (
        <RolesDeleteDialog
          key={`role-delete-${currentRow.id}`}
          open={open === "delete"}
          onOpenChange={() => {
            setOpen("delete");
            setTimeout(() => {
              setCurrentRow(null);
            }, 500);
          }}
          currentRow={currentRow}
        />
      )}
    </Fragment>
  );
}
