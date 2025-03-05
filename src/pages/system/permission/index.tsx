import { useState } from "react";
import { usePermissionsQuery } from "@/api/system/permission";
import { PermissionsPrimaryButtons } from "@/pages/system/permission/components/permissions-primary-buttons";
import { useDataTable } from "@/hooks/use-data-table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { DataTable, DataTableProps } from "@/components/DataTable";
import PageContainer from "@/components/PageContainer";
import { columns } from "./components/permissions-columns";
import { PermissionsDialogs } from "./components/permissions-dialogs";
import { PermissionTableProvider } from "./components/permissions-table-provider";

export default function PermissionsPage() {
  const {
    sorting,
    pagination,
    columnFilters,
    isLoading,
    data: permissions = {},
    setSorting,
    setPagination,
    setColumnFilters,
    handleSearch,
    handleReset,
  } = useDataTable({
    useQuery: (params) => usePermissionsQuery(params),
  });

  const [tabsValue, setTabsValue] = useState("all");

  const tableProps: Omit<DataTableProps<API.System.Permission>, "isLoading" | "sourceData" | "total"> = {
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
    toolbars: () => <PermissionsPrimaryButtons />,
    props: {
      search: {
        onSearch: handleSearch,
        onReset: handleReset,
      },
    },
  };

  // const treeData = useMemo(() => buildTree(permissions.data), [permissions.data]);

  return (
    <PermissionTableProvider>
      <PageContainer>
        <Card>
          <Tabs value={tabsValue} onValueChange={(value) => setTabsValue(value)}>
            <CardHeader>
              <CardTitle>Permissions</CardTitle>
              <CardDescription>
                <CardDescription>Manage your permissions here.</CardDescription>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
                <DataTable<API.System.Permission>
                  {...tableProps}
                  isLoading={isLoading}
                  dataSource={permissions.data}
                  total={permissions.total}
                />
              </div>
            </CardContent>
          </Tabs>
        </Card>
      </PageContainer>
      <PermissionsDialogs />
    </PermissionTableProvider>
  );
}
