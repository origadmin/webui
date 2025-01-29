import { Fragment } from "react";
import { UsersActionDialog } from "./users-action-dialog";
import { UsersDeleteDialog } from "./users-delete-dialog";
import { UsersInviteDialog } from "./users-invite-dialog";
import { useUserTable } from "./users-table-provider";

export function UsersDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useUserTable();
  return (
    <Fragment>
      <UsersActionDialog key='user-add' open={open === "add"} onOpenChange={() => setOpen("add")} />
      <UsersInviteDialog key='user-invite' open={open === "invite"} onOpenChange={() => setOpen("invite")} />

      {currentRow && (
        <>
          <UsersActionDialog
            key={`user-edit-${currentRow.id}`}
            open={open === "edit"}
            onOpenChange={() => {
              setOpen("edit");
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
            currentRow={currentRow}
          />
          <UsersDeleteDialog
            key={`user-delete-${currentRow.id}`}
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
