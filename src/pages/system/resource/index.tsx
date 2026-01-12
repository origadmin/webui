import { usePaginatedQuery } from "@/hooks/use-paginated-query";
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
  // Standard paginated data fetching
  const { dataSource, total, isLoading, tableProps, searchProps, queryResult } =
    usePaginatedQuery({
      useQuery: useResourcesQuery,
    });

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
              dataSource={dataSource} // Use the direct data source
              total={total}
              isLoading={isLoading}
              // Spread all table state and handlers
              {...tableProps}
              // Set the initial visibility state for columns
              columnVisibilityState={{
                sequence: false,
                description: false,
              }}
              // Standard table configuration
              useManual
              showPagination // Enable pagination
              // Toolbar props
              toolbarPosition="top"
              toolbars={() => <ResourcesPrimaryButtons />}
              props={{
                search: searchProps,
              }}
            />
          </CardContent>
        </Card>
      </PageContainer>
      <ResourcesDialogs queryResult={queryResult} />
    </ResourceTableProvider>
  );
}
