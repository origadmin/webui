import { Fragment } from "react";
import { ActionDialog } from "./action-dialog";
import { renderUserFields } from "./fields"; // Import the field renderer
import { useCrudTable } from "../hooks/use-crud-table";
// You would also import other specific dialogs like DeleteDialog here

export function Dialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useCrudTable();
  const className = "sm:max-w-3xl";

  return (
    <Fragment>
      {/* Example of a specific dialog, can be added later */}
      {/* {currentRow && (
        <UsersResourceDialog
          key={`user-resource-${currentRow.id}`}
          currentRow={currentRow}
          open={open === "preview"}
          onOpenChange={() => setOpen("preview")}
        />
      )} */}

      <ActionDialog
        key='add-item'
        open={open === "add"}
        onOpenChange={() => setOpen("add")}
        renderFields={renderUserFields}
        className={className}
      />

      {currentRow && (
        <ActionDialog
          key={`edit-item-${currentRow.id}`}
          open={open === "edit"}
          onOpenChange={() => {
            setOpen("edit");
            setTimeout(() => {
              setCurrentRow(null);
            }, 500);
          }}
          currentRow={currentRow}
          renderFields={renderUserFields}
          className={className}
        />
      )}

      {/* Example of a delete dialog */}
      {/* {currentRow && (
        <UsersDeleteDialog
          key={`delete-item-${currentRow.id}`}
          open={open === "delete"}
          onOpenChange={() => {
            setOpen("delete");
            setTimeout(() => {
              setCurrentRow(null);
            }, 500);
          }}
          currentRow={currentRow}
        />
      )} */}
    </Fragment>
  );
}
