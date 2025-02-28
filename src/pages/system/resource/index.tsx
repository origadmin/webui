import { useMemo, useState } from "react";
import { buildTree, useResourcesQuery } from "@/api/system/resource";
import { ResourcesPrimaryButtons } from "@/pages/system/resource/components/resources-primary-buttons";
import { getExpandedRowModel } from "@tanstack/react-table";
import { useDataTable } from "@/hooks/use-data-table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import { DataTable, DataTableProps } from "@/components/DataTable";
import PageContainer from "@/components/PageContainer";
import { columns } from "./components/resources-columns";
import { ResourcesDialogs } from "./components/resources-dialogs";
import { ResourceTableProvider } from "./components/resources-table-provider";

export default function ResourcesPage() {
  const {
    sorting,
    pagination,
    columnFilters,
    isLoading,
    data: resources = {},
    setSorting,
    setPagination,
    setColumnFilters,
    handleSearch,
    handleReset,
  } = useDataTable({
    useQuery: (params) => useResourcesQuery({ ...params, page_size: 1000 }),
  });

  const [tabsValue, setTabsValue] = useState("all");

  const tableProps: Omit<DataTableProps<API.System.Resource>, "isLoading" | "sourceData" | "total"> = {
    columns,
    useManual: false,
    showPagination: false,
    sorting,
    setSorting,
    paginationState: pagination,
    setPagination,
    columnFiltersState: columnFilters,
    setColumnFilters,
    toolbarPosition: "bottom",
    toolbars: () => <ResourcesPrimaryButtons />,
    options: {
      getExpandedRowModel: getExpandedRowModel(),
      getSubRows: (row: API.System.Resource) => row.children,
    },
    props: {
      search: {
        onSearch: handleSearch,
        onReset: handleReset,
      },
    },
  };

  const treeData = useMemo(() => buildTree(resources.data), [resources.data]);

  return (
    <ResourceTableProvider>
      <PageContainer>
        <Card>
          <Tabs value={tabsValue} onValueChange={(value) => setTabsValue(value)}>
            <CardHeader>
              <CardTitle>Resources</CardTitle>
              <CardDescription>
                {/*<TabsList>*/}
                {/*  <TabsTrigger value='all'>All</TabsTrigger>*/}
                {/*  <TabsTrigger value='menu'>Menu</TabsTrigger>*/}
                {/*  <TabsTrigger value='api'>API</TabsTrigger>*/}
                {/*  <TabsTrigger value='static'>Static</TabsTrigger>*/}
                {/*</TabsList>*/}
                <CardDescription>Manage your resources here.</CardDescription>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
                <DataTable<API.System.Resource>
                  {...tableProps}
                  isLoading={isLoading}
                  dataSource={treeData}
                  total={resources.total}
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
