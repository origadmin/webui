import { useMemo, useState } from "react";
import { getExpandedRowModel } from "@tanstack/react-table";
import { buildTree, useResourcesQuery } from "@/api/system/resource";
import { useDataTable } from "@/hooks/use-data-table";
import { ResourcesPrimaryButtons } from "@/pages/system/resource/components/resources-primary-buttons";
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
import { columns } from "./components/resources-columns";
import { ResourcesDialogs } from "./components/resources-dialogs";
import { ResourceTableProvider } from "./components/resources-table-provider";

export default function ResourcesPage() {
  const { dataSource, total, isLoading, tableProps, searchProps } =
    useDataTable({
      useQuery: (params) => useResourcesQuery({ ...params, pageSize: 1000 }),
    });

  const [tabsValue, setTabsValue] = useState("all");

  // Memoized tree structure for the table
  const treeData = useMemo(() => buildTree(dataSource), [dataSource]);

  return (
    <ResourceTableProvider>
      <PageContainer>
        <Card>
          <Tabs value={tabsValue} onValueChange={(value) => setTabsValue(value)}>
            <CardHeader>
              <CardTitle>Resources</CardTitle>
              <CardDescription>Manage your resources here.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
                <DataTable<API.System.Resource>
                  columns={columns}
                  dataSource={treeData}
                  total={total}
                  isLoading={isLoading}
                  // Spread all table state and handlers
                  {...tableProps}
                  // Static props
                  useManual={false}
                  showPagination={false}
                  // Toolbar and sub-component props
                  toolbarPosition="bottom"
                  toolbars={() => <ResourcesPrimaryButtons />}
                  options={{
                    getExpandedRowModel: getExpandedRowModel(),
                    getSubRows: (row: API.System.Resource) => row.children,
                  }}
                  props={{
                    search: searchProps,
                  }}
                />
              </div>
            </CardContent>
          </Tabs>
        </Card>
      </PageContainer>
      <ResourcesDialogs />
    </ResourceTableProvider>
  );
}
