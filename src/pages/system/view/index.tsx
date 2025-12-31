import { useMemo } from "react";
import { getExpandedRowModel } from "@tanstack/react-table";
import { useDataTable } from "@/hooks/use-data-table";
import { buildTree } from "@/utils/tree";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { DataTable } from "@/components/DataTable";
import PageContainer from "@/components/PageContainer";
import { columns, apiHooks, pageConfig } from "./config";
import { ViewDialogs } from "./components/dialogs";
import { ViewTableProvider } from "./components/views-table-provider";
import { ViewsPrimaryButtons } from "./components/views-primary-buttons";

export default function ViewPage() {
  const { dataSource, total, isLoading, tableProps, searchProps } =
    useDataTable({
      useQuery: (params) => apiHooks.useQuery({ ...params, pageSize: 1000 }), // Fetch all for tree
    });

  // Memoize the tree structure
  const treeData = useMemo(() => buildTree(dataSource), [dataSource]);

  return (
    <ViewTableProvider>
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
              toolbarPosition="top"
              toolbars={() => <ViewsPrimaryButtons />}
              props={{
                search: searchProps,
              }}
            />
          </CardContent>
        </Card>
      </PageContainer>
      <ViewDialogs />
    </ViewTableProvider>
  );
}
