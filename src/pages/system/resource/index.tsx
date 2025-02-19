import { useEffect, useState } from "react";
import { resourcesQueryOptions } from "@/api/system/resource";
import { ResourcesPrimaryButtons } from "@/pages/system/resource/components/resources-primary-buttons";
import { Search } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { PaginationState, SortingState, Updater } from "@tanstack/react-table";
import { useFilters } from "@/hooks/use-filters";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DataTable } from "@/components/DataTable";
import PageContainer from "@/components/PageContainer";
import { columns } from "./components/resources-columns";
import { ResourcesDialogs } from "./components/resources-dialogs";
import { ResourceTableProvider } from "./components/resources-table-provider";

export default function ResourcesPage() {
  const { search, setFilters, resetFilters } = useFilters();
  console.log("useFilters", search);
  const sorting = Search.getSorting(search);
  const pagination = Search.getPagination(search);
  const [columnFilters, _setColumnFilters] = useState(Search.getColumnFilters(search));
  const [updating, setUpdating] = useState(false);
  const [params, setParams] = useState<API.SearchParams>({
    ...Search.parsePagination(pagination),
    ...Search.parseSorting(sorting),
    ...Search.parseColumnFilters(columnFilters),
  });
  const setSorting = (updaterOrValue: Updater<SortingState>) => {
    const state = typeof updaterOrValue === "function" ? updaterOrValue(sorting) : updaterOrValue;
    console.log("setSorting", state);
    setParams({
      ...params,
      ...Search.parseSorting(state),
    });
    setUpdating(true);
  };

  const setPagination = (updaterOrValue: Updater<PaginationState>) => {
    const state = typeof updaterOrValue === "function" ? updaterOrValue(pagination) : updaterOrValue;

    console.log("setPagination", state);
    setParams({
      ...params,
      ...Search.parsePagination(state),
    });
    setUpdating(true);
  };

  const { data: resources = {}, isLoading } = useQuery(resourcesQueryOptions(search));
  useEffect(() => {
    if (updating) {
      setFilters(params);
      setUpdating(false);
    }
  }, [params, setFilters, updating]);

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
                  setColumnFilters: _setColumnFilters,
                  onSearch: (filters) => {
                    console.log("search", filters);
                    setParams({
                      ...params,
                      ...Search.parseColumnFilters(columnFilters),
                      current: 1,
                    });
                    setUpdating(true);
                  },
                  onReset: () => {
                    resetFilters();
                  },
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
