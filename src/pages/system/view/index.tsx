import { useDataTable } from "@/hooks/use-data-table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { DataTable } from "@/components/DataTable";
import PageContainer from "@/components/PageContainer";
import { CrudTableProvider } from "@/templates/crud-page/hooks/use-crud-table";
import { Dialogs } from "@/templates/crud-page/components/dialogs";
import { PrimaryButtons } from "@/templates/crud-page/components/primary-buttons";
import { columns, apiHooks, pageConfig } from "./config";

export default function ViewPage() {
  const {
    data,
    isLoading,
    sorting,
    pagination,
    columnFilters,
    setSorting,
    setPagination,
    setColumnFilters,
    handleSearch,
    handleReset,
  } = useDataTable({
    useQuery: (params) => apiHooks.useQuery(params),
  });

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
              dataSource={data?.data}
              total={data?.total}
              isLoading={isLoading}
              // Core table state and handlers
              useManual
              showPagination
              paginationState={pagination}
              onPaginationChange={setPagination}
              sorting={sorting}
              onSortingChange={setSorting}
              columnFiltersState={columnFilters}
              onColumnFiltersChange={setColumnFilters}
              // Toolbar and sub-component props
              toolbarPosition="top"
              toolbars={() => <PrimaryButtons />}
              props={{
                search: {
                  onSearch: handleSearch,
                  onReset: handleReset,
                },
              }}
            />
          </CardContent>
        </Card>
      </PageContainer>
      <Dialogs />
    </CrudTableProvider>
  );
}
