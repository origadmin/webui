import { useEffect, useState } from "react";
import { usersQueryOptions } from "@/api/system/user";
import { PAGE_SIZE, START_PAGE } from "@/types";
import { parseState } from "@/utils/pagination";
import { useQuery } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DataTable } from "@/components/DataTable";
import PageContainer from "@/components/PageContainer";
import { columns } from "./components/users-columns";
import { UsersDialogs } from "./components/users-dialogs";
import { UsersPrimaryButtons } from "./components/users-primary-buttons";
import { UserTableProvider } from "./components/users-table-provider";

export default function UserPage() {
  const [pagination, setPagination] = useState<PaginationState>({ pageSize: PAGE_SIZE, pageIndex: START_PAGE });

  const { data: users = {}, isLoading } = useQuery(usersQueryOptions(parseState(pagination)));
  const [data, setData] = useState<API.System.User[]>(users.data || []);
  const [total, setTotal] = useState(users.total || 0);
  useEffect(() => {
    if (isLoading) return;
    setData(users.data || []);
    setTotal(users.total || 0);
  }, [isLoading, users]);

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
