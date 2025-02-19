import { Fragment } from "react";
import { ResourcesActionDialog } from "./resources-action-dialog";
import { ResourcesDeleteDialog } from "./resources-delete-dialog";
import { ResourcesInviteDialog } from "./resources-invite-dialog";
import { useResourceTable } from "./resources-table-provider";

export function ResourcesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useResourceTable();
  return (
    <Fragment>
      <ResourcesActionDialog key='resource-add' open={open === "add"} onOpenChange={() => setOpen("add")} />
      <ResourcesInviteDialog key='resource-invite' open={open === "invite"} onOpenChange={() => setOpen("invite")} />

      {currentRow && (
        <>
          <ResourcesActionDialog
            key={`resource-edit-${currentRow.id}`}
            open={open === "edit"}
            onOpenChange={() => {
              setOpen("edit");
              setTimeout(() => {
                setCurrentRow(null);
              }, 500);
            }}
            currentRow={currentRow}
          />
          <ResourcesDeleteDialog
            key={`resource-delete-${currentRow.id}`}
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
