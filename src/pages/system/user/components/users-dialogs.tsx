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

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setOpen(null);
      // Delay clearing currentRow to allow the dialog close animation to finish
      setTimeout(() => {
        setCurrentRow(null);
      }, 200);
    }
  };

  return (
    <Fragment>
      {currentRow && (
        <UsersResourceDialog
          key={`user-resource-${currentRow.id}`}
          currentRow={currentRow}
          open={open === "preview"}
          onOpenChange={handleOpenChange}
        />
      )}
      <UsersActionDialog className={className} key='user-add' open={open === "add"} onOpenChange={handleOpenChange} />
      <UsersInviteDialog
        className={className}
        key='user-invite'
        open={open === "invite"}
        onOpenChange={handleOpenChange}
      />

      {currentRow && (
        <UsersActionDialog
          className={className}
          key={`user-edit-${currentRow.id}`}
          open={open === "edit"}
          onOpenChange={handleOpenChange}
          currentRow={currentRow}
        />
      )}
      {currentRow && (
        <UsersDeleteDialog
          key={`user-delete-${currentRow.id}`}
          open={open === "delete"}
          onOpenChange={handleOpenChange}
          currentRow={currentRow}
        />
      )}
      {currentRow && (
        <UsersResetPasswordDialog
          key={`user-reset-password-${currentRow.id}`}
          open={open === "resetPassword"}
          onOpenChange={handleOpenChange}
          user={currentRow}
        />
      )}
    </Fragment>
  );
}
