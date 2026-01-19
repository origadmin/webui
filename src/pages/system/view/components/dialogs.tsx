import { Fragment } from "react";
import { DeleteDialog } from "@/templates/crud-page/components/delete-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { apiHooks, pageConfig } from "../config";
import { ViewActionDialog } from "./action-dialog";
import { useViewTable } from "./views-table-provider";

export function ViewDialogs() {
  const { open, setOpen, currentRow, setCurrentRow, parentRow, setParentRow } = useViewTable();
  const queryClient = useQueryClient();
  const className = "sm:max-w-3xl";

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setOpen(null);
      setCurrentRow(null);
      setParentRow(null);
    }
  };

  const handleDeleteSuccess = () => {
    // Invalidate the query to trigger a refetch.
    queryClient.invalidateQueries({ queryKey: ["/sys/views"] });
    // Close the dialog immediately.
    handleOpenChange(false);
  };

  return (
    <Fragment>
      {/* Top-level Add */}
      <ViewActionDialog
        className={className}
        key='view-add'
        open={open === "add"}
        onOpenChange={handleOpenChange}
      />
      {/* Add Sub-view */}
      {parentRow && (
        <ViewActionDialog
          className={className}
          key={`view-add-sub-${parentRow.id}`}
          open={open === "add-sub"}
          onOpenChange={handleOpenChange}
          parentRow={parentRow}
        />
      )}
      {/* Edit View */}
      {currentRow && (
        <ViewActionDialog
          className={className}
          key={`view-edit-${currentRow.id}`}
          open={open === "edit"}
          onOpenChange={handleOpenChange}
          currentRow={currentRow}
        />
      )}
      {/* Delete View */}
      {currentRow && (
        <DeleteDialog
          key={`view-delete-${currentRow.id}`}
          open={open === "delete"}
          onOpenChange={handleOpenChange}
          currentRow={currentRow}
          pageConfig={pageConfig}
          apiHooks={apiHooks}
          onSuccess={handleDeleteSuccess}
        />
      )}
    </Fragment>
  );
}
