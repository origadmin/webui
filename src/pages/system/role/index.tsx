import { useRolesQuery } from "@/api/system/role";
import { RolesPrimaryButtons } from "@/pages/system/role/components/roles-primary-buttons";
import { useDataTable } from "@/hooks/use-data-table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DataTable } from "@/components/DataTable";
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
                useManual={true}
                isLoading={isLoading}
                sourceData={roles.data}
                total={roles.total}
                columns={columns}
                toolbars={<RolesPrimaryButtons />}
                toolbarPosition={"bottom"}
                sortProps={{
                  sorting,
                  setSorting,
                }}
                paginationProps={{
                  setPagination,
                }}
                paginationState={pagination}
                columnFiltersState={columnFilters}
                searchBarProps={{
                  setColumnFilters,
                  onSearch: handleSearch,
                  onReset: handleReset,
                }}
              />
            </div>
          </CardContent>
        </Card>
      </PageContainer>
      <RolesDialogs />
    </RoleTableProvider>
  );
}
