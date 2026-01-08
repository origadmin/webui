import { useMemo, useEffect } from "react";
import { buildTree } from "@/utils/tree";
import { getExpandedRowModel } from "@tanstack/react-table";
import { useDataTable } from "@/hooks/use-data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/DataTable";
import PageContainer from "@/components/PageContainer";
import { ViewDialogs } from "./components/dialogs";
import { ViewsPrimaryButtons } from "./components/views-primary-buttons";
import { ViewTableProvider, useViewContext } from "./components/views-table-provider";
import { apiHooks, columns, pageConfig } from "./config";

function ViewPageContent() {
  const { dataSource, total, isLoading, tableProps, searchProps } = useDataTable({
    // The useQuery hook now returns the correct shape, so no adaptation is needed here.
    useQuery: (params) => apiHooks.useQuery({ ...params, no_paging: true }),
  });

  const { setSidebarRootId } = useViewContext();

  // Find and set the sidebar root id when data is loaded
  useEffect(() => {
    if (dataSource && dataSource.length > 0) {
      const sidebarRoot = dataSource.find(
        (view) => view.scope === "sidebar" && view.parent_id === 0
      );
      if (sidebarRoot) {
        setSidebarRootId(sidebarRoot.id);
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
            dataSource={treeData} // Use the tree data
            total={total}
            isLoading={isLoading}
            // Spread all table state and handlers
            {...tableProps}
            // Static props for tree table
            useManual={false}
            showPagination={false} // Pagination is often disabled for tree views
            // Options for tree table
            options={{
              getExpandedRowModel: getExpandedRowModel(),
              getSubRows: (row: API.System.View) => row.children,
            }}
            // Toolbar and sub-component props
            toolbarPosition='top'
            toolbars={() => <ViewsPrimaryButtons />}
            props={{
              search: searchProps,
            }}
          />
        </CardContent>
      </Card>
    </PageContainer>
  );
}

export default function ViewPage() {
  return (
    <ViewTableProvider>
      <ViewPageContent />
      <ViewDialogs />
    </ViewTableProvider>
  );
}
