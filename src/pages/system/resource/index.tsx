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
import { ResourcesDialogs } from "./components/resources-dialogs";
import { ResourcesPrimaryButtons } from "./components/resources-primary-buttons";
import { ResourceTableProvider } from "./components/resources-table-provider";
import { columns } from "./components/resources-columns";
import { useResourcesQuery } from "@/api/system/resource";

export default function ResourcesPage() {
  const { dataSource, total, isLoading, tableProps, searchProps } =
    useDataTable({
      useQuery: (params) => useResourcesQuery({ ...params, page_size: 1000 }), // Fetch all for tree
    });

  // Memoize the tree structure
  const treeData = useMemo(() => buildTree(dataSource), [dataSource]);

  return (
    <ResourceTableProvider>
      <PageContainer>
        <Card>
          <CardHeader>
            <CardTitle>Resources</CardTitle>
            <CardDescription>
              Manage backend resources. Resources from the framework are synced from code, while others can be added manually.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable<API.System.Resource>
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
                getSubRows: (row: API.System.Resource) => row.children,
              }}
              // Toolbar and sub-component props
              toolbarPosition="top"
              toolbars={() => <ResourcesPrimaryButtons />}
              props={{
                search: searchProps,
              }}
            />
          </CardContent>
        </Card>
      </PageContainer>
      <ResourcesDialogs />
    </ResourceTableProvider>
  );
}
