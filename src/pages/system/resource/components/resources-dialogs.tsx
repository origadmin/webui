import { Fragment } from "react";
import { ResourcesActionDialog } from "./resources-action-dialog";
import { ResourcesDeleteDialog } from "./resources-delete-dialog";
import { useResourceTable } from "./resources-table-provider";

export function ResourcesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow, parentRow, setParentRow } = useResourceTable();
  const className = "sm:max-w-3xl";
  return (
    <Fragment>
      <ResourcesActionDialog
        className={className}
        key='resource-add'
        open={open === "add"}
        onOpenChange={() => {
          setOpen("add");
          setTimeout(() => {
            setCurrentRow(null);
            setParentRow(null);
          }, 500);
        }}
        parentRow={parentRow || undefined}
      />
      {currentRow && (
        <>
          <ResourcesActionDialog
            className={className}
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
