import { useRolesQuery } from "@/api/system/role";
import { useDataTable } from "@/hooks/use-data-table";
import { RolesPrimaryButtons } from "@/pages/system/role/components/roles-primary-buttons";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { DataTable } from "@/components/DataTable";
import PageContainer from "@/components/PageContainer";
import { columns } from "./components/roles-columns";
import { RolesDialogs } from "./components/roles-dialogs";
import { RoleTableProvider } from "./components/roles-table-provider";

export default function RolesPage() {
  const {
    data: roles,
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
    useQuery: (params) => useRolesQuery(params),
  });

  return (
    <RoleTableProvider>
      <PageContainer>
        <Card className="h-full flex flex-col">
          <CardHeader>
            <CardTitle>Role List</CardTitle>
            <CardDescription>Manage your roles here.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <DataTable<API.System.Role>
              columns={columns}
              dataSource={roles?.data}
              total={roles?.total}
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
              toolbars={isLoading ? undefined : () => <RolesPrimaryButtons />}
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
      <RolesDialogs />
    </RoleTableProvider>
  );
}
