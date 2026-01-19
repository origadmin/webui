import CrudPageTemplate from "@/templates/crud-page";
import { Dialogs } from "@/templates/crud-page/components/dialogs";
import { CrudTableProvider } from "@/templates/crud-page/hooks/use-crud-table";
import { Fields } from "./components/fields";
import { apiHooks, columns, formSchema, pageConfig, Product } from "./config";

function BasicCrudPage() {
  return (
    <CrudTableProvider>
      <CrudPageTemplate pageConfig={pageConfig} apiHooks={apiHooks} columns={columns} />
      <Dialogs<Product, typeof formSchema>
        pageConfig={pageConfig}
        formSchema={formSchema}
        apiHooks={apiHooks}
        renderFields={(form) => <Fields form={form} />}
      />
    </CrudTableProvider>
  );
}

export default BasicCrudPage;
