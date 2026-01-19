import { usePaginatedQuery } from "@/hooks/use-paginated-query";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DataTable, DataTableColumnType } from "@/components/DataTable";
import PageContainer from "@/components/PageContainer";
import { PrimaryButtons } from "./components/primary-buttons";
import { ApiHooks, PageConfig } from "./types";

interface CrudPageProps<TData, TFormValues> {
  pageConfig: PageConfig;
  apiHooks: ApiHooks<TData, TFormValues>;
  columns: DataTableColumnType<TData>[];
}

export default function CrudPage<TData, TFormValues>({
  pageConfig,
  apiHooks,
  columns,
}: CrudPageProps<TData, TFormValues>) {
  const { dataSource, total, isLoading, tableProps, searchProps } = usePaginatedQuery({
    useQuery: apiHooks.useQuery,
  });

  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <CardTitle>{pageConfig.title} List</CardTitle>
          <CardDescription>{pageConfig.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            dataSource={dataSource}
            total={total}
            isLoading={isLoading}
            {...tableProps}
            useManual={true}
            showPagination={true}
            toolbarPosition='top'
            toolbars={() => <PrimaryButtons />}
            props={{
              search: searchProps,
            }}
          />
        </CardContent>
      </Card>
    </PageContainer>
  );
}
