import { useState } from "react";
import { usePermissionsQuery } from "@/api/system/permission";
import { useDataTable } from "@/hooks/use-data-table";
import { PermissionsPrimaryButtons } from "@/pages/system/permission/components/permissions-primary-buttons";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { DataTable } from "@/components/DataTable";
import PageContainer from "@/components/PageContainer";
import { columns } from "./components/permissions-columns";
import { PermissionsDialogs } from "./components/permissions-dialogs";
import { PermissionTableProvider } from "./components/permissions-table-provider";

export default function PermissionsPage() {
  const {
    data: permissions,
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
    useQuery: (params) => usePermissionsQuery(params),
  });

  const [tabsValue, setTabsValue] = useState("all");

  return (
    <PermissionTableProvider>
      <PageContainer>
        <Card className="h-full flex flex-col">
          <Tabs
            value={tabsValue}
            onValueChange={(value) => setTabsValue(value)}
            className="h-full flex flex-col"
          >
            <CardHeader>
              <CardTitle>Permissions</CardTitle>
              <CardDescription>Manage your permissions here.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <DataTable<API.System.Permission>
                columns={columns}
                dataSource={permissions?.data}
                total={permissions?.total}
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
                toolbars={
                  isLoading ? undefined : () => <PermissionsPrimaryButtons />
                }
                props={{
                  search: {
                    onSearch: handleSearch,
                    onReset: handleReset,
                  },
                }}
              />
            </CardContent>
          </Tabs>
        </Card>
      </PageContainer>
      <PermissionsDialogs />
    </PermissionTableProvider>
  );
}
