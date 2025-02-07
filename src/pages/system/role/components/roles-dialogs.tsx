import { Fragment } from "react";
import { RolesActionDialog } from "./roles-action-dialog";
import { RolesDeleteDialog } from "./roles-delete-dialog";
import { RolesInviteDialog } from "./roles-invite-dialog";
import { useRoleTable } from "./roles-table-provider";

export function RolesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useRoleTable();
  return (
    <Fragment>
      <RolesActionDialog key='role-add' open={open === "add"} onOpenChange={() => setOpen("add")} />
      <RolesInviteDialog key='role-invite' open={open === "invite"} onOpenChange={() => setOpen("invite")} />

      {currentRow && (
        <>
          <RolesActionDialog
            key={`role-edit-${currentRow.id}`}
            open={open === "edit"}
            onOpenChange={() => {
              setOpen("edit");
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
            currentRow={currentRow}
          />
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
        </>
      )}
    </Fragment>
  );
}
