import { useMemo, useEffect, useState } from "react";
import { buildTree } from "@/utils/tree";
import { getExpandedRowModel } from "@tanstack/react-table";
import { usePaginatedQuery } from "@/hooks/use-paginated-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/DataTable";
import PageContainer from "@/components/PageContainer";
import { ViewDialogs } from "./components/dialogs";
import { ViewsPrimaryButtons } from "./components/views-primary-buttons";
import { ViewTableProvider, useViewContext } from "./components/views-table-provider";
import { apiHooks, columns, pageConfig } from "./config";

function ViewPageContent() {
  const dataTable = usePaginatedQuery({
    useQuery: (params) => apiHooks.useQuery({ ...params, no_paging: true }),
  });

  const { dataSource, total, isLoading, tableProps, searchProps } = dataTable;

  const { setSidebarRootId } = useViewContext();
  const [sidebarRoot, setSidebarRoot] = useState<API.System.View | null>(null);

  // Find and set the sidebar root object when data is loaded
  useEffect(() => {
    if (dataSource && dataSource.length > 0) {
      const root = dataSource.find(
        (view) => view.scope === "sidebar" && view.parent_id === "0"
      );
      if (root) {
        setSidebarRoot(root);
        setSidebarRootId(root.id || null);
      } else {
        setSidebarRoot(null);
        setSidebarRootId(null);
      }
    }
  }, [dataSource, setSidebarRootId]);

  // Memoize the tree structure
  const treeData = useMemo(() => buildTree(dataSource), [dataSource]);

  return (
    <PageContainer>
      <Card>
        <CardHeader>
          <CardTitle>{pageConfig.title} List</CardTitle>
          <CardDescription>{pageConfig.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            dataSource={treeData}
            total={total}
            isLoading={isLoading}
            {...tableProps}
            useManual={false}
            showPagination={false}
            options={{
              getExpandedRowModel: getExpandedRowModel(),
              getSubRows: (row: API.System.View) => row.children,
            }}
            toolbarPosition='top'
            toolbars={() => <ViewsPrimaryButtons sidebarRoot={sidebarRoot} />}
            props={{
              search: searchProps,
            }}
          />
        </CardContent>
      </Card>
      <ViewDialogs dataTable={dataTable} />
    </PageContainer>
  );
}

export default function ViewPage() {
  return (
    <ViewTableProvider>
      <ViewPageContent />
    </ViewTableProvider>
  );
}
