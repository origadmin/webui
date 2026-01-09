import { Fragment } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useViewTable } from "./views-table-provider";
import { ViewActionDialog } from "./action-dialog";
import { DeleteDialog } from "@/templates/crud-page/components/delete-dialog";
import { apiHooks, pageConfig } from "../config";
import { useViewContext } from "./views-table-provider";
import { UsePaginatedQueryReturnType } from "@/hooks/use-paginated-query";

interface ViewDialogsProps {
  dataTable: UsePaginatedQueryReturnType<API.System.View>;
}

export function ViewDialogs({ dataTable }: ViewDialogsProps) {
  const { open, setOpen, currentRow, setCurrentRow, parentRow, setParentRow } = useViewTable();
  const { sidebarRoot } = useViewContext();
  const queryClient = useQueryClient();

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setOpen(null);
      setCurrentRow(null);
      setParentRow(null);
    }
  };

  const handleDeleteSuccess = () => {
    // Invalidate the query to trigger a refetch.
    // The fixed useDataTable hook will now correctly pick up the new data,
    // and the UI will update reactively.
    queryClient.invalidateQueries({ queryKey: ["/sys/views"] });
    
    // Close the dialog immediately.
    handleOpenChange(false);
  };

  return (
    <Fragment>
      {/* Top-level Add */}
      <ViewActionDialog
        key='view-add'
        open={open === "add"}
        onOpenChange={handleOpenChange}
        // Pass the sidebarRoot as the default parent
        defaultParent={sidebarRoot}
      />
      {/* Add Sub-view */}
      {parentRow && (
        <ViewActionDialog
          key={`view-add-sub-${parentRow.id}`}
          open={open === "add-sub"}
          onOpenChange={handleOpenChange}
          parentRow={parentRow}
        />
      )}
      {/* Edit View */}
      {currentRow && (
        <ViewActionDialog
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
