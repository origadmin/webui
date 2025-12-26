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
  const {
    data: resources,
    isLoading,
    sorting,
    columnFilters,
    setSorting,
    setColumnFilters,
    handleSearch,
    handleReset,
  } = useDataTable({
    useQuery: (params) => useResourcesQuery({ ...params, pageSize: 1000 }),
  });

  const [tabsValue, setTabsValue] = useState("all");

  // Memoized tree structure for the table
  const treeData = useMemo(() => buildTree(resources?.data), [resources?.data]);

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
                  total={resources?.total}
                  isLoading={isLoading}
                  // Core table state and handlers
                  useManual={false}
                  showPagination={false}
                  sorting={sorting}
                  onSortingChange={setSorting}
                  columnFiltersState={columnFilters}
                  onColumnFiltersChange={setColumnFilters}
                  // Toolbar and sub-component props
                  toolbarPosition="bottom"
                  toolbars={() => <ResourcesPrimaryButtons />}
                  options={{
                    getExpandedRowModel: getExpandedRowModel(),
                    getSubRows: (row: API.System.Resource) => row.children,
                  }}
                  props={{
                    search: {
                      onSearch: handleSearch,
                      onReset: handleReset,
                    },
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
