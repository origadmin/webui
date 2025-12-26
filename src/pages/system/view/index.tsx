import { useState } from "react";
import {
  PaginationState,
  SortingState,
  ColumnFiltersState,
} from "@tanstack/react-table";
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
import { PAGE_SIZE, START_PAGE } from "@/types";
import { columns, apiHooks, pageConfig } from "./config";

export default function ViewPage() {
  // State management for the data table
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: START_PAGE,
    pageSize: PAGE_SIZE,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Data fetching using React Query, dependent on table state
  const { data, isLoading } = apiHooks.useQuery({
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
              dataSource={data?.data}
              total={data?.total}
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
              toolbarPosition="top"
              toolbars={() => <PrimaryButtons />}
              // Sub-component props
              props={{
                search: {
                  onSearch: handleSearch,
                  onReset: handleReset,
                },
              }}
            />
          </CardContent>
        </Card>
      </PageContainer>
      <Dialogs />
    </CrudTableProvider>
  );
}
