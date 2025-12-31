import { useMemo, useState } from "react";
import {
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
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
import { buildTree } from "@/utils/tree";

export default function ResourcesPage() {
  const [globalFilter, setGlobalFilter] = useState("");

  const { data: resourceData, isLoading } = useResourcesQuery({
    page_size: 1000, // Fetch all data to build the tree
  });

  const treeData = useMemo(() => {
    if (!resourceData?.data) return [];
    return buildTree(resourceData.data);
  }, [resourceData]);

  const table = useReactTable({
    data: treeData,
    columns,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getSubRows: (row) => row.children,
  });

  const searchProps = {
    value: globalFilter,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      setGlobalFilter(e.target.value),
  };

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
            <DataTable
              table={table}
              columns={columns}
              isLoading={isLoading}
              useManual={false}
              showPagination={false}
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
