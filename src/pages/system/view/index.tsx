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
import { CrudTableProvider } from "@/templates/crud-page/hooks/use-crud-table";
import { Dialogs } from "@/templates/crud-page/components/dialogs";
import { PrimaryButtons } from "@/templates/crud-page/components/primary-buttons";
import { columns, apiHooks, pageConfig, formSchema } from "./config";
import { renderFields } from "./components/fields";

export default function ViewPage() {
  const { dataSource, total, isLoading, tableProps, searchProps } =
    useDataTable({
      useQuery: (params) => apiHooks.useQuery({ ...params, pageSize: 1000 }), // Fetch all for tree
    });

  // Memoize the tree structure
  const treeData = useMemo(() => buildTree(dataSource), [dataSource]);

  return (
    <CrudTableProvider>
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
              toolbars={() => <PrimaryButtons pageConfig={pageConfig} />}
              props={{
                search: searchProps,
              }}
            />
          </CardContent>
        </Card>
      </PageContainer>
      <Dialogs
        pageConfig={pageConfig}
        formSchema={formSchema}
        apiHooks={apiHooks}
        renderFields={renderFields}
      />
    </CrudTableProvider>
  );
}
