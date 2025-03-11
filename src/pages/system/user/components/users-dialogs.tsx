import { Fragment } from "react";
import { UsersActionDialog } from "./users-action-dialog";
import { UsersDeleteDialog } from "./users-delete-dialog";
import { UsersInviteDialog } from "./users-invite-dialog";
import { useUserTable } from "./users-table-provider";

export function UsersDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useUserTable();
  const className = "sm:max-w-3xl";

  return (
    <Fragment>
      {/*{currentRow && (*/}
      {/*  <UserResourceDialog*/}
      {/*    key={`user-resource-${currentRow.id}`}*/}
      {/*    currentRow={currentRow}*/}
      {/*    open={open === "preview"}*/}
      {/*    onOpenChange={() => setOpen("preview")}*/}
      {/*  />*/}
      {/*)}*/}
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
      )}
    </Fragment>
  );
}
