import { useEffect, useMemo, useState } from "react";
import { usersQueryOptions } from "@/api/system/user";
import { PAGE_SIZE, START_PAGE } from "@/types";
import { Pagination as PaginationUtil } from "@/utils";
import { parseState } from "@/utils/pagination";
import GlobalConfig from "@config";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DataTable, DefaultSortProps } from "@/components/DataTable";
import PageContainer from "@/components/PageContainer";
import { columns } from "./components/users-columns";
import { UsersDialogs } from "./components/users-dialogs";
import { UsersPrimaryButtons } from "./components/users-primary-buttons";
import { UserTableProvider } from "./components/users-table-provider";

const sortProps = GlobalConfig.api.sort || DefaultSortProps;

export default function UserPage() {
  const router = useRouter();
  const searchParams = router.routeTree.useSearch();
  const oldSearchParams = useMemo(() => new URLSearchParams(searchParams), [searchParams]);
  const currentSearch = oldSearchParams.toString();

  const [sorting, setSorting] = useState<SortingState>(
    PaginationUtil.searchParamsToSortingState(oldSearchParams, sortProps),
  );
  console.log("sorting", sorting);
  const [pagination, setPagination] = useState<PaginationState>(
    PaginationUtil.getPaginationState(oldSearchParams, {
      pageIndex: START_PAGE,
      pageSize: PAGE_SIZE,
    }),
  );
  const { data: users = {}, isLoading } = useQuery(
    usersQueryOptions({
      ...parseState(pagination),
      [sortProps.key]: oldSearchParams.get(sortProps.key),
    }),
  );
  const [data, setData] = useState<API.System.User[]>(users.data || []);
  const [total, setTotal] = useState(users.total || 0);
  useEffect(() => {
    if (isLoading) return;
    setData(users.data || []);
    setTotal(users.total || 0);
  }, [isLoading, users.data, users.total]);

  // Listen for changes in order and update URLs
  useEffect(() => {
    const currentPathname = router.state.location.pathname;
    const currentSearchParams = new URLSearchParams(currentSearch);
    if (sorting.length === 0) {
      return;
    }
    console.log("pathname", currentPathname);
    currentSearchParams.set(
      sortProps.key,
      sorting.map((sort) => `${sort.id}${sortProps?.contact}${sort.desc ? "desc" : "asc"}`).join(","),
    );
    currentSearchParams.set("current", `${pagination.pageIndex + 1}`);
    currentSearchParams.set("page_size", `${pagination.pageSize}`);

    const nextSearch = currentSearchParams.toString();

    if (currentSearch !== nextSearch) {
      console.log("currentSearchParams", nextSearch, "currentSearch", currentSearch);
      const path = `${currentPathname}?${nextSearch}`;
      router.history.push(path.replaceAll("%3A", ":"));
    }
  }, [router, sorting, currentSearch, isLoading, users.data, users.total, pagination.pageIndex, pagination.pageSize]);

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
                data={data}
                total={total}
                columns={columns}
                toolbars={<UsersPrimaryButtons />}
                toolbarPosition={"bottom"}
                sortProps={{
                  ...sortProps,
                  sorting,
                  setSorting,
                }}
                paginationProps={{
                  pagination,
                  setPagination,
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
