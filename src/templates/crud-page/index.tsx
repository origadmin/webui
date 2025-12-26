import { useDataTable } from "@/hooks/use-data-table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DataTable, DataTableProps } from "@/components/DataTable";
import PageContainer from "@/components/PageContainer";
import { CrudTableProvider } from "./hooks/use-crud-table";
import { Dialogs } from "./components/dialogs";
import { PrimaryButtons } from "./components/primary-buttons"; // Assuming a generic primary-buttons component
import { columns, apiHooks, pageConfig } from "./config";

export default function CrudPage() {
  const {
    sorting,
    pagination,
    columnFilters,
    isLoading,
    data,
    setSorting,
    setPagination,
    setColumnFilters,
    handleSearch,
    handleReset,
  } = useDataTable({
    useQuery: (params) => apiHooks.useQuery(params),
  });

  const tableProps: Omit<DataTableProps<any>, "isLoading" | "dataSource" | "total"> = {
    columns,
    useManual: true,
    showPagination: true,
    sorting,
    onSortingChange: setSorting,
    paginationState: pagination,
    onPaginationChange: setPagination,
    columnFiltersState: columnFilters,
    onColumnFiltersChange: setColumnFilters,
    toolbarPosition: "top",
    toolbars: isLoading ? undefined : () => <PrimaryButtons />,
    props: {
      search: {
        onSearch: handleSearch,
        onReset: handleReset,
      },
    },
  };

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
              {...tableProps}
              isLoading={isLoading}
              dataSource={data?.data}
              total={data?.total}
            />
          </CardContent>
        </Card>
      </PageContainer>
      <Dialogs />
    </CrudTableProvider>
  );
}
