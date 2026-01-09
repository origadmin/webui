import { useRolesQuery } from "@/api/system/role";
import { usePaginatedQuery } from "@/hooks/use-paginated-query";
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
  const { dataSource, total, isLoading, tableProps, searchProps } =
    usePaginatedQuery({
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
            <DataTable<API.System.Role>
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
              toolbarPosition="top"
              toolbars={() => <RolesPrimaryButtons />}
              props={{
                search: searchProps,
              }}
            />
          </CardContent>
        </Card>
      </PageContainer>
      <RolesDialogs />
    </RoleTableProvider>
  );
}
