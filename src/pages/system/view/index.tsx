import { useMemo, useEffect, useState } from "react";
import { buildTree, TreeItem } from "@/utils/tree";
import { getExpandedRowModel, ExpandedState } from "@tanstack/react-table";
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
    useQuery: (params) => apiHooks.useQuery({ ...params, pagingMode: "none" }),
  });

  const { dataSource, total, isLoading, tableProps, searchProps } = dataTable;
  const [expanded, setExpanded] = useState<ExpandedState>({});

  const { setSidebarRootId } = useViewContext();

  // Find and set the sidebar root object when data is loaded
  useEffect(() => {
    if (!dataSource) {
      return;
    }

    // Handle the case where all data is deleted
    if (dataSource.length === 0) {
      setSidebarRootId(null);
      return;
    }

    // Handle the case where data exists
    const root = dataSource.find((view) => view.scope === "sidebar" && view.parent_id === "0");

    if (root) {
      setSidebarRootId(root.id || null);
    } else {
      // This case handles when data exists but no root is found
      setSidebarRootId(null);
    }
  }, [dataSource, setSidebarRootId]);

  // Memoize the tree structure with type-safe conversion
  const treeData = useMemo(() => {
    const safeDataSource = dataSource
      .filter((item): item is API.System.View & { id: string } => typeof item.id === "string")
      .map((item) => item as TreeItem);
    return buildTree(safeDataSource);
  }, [dataSource]);

  // Default to fully expanded when data loads
  useEffect(() => {
    if (treeData.length > 0) {
      const newExpandedState: ExpandedState = {};
      const setExpandedRecursively = (nodes: TreeItem[]) => {
        nodes.forEach(node => {
          if (node.children && node.children.length > 0) {
            newExpandedState[node.id] = true;
            setExpandedRecursively(node.children);
          }
        });
      };
      setExpandedRecursively(treeData);
      setExpanded(newExpandedState);
    }
  }, [treeData]);

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
            expandedState={expanded}
            onExpandedChange={setExpanded}
            options={{
              getRowId: (row) => row.id ?? "", // Ensure a string is always returned
              getExpandedRowModel: getExpandedRowModel(),
              getSubRows: (row: API.System.View) => row.children,
            }}
            toolbarPosition='top'
            toolbars={() => <ViewsPrimaryButtons />}
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
