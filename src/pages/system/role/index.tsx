import { useRolesQuery } from "@/api/system/role";
import { RolesPrimaryButtons } from "@/pages/system/role/components/roles-primary-buttons";
import { useDataTable } from "@/hooks/use-data-table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DataTable, DataTableProps } from "@/components/DataTable";
import PageContainer from "@/components/PageContainer";
import { columns } from "./components/roles-columns";
import { RolesDialogs } from "./components/roles-dialogs";
import { RoleTableProvider } from "./components/roles-table-provider";

export default function RolesPage() {
  const {
    sorting,
    pagination,
    columnFilters,
    isLoading,
    data: roles = {},
    setSorting,
    setPagination,
    setColumnFilters,
    handleSearch,
    handleReset,
  } = useDataTable({
    useQuery: (params) => useRolesQuery(params),
  });

  const tableProps: Omit<DataTableProps<API.System.Role>, "isLoading" | "sourceData" | "total"> = {
    columns,
    useManual: true,
    showPagination: true,
    sorting,
    onSortingChange: setSorting,
    paginationState: pagination,
    onPaginationChange: setPagination,
    columnFiltersState: columnFilters,
    onColumnFiltersChange: setColumnFilters,
    toolbarPosition: "bottom",
    toolbars: () => <RolesPrimaryButtons />,
    props: {
      search: {
        onSearch: handleSearch,
        onReset: handleReset,
      },
    },
  };

  return (
    <RoleTableProvider>
      <PageContainer>
        <Card>
          <CardHeader>
            <CardTitle>Role List</CardTitle>
            <CardDescription>Manage your roles here.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
              <DataTable<API.System.Role>
                {...tableProps}
                isLoading={isLoading}
                dataSource={roles.data}
                total={roles.total}
              />
            </div>
          </CardContent>
        </Card>
      </PageContainer>
      <RolesDialogs />
    </RoleTableProvider>
  );
}
