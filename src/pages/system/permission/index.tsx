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
  const { dataSource, total, isLoading, tableProps, searchProps } =
    useDataTable({
      useQuery: (params) => usePermissionsQuery(params),
    });

  const [tabsValue, setTabsValue] = useState("all");

  return (
    <PermissionTableProvider>
      <PageContainer>
        <Card>
          <Tabs
            value={tabsValue}
            onValueChange={(value) => setTabsValue(value)}
          >
            <CardHeader>
              <CardTitle>Permissions</CardTitle>
              <CardDescription>Manage your permissions here.</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable<API.System.Permission>
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
                toolbars={() => <PermissionsPrimaryButtons />}
                props={{
                  search: searchProps,
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
