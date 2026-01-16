import { Fragment } from "react";
import { UsersActionDialog } from "./users-action-dialog";
import { UsersDeleteDialog } from "./users-delete-dialog";
import { UsersInviteDialog } from "./users-invite-dialog";
import { UsersResetPasswordDialog } from "./users-reset-password-dialog";
import { UsersResourceDialog } from "./users-resource-dialog";
import { useUserTable } from "./users-table-provider";

export function UsersDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useUserTable();
  const className = "sm:max-w-3xl";

  const handleClose = (dialogType: string) => {
    setOpen(dialogType);
    setTimeout(() => {
      setCurrentRow(null);
    }, 500);
  };

  return (
    <Fragment>
      {currentRow && (
        <UsersResourceDialog
          key={`user-resource-${currentRow.id}`}
          currentRow={currentRow}
          open={open === "preview"}
          onOpenChange={() => setOpen("preview")}
        />
      )}
      <UsersActionDialog
        className={className}
        key='user-add'
        open={open === "add"}
        onOpenChange={() => setOpen("add")}
      />
      <UsersInviteDialog
        className={className}
        key='user-invite'
        open={open === "invite"}
        onOpenChange={() => setOpen("invite")}
      />

      {currentRow && (
        <UsersActionDialog
          className={className}
          key={`user-edit-${currentRow.id}`}
          open={open === "edit"}
          onOpenChange={() => handleClose("edit")}
          currentRow={currentRow}
        />
      )}
      {currentRow && (
        <UsersDeleteDialog
          key={`user-delete-${currentRow.id}`}
          open={open === "delete"}
          onOpenChange={() => handleClose("delete")}
          currentRow={currentRow}
        />
      )}
      {currentRow && (
        <UsersResetPasswordDialog
          key={`user-reset-password-${currentRow.id}`}
          open={open === "resetPassword"}
          onOpenChange={() => handleClose("resetPassword")}
          user={currentRow}
        />
      )}
    </Fragment>
  );
}
