import { useEffect, useMemo, useState } from "react";
import { usersQueryOptions } from "@/api/system/user";
import { Pagination as PaginationUtil } from "@/utils";
import { fillSearchParams } from "@/utils/pagination";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DataTable } from "@/components/DataTable";
import PageContainer from "@/components/PageContainer";
import { columns } from "./components/users-columns";
import { UsersDialogs } from "./components/users-dialogs";
import { UsersPrimaryButtons } from "./components/users-primary-buttons";
import { UserTableProvider } from "./components/users-table-provider";

export default function UserPage() {
  const router = useRouter();
  const search = router.routeTree.useSearch();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);
  const [sorting, setSorting] = useState<SortingState>(PaginationUtil.getSortingState(searchParams));
  const [pagination, setPagination] = useState<PaginationState>(PaginationUtil.getPaginationState(searchParams));
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(PaginationUtil.getColumnFilters(searchParams));
  const [params, setParams] = useState<API.Params>({
    ...PaginationUtil.parsePagination(pagination),
    ...PaginationUtil.parseSorting(sorting),
    ...PaginationUtil.parseColumnFilters(columnFilters),
  });

  useEffect(() => {
    setParams({
      ...PaginationUtil.parsePagination(pagination),
      ...PaginationUtil.parseSorting(sorting),
      ...PaginationUtil.parseColumnFilters(columnFilters),
    });
  }, [columnFilters, pagination, sorting]);

  const { data: users = {}, isLoading } = useQuery(usersQueryOptions(params));
  console.log("user page render", params, "users", users);
  // Listen for changes in order and update URLs
  useEffect(() => {
    const currentPathname = router.state.location.pathname;
    const currentSearchParams = fillSearchParams(searchParams, params);
    console.log("pathname", currentPathname);
    const nextSearch = currentSearchParams.toString();
    if (searchParams.toString() !== nextSearch) {
      console.log("currentSearchParams", currentSearchParams, "currentSearch", searchParams);
      const path = `${currentPathname}?${nextSearch}`;
      router.history.push(path.replaceAll("%3A", ":"));
    }
  }, [router, searchParams, params]);

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
                  pagination,
                  setPagination,
                }}
                columnFilterProps={{
                  columnFilters,
                  setColumnFilters,
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
