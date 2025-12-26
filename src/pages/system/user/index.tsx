import { useUsersQuery } from "@/api/system/user";
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
import { columns } from "./components/users-columns";
import { UsersDialogs } from "./components/users-dialogs";
import { UsersPrimaryButtons } from "./components/users-primary-buttons";
import { UserTableProvider } from "./components/users-table-provider";

export default function UserPage() {
  const { dataSource, total, isLoading, tableProps, searchProps } =
    useDataTable({
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
            <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
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
                toolbarPosition="bottom"
                toolbars={() => <UsersPrimaryButtons />}
                props={{
                  search: searchProps,
                }}
              />
            </div>
          </CardContent>
        </Card>
      </PageContainer>
      <UsersDialogs />
    </UserTableProvider>
  );
}
