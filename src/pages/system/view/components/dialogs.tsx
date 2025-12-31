import { Fragment } from "react";
import { useViewTable } from "./views-table-provider";
import { ViewActionDialog } from "./action-dialog";
import { DeleteDialog } from "@/templates/crud-page/components/delete-dialog";
import { apiHooks, pageConfig } from "../config";

export function ViewDialogs() {
  const { open, setOpen, currentRow, setCurrentRow, parentRow, setParentRow } = useViewTable();

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setOpen(null);
      setCurrentRow(null);
      setParentRow(null);
    }
  };

  return (
    <Fragment>
      <ViewActionDialog
        key='view-add'
        open={open === "add"}
        onOpenChange={handleOpenChange}
      />
      {parentRow && (
        <ViewActionDialog
          key={`view-add-sub-${parentRow.id}`}
          open={open === "add-sub"}
          onOpenChange={handleOpenChange}
          parentRow={parentRow}
        />
      )}
      {currentRow && (
        <ViewActionDialog
          key={`view-edit-${currentRow.id}`}
          open={open === "edit"}
          onOpenChange={handleOpenChange}
          currentRow={currentRow}
        />
      )}
      {currentRow && (
        <DeleteDialog
          key={`view-delete-${currentRow.id}`}
          open={open === "delete"}
          onOpenChange={handleOpenChange}
          currentRow={currentRow}
          pageConfig={pageConfig}
          apiHooks={apiHooks}
        />
      )}
    </Fragment>
  );
}
