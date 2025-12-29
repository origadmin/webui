import { Fragment } from "react";
import { useCrudTable } from "@/templates/crud-page/hooks/use-crud-table";
import { ViewActionDialog } from "./action-dialog";
import { DeleteDialog } from "@/templates/crud-page/components/delete-dialog";
import { apiHooks, pageConfig } from "../config";

export function ViewDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useCrudTable<API.System.View>();

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setOpen(null);
      setCurrentRow(null);
    }
  };

  return (
    <Fragment>
      <ViewActionDialog
        key={`${pageConfig.title}-add`}
        open={open === "add"}
        onOpenChange={handleOpenChange}
      />
      {currentRow && (
        <ViewActionDialog
          key={`${pageConfig.title}-edit-${currentRow.id}`}
          open={open === "edit"}
          onOpenChange={handleOpenChange}
          currentRow={currentRow}
        />
      )}
      {currentRow && (
        <DeleteDialog
          key={`${pageConfig.title}-delete-${currentRow.id}`}
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
