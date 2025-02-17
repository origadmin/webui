import { useEffect, useState } from "react";
import { usersQueryOptions } from "@/api/system/user";
import { Search } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import { PaginationState, SortingState, Updater } from "@tanstack/react-table";
import { useFilters } from "@/hooks/use-filters";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DataTable } from "@/components/DataTable";
import PageContainer from "@/components/PageContainer";
import { columns } from "./components/users-columns";
import { UsersDialogs } from "./components/users-dialogs";
import { UsersPrimaryButtons } from "./components/users-primary-buttons";
import { UserTableProvider } from "./components/users-table-provider";

export default function UserPage() {
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

  const { data: users = {}, isLoading } = useQuery(usersQueryOptions(search));
  useEffect(() => {
    if (updating) {
      setFilters(params);
      setUpdating(false);
    }
  }, [params, setFilters, updating]);
  // const { isLoading } = router.state;

  // const [search, setSearch] = useState<API.SearchParams>(params);
  // const { data: users = [], total, ...others } = router.routeTree.useLoaderData();
  // const { isLoading, data } = router.state;
  // console.log("user page render", search, "users", users);
  // useEffect(() => {
  //   setFilters(params);
  // }, [setFilters, params]);

  // console.log("user load", router.load, "state", router.state);
  // useLoaderData(router.state);
  return (
    <UserTableProvider>
      <PageContainer>
        <Card>
          <CardHeader>
            <CardTitle>User List</CardTitle>
            <CardDescription>Manage your users here.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
              <DataTable<API.System.User>
                useManual={true}
                isLoading={isLoading}
                sourceData={users.data}
                total={users.total}
                columns={columns}
                toolbars={<UsersPrimaryButtons />}
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
                    // onSearch(filters);
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
      <UsersDialogs />
    </UserTableProvider>
  );
}
