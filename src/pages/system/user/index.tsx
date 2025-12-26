import { useState } from "react";
import {
  PaginationState,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
import { useUsersQuery } from "@/api/system/user";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { DataTable } from "@/components/DataTable";
import PageContainer from "@/components/PageContainer";
import { PAGE_SIZE, START_PAGE } from "@/types";
import { columns } from "./components/users-columns";
import { UsersDialogs } from "./components/users-dialogs";
import { UsersPrimaryButtons } from "./components/users-primary-buttons";
import { UserTableProvider } from "./components/users-table-provider";

export default function UserPage() {
  // State management for the data table
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: START_PAGE,
    pageSize: PAGE_SIZE,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Data fetching using React Query, dependent on table state
  const { data: users, isLoading } = useUsersQuery({
    page: pagination.pageIndex,
    pageSize: pagination.pageSize,
    // TODO: Pass sorting and columnFilters to the query based on API requirements
  });

  // Handlers for search and reset actions from the search bar
  const handleSearch = (filters: ColumnFiltersState) => {
    setColumnFilters(filters);
    // Reset to the first page when applying new filters
    setPagination((prev) => ({ ...prev, pageIndex: START_PAGE }));
  };

  const handleReset = () => {
    setColumnFilters([]);
    setSorting([]);
    setPagination({
      pageIndex: START_PAGE,
      pageSize: PAGE_SIZE,
    });
  };

  return (
    <UserTableProvider>
      <PageContainer>
        <Card>
          <CardHeader>
            <CardTitle>User List</CardTitle>
            <CardDescription>Manage your users here.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0">
              <DataTable<API.System.User>
                columns={columns}
                dataSource={users?.data}
                total={users?.total}
                isLoading={isLoading}
                // Manual mode props
                useManual
                // Pagination props
                showPagination
                paginationState={pagination}
                onPaginationChange={setPagination}
                // Sorting props
                sorting={sorting}
                onSortingChange={setSorting}
                // Filtering props
                columnFiltersState={columnFilters}
                onColumnFiltersChange={setColumnFilters}
                // Toolbar props
                toolbarPosition="bottom"
                toolbars={() => <UsersPrimaryButtons />}
                // Sub-component props
                props={{
                  search: {
                    onSearch: handleSearch,
                    onReset: handleReset,
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
