import { Fragment } from "react";
import { z } from "zod";
import { useCrudTable } from "../hooks/use-crud-table";
import { PageConfig, ApiHooks } from "../types";
import { ActionDialog } from "./action-dialog";
import { DeleteDialog } from "./delete-dialog";


interface DialogsProps<T, TForm extends z.ZodType<any, any>> {
  pageConfig: PageConfig;
  formSchema: TForm;
  apiHooks: ApiHooks<T, TForm>;
  renderFields: (form: any) => React.ReactNode;
}

export function Dialogs<T extends { id?: string }, TForm extends z.ZodType<any, any>>({
  pageConfig,
  formSchema,
  apiHooks,
  renderFields,
}: DialogsProps<T, TForm>) {
  const { open, setOpen, currentRow, setCurrentRow } = useCrudTable<T>();

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setOpen(null);
      setCurrentRow(null);
    }
  };

  return (
    <Fragment>
      <ActionDialog
        key={`${pageConfig.title}-add`}
        open={open === "add"}
        onOpenChange={handleOpenChange}
        pageConfig={pageConfig}
        formSchema={formSchema}
        apiHooks={apiHooks}
        renderFields={renderFields}
      />
      {currentRow && (
        <ActionDialog
          key={`${pageConfig.title}-edit-${currentRow.id}`}
          open={open === "edit"}
          onOpenChange={handleOpenChange}
          currentRow={currentRow}
          pageConfig={pageConfig}
          formSchema={formSchema}
          apiHooks={apiHooks}
          renderFields={renderFields}
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
