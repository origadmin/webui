import { useDataTable } from "@/hooks/use-data-table";
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
      useQuery: (params) => useResourcesQuery(params),
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
              dataSource={dataSource}
              total={total}
              isLoading={isLoading}
              // Spread all table state and handlers
              {...tableProps}
              // Static props
              useManual
              showPagination
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
