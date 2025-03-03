import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DataTable, DataTableProps } from "@/components/DataTable";
import PageContainer from "@/components/PageContainer";
import { UseQueryResult } from "@tanstack/react-query";
import { useDataTable } from "@/hooks/use-data-table";

interface SystemManagementPageProps<T> {
    title: string;
    description: string;
    columns: any[];
    useQuery: (params: any) => UseQueryResult<API.PageResult<T>>;
    PrimaryButtons: () => JSX.Element;
    Dialogs: () => JSX.Element;
    TableProvider: React.FC<{ children: ReactNode }>;
}

export function SystemManagementPage<T>({
    title,
    description,
    columns,
    useQuery,
    PrimaryButtons,
    Dialogs,
    TableProvider,
}: SystemManagementPageProps<T>) {
    const {
        sorting,
        pagination,
        columnFilters,
        isLoading,
        data = {},
        setSorting,
        setPagination,
        setColumnFilters,
        handleSearch,
        handleReset,
    } = useDataTable({
        useQuery,
    });

    const tableProps: Omit<DataTableProps<T>, "isLoading" | "dataSource" | "total"> = {
        columns,
        useManual: true,
        showPagination: true,
        sorting,
        setSorting,
        paginationState: pagination,
        setPagination,
        columnFiltersState: columnFilters,
        setColumnFilters,
        toolbarPosition: "bottom",
        toolbars: () => <PrimaryButtons />,
        props: {
            search: {
                onSearch: handleSearch,
                onReset: handleReset,
            },
        },
    };

    return (
        <TableProvider>
            <PageContainer>
                <Card>
                    <CardHeader>
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
                            <DataTable<T>
                                {...tableProps}
                                isLoading={isLoading}
                                dataSource={data.data}
                                total={data.total}
                            />
                        </div>
                    </CardContent>
                </Card>
            </PageContainer>
            <Dialogs />
        </TableProvider>
    );
}