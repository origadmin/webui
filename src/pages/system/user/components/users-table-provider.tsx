import createTableContext from "@/components/DataTable/table-provider";


const { Provider, useTable } = createTableContext<API.System.User>();

export { Provider as UserTableProvider, useTable as useUserTable };
