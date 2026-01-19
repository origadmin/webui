import { useUsersQuery } from "@/api/system/user";
import { usePaginatedQuery } from "@/hooks/use-paginated-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/DataTable";
import PageContainer from "@/components/PageContainer";
import { UserDetailRow } from "./components/user-detail-row";
import { columns } from "./components/users-columns";
import { UsersDialogs } from "./components/users-dialogs";
import { UsersPrimaryButtons } from "./components/users-primary-buttons";
import { UserTableProvider } from "./components/users-table-provider";


export default function UserPage() {
  const { dataSource, total, isLoading, tableProps, searchProps } = usePaginatedQuery({
    useQuery: (params) => useUsersQuery(params),
  });

  return (
    <UserTableProvider>
      <PageContainer>
        <Card>
          <CardHeader>
            <CardTitle>User List</CardTitle>
            <CardDescription>Manage your users here.</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable<API.System.User>
              columns={columns}
              dataSource={dataSource}
              total={total}
              isLoading={isLoading}
              // Spread all table state and handlers
              {...tableProps}
              // Static props
              useManual
              showPagination
              // Toolbar and sub-component props
              toolbarPosition='top'
              toolbars={() => <UsersPrimaryButtons />}
              props={{
                search: searchProps,
              }}
              // Enable row expansion
              options={{
                getRowCanExpand: () => true,
              }}
              renderSubComponent={UserDetailRow}
            />
          </CardContent>
        </Card>
      </PageContainer>
      <UsersDialogs />
    </UserTableProvider>
  );
}
