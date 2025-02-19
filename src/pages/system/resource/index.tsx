import { useResourcesQuery } from "@/api/system/resource";
import { ResourcesPrimaryButtons } from "@/pages/system/resource/components/resources-primary-buttons";
import { useDataTable } from "@/hooks/use-data-table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DataTable } from "@/components/DataTable";
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
    useQuery: (params) => useResourcesQuery(params),
  });

  return (
    <ResourceTableProvider>
      <PageContainer>
        <Card>
          <CardHeader>
            <CardTitle>Resource List</CardTitle>
            <CardDescription>Manage your resources here.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
              <DataTable<API.System.Resource>
                useManual={true}
                isLoading={isLoading}
                sourceData={resources.data}
                total={resources.total}
                columns={columns}
                toolbars={<ResourcesPrimaryButtons />}
                toolbarPosition={"bottom"}
                sortProps={{
                  sorting,
                  setSorting,
                }}
                paginationProps={{
                  setPagination,
                }}
                paginationState={pagination}
                columnFiltersState={columnFilters}
                searchBarProps={{
                  setColumnFilters,
                  onSearch: handleSearch,
                  onReset: handleReset,
                }}
              />
            </div>
          </CardContent>
        </Card>
      </PageContainer>
      <ResourcesDialogs />
    </ResourceTableProvider>
  );
}
