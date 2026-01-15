import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DataTable } from "@/components/DataTable";
import PageContainer from "@/components/PageContainer";
import { Dialogs } from "./components/dialogs";
import { PrimaryButtons } from "./components/primary-buttons";
// Assuming a generic primary-buttons component
import { columns, apiHooks, pageConfig } from "./config";
import { CrudTableProvider } from "./hooks/use-crud-table";

export default function CrudPage() {
  const queryResult = apiHooks.useQuery({
    pageIndex: 0,
    pageSize: 10,
  });

  const data = queryResult.data as { items?: unknown[]; total?: number } | undefined;
  const isLoading = queryResult.isLoading;

  return (
    <CrudTableProvider>
      <PageContainer>
        <Card>
          <CardHeader>
            <CardTitle>{pageConfig.title} List</CardTitle>
            <CardDescription>{pageConfig.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              dataSource={data?.items ?? []}
              total={data?.total ?? 0}
              isLoading={isLoading}
              useManual={true}
              showPagination={true}
              toolbarPosition='top'
              toolbars={isLoading ? undefined : () => <PrimaryButtons />}
              props={{}}
            />
          </CardContent>
        </Card>
      </PageContainer>
      <Dialogs />
    </CrudTableProvider>
  );
}
