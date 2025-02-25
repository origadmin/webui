import { useUsersQuery } from "@/api/system/user";
import { useDataTable } from "@/hooks/use-data-table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DataTable, DataTableProps } from "@/components/DataTable";
import PageContainer from "@/components/PageContainer";
import { columns } from "./components/users-columns";
import { UsersDialogs } from "./components/users-dialogs";
import { UsersPrimaryButtons } from "./components/users-primary-buttons";
import { UserTableProvider } from "./components/users-table-provider";

export default function UserPage() {
  const {
    sorting,
    pagination,
    columnFilters,
    isLoading,
    data: users = {},
    setSorting,
    setPagination,
    setColumnFilters,
    handleSearch,
    handleReset,
  } = useDataTable({
    useQuery: useUsersQuery,
  });

  const tableProps: Omit<DataTableProps<API.System.User>, "isLoading" | "dataSource" | "total"> = {
    columns,
    useManual: true,
    showPagination: true,
    sorting,
    setSorting,
    paginationState: pagination,
    setPagination,
    columnFiltersState: columnFilters,
    setColumnFilters,
    toolbarPosition: "bottom",
    toolbars: () => <UsersPrimaryButtons />,
    props: {
      search: {
        onSearch: handleSearch,
        onReset: handleReset,
      },
    },
  };

  return (
    <UserTableProvider>
      <PageContainer>
        <Card>
          <CardHeader>
            <CardTitle>User List</CardTitle>
            <CardDescription>Manage your users here.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
              <DataTable<API.System.User>
                {...tableProps}
                isLoading={isLoading}
                dataSource={users.data}
                total={users.total}
              />
            </div>
          </CardContent>
        </Card>
      </PageContainer>
      <UsersDialogs />
    </UserTableProvider>
  );
}
